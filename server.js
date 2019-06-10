var express = require("express");
var mongoose = require("mongoose");
var app = express();
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/users");
var seedDB = require("./seeds");



app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(require("express-session")({
  secret:"keep it like",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect( "mongodb://localhost/usersbase",{useNewUrlParser: true});

seedDB();

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

  // app.post("/register",function(req,res){
  //   res.send("this is a post route");
  // });


  app.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
           return res.render("register");
        } else{
           passport.authenticate("local")(req,res,function(){
            res.redirect("/");
           }); 
        }
    })
});

  