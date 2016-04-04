var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/personal-api");

//Export the snippet object so it can be used on other pages
module.exports.Snippet = require("./snippet.js");
module.exports.Profile = require("./profile.js");
