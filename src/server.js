const express = require('express');
const routes = require('./routes');
const mongoose = require("mongoose");
const env = require('dotenv').config();

const server = express();

mongoose.connect(env.MONGO_URL,
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

server.listen(env.PORT);