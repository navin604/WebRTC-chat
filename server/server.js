require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const express = require("express");
const twilio = require("twilio");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const { ExpressPeerServer } = require("peer");
const socket = require("socket.io");
const groupCallHandler = require("./peerCall");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send({ api: "quickvid-api" });
});

app.get("/api/get-turn-credentials", (req, res) => {
  // place here  your Twilio credentials !!
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  client.tokens.create().then((token) => res.send({ token }));
});

let peers = [];
let p2pCallRooms = [];

const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  P2P_CALL_ROOMS: "P2P_CALL_ROOMS",
};

// Use Express JSON Middleware
app.use(express.json());

// Start express server
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Start peer server
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

//Set IO socket
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/peerjs", peerServer);

groupCallHandler.createPeerServerListeners(peerServer);

io.on("connection", (socket) => {
  console.log("Server: User connected");
  console.log(socket.id);
  socket.emit("connection", null);
  io.sockets.emit("broadcast", {
    event: broadcastEventTypes.P2P_CALL_ROOMS,
    p2pCallRooms,
  });

  socket.on("disconnect", () => {
    console.log("Server: user disconnected");
    p2pCallRooms = p2pCallRooms.filter((room) => room.socketID !== socket.id);
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.P2P_CALL_ROOMS,
      p2pCallRooms,
    });
  });

  //Group call listeners
  socket.on("create-group-call", (data) => {
    const roomID = uuidv4();
    socket.join(roomID);
    const p2pRoom = {
      socketID: socket.id,
      roomID: roomID,
      peerID: data.peerID,
      hostname: data.username,
    };
    p2pCallRooms.push(p2pRoom);
    console.log("Created room");
    console.log(p2pRoom);
    console.log("Updated roomlist below");
    console.log(p2pCallRooms);
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.P2P_CALL_ROOMS,
      p2pCallRooms,
    });
  });

  socket.on("p2p-call-join-request", (data) => {
    console.log("Sending join request to p2p room");
    io.to(data.roomID).emit("p2p-call-join-request", {
      peerID: data.peerID,
      streamID: data.streamID,
    });
    socket.join(data.roomID);
  });

  socket.on("p2p-call-disconnect", (data) => {
    console.log("Client disconencted");
    socket.leave(data.roomID);
    io.to(data.roomID).emit("p2p-call-disconnect", {
      streamID: data.streamID,
    });
  });

  socket.on("room-closed", (data) => {
    p2pCallRooms = p2pCallRooms.filter((room) => room.peerID !== data.peerID);
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.P2P_CALL_ROOMS,
      p2pCallRooms,
    });
  });
});

// create the twilioClient
const twilioClient = require("twilio")(
  process.env.TWILIO_API_KEY_SID,
  process.env.TWILIO_API_KEY_SECRET,
  { accountSid: process.env.TWILIO_ACCOUNT_SID }
);

const findOrCreateRoom = async (roomName) => {
  try {
    console.log("Trying to join room if it exits");
    await twilioClient.video.v1.rooms(roomName).fetch();
  } catch (error) {
    if (error.code === 20404) {
      console.log("roomn doesnt so creating");
      await twilioClient.video.v1.rooms.create({
        uniqueName: roomName,
        type: "group",
      });
    } else {
      throw error;
    }
  }
};

const getAccessToken = (roomName, identity) => {
  // create an access token
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    // generate a random unique identity for this participant
    { identity: identity + "." + uuidv4() }
  );
  // create a video grant for this specific room
  const videoGrant = new VideoGrant({
    room: roomName,
  });

  // add the video grant
  token.addGrant(videoGrant);

  // serialize the token and return it
  return token.toJwt();
};
//

app.post("/join-room", async (req, res) => {
  if (!req.body || !req.body.roomName || !req.body.identity) {
    console.log("failed to joun room post");
    return res.status(400).send("Must include roomName argument.");
  }
  const roomName = req.body.roomName;
  const identity = req.body.identity;
  console.log("Correct load now creating for finding");
  // find or create a room with given room name
  await findOrCreateRoom(roomName);
  // Generate an access token for a participant in this room
  const token = getAccessToken(roomName, identity);
  res.json({ token: token });
});
