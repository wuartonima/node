socket=io()
socket.on 'messages', (data) ->
  console.log data
  return

