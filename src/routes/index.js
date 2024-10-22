const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/goats', require('./goats'));
routes.use('/pigs', require('./pigs'));

module.exports = routes;