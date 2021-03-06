(function() {
  var socket;

  socket = io();
  socket.on('setorden', function(data) {
     addoptions(data[0],data[1],data[2]);
  });
  var doc, specialElementHandlers;

  doc = new jsPDF('p', 'pt', 'a4', false);

  specialElementHandlers = {
    '#editor': function(element, renderer) {
      return true;
    }
  };
  this.ancho_pantalla=function(){
    if (navigator.appName.indexOf('Explorer') != -1)
        return document.body.parentNode.scrollWidth;
    else
        return window.innerWidth;
  };
  this.alto_pantalla=function (){
    if (navigator.appName.indexOf('Explorer') != -1)
        return document.body.parentNode.scrollHeight;
    else
        return window.innerHeight;
  };

  this.genda = function(fecha1, fecha2) {
    var date, dd, f1, f2, m, n;
    f1 = Date.parse(fecha1);
    f2 = Date.parse(fecha2);
    m = f2 - f1;
    n = Math.floor((Math.random() * m) + f1);
    date = new Date(n);
    dd = date.getFullYear();
    return dd + "/" + (date.getMonth() + 1) + '/' + date.getDate();
  };

  this.reporte = {
    'reporteProduc': function() {
      $('#reporte').load('contenido/reporteproduccion.html', function() {
        var d, f, i;
        $("#mpdf").css("display", "none");
        d = Date.parse("2016.11.10", "y.m.d");
        i = 0;
        while (i <= 30) {
          f = genda(reporte.fecha1(), reporte.fecha2());
          $('#piezasgood').append('<tr><td>' + 'ID_' + i + '</td><td>' + 'Orden ' + i + '</td><td>' + (i + 31) + '</td><td>' + 'Lote' + i + '</td><td>' + 'SKU' + i + '</td><td>' + f + '</td><td>' + 'OK');
          +'</td></tr>';
          f = genda(reporte.fecha1(), reporte.fecha2());
          $('#piezasbad').append('<tr><td>' + 'ID_' + (i + 87) + '</td><td>' + 'Orden-' + i + '</td><td>' + (i + 41) + '</td><td>' + 'Lote-' + i + '</td><td>' + 'SKU-' + i + '</td><td>' + f + '</td><td>' + 'OK');
          +'</td></tr>';
          i++;
        }
        i = 0;

        $("table").tableExport({
             bootstrap: true, 
             formats: ["xlsx", "csv", "txt"],
             position: "top"
             });
      });
    },
    'reporteFallos': function() {
      $('#reporte').load('contenido/reportefallos.html', function() {
        var E, Error, f, i, l;
        $("#mpdf").css("display", "none");
        i = 0;
        while (i <= 30) {
          l = Math.floor((Math.random() * 4) + 1);
          Error = Math.floor((Math.random() * 100) + 1);
          E = Math.floor((Math.random() * 22) + 1);
          f = genda(reporte.fecha1(), reporte.fecha2());
          $('#fallos').append('<tr><td>' + 'ID_' + i.toString() + '</td><td>' + 'Error' + Error.toString() + '</td><td>' + 'Estacion' + l.toString() + '</td><td>' + E.toString() + ':' + (E + 3).toString() + ':' + (E + 8).toString() + '</td><td>' + f + '</td><td>' + (Error + 13).toString() + " minutos" + '</td><td>' + 'OK ' + '</td></tr>');
          i++;
        }
         $("table").tableExport({
             bootstrap: true, 
             formats: ["xlsx", "csv", "txt"],
             position: "top"
             });
      });
       
      
    },
    'reporteEficiencia': function() {
      $('#reporte').load('contenido/eficienciareporte.html', function() {
        var arr;
        $("#mpdf").css("display", "block");
        arr = [['Year', 'Disponibilidad'], ['2013', 780], ['2014', 970], ['2015', 560], ['2016', 450]];
        graficar('polo', arr, 'Disponibilidada');
        arr = [['Year', 'Velocidad'], ['2013', 400], ['2014', 700], ['2015', 200], ['2016', 540]];
        graficar('polo2', arr, 'Velocidad');
        arr = [['Year', 'Calidad'], ['2013', 310], ['2014', 110], ['2015', 90], ['2016', 410]];
        graficar('polo3', arr, 'Calidad');
      });
    },
    fecha1: function() {
      var r;
      console.log($('#fecha1').val() + "2");
      if ($('#fecha1').val() !== "") {
        r = $('#fecha1').val();
      } else {
        r = "2016.10.09";
      }
      return r;
    },
    fecha2: function() {
      var r;
      if ($('#fecha2').val() !== "") {
        r = $('#fecha2').val();
      } else {
        r = "2016.11.02";
      }
      return r;
    },
    linea: '',
    grafica1: '',
    grafica2: '',
    grafica3: '',
    tipo: ''
  };
  this.addoptions= function(array,id,propiedad){
      array.forEach(function(element,index){ 
        
      $(id).append('<option value='+element[propiedad]+'>'+element[propiedad] +'</option>'); 
 
      });
  }  
  this.getorden= function(id1,id2,id3){ 
         socket.emit('getorden',["SELECT lote FROM lotes","setorden",id1,"lote"]);
         socket.emit('getorden',["SELECT sku FROM skus","setorden",id2,"sku"]);
         socket.emit('getorden',["SELECT linea FROM lineas","setorden",id3,"linea"]);
  }
  this.tableToExcel = (function() {
    var base64, format, template, uri;
    console.log($('#exel').innerHTML);
    uri = 'data:application/vnd.ms-excel;base64,';
    template = '<html xmlns:o="urn:schemas-microsoft-com: of  fice:office" xmlns:x="urn:schemas-microsoft-com: office:excel" xmlns="http://www.w3.org/TR/REC-html40"> <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:Exce lWorksheets><x:ExcelWorksheet><x:Name>{worksheet} </x:Name><x:WorksheetOptions><x:DisplayGridlines/></x: WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheet s></x:ExcelWorkbook></xml><![endif]--></head><body><ta ble>{table}</table></body></html>';
    base64 = function(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    };
    format = function(s, c) {
      return s.replace(/{(\w+)}/g, function(m, p) {
        return c[p];
      });
    };
    return function(table, table2, name) {
      var ctx2, d;
      d = $('#' + table2).length;
      if (!table.nodeType) {
        table = document.getElementById(table);
      }
      if (!table2.nodeType) {
        table2 = document.getElementById(table2);
      }
      console.log(d);
      if (d > 0) {
        ctx2 = {
          worksheet: name || 'Worksheet',
          table: table2.innerHTML + table.innerHTML
        };
      } else {
        ctx2 = {
          worksheet: name || 'Worksheet',
          table: table.innerHTML
        };
      }
      window.location.href = uri + base64(format(template, ctx2));
    };
  })();

  this.graficar = function(id, datos, titulo, tipo) {
    var drawChart;
    if (tipo == null) {
      tipo = 0;
    }
    drawChart = function() {
      var chart, data, option2, options, v;
      data = google.visualization.arrayToDataTable(datos);
      options = {
        title: titulo,
        legend: {
          position: 'top',
          maxLines: 3
        }
      };
      option2 = {
        width: 1000,
        height: 500,
        title: titulo,
        legend: {
          position: 'top',
          maxLines: 3
        },
        hAxis: {
          title: datos[0][0],
          titleTextStyle: {
            color: '#333'
          }
        },
        vAxis: {
          minValue: 0
        }
      };
      if (tipo === 1) {
        v = options;
      } else {
        v = option2;
      }
      chart = new google.visualization.AreaChart(document.getElementById(id));
      google.visualization.events.addListener(chart, 'ready', function() {
        var content;
        content = '<img src="' + chart.getImageURI() + '">';
        $('#pdf').append(content);
      });
      chart.draw(data, v);
    };
    google.charts.load('current', {
      'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);
  };
  this.insertFile= function (arr){
    socket.emit("addOrden","INSERT INTO ordenes VALUES (DEFAULT"+arr+")");
  };
  this.modificarF=function(arr,l){ 
   var consulta="UPDATE ordenes SET orden='"+l[1].value+"', numero='"+l[2].value+"', lote='"+l[3].value+"', sku='"+l[4].value+
   "', fecha='"+l[5].value+"', linea='"+l[6].value+"', estatus='"+l[7].value+"' WHERE `id`='"+l[0].value+"';";

 socket.emit("addOrden",consulta);
  }
  this.eliminar=function(arr,l){ 
    var consulta="DELETE FROM ordenes WHERE  `id`="+l[0].value;
    socket.emit("addOrden",consulta);
  }

  this.addfila = function(form,caso) {
    var arr, fd, i;
    fd = $(form).serializeArray();
    i = 0;
    arr='';      
    while (i < fd.length) {
      arr +=','+"'"+fd[i].value+"'" ;
      i++;
    }
    caso(arr,fd);
    $('#popback').fadeOut();
    $('.popcreate').fadeOut();
    return false;
  };
  this.pdfcreated = function() {
    var imgData;
    imgData = $('#pdf img');
    var imgData2 = $('#logo img');
  //  doc.text(20, 20, 'Reporte de eficiencia generado por Rsoft');
    doc.addImage(imgData2[0], 'png', 20, 10, 60, 60);
    doc.text(90, 15, 'Reporte de eficiencia generado por Rsoft');
    doc.addImage(imgData[0], 'png', 20, 80, 600, 300);
    doc.addImage(imgData[1], 'png', 20, 470, 600, 300);
    doc.addPage();
    doc.addImage(imgData[2], 'png', 15, 80, 600, 300);
    $('#pdf').empty();
    doc.save('sample-file.pdf');
    doc = new jsPDF('p', 'pt', 'a4', false);
  };

  this.cargarcontenido = function(archivo,tabla) {
    $('#contenido').load('contenido/' + archivo, function(){
      gettable(tabla); 


    });
  };
  this.jsontotable=function(json){

  };

  this.popadd = function(menu,archivo) {
    $(menu).load('contenido/'+archivo, function(){
    $('#popback').fadeIn();
    $(menu).fadeIn();
     
      
    });
    
    return false;
  };
  this.selection = function(mid, id2, id3) {
    $(mid).css({
      'border-color': '#000',
      'border-width': '3px',
      'border-style': 'solid'
    });
    $(id2).css({
      'border-color': '#fff',
      'border-width': '3px',
      'border-style': 'solid'
    });
    $(id3).css({
      'border-color': '#fff',
      'border-width': '3px',
      'border-style': 'solid'
    });
    reporte.tipo = mid.substring(1);
  };

  this.dureport = function() {
    reporte[reporte.tipo]();
  };

}).call(this);
