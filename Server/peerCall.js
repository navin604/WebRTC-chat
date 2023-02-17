const createPeerServerListeners = (peerServer) => {
  peerServer.on("connection", (client) => {
    console.log(`${client.id} connected to server`);
  });
};

module.exports = {
  createPeerServerListeners,
};
