const { Router } = require('express');
const routes = Router();
const DevController = require("./controllers/DevControllers");
const SearchController = require('./controllers/searchCOntrollers');

routes.post('/devs',DevController.storeBD);
routes.get('/devs',DevController.index);

routes.get('/search',SearchController.index);
module.exports = routes;