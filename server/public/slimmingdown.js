
// OK, from this information, should be able to deduce a way to write the toPolar function as a mapping, and compose it with a translation:
size = 30;

var output = {
  dec: star.dec,
  ra: star.ra,
  mag: star.mag,
  name: star.proper,
  absmag: star.absmag,
  con: star.con,
  id: star.id
};

var xCoord = (output.ra * w/24);
var yCoord = h/2 - output.dec * h/180;
var adjMag = parseFloat(output.mag) + 3;
output.xCoord = w - xCoord;
output.yCoord = yCoord;
output.radius = size / adjMag;

// 2 options
var newX = (parseFloat(output.ra) + (12 - 2.5297)) % 24;
// var newX = output.ra;

var realnewx = newX * w/24;

output.newx = w - realnewx;

var theta = newX * 2 * Math.PI / 24;
var rad =  (90 - parseFloat(output.dec));

output.theta = theta;
output.rad = rad;

if (radialView) {
  translate(w/2, h/2);
  ellipse(Math.cos(theta) * rad * radialScale, Math.sin(theta) * rad * radialScale, size / adjMag);
  translate(-w/2, -h/2);
} else {
  ellipse(w - realnewx, yCoord, size / adjMag);
}

var increment = 250;
var numHours = 12;

// Draw coordinate grids:
if (radialView) {
  translate(w/2, h/2);
  noFill();
  stroke('purple');
  ellipse(0, 0, increment, increment);
  ellipse(0, 0, 2 * increment, 2 * increment);
  ellipse(0, 0, 3 * increment, 3 * increment);
  ellipse(0, 0, 4 * increment, 4 * increment);

  for (var i=0; i < numHours; i++) {
    var x = Math.cos(i * Math.PI / (numHours / 2));
    var y = Math.sin(i * Math.PI / (numHours / 2));

    line(0, 0, x * 4 * increment, y * 4 * increment);
  }
  translate(-w/2, -h/2);
} else {
  var wid = w / 12;
  for (var j=0; j < 12; j++) {
    stroke('purple');
    line(j * wid, 0, j * wid, h);
  }
  var heig = h / 4;
  for (var k=0; k < 4; k++) {
    line(0, heig * k, w, heig * k);
  }
}

function mouseClicked() {
  stars.forEach(function(star) {
    if (radialView) {
      // Hmm, not sure why this isn't working:
      if (dist(mouseX, mouseY, Math.cos(star.theta) * star.rad * radialScale, Math.sin(star.theta) * star.rad * radialScale) < star.radius) {
        console.log(star);
      }
    } else {
      if (dist(mouseX, mouseY, star.xCoord, star.yCoord) < star.radius/1.5) {
        console.log(star);
      }
    }
  });
}

function drawLines(constellation) {
  constellation.connections.forEach(function(con) {
    var start = constellation.filter(function(star) {
      if (!nums.includes(con.start[1])) {
        return star.name == con.start;
      } else {
        return star.id == con.start;
      }
    });
    var end = constellation.filter(function(star) {
      if (!nums.includes(con.end[1])) {
        return star.name == con.end;
      } else {
        return star.id == con.end;
      }
    });
    var start1 = start[0];
    var end1 = end[0];
    stroke(20, 20, 220);

    if (radialView) {
      // Converting to polar coordinates:
      translate(w/2, h/2);
      line(Math.cos(start1.theta) * start1.rad * radialScale, Math.sin(start1.theta) * start1.rad * radialScale, Math.cos(end1.theta) * end1.rad * radialScale, Math.sin(end1.theta) * end1.rad * radialScale);
      translate(-w/2, -h/2);
    } else {

      // Solving the border-to-border problem:
      if (dist(start1.newx, start1.yCoord, end1.newx, end1.yCoord) < 200) {
        line(start1.newx, start1.yCoord, end1.newx, end1.yCoord);
      }
    }

  });
}
