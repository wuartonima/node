reporte = 
  'reporteProduc': ->
    $('#reporte').load 'contenido/reporteproduccion.html', ->
      `var i`
      i = 0
      while i <= 30
        $('#piezasgood').append '<tr><td>' + 'polo1' + '</td><td>' + 'polo2' + '</td><td>' + 'polo3' + '</td><td>' + 'polo4' + '</td><td>' + 'polo5' + '</td><td>' + 'polo6' + '</td></tr>'
        $('#piezasbad').append '<tr><td>' + 'lolo1' + '</td><td>' + 'polo2' + '</td><td>' + 'polo3' + '</td><td>' + 'polo4' + '</td><td>' + 'polo5' + '</td><td>' + 'polo6' + '</td></tr>'
        i++
      i = 0
      while i <= 6
        $('#piezasgood').append '<tr><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td></tr>'
        $('#piezasbad').append '<tr><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td></tr>'
        i++
      return
    return
  'reporteFallos': ->
    $('#reporte').load 'contenido/reportefallos.html', ->
      i = 0
      while i <= 30
        $('#fallos').append '<tr><td>' + 'polo1' + '</td><td>' + 'polo2' + '</td><td>' + 'polo3' + '</td><td>' + 'polo4' + '</td><td>' + 'polo5' + '</td><td>' + 'polo6' + '</td><td>' + 'polo7' + '</td></tr>'
        i++
      return
    return
  'reporteEficiencia': ->
    $('#reporte').load 'contenido/reportefallos.html', ->
      arr = [
        [
          'Year'
          'Disponibilidad'
        ]
        [
          '2013'
          780
        ]
        [
          '2014'
          970
        ]
        [
          '2015'
          560
        ]
        [
          '2016'
          450
        ]
      ]
      graficar 'polo', arr, 'Disponibilidada'
      arr = [
        [
          'Year'
          'Velocidad'
        ]
        [
          '2013'
          400
        ]
        [
          '2014'
          700
        ]
        [
          '2015'
          200
        ]
        [
          '2016'
          540
        ]
      ]
      graficar 'polo2', arr, 'Velocidad'
      arr = [
        [
          'Year'
          'Calidad'
        ]
        [
          '2013'
          310
        ]
        [
          '2014'
          110
        ]
        [
          '2015'
          90
        ]
        [
          '2016'
          410
        ]
      ]
      graficar 'polo3', arr, 'Calidad'
      return
    return
  fecha1: ''
  fecha2: ''
  linea: ''
  tipo: ''
tableToExcel = do ->
  uri = 'data:application/vnd.ms-excel;base64,'
  template = '<html xmlns:o="urn:schemas-microsoft-com:of  fice:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'

  base64 = (s) ->
    window.btoa unescape(encodeURIComponent(s))

  format = (s, c) ->
    s.replace /{(\w+)}/g, (m, p) ->
      c[p]

  (table, table2, name) ->
    `var ctx2`
    if !table.nodeType
      table = document.getElementById(table)
    if !table2.nodeType
      table2 = document.getElementById(table2)
    if !table2 == null
      alert 'null1'
      ctx2 = 
        worksheet: name or 'Worksheet'
        table: table2.innerHTML + table.innerHTML
    else
      alert 'null'
      ctx2 = 
        worksheet: name or 'Worksheet'
        table: table.innerHTML
    window.location.href = uri + base64(format(template, ctx2))
    return

migrarexel = ->

cargarcontenido = (archivo) ->
  $('#contenido').load 'contenido/' + archivo
  return

popadd = (menu) ->
  $('#popback').fadeIn()
  $(menu).fadeIn()
  false

selection = (mid, id2, id3) ->
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

dureport = ->
  reporte.fecha1 = $('#fecha1').val()
  reporte[reporte.tipo]()
  return

$(document).ready ->

  graficar = (id, datos, titulo) ->

    drawChart = ->
      data = google.visualization.arrayToDataTable(datos)
      options = 
        title: titulo
        legend:
          position: 'top'
          maxLines: 3
        hAxis:
          title: datos[0][0]
          titleTextStyle: color: '#333'
        vAxis: minValue: 0
      chart = new (google.visualization.AreaChart)(document.getElementById(id))
      chart.draw data, options
      return

    google.charts.load 'current', 'packages': [ 'corechart' ]
    google.charts.setOnLoadCallback drawChart
    return

  console.log 'ready!'
  #///// seccion correspondiente a menus emergentes
  $('#contenido').on 'click', '#masLinea1', ->
    $('#eficienciapop').load 'contenido/eficienciamas.html', ->
      arr = [
        [
          'Year'
          'Disponibilidad'
        ]
        [
          '2013'
          1000
        ]
        [
          '2014'
          1170
        ]
        [
          '2015'
          660
        ]
        [
          '2016'
          1030
        ]
      ]
      graficar 'polo', arr, 'Disponibilidada'
      arr = [
        [
          'Year'
          'Velocidad'
        ]
        [
          '2013'
          400
        ]
        [
          '2014'
          460
        ]
        [
          '2015'
          1120
        ]
        [
          '2016'
          540
        ]
      ]
      graficar 'polo2', arr, 'Velocidad'
      arr = [
        [
          'Year'
          'Calidad'
        ]
        [
          '2013'
          210
        ]
        [
          '2014'
          210
        ]
        [
          '2015'
          310
        ]
        [
          '2016'
          410
        ]
      ]
      graficar 'polo3', arr, 'Calidad'
      return
    $('#popback').fadeIn()
    $('#eficienciapop').fadeIn()
    false
  $('#contenido').on 'click', '#masLinea2', ->
    $('#eficienciapop').load 'contenido/eficienciamas.html', ->
      arr = [
        [
          'Year'
          'Disponibilidad'
        ]
        [
          '2013'
          780
        ]
        [
          '2014'
          970
        ]
        [
          '2015'
          560
        ]
        [
          '2016'
          450
        ]
      ]
      graficar 'polo', arr, 'Disponibilidada'
      arr = [
        [
          'Year'
          'Velocidad'
        ]
        [
          '2013'
          400
        ]
        [
          '2014'
          700
        ]
        [
          '2015'
          200
        ]
        [
          '2016'
          540
        ]
      ]
      graficar 'polo2', arr, 'Velocidad'
      arr = [
        [
          'Year'
          'Calidad'
        ]
        [
          '2013'
          310
        ]
        [
          '2014'
          110
        ]
        [
          '2015'
          90
        ]
        [
          '2016'
          410
        ]
      ]
      graficar 'polo3', arr, 'Calidad'
      return
    $('#popback').fadeIn()
    $('#eficienciapop').fadeIn()
    false
  $('#contenido').on 'click', '#masLinea3', ->
    $('#eficienciapop').load 'contenido/eficienciamas.html', ->
      arr = [
        [
          'Year'
          'Disponibilidad'
        ]
        [
          '2013'
          879
        ]
        [
          '2014'
          990
        ]
        [
          '2015'
          210
        ]
        [
          '2016'
          1000
        ]
      ]
      graficar 'polo', arr, 'Disponibilidada'
      arr = [
        [
          'Year'
          'Velocidad'
        ]
        [
          '2013'
          400
        ]
        [
          '2014'
          700
        ]
        [
          '2015'
          200
        ]
        [
          '2016'
          540
        ]
      ]
      graficar 'polo2', arr, 'Velocidad'
      arr = [
        [
          'Year'
          'Calidad'
        ]
        [
          '2013'
          310
        ]
        [
          '2014'
          110
        ]
        [
          '2015'
          90
        ]
        [
          '2016'
          410
        ]
      ]
      graficar 'polo3', arr, 'Calidad'
      return
    $('#popback').fadeIn()
    $('#eficienciapop').fadeIn()
    false
  $('#contenido').on 'click', '#masLinea4', ->
    $('#eficienciapop').load 'contenido/eficienciamas.html', ->
      arr = [
        [
          'Year'
          'Disponibilidad'
        ]
        [
          '2013'
          1000
        ]
        [
          '2014'
          1170
        ]
        [
          '2015'
          660
        ]
        [
          '2016'
          1030
        ]
      ]
      graficar 'polo', arr, 'Disponibilidada'
      arr = [
        [
          'Year'
          'Velocidad'
        ]
        [
          '2013'
          300
        ]
        [
          '2014'
          60
        ]
        [
          '2015'
          700
        ]
        [
          '2016'
          540
        ]
      ]
      graficar 'polo2', arr, 'Velocidad'
      arr = [
        [
          'Year'
          'Calidad'
        ]
        [
          '2013'
          110
        ]
        [
          '2014'
          210
        ]
        [
          '2015'
          310
        ]
        [
          '2016'
          410
        ]
      ]
      graficar 'polo3', arr, 'Calidad'
      return
    $('#popback').fadeIn()
    $('#eficienciapop').fadeIn()
    false
  $('#popback').on 'click', ->
    $('#popback').fadeOut()
    $('#popcreate').fadeOut()
    $('#popmodificar').fadeOut()
    $('#popeliminar').fadeOut()
    $('#popconcluir').fadeOut()
    $('#eficienciapop').fadeOut()
    false
  #document.getElementById(id1)
  return
