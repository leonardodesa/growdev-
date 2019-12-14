import express from 'express'
const routes = express.Router()

import AuthController from './controllers/AuthController'
import CardController from './controllers/CardController'
import AuthenticController from './controllers/AuthenticController'

import auth from './middlewares/auth'

// routes.get('/cards', CardController.index)
// routes.post('/cards', CardController.store)
routes.put('/cards/:id/edit', CardController.update)
routes.delete('/cards/:id/delete', CardController.destroy)

// routes.post('/user/create', UserController.store);
// routes.get('/users', UserController.index);

// Autenticação
routes.post('/auth/register', AuthController.store)
routes.post('/auth/authenticate', AuthController.authenticate)

routes.use(auth.index)
routes.get('/mural', AuthenticController.index)

export default routes
