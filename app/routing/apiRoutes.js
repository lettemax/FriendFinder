// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsFile = require("../data/friends.js");
var friends = friendsFile.friends;

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    // Routes
    app.get("/api/friends", function(req, res) {
        // Return json of all friends in friends.js.
        res.json(friends);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
        //
        console.log(req.body); 
        // create var to store current user
        var user = req.body;
        // create var to store most compatible friend
        var mostCompatible = {
            name: "",
            photo: "",
            diff: 100
        }

        // log first friend to ensure we've gotten friends array
        console.log(friends[0]);

        // loop through the two persons' scores, sum the differences
        for (i=0; i<friends.length; i++) {
            // let friend be the friend at i in the friends array
            var friend = friends[i];
            // let score keep track of difference between friends' answers
            var score = 0;
            // loop through each answer pair
            for (j=0; j<10; j++) {
                // add each difference to the score
                score += Math.abs(friend.scores[i]-user.scores[i]);
            }
            // if this friend is more compatible than incumbent,
            if (score < mostCompatible.diff) {
                // set mostCompatible's values to this friend's values 
                mostCompatible.name = friend.name;
                mostCompatible.photo = friend.photo;
                mostCompatible.diff = score;
            }
        }
        // Add friend to friends array 
        friends.push(mostCompatible)

        // return mostCompatible friend
        res.json(mostCompatible);
    });
}