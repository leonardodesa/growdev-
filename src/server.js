const express = require('express');
const routes = require('./routes');
const mongoose = require("mongoose");
require('dotenv').config();

const server = express();

mongoose.connect(process.env.MONGO_URL,
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

server.listen(process.env.PORT);