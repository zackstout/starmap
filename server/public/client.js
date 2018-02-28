
var namedStars = [];
var w = 1000;
var h = 600;
// very odd we have to initialize this locally, but w and h are ok as globals...:
var size;
var stars = [];
var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

var ursaMajor = [];

function setup() {
  size = 30;

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
        con: star.con,
        id: star.id
      };

      // only 1600 less than 5:
      // only 500 less than 4:
      // and only 5 less than 0!
      if (parseFloat(output.mag) < 4.3 && output.name != 'Sol') {

        // console.log(output.ra, output.dec);
        var xCoord = output.ra * w/24;
        var yCoord = h/2 - output.dec * h/180;
        var adjMag = parseFloat(output.mag) + 3;
        output.xCoord = w - xCoord;
        output.yCoord = yCoord;
        output.radius = size / adjMag;

        stars.push(output);

        if (output.con == 'UMa') {
          ursaMajor.push(output);
        }

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
    }); // end FOREACH

    console.log(ursaMajor);
    ursaMajor.connections = [
      {start: 'Alkaid', end: 'Mizar'},
      {start: 'Mizar', end: 'Alioth'},
      {start: 'Alioth', end: 'Megrez'},
      {start: 'Megrez', end: 'Phad'},
      {start: 'Megrez', end: 'Dubhe'},
      {start: 'Dubhe', end: 'Merak'},
      {start: 'Phad', end: 'Merak'},
      {start: 'Dubhe', end: '46600'},
      {start: 'Merak', end: '48182'},
      {start: '46600', end: '41586'},
      {start: '46600', end: '48182'},
      {start: '41586', end: '48182'},

      {start: 'Phad', end: '57226'},
      {start: '57226', end: '55055'},
      {start: '57226', end: '54380'},
      {start: '54380', end: '50655'},
      {start: '50655', end: '50230'},

      {start: '48182', end: '46720'},
      {start: '46720', end: '44343'},
      {start: '44343', end: '44000'},


    ];

    ursaMajor.connections.forEach(function(con) {
      var start = ursaMajor.filter(function(star) {
        if (!nums.includes(con.start[1])) {
          return star.name == con.start;
        } else {
          return star.id == con.start;
        }
      });
      var end = ursaMajor.filter(function(star) {
        if (!nums.includes(con.end[1])) {
          return star.name == con.end;
        } else {
          return star.id == con.end;
        }
      });
      var start1 = start[0];
      var end1 = end[0];
      // console.log(start1, end1);
      stroke(20, 20, 220);
      line(start1.xCoord, start1.yCoord, end1.xCoord, end1.yCoord);
    });


    // console.log(stars);
  });

} // end SETUP


// Added this to help deal with click/drag box for zooming, but ....let's not use it for now:
function draw() {
  // background(200);
  // noStroke();
  //
  // stars.forEach(function(star) {
  //   if (star.name) {
  //     fill(100);
  //   } else {
  //     fill(255);
  //   }
  //   ellipse(star.xCoord, star.yCoord, star.radius);
  //
  // });
}

var upperleft;
var lowerright;

function mouseClicked() {
  // console.log(mouseX, mouseY);
  stars.forEach(function(star) {
    if (dist(mouseX, mouseY, star.xCoord, star.yCoord) < star.radius/1.5) {
      console.log(star);
    }
  });
}

function mousePressed() {
  console.log(mouseX, mouseY);
  upperleft = {x: mouseX, y: mouseY};
}

function mouseDragged() {
  // noFi npll();
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
