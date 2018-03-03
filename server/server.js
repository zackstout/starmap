
var express = require('express');
var app = express();
var port = process.env.PORT || 5050;
var bodyParser = require('body-parser');
var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

var allStars = [];

var pg = require('pg');
var config = {
  database: 'stars-again', // the name of the database
  host: 'localhost', // where is your database?
  port: 5432, // the port number for you database, 5432 is the default
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // Close idle connections to db after
};

var pool = new pg.Pool(config);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


app.get('/connections', function(req, res) {

});

app.get('/stardata', function(req, res) {

});

















app.post('/connections', function(req, res) {
  // console.log(req.body);
  // res.sendStatus(201);
  // if (nums.includes(req.body.start[1])) {
  //   req.body.start = parseInt(req.body.start);
  // }
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      var queryText = 'INSERT INTO "connections" ("starting", "ending") VALUES ($1, $2);';
      db.query(queryText, [req.body.start, req.body.end], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          // console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);

        } else {
          // Send back success!
          res.sendStatus(201);

        }
      }); // END QUERY
    }
  }); // END POOL
});

app.post('/stars', function(req, res) {
  // console.log(req.body);
  // res.send(starsArray);
  saveStar(req.body);
  res.sendStatus(201);
});

app.get('/stars', function(req, res) {
  res.send(allStars);
});

app.post('/data', function(req, res) {
  console.log(req.body.stuff);
  var arr = req.body.stuff;
  arr.forEach(function(conn) {
    var id = conn.id;
    var name = conn.name;
    var constellation = conn.con;
    // doing it the ugly way to see if it works and save time:
    pool.connect(function (errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        // There was an error and no connection was made
        console.log('Error connecting', errorConnectingToDb);
        res.sendStatus(500);
      } else {
        // We connected to the db!!!!! pool -1
        // console.log(star, "HI THERE");
        var queryText = 'INSERT INTO "' + constellation + '" ("") VALUES($1, $2);';
        db.query(queryText, [id, name], function (errorMakingQuery, result) {
          // We have received an error or result at this point
          done(); // pool +1
          if (errorMakingQuery) {
            // console.log('Error making query', errorMakingQuery);
            res.sendStatus(500);

          } else {
            // Send back success!
            res.sendStatus(201);

          }
        }); // END QUERY
      }
    }); // END POOL
  });

});

app.post('/con', function(req, res) {
  console.log(req.body.name);
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      // console.log(star, "HI THERE");
      var queryText = 'CREATE TABLE "' + req.body.name + '"(id serial PRIMARY KEY, start_pt varchar(40), end_pt varchar(40));';
      db.query(queryText, [], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          // console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);

        } else {
          // Send back success!
          res.sendStatus(201);

        }
      }); // END QUERY
    }
  }); // END POOL
});

function saveConstellation(con) {
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
    } else {
      // var queryText;
      // while (con.length > 0) {
      //
      // }
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

// Nice, we get some more mileage out of this gem:
// select *
// from
// (
// select
//     *,
//     row_number() over (partition by constellation) as RowNbr
//
// from stars
// ) source
//
// where RowNbr = 1;


// Start listening for requests on a specific port
app.listen(port, function() {
  console.log('thx for listening on channel ', port);
});
