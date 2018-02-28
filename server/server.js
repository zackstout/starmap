
var express = require('express');
var app = express();
var port = process.env.PORT || 5050;

app.use(express.static('server/public'));

// Start listening for requests on a specific port
app.listen(port, function() {
  console.log('thx for listening on channel ', port);
});
