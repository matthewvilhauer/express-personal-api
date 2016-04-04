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

// Home page
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
 });

// Go to Profile page
app.get('/profile', function (req, res) {
  res.sendFile('views/profile.html' , { root : __dirname});
 });

// Go to single snippet page
app.get('/snippets/:id', function (req, res) {
  db.Snippet.findById(req.params.id, function(err, snippet) {
    if (err) {
      return console.log("show error: " + err);
    }
    res.json(snippet);
  });
});

// // Go to the random Github snippet page
// app.get('/snippets/random', function (req, res) {
//   res.sendFile('views/random.html' , { root : __dirname});
// });

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
        {method: "GET", path: "/api/profile", description: "Get all of my profile data for yourself"},
        {method: "GET", path: "/api/snippets", description: "Get a list of all my favorite snippets of code from Github"},
        {method: "POST", path: "/api/snippets", description: "Get a list of all my favorite snippets of code from Github"}, // Get all snippets
        {method: "GET", path: "/api/snippets/id", description: "Get a list of all my favorite snippets of code from Github"},  //Get a single snippet
        {method: "PUT", path: "/api/snippets/id", description: "Get a list of all my favorite snippets of code from Github"}, // Update a snippet
        {method: "DELETE", path: "/api/snippets/id", description: "Delete a list of all my favorite snippets of code from Github"} // Delete a snippet
    ]
  });
});

/*
 * Profile API Endpoints
 */

app.get('/api/profile', function (req, res) {
   // send all snippets as JSON response
   db.Profile.find(
     function(err, profile_fields){
     if (err) { return console.log("index error: " + err); }
     res.json(profile_fields);
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


// Get one snippet
app.get('/api/snippets/:id', function (req, res) {
  // find one snippet by its id
  db.Snippet.findById(req.params.id, function(err, snippet) {
    if (err) {
      return console.log("show error: " + err);
    }
    res.json(snippet);
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

 // delete snippet
 app.delete('/api/snippets/:id', function (req, res) {
   // get snippet id from url params (`req.params`)
   console.log(req.params);
   var snippetId = req.params.id;

   db.Snippet.findOneAndRemove({ _id: snippetId }, function (err, deletedSnippet) {
     res.json(deletedSnippet);
   });
 });




/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
