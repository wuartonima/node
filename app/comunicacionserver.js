var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports =function(app,io){
io.on('connection', function(socket) {  
  console.log('Alguien se ha conectado con Sockets');
  connection.query("SELECT * FROM ordenes",function(err, rows) {
  	 socket.emit('messages',rows );  
     });

  socket.on('new-message', function(data) {
  	
    
  });
  socket.on('gettables', function(data) {
     connection.query("SELECT * FROM "+ data,function(err, rows) { 
  	 socket.emit('settable',rows );  
     });
  });
  socket.on('getorden', function(data) {
     connection.query( data[0],function(err, rows) {
  	  socket.emit(data[1],[rows,data[2],data[3]] );
     });   
  });
   socket.on('addOrden', function(data) {
     connection.query( data,function(err, rows) {
       console.log(err);
       socket.emit(err);
     });   
  });



});


}