$(document).ready(function() { 


// // -------------------ADD NEW PLAYERS  ------------------------------

// // startGame(["nick", "camilo"]);


// //------------------- JQUERY -----------------------



  //----------------------SOCKET EMISSION
  var socket = io();  

  $('#joinGame').on("submit", function(e){
    // e.preventDefault();
    socket.emit("join game");
  });


  $('#hit').on("submit", function(e){
    socket.emit('hit request');
  });

  //----------------------SOCKET LISTENERS

  socket.on("set time", function(msg){
    // $('.time').append(msg);
    console.log(msg);
  });






  //----------------------SOCKET OTHER


  // socket.on('hit reply', function(msg){
  //   console.log(msg);
  // });


  $('#stand').on("submit", function(){
    socket.emit('stand request');
  });



  // socket.on('player joined next hand', function(msg) {
  //   // append msg to wherever you want it.
  // });

  // socket.on('show buttons to user', function(){
  //   $('body').append
  // });

  









 });
