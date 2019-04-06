const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, { origins: '*:*'});

app.use(express.static('public'));

io.on('connection', function(socket) {
  const username = Math.random().toString(36).substring(7);
  console.log('a user connected', username);

  socket.on('tick', (data) => {
    socket.broadcast.emit('update', {
      user: username,
      pos: data
    });
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected', username);
    socket.broadcast.emit('left', {
      user: username,
    });
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});