// require express and other modules
// parse incoming urlencoded form data
// var db = require('./models');
var express = require('express'),
    bodyParser = require('body-parser'),
    db = require('./models');

app = express();

// populate the req.body object
app.use(bodyParser.urlencoded({ extended: true }));

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

 app.get('/', function (req, res) {
   res.sendFile('views/index.html' , { root : __dirname});
 });


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/matthewvilhauer/express-personal-api/blob/master/README.md", // The README for this Github repository
    base_url: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
        {method: "GET", path: "/api", description: "Describes all available endpoints"},
        {method: "GET", path: "/api/profile", description: "Where you can learn all about me!"},
        {method: "GET", path: "/api/snippets", description: "Get a list of all my favorite snippets of code from Github"},
        {method: "POST", path: "/api/snippets", description: "Get a list of all my favorite snippets of code from Github"}, // Get all snippets
        {method: "GET", path: "/api/snippets/id", description: "Get a list of all my favorite snippets of code from Github"},  //Get a single snippet
        {method: "PUT", path: "/api/snippets/id", description: "Get a list of all my favorite snippets of code from Github"}, // Update a snippet
        {method: "PUT", path: "/api/snippets/id", description: "Get a list of all my favorite snippets of code from Github"} // Delete a snippet
    ]
  });
});

/*
 * Snippet API Endpoints
 */

 // Get all snippets
 app.get('/api/snippets', function (req, res) {
   // send all snippets as JSON response
   db.Snippet.find(
     function(err, snippets){
     if (err) { return console.log("index error: " + err); }
     res.json(snippets);
   });
 });

 // Create a new snippet
 app.post('/api/snippets', function (req, res) {
   // create new snippet with form data (`req.body`)
   console.log('snippets create', req.body);
   var newSnippet = new db.Snippet(req.body);
   newSnippet.save(function handleDBSnippetSaved(err, savedSnippet) {
     if (err) {
      return console.log(err);
    }
     res.json(savedSnippet);
   });
 });



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
