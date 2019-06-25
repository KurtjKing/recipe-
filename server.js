
var express = require("express");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/users");
var seedDB = require("./seeds");



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
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

app.use(function(req,res,next){
  res.locals.currentUser= req.user;
  next();
});

mongoose.connect( "mongodb://localhost/usersbase",{useNewUrlParser: true});

seedDB();

var PORT = process.env.PORT || 3000;

// api call 
function callAPI(ingredient){
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=" + ingredient)
  .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
  .header("X-RapidAPI-Key", "61fd52a739msh29c7937578d62b1p1a8f1ejsn2dc0b75d0a7b")
  .end(function (result) {
    var jsonData = result.body;
    for(var i = 0; i < jsonData.length; i++) {
      var obj = jsonData[i];
      console.log(obj.title);
      console.log(obj.image);
    }
    });
  }

  

  app.get("/", function(req,res){
    res.render("landing");
  });


  app.get("/register",function(req,res){
    res.render("register");
  });

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

app.get("/recipes",isLoggedIn,function(req,res){
  res.render("recipes");
});


app.get("/login",function(req,res){
  res.render("login");
});

app.post("/login",passport.authenticate("local",
{
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req,res){

});

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
  return  next();
  }
  res.redirect("/register");
  
}




app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});