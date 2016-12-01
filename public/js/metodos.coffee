doc = new jsPDF('p', 'pt', 'a4', false)
specialElementHandlers = '#editor': (element, renderer) ->
  true
@genda=(fecha1,fecha2)->
  f1 = Date.parse(fecha1)
  f2 = Date.parse(fecha2)
  m=f2-f1
  n=Math.floor((Math.random() * m) + f1)
  date = new Date(n)
  dd = date.getFullYear()
  return dd+"/"+ (date.getMonth()+1)+'/'+date.getDate()
  

@reporte =
  'reporteProduc': ->
    $('#reporte').load 'contenido/reporteproduccion.html', ->
      $("#mpdf").css "display", "none"
      $("#mexel").css "display", "block"
      d = Date.parse "2016.11.10","y.m.d"
      i = 0
      while i <= 30
        f= genda(reporte.fecha1(),reporte.fecha2())
        $('#piezasgood').append '<tr><td>' + 'ID_'+i +
        '</td><td>' + 'Orden'+i + '</td><td>' +(i+31) +
        '</td><td>' + 'Lote'+i + '</td><td>'+
        'SKU'+i + '</td><td>' + f+'</td><td>'+'OK'
        +'</td></tr>'
        f= genda(reporte.fecha1(),reporte.fecha2())
        $('#piezasbad').append '<tr><td>' + 'ID_'+(i+87) +
        '</td><td>' + 'Orden-'+i + '</td><td>' +(i+41) +
        '</td><td>' + 'Lote-'+i + '</td><td>'+
        'SKU-'+i + '</td><td>' + f+'</td><td>'+'OK'
        +'</td></tr>'
        i++
      i = 0
      while i <= 6
        $('#piezasgood').append '<tr><td>' + '' + '</td><td>'
        + '' + '</td><td>' + '' + '</td><td>'
        + '' + '</td><td>' + '' + '</td><td>' + '' + '</td></tr>'
        $('#piezasbad').append '<tr><td>' + '' + '</td><td>' +
        '' + '</td><td>' + '' + '</td><td>' + '' +
        '</td><td>' + '' + '</td><td>' + '' + '</td></tr>'
        i++
      return
    return
  'reporteFallos': ->
    $('#reporte').load 'contenido/reportefallos.html', ->
      $("#mpdf").css "display", "none"
      $("#mexel").css "display", "block"

      i = 0
      while i <= 30
        l=Math.floor((Math.random() * 4) + 1)
        Error=Math.floor((Math.random() * 100) + 1)
        E=Math.floor((Math.random() * 22) + 1)
        f= genda(reporte.fecha1(),reporte.fecha2())
        $('#fallos').append '<tr><td>' + 'ID_'+i + '</td><td>' + 'Error'+Error+
        '</td><td>' + 'Estacion'+l+ '</td><td>' +E+':'+(E+3)+':'+(E+8)+
        '</td><td>' + f + '</td><td>' + (Error+13)+" minutos" +
        '</td><td>' + 'OK' +'</td></tr>'
        i++
      return
    return
  'reporteEficiencia': ->
    $('#reporte').load 'contenido/eficienciareporte.html', ->
      $("#mpdf").css "display", "block"
      $("#mexel").css "display", "none"
      arr = [['Year', 'Disponibilidad' ],[ '2013', 780 ], [ '2014', 970],
       [ '2015', 560],[ '2016', 450]]
      graficar 'polo', arr, 'Disponibilidada'
      arr = [[ 'Year', 'Velocidad'],['2013',400],['2014', 700],
      ['2015', 200],['2016',540]]
      graficar 'polo2', arr, 'Velocidad'
      arr = [['Year','Calidad'],['2013',310],['2014',110],
      ['2015',90],['2016',410]]
      graficar 'polo3', arr, 'Calidad'
      #console.log(document.getElementById('exel').innerHTML);
      return
    return
  fecha1: ->
    console.log $('#fecha1').val()+ "2"
    if $('#fecha1').val() !=""
      r=$('#fecha1').val()
    else
      r="2016.10.09"
    return r
  fecha2: ->
    if $('#fecha2').val() !=""
      r=$('#fecha2').val()
    else
      r="2016.11.02"
    return r
  linea: ''
  grafica1: ''
  grafica2: ''
  grafica3: ''
  tipo: ''
@tableToExcel = do ->
  console.log $('#exel').innerHTML
  uri = 'data:application/vnd.ms-excel;base64,'
  template = '<html xmlns:o="urn:schemas-microsoft-com:
  of  fice:office" xmlns:x="urn:schemas-microsoft-com:
  office:excel" xmlns="http://www.w3.org/TR/REC-html40">
  <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:Exce
  lWorksheets><x:ExcelWorksheet><x:Name>{worksheet}
  </x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:
  WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheet
  s></x:ExcelWorkbook></xml><![endif]--></head><body><ta
  ble>{table}</table></body></html>'

  base64 = (s) ->
    window.btoa unescape(encodeURIComponent(s))

  format = (s, c) ->
    s.replace /{(\w+)}/g, (m, p) ->
      c[p]

  (table, table2, name) ->

    d = $('#' + table2).length
    if !table.nodeType
      table = document.getElementById(table)
    if !table2.nodeType
      table2 = document.getElementById(table2)
    console.log d
    if d > 0
      ctx2 =
        worksheet: name or 'Worksheet'
        table: table2.innerHTML + table.innerHTML
    else
      ctx2 =
        worksheet: name or 'Worksheet'
        table: table.innerHTML
    window.location.href = uri + base64(format(template, ctx2))
    return

@graficar = (id, datos, titulo,tipo =0) ->

  drawChart = ->
    data = google.visualization.arrayToDataTable(datos)
    options =
      title: titulo
      legend:
        position: 'top'
        maxLines: 3
    option2 =
      width: 1000
      height: 500
      title: titulo
      legend:
        position: 'top'
        maxLines: 3
      hAxis:
        title: datos[0][0]
        titleTextStyle: color: '#333'
      vAxis: minValue: 0
    if tipo==1
      v=options
    else
      v=option2
    chart = new (google.visualization.AreaChart)(document.getElementById(id))
    google.visualization.events.addListener chart, 'ready', ->
      content = '<img src="' + chart.getImageURI() + '">'
      $('#pdf').append content
      return
    chart.draw data, v
    return

  google.charts.load 'current', 'packages': [ 'corechart' ]
  google.charts.setOnLoadCallback drawChart
  return

@addfila = (form, tabla) ->
  fd = $(form).serializeArray()
  arr = '<tr>'
  i = 0
  while i < fd.length
    arr += '<td>' + fd[i].value + '</td>'
    i++
  console.log arr
  $(tabla).append arr + '</tr>'
  $('#popback').fadeOut()
  $('#popcreate').fadeOut()
  $('#popmodificar').fadeOut()
  $('#popeliminar').fadeOut()
  $('#popconcluir').fadeOut()
  $('#eficienciapop').fadeOut()
  false

@pdfcreated = ->
  imgData = $('#pdf img')
  doc.text 20, 20, 'Reporte de eficiencia generado por Rsoft'
  doc.addImage imgData[0], 'png', 20, 40, 600, 300
  doc.addImage imgData[1], 'png', 20, 430, 600, 300
  # doc.addImage(imgData[2], 'png', 15, 40, 600, 300);
  doc.addPage()
  doc.addImage imgData[2], 'png', 15, 40, 600, 300
  $('#pdf').empty()
  doc.save 'sample-file.pdf'
  return

@cargarcontenido = (archivo) ->
  $('#contenido').load 'contenido/' + archivo
  return

@popadd = (menu) ->
  $('#popback').fadeIn()
  $(menu).fadeIn()
  false

@selection = (mid, id2, id3) ->
  $(mid).css
    'border-color': '#000'
    'border-width': '3px'
    'border-style': 'solid'
  $(id2).css
    'border-color': '#fff'
    'border-width': '3px'
    'border-style': 'solid'
  $(id3).css
    'border-color': '#fff'
    'border-width': '3px'
    'border-style': 'solid'
  reporte.tipo = mid.substring(1)
  return

@dureport = ->
  reporte[reporte.tipo]()
  return
