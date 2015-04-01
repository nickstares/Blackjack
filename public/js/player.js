$(document).ready(function() { 

  var socket = io();  

  $('#joinGame').on("submit", function(e){
    // e.preventDefault();
    socket.emit("join game");
  });


  $('#hit').on("submit", function(e){
    socket.emit('hit request');
  });

  socket.on('hit reply', function(msg){
    console.log(msg);
  });

  
  $('#stand').on("submit", function(){
	  socket.emit('stand request');
      });

  socket.on('hide', function(msg){
	  console.log(msg);

      }); 


//   socket.on('player joined next hand', function(msg) {
//     // append msg to wherever you want it.
//   });

  // socket.on('show buttons to user', function(){
  //   $('body').append
  // });
//   socket.on('hello world', function(msg){

 });
