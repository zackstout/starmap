
var namedStars = [];
var w = 1000;
var h = 600;
// very odd we have to initialize this locally, but w and h are ok as globals...:
var size;
var stars = [];

function setup() {
  size = 35;

  createCanvas(w, h);
  background(200);


  d3.csv('hygdata_v3.csv', function(data) {
    console.log(data);
    data.forEach(function(star) {

      // huh, only 150 have names!
      // if (star.proper) {
      //   stars.push(output);
      // }
      var output = {
        dec: star.dec,
        ra: star.ra,
        mag: star.mag,
        name: star.proper,
        absmag: star.absmag,
        con: star.con
      };

      // only 1600 less than 5:
      // only 500 less than 4:
      // and only 5 less than 0!
      if (parseFloat(output.mag) < 4.6 && output.name != 'Sol') {

        // console.log(output.ra, output.dec);
        var xCoord = output.ra * w/24;
        var yCoord = h/2 - output.dec * h/180;
        var adjMag = parseFloat(output.mag) + 3;
        output.xCoord = w - xCoord;
        output.yCoord = yCoord;
        output.radius = size / adjMag;

        stars.push(output);

        noStroke();
        if (output.name) {
          fill(100);
          namedStars.push(output);
          // fiddling with this suggests that we're backwards left-right wise:
          // if (output.name == 'Sadr') {
          //   noFill();
          //   stroke(255, 0, 0);
          //   ellipse(w - xCoord, yCoord, 120);
          //   fill(100);
          //   stroke(200);
          // }

          // Shoot, only named stars have constellation listed:
          // if (output.con == 'Cyg') {
          //   console.log(output);
          // }
          // console.log(output.con);

          // Color most luminous stars blue:
          // if (parseFloat(output.absmag) < 0) {
          //   fill(20, 20, 220);
          // }
        } else {
          fill(255);
        }
        ellipse(w - xCoord, yCoord, size / adjMag);
        // console.log(output);
      }
    });
    // console.log(stars);
  });

} // end setup

function draw() {
  background(200);
  noStroke();

  stars.forEach(function(star) {
    if (star.name) {
      fill(100);
    } else {
      fill(255);
    }
    ellipse(star.xCoord, star.yCoord, star.radius);

  });
}

var upperleft;
var lowerright;

function mouseClicked() {
  // console.log(mouseX, mouseY);
  namedStars.forEach(function(star) {
    if (dist(mouseX, mouseY, star.xCoord, star.yCoord) < star.radius/2) {
      console.log(star);
    }
  });
}

function mousePressed() {
  console.log(mouseX, mouseY);
  upperleft = {x: mouseX, y: mouseY};
}

function mouseDragged() {
  // noFill();
  stroke(20, 20, 240);
  strokeWeight(3);
  rect(upperleft.x, upperleft.y, mouseX - upperleft.x, mouseY - upperleft.y);
}

function mouseReleased() {
  console.log(mouseX, mouseY);
  lowerright = {x: mouseX, y: mouseY};
}

// function doubleClicked() {
//   console.log('doublin');
// }

// Don't forget, you need a local server to use this (because of CORS...?):
