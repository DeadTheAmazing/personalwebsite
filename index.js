const 
    express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , { Server } = require("socket.io")
  , io = new Server(server)
  , path = require('path')
  , PORT = process.env.PORT || 80
  , pathz = [["/","/view/index.html"],["/articles","/view/article.html"]]
  , articles = [["test","../txt/"]];




app.use(express.static(path.join(__dirname, 'public')));

pathz.forEach(function(element,i){

  app.get(pathz[i][0], (req, res) => {
    res.sendFile(__dirname + pathz[i][1])
  });
});

io.on('connection', (socket) => {
    var address = socket.handshake.address;
    var IPADDR = address.split(":")[3];
    //console.log('[\x1b[96mConnection\x1b[0m] [\x1b[92mNEW\x1b[0m]',IPADDR);

    socket.on('disconnect', () => {
        //console.log('[\x1b[96mConnection\x1b[0m] [\x1b[91mDEAD\x1b[0m]',IPADDR);
    });
  });
server.listen(PORT, () => {
  console.log('[\x1b[1m\x1b[92mStarting\x1b[0m]');
  console.log('[\x1b[1m\x1b[96mListening\x1b[0m]',`http://localhost:\x1b[95m${PORT}\x1b[0m`);
});
