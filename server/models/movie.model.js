const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required.'],
        minlength: [3, 'Name must be at least three characters long. ']
    },
    star: {
        type: Number,
        default: 1,
        min: [1, 'Rating must be between 1 to 5 stars'],
        max: [5, 'Rating must be between 1 to 5 stars']
    },
    content: {
        type: String,
        trim: true,
        required: [true, 'Review is required.'],
        minlength: [3, 'Review must be at least three characters long']
    }
}, { timestamps: true })

const MovieSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Movie title is required.'],
        minlength: [3, 'Movie title must be at least three characters long. ']
    },
    reviews: [ReviewSchema]

}, { timestamps: true });


module.exports = mongoose.model('Movie', MovieSchema);
module.exports = mongoose.model('Review', ReviewSchema);