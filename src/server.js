import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
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