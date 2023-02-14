require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

// Use Express JSON Middleware
app.use(express.json());

app.use(cors());

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

// Start express server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

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
