const router = require('express').Router();
const { movieController, reviewController } = require('../controllers');


module.exports = router
    .get('/', movieController.index)
    .post('/', movieController.create)
    .get('/:movie_id', movieController.show)
    .delete('/:movie_id', movieController.destroy)
    .put('/:movie_id', movieController.update)

    .get('/review/:movie_id', reviewController.index)
    .post('/review/:movie_id', reviewController.create)
    .delete('/review/:review_id', reviewController.destroy)
    .put('/review/:review_id', reviewController.update)