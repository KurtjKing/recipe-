var express = require("express");
var mongoose = require("mongoose");
var app = express();


// mongoose.connect( "mongodb://localhost/recipe",{useNewUrlParser: true});



var PORT = process.env.PORT || 3000;






app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
  });