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

var my_profile = [
  {
    name: "Matthew Vilhauer",
    github_link: "https://github.com/matthewvilhauer",
    github_profile_image: "https://avatars2.githubusercontent.com/u/7053428?v=3&s=460",
    current_city: "San Francisco",
    pets: [
      {
        name: "Chester",
        type: "cat"
      },
      {
        name: "Nelly",
        type: "cat"
      },
      {
        name: "Jack",
        type: "cat"
      }
    ]
  }
];

var snippets_list = [
  {
  name: "Recursive example",
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


db.Profile.remove({}, function(err, profiles){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all profiles');

    // create new records based on the array books_list
    db.Profile.create(my_profile, function(err, profiles){
      if (err) {
        return console.log('err', err);
      }
      console.log("created my profile");
      process.exit();
      });
  }
});
