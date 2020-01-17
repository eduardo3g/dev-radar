const socketio = require('socket.io');

exports.setupWebsocket = (server) => {
  // console.log('The Socket is running.');
  const io = socketio(server);

  io.on('connection', socket => {
    console.log(socket.id);
    console.log(socket.handshake.query); // parameters sent from front-end
  });
};