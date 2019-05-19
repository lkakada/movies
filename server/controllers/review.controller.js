const Movie = require('mongoose').model('Movie');
const Review = require('mongoose').model('Review');
const { Http } = require('@status/codes');

module.exports = {
    index(req, res) {
        const { movie_id } = req.params;
        Movie.findById(movie_id)
            .then(reviews => res.json(reviews))
            .catch(error => res.status(Http.InternalServerError).json(error))
    },
    create(req, res) {
        const { movie_id: movieId } = req.params;
        Review.create(req.body)
            .then(review => {
                Movie.findByIdAndUpdate(movieId, { $push: { reviews: review } }, { runValidators: true })
                    .then(movie => res.json(movie))
                    .catch(error => {
                        console.log(error.errors)
                        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                        res.status(Http.UnprocessableEntity).json(errors);
                    })
            })
            .catch(error => {
                console.log(error.errors)
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    },

    destroy(req, res) {
        const { review_id } = req.params;
        Movie.update({}, { $pull: { reviews: { _id: review_id } } })
            .then(movie => res.json(movie))
            .catch(error => res.status(Http.InternalServerError).json(error))
    },

    update(req, res) {
        const { review_id } = req.params;
        Review.findByIdAndUpdate(review_id, req.body, { new: true })
            .then(updatedReview => res.json(updatedReview))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    }

}