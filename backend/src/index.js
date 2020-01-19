const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const routes = require('./routes');
const {WebSocket} = require('./WebSocket');

mongoose.connect("mongodb+srv://keven:jhonas4313@cluster0-vvpyt.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,   
});

const app = express();
const server = http.Server(app); 
WebSocket(server);

app.use(cors({}));
app.use(express.json());// O express.json é obrigatorio vir antes das rotas... se nao, n ira reconhecer.
app.use(routes);

server.listen(3333);



// métodos HTTP: get, post, put, delete.

// tipos de parametros:
// query params: request.query - (filtros, ordenação, paginação, ...)
// rout pars: request.params (identificar um recurso na alteração ou remoção)
// body: request.body (é utilizado para criar ou alterar re