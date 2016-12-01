$( document ).ready(function() {
    console.log( "ready!" );
    $("#contenido").load("contenido/p.html")
    /////// seccion correspondiente a menus emergentes
     $( "#contenido" ).on( "click",'#masLinea1', function() {      
     $("#eficienciapop").load("contenido/eficienciamas.html",function(){
        var arr=[['Year', 'Disponibilidad'], ['2013',  1000],['2014',  1170],['2015',  660],['2016',  1030]];
        graficar('polo',arr,'Disponibilidada',1);
        arr=[['Year', 'Velocidad'], ['2013',  400],['2014',  460],['2015',  1120],['2016',  540]];
        graficar('polo2',arr,'Velocidad',1);
        arr=[['Year', 'Calidad'], ['2013',  210],['2014',  210],['2015',  310],['2016',  410]];
        graficar('polo3',arr,'Calidad',1);
         });
     
    $("#popback").fadeIn();
    $("#eficienciapop").fadeIn();
     return false;
    });


     $( "#contenido" ).on( "click",'#masLinea2', function() {      
     $("#eficienciapop").load("contenido/eficienciamas.html",function(){
        var arr=[['Year', 'Disponibilidad'], ['2013',  780],['2014',  970],['2015',  560],['2016',  450]];
        graficar('polo',arr,'Disponibilidada',1);
        arr=[['Year', 'Velocidad'], ['2013',  400],['2014',  700],['2015',  200],['2016',  540]];
        graficar('polo2',arr,'Velocidad',1);
        arr=[['Year', 'Calidad'], ['2013',  310],['2014',  110],['2015',  90],['2016',  410]];
        graficar('polo3',arr,'Calidad',1);
         });
    $("#popback").fadeIn();
    $("#eficienciapop").fadeIn();
     return false;
    });
     
       $( "#contenido" ).on( "click",'#masLinea3', function() {      
     $("#eficienciapop").load("contenido/eficienciamas.html",function(){
        var arr=[['Year', 'Disponibilidad'], ['2013',  879],['2014',  990],['2015',  210],['2016',  1000]];
        graficar('polo',arr,'Disponibilidada',1);
        arr=[['Year', 'Velocidad'], ['2013',  400],['2014',  700],['2015',  200],['2016',  540]];
        graficar('polo2',arr,'Velocidad',1);
        arr=[['Year', 'Calidad'], ['2013',  310],['2014',  110],['2015',  90],['2016',  410]];
        graficar('polo3',arr,'Calidad',1);
         });
    $("#popback").fadeIn();
    $("#eficienciapop").fadeIn();
     return false;
    });
     
       $( "#contenido" ).on( "click",'#masLinea4', function() {      
     $("#eficienciapop").load("contenido/eficienciamas.html",function(){
        var arr=[['Year', 'Disponibilidad'], ['2013',  1000],['2014',  1170],['2015',  660],['2016',  1030]];
        graficar('polo',arr,'Disponibilidada',1);
        arr=[['Year', 'Velocidad'], ['2013',  300],['2014',  60],['2015',  700],['2016',  540]];
        graficar('polo2',arr,'Velocidad',1);
        arr=[['Year', 'Calidad'], ['2013',  110],['2014',  210],['2015',  310],['2016',  410]];
        graficar('polo3',arr,'Calidad',1);
         });
    $("#popback").fadeIn();
    $("#eficienciapop").fadeIn();
     return false;
    });




    $( "#popback" ).on( "click", function() {      
    $("#popback").fadeOut();
    $("#popcreate").fadeOut(); 
    $('.popcreate').fadeOut();
    $("#popmodificar").fadeOut(); 
    $("#popeliminar").fadeOut(); 
    $("#popconcluir").fadeOut();
    $("#eficienciapop").fadeOut(); 


     return false;
    });



//document.getElementById(id1)




});


