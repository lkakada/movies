const Movie = require('mongoose').model('Movie');
const { Http } = require('@status/codes');
const Review = require('mongoose').model('Review');

module.exports = {
    index(_req, res) {
        Movie.find({})
            .then(movies => res.json(movies))
            .catch(error => res.status(Http.InternalServerError).json(error))
    },
    create(req, res) {
        Movie.create(req.body)
            .then(movie => res.json(movie))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    },
    show(req, res) {
        const { movie_id } = req.params;
        Movie.findById(movie_id)
            .then(movie => res.json(movie))
            .catch(error => res.status(Http.InternalServerError).json(error))
    },

    destroy(req, res) {
        const { movie_id } = req.params;
        Movie.findByIdAndRemove(movie_id)
            .then(removedMovie => res.json(removedMovie))
            .catch(error => res.status(Http.ResetContent).json(error))
    },
    update(req, res) {
        const { movie_id } = req.params;
        Movie.findByIdAndUpdate(movie_id, req.body, { new: true })
            .then(updatedMovie => res.json(updatedMovie))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    }
}