const router = require('express').Router();
const path = require('path');

module.exports = router.all('*', function (req, res) {
    console.log(`Catching route for ${req.url}`);
    res.sendFile(path.join(__dirname, '../../dist/movies/index.html'));
});