var fs = require('fs');
  // 1
  var app = require('http').createServer(function(req, res) {
     console.log("Websocket server is listening...")
      fs.readFile('client.html', function(err, data) {
          if(err) {
              res.writeHead(500);
              return res.end('Error reading default index.');
          } else {
              res.writeHead(200);
              res.end(data);
          }
      });
  });
  // 2
  var io = require('socket.io').listen(app);
  io.sockets.on('connection', function(socket) {
      // 3
      socket.on('echopost', function(data) {
          // 4
          console.log("Get data");
          var date = new Date();
          socket.emit('echoback', '['+date+'] '+data);
      });
  });
  
app.listen(8080);
