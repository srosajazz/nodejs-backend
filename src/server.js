const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  })

});

mongoose.connect('mongodb+srv://serge:serge@cluster0-tgr6q.mongodb.net/serge?retryWrites=true', {
  useNewUrlParser: true
});


app.use((req, res, next) => {
  req.io = io;

  return next();
});


app.use(express.json()); //registra utilizacao de json
app.use(express.urlencoded({ // autoriza o envio de arquivos
  extended: true
}));
app.use(require("./routes")); //importa nossas rotas
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

server.listen(process.env.PORT || 3333);