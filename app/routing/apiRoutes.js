// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friends = require("./data/friends.js");

// Create express app instance.
var app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Routes
app.get("/api/friends", function(req, res) {
    // Return json of all friends in friends.js.
    res.send(friends.friends);
});

app.post("/api/friends", function(req, res) {
    //
    console.log(req.params);

    // Add friend to friends array 
    // friends.friends.push()

})

function buildCharacterList(result) {
    // We then begin building out HTML elements for the page.
    var html = "<h1> Seinfeld Characters </h1>";
  
    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (var i = 0; i < result.length; i++) {
      html += "<li><p> Name: " + result[i].name + "</p>";
      html += "<p>Coolness points: " + result[i].coolness_points + " </p></li>";
      html += "<p>Attitude: " + result[i].attitude + " </p></li>";
    }

    // We close our unordered list.
    html += "</ul>";
    return html;
}

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
