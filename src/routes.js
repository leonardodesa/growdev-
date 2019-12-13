const express = require("express");

const routes = express.Router();

const CardController = require("./controllers/CardController");
const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");

routes.get('/cards', CardController.index);
routes.post('/cards', CardController.store);
routes.put('/cards/:id/edit', CardController.update);
routes.delete("/cards/:id/delete", CardController.destroy);

// routes.post('/user/create', UserController.store);
// routes.get('/users', UserController.index);

// Autenticação
routes.post('/auth/register', AuthController.store);

module.exports = routes;