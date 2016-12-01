    var doc = new jsPDF('p', 'pt', 'a4', false);
    var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
    };





     function graficar(id,datos,titulo){
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
     

      function drawChart() {
        var data = google.visualization.arrayToDataTable(datos);

        var options = {
          width:1000,height:500,
          title: titulo,
          legend: {position: 'top', maxLines: 3},
          hAxis: {title: datos[0][0],  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };


        var chart = new google.visualization.AreaChart(document.getElementById(id));
        

         google.visualization.events.addListener(chart, 'ready', function () {
            var content = '<img src="' + chart.getImageURI() + '">';
            $('#pdf').append(content);
          });
         chart.draw(data, options);
    
      }
  }
  function addfila(form,tabla){
    var fd= $(form).serializeArray();
    var arr="<tr>";

    for (var i =0;i<fd.length; i++) {
       arr += "<td>"+fd[i].value+"</td>";
    }
    console.log(arr);

    $(tabla).append(arr +"</tr>" );
    $("#popback").fadeOut();
    $("#popcreate").fadeOut();  
    $("#popmodificar").fadeOut(); 
    $("#popeliminar").fadeOut(); 
    $("#popconcluir").fadeOut();
    $("#eficienciapop").fadeOut(); 

     return false;
  }




  function pdfcreated(){
    var imgData=$('#pdf img');
    doc.text(20, 20, 'Reporte de eficiencia generado por Rsoft');
    doc.addImage(imgData[0], 'png', 20, 40, 600, 300);
    doc.addImage(imgData[1], 'png', 20, 430, 600, 300);
   // doc.addImage(imgData[2], 'png', 15, 40, 600, 300);
   doc.addPage();
   doc.addImage(imgData[2], 'png', 15, 40, 600, 300);
    $("#pdf").empty();

    doc.save('sample-file.pdf');
  }

  var reporte = {  
    "reporteProduc":function(){
                     $("#reporte").load("contenido/reporteproduccion.html",function(){    
                       for (var i =0; i <= 30; i++) {
                         $("#piezasgood").append("<tr><td>" + "polo1" + "</td><td>" + "polo2" + "</td><td>"+
                         "polo3" + "</td><td>"+ "polo4" + "</td><td>" + "polo5" + "</td><td>" +"polo6" + "</td></tr>");
                         $("#piezasbad").append("<tr><td>" + "lolo1" + "</td><td>" + "polo2" + "</td><td>"+ 
                         "polo3" + "</td><td>"+ "polo4" + "</td><td>" + "polo5" + "</td><td>" +"polo6" + "</td></tr>");
                       }
                       for (var i =0; i <= 6; i++) {
                         $("#piezasgood").append("<tr><td>" + "" + "</td><td>" + "" + "</td><td>"+
                         "" + "</td><td>"+ "" + "</td><td>" + "" + "</td><td>" +"" + "</td></tr>"); 
                           $("#piezasbad").append("<tr><td>" + "" + "</td><td>" + "" + "</td><td>"+
                         "" + "</td><td>"+ "" + "</td><td>" + "" + "</td><td>" +"" + "</td></tr>");               
                       }
                     });
                    },
    "reporteFallos":function(){
          $("#reporte").load("contenido/reportefallos.html",function(){    
                       for (var i =0; i <= 30; i++) {
                         $("#fallos").append("<tr><td>" + "polo1" + "</td><td>" + "polo2" + "</td><td>"+
                         "polo3" + "</td><td>"+ "polo4" + "</td><td>" + "polo5" + "</td><td>"+ "polo6" + "</td><td>"
                          +"polo7" + "</td></tr>");                         
                       }
                     });
    },
    "reporteEficiencia":function(){
                         $("#reporte").load("contenido/eficienciareporte.html",function(){
                            var arr=[['Year', 'Disponibilidad'], ['2013',  780],['2014',  970],['2015',  560],['2016',  450]];
                            graficar('polo',arr,'Disponibilidada');
                            arr=[['Year', 'Velocidad'], ['2013',  400],['2014',  700],['2015',  200],['2016',  540]];
                            graficar('polo2',arr,'Velocidad');
                            arr=[['Year', 'Calidad'], ['2013',  310],['2014',  110],['2015',  90],['2016',  410]];
                            graficar('polo3',arr,'Calidad');
                            //console.log(document.getElementById('exel').innerHTML);
                        });
    },
    fecha1:"",
    fecha2:"",
    linea:"",
    grafica1:"",
    grafica2:"",
    grafica3:"",
    tipo:""
  }; 

   function cargarcontenido(archivo){
        $("#contenido").load("contenido/"+archivo);
    }
    function popadd(menu){
     $("#popback").fadeIn();
     $(menu).fadeIn();  
     return false;
    }
    function selection(mid,id2,id3){
        $(mid).css({"border-color": "#000", 
                    "border-width":"3px", 
                    "border-style":"solid"});
        $(id2).css({"border-color": "#fff", 
                    "border-width":"3px", 
                    "border-style":"solid"});
        $(id3).css({"border-color": "#fff", 
                    "border-width":"3px", 
                    "border-style":"solid"});
        reporte.tipo=mid.substring(1);
    }



    function dureport()
    {
        
        reporte.fecha1=$("#fecha1").val();
        reporte[reporte.tipo]();


        
    } 
var tableToExcel = (function() {
    console.log($("#exel").innerHTML);
var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:of  fice:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table,table2, name) {
    var d=$("#"+table2).length;
   if (!table.nodeType) table = document.getElementById(table)
    if (!table2.nodeType) table2 = document.getElementById(table2)

   console.log(d);
    if (d > 0){
        var ctx2 = {worksheet: name || 'Worksheet', table: table2.innerHTML+table.innerHTML}}
        else{
            alert("null");
            var ctx2 = {worksheet: name || 'Worksheet', table:table.innerHTML}
        }
    window.location.href = uri + base64(format(template, ctx2))
  }
})()
 