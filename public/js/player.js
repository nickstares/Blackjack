$(document).ready(function() { 


	// // -------------------ADD NEW PLAYERS  ------------------------------

	// // startGame(["nick", "camilo"]);


	// //------------------- JQUERY -----------------------


<<<<<<< HEAD

	//----------------------SOCKET EMISSION
	var socket = io();  

	$('#joinGame').on("submit", function(e){
		// e.preventDefault();
		socket.emit("join game");
	    });
=======
  socket.on("set time", function(msg){
    $('#time1').text(msg + " scs");
    console.log(msg);
  });

  socket.on('hide', function(msg){
    $('.hitb').attr("disabled",true);
    console.log("Worked");
    // console.log(msg);

    
  }); 
>>>>>>> d55d79f2d5e761969c3165855969218c996db564


	$('#hit').on("submit", function(e){
		socket.emit('hit request');
	    });

	$('#stand').on("submit", function(e){
		socket.emit('stand request');
	    });  




	//----------------------SOCKET LISTENERS

	socket.on("set time", function(msg){
		$('#time1').text(msg + " scs");
		console.log(msg);
		if (msg === 3) {
		    $('.hitb').attr("disabled",true);
		}  
	    });

<<<<<<< HEAD
	socket.on('hide', function(msg){
		$('.hitb').attr("disabled",true);
		$('.standb').attr("disabled",true);

	    });
=======
  
>>>>>>> d55d79f2d5e761969c3165855969218c996db564

	socket.on('show', function(){
		console.log("Camilo, show works");
		$('.hitb').attr("disabled",false);
		$('.standb').attr("disabled",false);
		console.log("works 1");
	    });


	socket.on('cards', function(cards){
		for (var i=0;i<cards.length;i++){
		    $('.player_card_'+ i).text(cards[i].rank + "of " + cards[i].suit);
		}
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
