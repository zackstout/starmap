
var express = require('express');
var app = express();
var port = process.env.PORT || 5050;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var pg = require('pg');
var config = {
  database: 'stars-again', // the name of the database
  host: 'localhost', // where is your database?
  port: 5432, // the port number for you database, 5432 is the default
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // Close idle connections to db after
};

var pool = new pg.Pool(config);

app.use(express.static('server/public'));

app.post('/stars', function(req, res) {
  // console.log(req.body);
  // res.send(starsArray);
  saveStar(req.body);
  res.sendStatus(201);
});

function saveStar(star) {
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
    } else {
      // We connected to the db!!!!! pool -1
      // console.log(star, "HI THERE");
      var queryText = 'INSERT INTO "stars" ("star_id", "star_name", "vismag", "absmag", "distance", "ra", "dec", "spec", "ci", "constellation", "lum") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);';
      db.query(queryText, [star.star_id, star.star_name, star.visMag, star.absMag, star.distance, star.ra, star.dec, star.spec, star.ci, star.constellation, star.lum], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
        } else {
          // Send back success!

        }
      }); // END QUERY
    }
  }); // END POOL
}




// Start listening for requests on a specific port
app.listen(port, function() {
  console.log('thx for listening on channel ', port);
});
