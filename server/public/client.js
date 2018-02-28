
var namedStars = [];
var w = 1000;
var h = 600;
// very odd we have to initialize this locally, but w and h are ok as globals...:
var size;
var stars = [];
var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

var ursaMajor = [];
var coronaBor = [];
var cygnus = [];
var bootes = [];
var aquila = [];
var lyra = [];
var serpent = [];
var ophiuchus = [];


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
        if (output.con == 'CrB') {
          coronaBor.push(output);
        }
        if (output.con == 'Boo') {
          bootes.push(output);
        }
        if (output.con == 'Cyg') {
          cygnus.push(output);
        }
        if (output.con == 'Lyr') {
          lyra.push(output);
        }
        if (output.con == 'Aql') {
          aquila.push(output);
        }
        if (output.con == 'Ser') {
          serpent.push(output);
        }
        if (output.con == 'Oph') {
          ophiuchus.push(output);
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

        if (output.con == 'Leo') {
          fill(20, 20, 220);
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
    coronaBor.connections = [
      {start: '77923', end: '76716'},
      {start: '76716', end: 'Alphekka'},
      {start: 'Alphekka', end: '75466'},
      {start: '75466', end: '75895'},
    ];
    cygnus.connections = [
      {start: 'Deneb', end: 'Sadr'},
      {start: 'Sadr', end: '96858'},
      {start: 'Sadr', end: '97799'},
      {start: 'Sadr', end: 'Gienah'},
      {start: '96858', end: '95554'},
      {start: '97799', end: 'Albireo'},
      {start: 'Gienah', end: '104394'},
    ];
    bootes.connections = [
      {start: 'Arcturus', end: '70828'},
      {start: 'Arcturus', end: '71569'},
      {start: '70828', end: '71879'},
      {start: '70828', end: '70851'},
      {start: '71569', end: '71879'},
      {start: '71879', end: '74438'},
      {start: '74438', end: '73327'},
      {start: '73327', end: '70851'},
      {start: '70851', end: '69510'},
      {start: '69510', end: '70274'},
      {start: '69510', end: '67711'},
      {start: '67711', end: '67246'},
    ];
    aquila.connections = [
      {start: 'Altair', end: 'Tarazed'},
      {start: 'Altair', end: 'Alshain'},
      {start: 'Altair', end: '95207'},
      {start: '95207', end: '93452'},
      {start: '95207', end: '97493'},
      {start: '93452', end: '93136'},
      {start: '93452', end: '92951'},
      {start: '97493', end: '99156'},
      {start: '99156', end: '93136'},
      {start: '93136', end: '93510'},
      // {start: '69510', end: '67711'},
      // {start: '67711', end: '67246'},
    ];
    lyra.connections = [
      {start: 'Vega', end: 'Sheliak'},
      {start: 'Vega', end: '92502'},
      {start: 'Sheliak', end: '92902'},
      {start: '92902', end: '92502'},
    ];
    ophiuchus.connections = [
      {start: 'Rasalhague', end: '82745'},
      {start: 'Rasalhague', end: 'Cebalrai'},
      {start: 'Cebalrai', end: '87775'},
      {start: 'Cebalrai', end: '83755'},
      {start: '82745', end: '80637'},
      {start: '82745', end: '81130'},
      {start: '80637', end: '79640'},
      {start: '79640', end: '79352'},
      {start: '81130', end: '80648'},
      {start: '80648', end: '80327'},
      {start: '81130', end: '83755'},
      {start: '83755', end: '84711'},
      {start: '84711', end: '85164'},
    ];
    serpent.connections = [
      {start: '89684', end: '86298'},
      {start: '86298', end: '85998'},
      {start: '85998', end: '77280'},
      {start: '77280', end: '77386'},
      {start: '77386', end: 'Unukalhai'},
      {start: 'Unukalhai', end: '76044'},
      {start: '76044', end: '76997'},
      {start: '76997', end: '77836'},
      {start: '76997', end: '77214'},
      {start: '77836', end: '77214'},
    ];

    drawLines(ursaMajor);
    drawLines(coronaBor);
    drawLines(cygnus);
    drawLines(bootes);
    drawLines(lyra);
    drawLines(aquila);
    drawLines(serpent);
    drawLines(ophiuchus);






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
    // console.log(start1, end1);
    stroke(20, 20, 220);
    if (constellation == serpent) {
      // console.log('serp');
      stroke(220, 20, 20);
    }
    line(start1.xCoord, start1.yCoord, end1.xCoord, end1.yCoord);
  });
}

// function doubleClicked() {
//   console.log('doublin');
// }

// Don't forget, you need a local server to use this (because of CORS...?):
