
var stars = [];
var w = 1000;
var h = 600;

function setup() {

  createCanvas(w, h);
  background(200);


  d3.csv('hygdata_v3.csv', function(data) {
    // console.log(data);
    data.forEach(function(star) {
      var output = {
        dec: star.dec,
        ra: star.ra,
        mag: star.mag,
        name: star.proper
      };
      // huh, only 150 have names!
      // if (star.proper) {
      //   stars.push(output);
      // }

      // only 1600 less than 5:
      // only 500 less than 4:
      // and only 5 less than 0!
      if (parseFloat(output.mag) < 4 && output.name != 'Sol') {
        stars.push(output);
        // console.log(output.ra, output.dec);
        var xCoord = output.ra * w/24;
        var yCoord = h/2 - output.dec * h/180;
        var adjMag = parseFloat(output.mag) + 2.5;
        stroke(200);
        if (output.name) {
          fill(100);
          // fiddling with this suggests that we're backwards left-right wise:
          if (output.name == 'Deneb') {
            fill(0);
          }
        } else {
          fill(255);
        }
        ellipse(w - xCoord, yCoord, 25 / adjMag);
        console.log(output);
      }
    });
    // console.log(stars);
  });



}

// Don't forget, you need a local server to use this (because of CORS...?):
