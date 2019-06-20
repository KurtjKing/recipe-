var mongoose = require ("mongoose");
var Userbase= require("./models/users")


var data =[
    {username:"brad",
    password:"dick",
},
{username:"samn",
password:"fuck",
},
{username:"seed mtn",
password:"you",
}
]

function seedDB(){
    Userbase.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed users");
        data.forEach(function(seed){
            Userbase.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a user");
                   

                
                        
                      
                    
                }
            });
        });
    });
   
   
}


module.exports = seedDB;