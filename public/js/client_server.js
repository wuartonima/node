(function() {
  var socket;

  socket = io();
  this.fixData=function(data,namerow){
    data.forEach(function(element,index) {
      element[namerow]=element[namerow].substring(0, 10);
    });
    console.log(data);
  }

  socket.on('messages', function(data) {
    fixData(data,"fecha");
     var table = $('#ordenespro').DataTable({
       data:data,
        columns: [
                          { data: 'id'},
                          { data: 'orden'},
                          { data: 'numero'},
                          { data: 'lote'},                    
                          { data: 'sku' },
                          { data: 'fecha'},
                          { data: 'linea'},
                          { data: 'estatus'}
                      ]
    });
  });
 this.gettable=function (tabla){
  socket.emit('gettables', tabla);
  //m();
}
socket.on('settable', function(data) {
    fixData(data,"fecha");
     var table = $('#ordenespro').DataTable({
       data: data,
        columns: [
                          { data: 'id' },
                          { data: 'orden' },
                          { data: 'numero' },
                          { data: 'lote' },                    
                          { data: 'sku' },
                          { data: 'fecha' },
                          { data: 'linea' },
                          { data: 'estatus' }
                      ]
    }); 
    table.clear();
    table.rows.add(data);
    table.draw();
  });



}).call(this);
