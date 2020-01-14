import { Router } from 'express';

import UserController from './app/controllers/UserController';
import CardController from './app/controllers/CardController';

import checkCard from './app/middlewares/checkCard';

const routes = Router();

routes.post('/cadastro-users', UserController.store);

routes.get('/cards', CardController.index);
routes.get('/cards/:id', CardController.show);
routes.post('/cadastro-cards', CardController.store);
routes.put('/update-cards/:id', checkCard, CardController.update);
routes.delete('/delete-cards/:id', checkCard, CardController.delete);

export default routes;
