import { Router } from 'express';

import UserController from './app/controllers/UserController';
import CardController from './app/controllers/CardController';
import AuthController from './app/controllers/AuthController';

import checkCard from './app/middlewares/checkCard';
import authUser from './app/middlewares/auth';

const routes = Router();

routes.post('/register', UserController.store);
routes.post('/login', AuthController.store);

routes.use(authUser);

routes.get('/cards', CardController.index);
routes.get('/cards/:id', CardController.show);
routes.post('/cadastro-cards', CardController.store);
routes.put('/update-cards/:id', checkCard, CardController.update);
routes.delete('/delete-cards/:id', checkCard, CardController.delete);

export default routes;
