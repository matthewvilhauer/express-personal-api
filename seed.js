// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
var db = require('./models');

var snippets_list = [
  {
  name: "To Kill a Mockingbird",
  language: "javascript",
  code: "here is some javascript code",
  author: "codingwizard"
  },
  {
  name: "The Great Gatsby",
  language: "html",
  code: "here is some html code",
  author: "matthewvilhauer"
  },
  {
  name: "Les Miserables",
  language: "javascript",
  code: "here is some javascript code",
  author: "angelocisneros"
  }
];

db.Snippet.remove({}, function(err, snippets){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all snippets');

    // create new records based on the array books_list
    db.Snippet.create(snippets_list, function(err, snippets){
      if (err) { return console.log('err', err); }
      console.log("created", snippets.length, "snippets");
      process.exit();
    });
  }
});
