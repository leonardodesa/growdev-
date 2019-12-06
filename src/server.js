const express = require('express');
const routes = require('./routes');
const mongoose = require("mongoose");

const server = express();

mongoose.connect("mongodb+srv://leonardodesa:leo12345@cluster0-hunu5.mongodb.net/test?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
)
.then(() => console.log('DB Connected!'))
.catch( err => {
    console.log(`Db connection Erro: ${err.message}`);
});

server.use(express.json());
server.use(routes);

server.listen(3333);