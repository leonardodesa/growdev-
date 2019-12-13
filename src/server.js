const express = require('express');
const routes = require('./routes');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const server = express();

mongoose.connect(process.env.MONGO_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
  )
  .then(() => console.log('DB Connected!'))
  .catch( e => {
    console.log(`Db connection Erro: ${e.message}`);
  });
  
server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT);