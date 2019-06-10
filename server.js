var express = require("express");
var mongoose = require("mongoose");
var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// mongoose.connect( "mongodb://localhost/recipe",{useNewUrlParser: true});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
  });



  app.get("/", function(req,res){
    res.render("landing");
  });


  app.get("/register",function(req,res){
    res.render("register");
  });


  