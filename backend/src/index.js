const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require('./routes');


mongoose.connect("mongodb+srv://keven:jhonas4313@cluster0-vvpyt.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,   
});

const app = express();

app.use(cors({}));
app.use(express.json());// O express.json é obrigatorio vir antes das rotas... se nao, n ira reconhecer.
app.use(routes);

app.listen(3333);



// métodos HTTP: get, post, put, delete.

// tipos de parametros:
// query params: request.query - (filtros, ordenação, paginação, ...)
// rout pars: request.params (identificar um recurso na alteração ou remoção)
// body: request.body (é utilizado para criar ou alterar re