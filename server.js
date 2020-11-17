let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let api_routes = require('./routes/api.js');

// create a new web app
let app = express();

// tell the app to serve static files in the dist directory
app.use(express.static(path.join(__dirname, 'student-sign-in-client', 'dist')));

app.use(bodyParser.json());     // tell the app to use the body-parser library

app.use('/api', api_routes);    // start all the api routes with /api

app.use(function(req, res, next) {
    res.status(404).send('Not found')
})

app.use(function(req, res, next) {
    console.error(err.stack)
    res.status(500).send('Server error')
})

// Start server running
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})

