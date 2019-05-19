const catchAllRouter = require('./catch-all.routes');

const router = require('express').Router();
const api = require('express').Router();

const movieRouter = require('./movie.route');
router.use('/movie', movieRouter);

module.exports = api.use('/api', router).use(catchAllRouter);