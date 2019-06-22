var express = require("express");
//create app to use express
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
// if no port default will be set to 8080
var PORT = process.env.PORT || 8080;

//bringing in express-handlears
var exphbs = require("express-handlebars");
//setting defsult layout from main will replace each page with iputer data on views pages
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebarss");

//object for animal containing 3 properties
var animals = [
  {
    animalType: "dog",
    pet: true,
    fierceness: 4
  },
  {
    animalType: "cat",
    pet: true,
    fierceness: 10
  },
  {
    animalType: "giraffe",
    pet: false,
    fierceness: 4
  },
  {
    animalType: "zebra",
    pet: false,
    fierceness: 8
  },
  {
    animalType: "lion",
    pet: false,
    fierceness: 10
  }
];

//when /dog render animals array
app.get("/dog", function(req, res) {
  // Handlebars requires an object to be sent to the dog.handlebars file. Lucky for us, animals[0] is an object!

  // 1. Send the dog object from the animals array to the dog.handlebars file.
  console.log(animals[0]);
  //send to dog and send in animal[0]
  res.render("dog", animals[0]);
});

//all-pets push object of allPets, and render in index.handlebars
app.get("/all-pets", function(req, res) {
  // Handlebars requires an object to be sent to the index.handlebars file.
  // 2. Send the animals to the index.handlebars file. Remember that animals is an array and not an object.
  var allPets = [];
  for (var i = 0; i < animals.length; i++) {
    if (animals[i].pet === true) {
      console.log(animals[i]);
      allPets.push(animals[i]);
    }
  }
  res.render("index", { pets: allPets });
});
//same as previous except object will display nonpets
app.get("/all-non-pets", function(req, res) {
  // Handlebars requires an object to be sent to the index.handlebars file.
  // 3. Send all the animals that are not pets to the index.handlebars file.
  var nonPets = [];
  for (i = 0; i < animals.length; i++) {
    if (animals[i].pet === false) {
      console.log(animals[i]);
      nonPets.push(animals[i]);
    }
  }
  res.render("index", { pets: nonPets });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
