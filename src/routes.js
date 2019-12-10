const express = require("express");

const routes = express.Router();

const CardController = require("./controllers/CardController");

routes.get('/', CardController.index);
routes.post('/cards', CardController.store);
routes.put('/cards/:id/edit', CardController.update);
routes.delete("/cards/:id/delete", CardController.destroy);

routes.post("/user/create", UserController.store);
routes.get("/user/create", UserController.index);

module.exports = routes;