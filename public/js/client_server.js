// Generated by CoffeeScript 1.11.1
(function() {
  var socket;

  socket = io();

  socket.on('messages', function(data) {
    console.log(data);
  });

}).call(this);