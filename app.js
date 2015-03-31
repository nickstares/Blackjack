var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require("redis");
var client = redis.createClient();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
// g is the instance of the game
var g = require("./game.js").startGame(["nick"]);
var userName = {}

//middleware below
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());



// Render new user page
app.get('/newUser', function(req, res){
 res.render('newUser');
});

// Enter global chat
app.get('/blackjack', function(req, res){
  res.render('blackjack');

userName = req.cookies;
console.log(userName);
});




io.on('connection', function(socket){
  socket.nickname = userName;
console.log("socket.nickname", socket.nickname);

  socket.on('new game', function(msg){
    io.emit('new game', g.initialDeal());
    io.emit('new game', g);
  });

//eventually we will have to make it so it hits the player who pressed hit.
  socket.on('hit request',function(msg){
    io.emit('hit reply', g.hit(0))
    io.emit('hit reply', g.playersArray[0].hand[g.playersArray[0].hand.length - 1])
  });
});


app.get('/', function(req, res){
  res.render('index');
});


var loggedIn = [];

// Root Route && Login
// app.get('/', function(req, res) {
//  res.render('index');
// });



// Create new User
 //validate uniqueness of userName
 app.post("/newuser", function(req, res){
   client.HSETNX("users", req.body.userName, req.body.userPass, function(err, success) {
     if (success === 1) {
       res.redirect('/');
     } else {
       console.log("person already exists, figure out how to render this to the page");
     }
   });
 });



//validates userPass === userName and logs in
 app.post("/blackjack", function(req, res){
  var getUserPass = function(){
    client.HGET("users", req.body.userName, function(err, reply){
      if (err){
        console.log("Could not query the database");
      }

      if (req.body.userPass == reply){
        res.redirect("/blackjack");
      } else {
        console.log("Incorrect UserName or Password");
        res.redirect('/');
      }
    });
  };
  getUserPass();
});


var usersLoggedIn = [];



//start the server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
