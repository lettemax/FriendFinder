// Dependencies
var express = require("express");
var mysql = require("mysql");

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "seinfeld"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Routes
app.get("/cast", function(req, res) {

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query("SELECT * FROM characters", function(err, result) {
    if (err) throw err;

    var html = buildCharacterList(result);

    // Finally we send the user the HTML file we dynamically created.
    res.send(html);
  });
});

app.get("/coolness-chart", function(req, res) {

    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."
    connection.query("SELECT * FROM characters ORDER BY coolness_points DESC;", function(err, result) {
      if (err) throw err;

      var html = buildCharacterList(result);

      // Finally we send the user the HTML file we dynamically created.
      res.send(html);
    });
  });

  app.get("/attitude-chart/:att", function(req, res) {
    var att = req.params.att;
    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."
    connection.query("SELECT * FROM characters WHERE ?", {attitude: att}, function(err, result) {
      if (err) throw err;
  
      var html = buildCharacterList(result);
  
      // Finally we send the user the HTML file we dynamically created.
      res.send(html);
    });
  });

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
