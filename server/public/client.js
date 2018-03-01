

// would be cool if on hover you got a semi-transparent image of the constellation

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
var leo = [];
var herakles = [];
var draco = [];
var scorpius = [];
var sagittarius = [];
var canisminor = [];
var auriga = [];
var gemini = [];
var virgo = [];
var capricorn = [];
var canismajor = [];
var crux = [];
var centaurus = [];
var carina = [];

function preload() {
  img = loadImage('dogs.jpg');
}

function setup() {
  size = 30;

  createCanvas(w, h);
  background(200);

  image(img, 100, 100, 100, 100);


  d3.csv('hygdata_v3.csv', function(data) {
    console.log(data);
    data.forEach(function(star) {

      // huh, only 150 have names!
      // if (star.proper) {
      //   stars.push(output);
      // }
      var output = {
        dec: star.dec,
        // ra: (star.ra + 10) % 24,
        ra: star.ra,
        mag: star.mag,
        name: star.proper,
        absmag: star.absmag,
        con: star.con,
        id: star.id
      };

      // why can't i change it?!?!!?
      // because of parseFloat dog....
      // console.log(output.ra);



      // only 1600 less than 5:
      // only 500 less than 4:
      // and only 5 less than 0!
      if (parseFloat(output.mag) < 4.5 && output.name != 'Sol') {

        // console.log(output.ra, output.dec);
        // output.ra = (output.ra + 6) % 24;
        var xCoord = (output.ra * w/24);
        var yCoord = h/2 - output.dec * h/180;
        var adjMag = parseFloat(output.mag) + 3;
        output.xCoord = w - xCoord;
        output.yCoord = yCoord;
        output.radius = size / adjMag;
        //
        // console.log(xCoord);
        // console.log(output.ra);
        // changing to radial using Polaris as origin:
        // yeah......don't forget the parsefloat:
        // var newX = (parseFloat(output.ra) + (12 - 2.5297)) % 24;

        var newX = output.ra;
        var realnewx = newX * w/24;
        // console.log(newX, output.ra);
        output.newx = w - realnewx;


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
        if (output.con == 'Her') {
          herakles.push(output);
        }
        if (output.con == 'Leo') {
          leo.push(output);
        }
        if (output.con == 'Dra') {
          draco.push(output);
        }
        if (output.con == 'Sgr') {
          sagittarius.push(output);
        }
        if (output.con == 'Sco') {
          scorpius.push(output);
        }
        if (output.con == 'Vir') {
          virgo.push(output);
        }
        if (output.con == 'Gem') {
          gemini.push(output);
        }
        if (output.con == 'Aur') {
          auriga.push(output);
        }
        if (output.con == 'CMi') {
          canisminor.push(output);
        }
        if (output.con == 'Cap') {
          capricorn.push(output);
        }
        if (output.con == 'Car') {
          carina.push(output);
        }
        if (output.con == 'Cru') {
          crux.push(output);
        }
        if (output.con == 'CMa') {
          canismajor.push(output);
        }
        if (output.con == 'Cen') {
          centaurus.push(output);
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

        if (output.con == 'Del') {
          fill('orange');
        }
        if (output.con == 'PsA') {
          fill('green');
        }
        if (output.con == 'TrA') {
          fill('purple');
        }
        if (output.con == 'Crv') {
          fill('red');
        }
        if (output.con == 'Ori') {
          fill('yellow');
        }



        // this is  a good learning point: you shouldn't use realnewx here and another name (i.e. the xcoord attached the object) elsewhere, i.e. when you draw the connecting lines.
        // if (output.name != 'Sirius') {
          ellipse(w - realnewx, yCoord, size / adjMag);

        // }
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
    leo.connections = [
      {start: 'Algieba', end: 'Regulus'},
      {start: 'Algieba', end: '50193'},
      {start: 'Algieba', end: 'Zosma'},
      {start: 'Zosma', end: 'Denebola'},
      {start: 'Zosma', end: '54718'},
      {start: 'Regulus', end: '54718'},
      {start: 'Regulus', end: '47373'},
      {start: '50193', end: '48318'},
      {start: '48318', end: 'Ras Elased Australis'},
    ];
    herakles.connections = [
      {start: '89860', end: '87994'},
      {start: '87994', end: '86705'},
      {start: '86705', end: '84121'},
      {start: '86705', end: '84122'},
      {start: '84121', end: 'Rasalgethi'},
      {start: '84121', end: '82952'},
      {start: '82952', end: '84122'},
      {start: '82952', end: '81444'},
      {start: '81444', end: 'Kornephoros'},
      {start: '81444', end: '81583'},
      {start: '81583', end: '80880'},
      {start: '80880', end: '79750'},
      {start: '79750', end: '78861'},
      {start: 'Kornephoros', end: '79928'},
      {start: '84122', end: '81583'},
    ];
    draco.connections = [
      {start: 'Rastaban', end: 'Etamin'},
      {start: 'Rastaban', end: '87314'},
      {start: 'Etamin', end: '87314'},
      {start: '87314', end: '94081'},
      {start: '94081', end: '97124'},
      {start: '97124', end: '89660'},
      {start: '89660', end: '83638'},
      {start: '83638', end: '80089'},
      {start: '80089', end: '78290'},
      {start: '78290', end: '75229'},
      {start: '75229', end: 'Thuban'},
      {start: 'Thuban', end: '61088'},
      {start: '61088', end: '56044'},
      {start: '56044', end: '47060'},
    ];
    scorpius.connections = [
      {start: '79870', end: 'Antares'},
      {start: '79870', end: '79134'},
      {start: '79870', end: 'Graffias'},
      {start: '79870', end: 'Dschubba'},
      {start: '79870', end: '78029'},
      {start: '79870', end: '77868'},
      {start: 'Antares', end: '81020'},
      {start: '81020', end: '82144'},
      {start: '82144', end: '82263'},
      {start: '82263', end: '82477'},
      {start: '82477', end: '83885'},
      {start: '83885', end: 'Sargas'},
      {start: 'Sargas', end: '86403'},
      {start: '86403', end: '86804'},
      {start: '86804', end: 'Shaula'},
    ];
    sagittarius.connections = [
      {start: 'Kaus Borealis', end: '89064'},
      {start: 'Kaus Borealis', end: 'Kaus Meridionalis'},
      {start: 'Kaus Borealis', end: '91754'},
      {start: 'Kaus Meridionalis', end: 'Nash'},
      {start: 'Kaus Meridionalis', end: 'Kaus Australis'},
      {start: 'Kaus Australis', end: '89364'},
      {start: 'Kaus Australis', end: '93213'},
      {start: '93213', end: '91754'},
      {start: '93213', end: '97721'},
      {start: '93213', end: '93569'},
      {start: '97721', end: '95052'},
      {start: '97721', end: '94999'},
      {start: '93569', end: 'Nunki'},
      {start: '91754', end: 'Nunki'},
      {start: '93388', end: 'Nunki'},
      {start: 'Albaldah', end: '93388'},
      {start: 'Albaldah', end: '94873'},
      {start: '92793', end: '93388'},
      {start: '92793', end: 'Albaldah'},
    ];
    gemini.connections = [
      {start: 'Pollux', end: '36856'},
      {start: 'Castor', end: '32161'},
      {start: '32161', end: '30270'},
      {start: '32161', end: '30810'},
      {start: '30270', end: '29582'},
      {start: '28664', end: '29582'},
      {start: '36856', end: '35946'},
      {start: '36856', end: '37633'},
      {start: '32932', end: '35946'},
      {start: '36856', end: '35453'},
      {start: '35453', end: '34000'},
      {start: '34000', end: 'Alhena'},
      {start: '34000', end: '32276'},
    ];
    auriga.connections = [
      {start: 'Capella', end: 'Menkalinan'},
      {start: 'Capella', end: 'Hassaleh'},
      {start: '28309', end: 'Menkalinan'},
      // {start: '25364', end: 'Hassaleh'},
      // {start: 'Alnath', end: '28309'},
    ];
    virgo.connections = [
      {start: '66040', end: '68302'},
      {start: '66040', end: 'Spica'},
      {start: '66040', end: '62890'},
      {start: '62890', end: 'Vindemiatrix'},
      {start: '62890', end: 'Porrima'},
      {start: 'Porrima', end: '59945'},
      {start: 'Porrima', end: 'Spica'},
      {start: '59945', end: '57584'},
      {start: 'Spica', end: '69205'},
      {start: '69205', end: '69479'},
      {start: '69479', end: '71731'},
      {start: '68302', end: '71994'},
    ];
    canisminor.connections = [
      {start: 'Procyon', end: 'Gomeisa'},
    ];
    capricorn.connections = [
      {start: '102647', end: '102154'},
      {start: '100020', end: '99743'},
      {start: '107213', end: '106642'},
      {start: '106642', end: '105175'},
      {start: '105175', end: '103804'},
      {start: '105175', end: '105540'},
      {start: '103804', end: '100020'},
      {start: '103804', end: '102154'},
      {start: '100020', end: '102154'},
    ];
    crux.connections = [
      {start: 'Gacrux', end: 'Acrux'},
      {start: 'Becrux', end: '59565'}
    ];
    canismajor.connections = [
      {start: 'Sirius', end: 'Mirzam'},
      {start: 'Sirius', end: '33260'},
      {start: 'Sirius', end: 'Wezen'},
      {start: '33260', end: '33956'},
      {start: '33260', end: '33073'},
      {start: 'Wezen', end: 'Aludra'},
      {start: 'Wezen', end: 'Adhara'},
      {start: 'Adhara', end: '30049'},
      {start: '33956', end: '33073'},
    ];
    centaurus.connections = [
      {start: '66447', end: 'Hadar'},
      {start: '66447', end: '61739'},
      {start: '66447', end: '67786'},
      {start: 'Hadar', end: 'Rigil Kentaurus'},
      {start: '61739', end: '58994'},
      {start: '59016', end: '58994'},
      {start: '59267', end: '58994'},
      {start: '59267', end: '56392'},
      {start: '59016', end: '55260'},
      {start: '67786', end: '67251'},
      {start: '67786', end: '68027'},
      {start: '67786', end: '61739'},

      {start: '68027', end: '71125'},
      {start: '68027', end: '69867'},
      {start: '71125', end: '73107'},
      {start: '67251', end: '67259'},
      {start: '67259', end: '65729'},
      {start: '67259', end: 'Menkent'},
      {start: 'Menkent', end: '69867'},
      {start: '65729', end: '64904'},
      {start: '62699', end: '64904'},
    ];
    carina.connections = [
      {start: 'Canopus', end: '38713'},
      {start: '38713', end: 'Avior'},
      {start: 'Avior', end: 'Tureis'},
      {start: 'Tureis', end: '50229'},
      {start: '50229', end: '51428'},
      {start: '51428', end: '52268'},
      {start: '52268', end: '49958'},
      {start: '49958', end: 'Miaplacidus'},
      {start: 'Miaplacidus', end: '47866'},
      {start: '47866', end: '47719'},
    ];



    drawLines(ursaMajor);
    drawLines(coronaBor);
    drawLines(cygnus);
    drawLines(bootes);
    drawLines(lyra);
    drawLines(aquila);
    drawLines(serpent);
    drawLines(ophiuchus);
    drawLines(leo);
    drawLines(herakles);
    drawLines(draco);
    drawLines(scorpius);
    drawLines(sagittarius);
    drawLines(virgo);
    drawLines(canisminor);
    drawLines(auriga);
    drawLines(gemini);
    drawLines(capricorn);
    drawLines(canismajor);
    drawLines(carina);
    drawLines(centaurus);
    drawLines(crux);






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
    // if (constellation == serpent) {
    //   stroke(220, 20, 20);
    // }
    line(start1.newx, start1.yCoord, end1.newx, end1.yCoord);
  });
}

// function doubleClicked() {
//   console.log('doublin');
// }

// Don't forget, you need a local server to use this (because of CORS...?):
