$(document).ready(function() { 

//     $('#stand').on("submit", function(e){
//       e.preventDefault();
//       g.checkForWinner(0);
//     });

//     $('#reset').on("submit", function(e){
//       e.preventDefault();
//       for (var i = 0; i < g.playersArray.length; i++) {
//         g.playersArray[i].aceCounter = 0;  
//         g.playersArray[i].aceCounter = 0;
//         g.playersArray[i].hand = [];
//         g.playersArray[i].bet = 0;
//       }
      
//       g.currentDeck = new Deck();
//       g.initialDeal();
//       console.log("Dealer");
//       console.log("0) " + g.playersArray[1].hand[0].rank);
//       console.log("1) " +g.playersArray[1].hand[1].rank);
//       console.log("Total: ", g.playersArray[1].totalValue);
//       console.log("");
      
//       console.log("Player 1");
//       console.log("0) " + g.playersArray[0].hand[0].rank);
//       console.log("1) " +g.playersArray[0].hand[1].rank);
//       // g.hit(0);
//       // console.log("2) " + g.playersArray[0].hand[2].rank);
//       console.log("Total: ", g.playersArray[0].totalValue);
//       console.log(g);

//     });
    
//     $('#g').on("submit", function(e){
//       console.log(g);
//     });

//     $('#wallet').on("submit", function(e){
//       console.log(g.playersArray[0].money);
//     });
  
//     $('#formbet').on("submit", function(e){
      
//       g.playersArray[0].bet = parseInt($('#bet').val());
//       g.playersArray[0].money -= g.playersArray[0].bet;
//       console.log("Player Bet ",g.playersArray[0].bet);
//     });
// };

// // -------------------ADD NEW PLAYERS  ------------------------------

// // startGame(["nick", "camilo"]);


// //------------------- JQUERY -----------------------




  var socket = io();  

  $('#newGame').on("submit", function(e){
    e.preventDefault();
    socket.emit('foo');
  });

  socket.on('bar', function(msg){
    console.log(msg);
  });

  $('#hit').on("submit", function(e){
    e.preventDefault();
    socket.emit('hit request');
  });

  socket.on('hit reply', function(msg){
    console.log(msg);
  });

  socket.on('player joined next hand', function(msg) {
    // append msg to wherever you want it.
  });


  socket.on('show buttons to user', function(){
    $('body').append
  });

            socket.on('hello world', function(msg){
              console.log(msg);

            });
            









 });
