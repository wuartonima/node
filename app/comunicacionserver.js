module.exports =function(app,io){
io.on('connection', function(socket) {  
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', "hola");

  socket.on('new-message', function(data) {
  	
    
  });



});


}