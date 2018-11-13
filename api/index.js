const restify = require('restify');
const errs = require('restify-errors');

const jwt = require('jsonwebtoken')
var jwtsimple = require('jwt-simple');


const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'myapp'
    }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});


//Rotas


server.get('/', (req, res, next) => {

    knex('rest').then((dados) => {
        res.send(dados);
    }, next)

});

server.post('/create', (req, res, next) => {
    knex('rest')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)
});


server.post('/register', (req, res, next) => {
    var token = jwt.sign({ senha: req.body.senha }, 'ewqewqewq');
    req.body.senha = token
    knex('rest')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)
});



server.get('/nome/:id', (req, res, next) => {

    const { id } = req.params;

    knex('rest')
        .where('idrest', id)
        .first()
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send(dados);
        }, next)

});


server.get('/login/:nome/:senha', (req, res, next) => {

    const { id } = req.params;

    knex('rest')
        .where('idrest', id)
        .first()
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send(dados);
        }, next)

});


server.put('/update/:id', (req, res, next) => {

    const { id } = req.params;

    knex('rest')
        .where('idrest', id)
        .update(req.body)
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados atualizados');
        }, next)

});

server.del('/delete/:id', (req, res, next) => {

    const { id } = req.params;

    knex('rest')
        .where('idrest', id)
        .delete()
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados excluidos');
        }, next)

});
