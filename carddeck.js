
// -------------------CARD CLASS --------------------------
var Card = function (suit, rank) {
  this.suit = suit;
  this.rank = rank;
  if (this.rank >= 10) {
    this.value = 10;
  }

  else(this.value = this.rank);
  
};

Card.SUITS = [
  Card.CLUBS    = 'Clubs',
  Card.DIAMONDS = 'Diamonds',
  Card.HEARTS   = 'Hearts',
  Card.SPADES   = 'Spades'
];

Card.prototype = {
  get face_card() {
    return this.rank > 10;
  },
  valueOf: function() {
    return this.rank;
  },
  toString: function() {
    var rank = {1: 'Ace', 11: 'Jack', 12: 'Queen', 13: 'King'}[this.rank] || this.rank;
    return rank + ' of ' + this.suit;
  }
};

var Deck = function() {
  this.cards = [];
  for (var i = 0; i < Card.SUITS.length; i++) {   
    for (var rank = 1; rank <= 13; rank++) {
      this.cards.push(new Card(Card.SUITS[i], rank));
    }
  }
  this.shuffle();
};

// gameState = {currentTurn: 2, players:[{name: "dealer"} {name: "nick", faceUp: [instances], faceDown: [instances], }]}


// -------------------DECK CLASS ------------------------------


Deck.prototype = {
  count: function() {
    return this.cards.length;
  },
  draw: function(n) {
    return this.cards.splice(-n, n);
  },
  shuffle: function() {
    this.cards.sort(function() { return Math.random() - 0.5; });  
  },
};


// -------------------PLAYER CLASS ------------------------------

var Player = function(name){
    this.name = name;
    this.money = 90;
    this.hand = [];
    this.totalValue = 0;
    this.bet = 10;
};

Player.prototype.totalhand = function(){
  this.totalValue = 0;
  for(var i = 0 ;i < this.hand.length; i++){
    this.totalValue += this.hand[i].value;
  }
  // console.log("This Hand Dealer",this.totalValue);
  return this.totalValue;
};


//------------- GAME CLASS -------------------------------------

var Game = function(players) {
    this.playersArray = [];
//     this.currentTurn = 
// push a player into the playersArray for each player in the
// array that is passed in when you create a new game
    for (var i=0;i<players.length;i++){
        this.playersArray.push(new Player(players[i]));
      }
    this.playersArray.push(new Player("Dealer"));
    this.currentDeck = new Deck();
    this.turn = 0;
};


Game.prototype.deal = function(index, cards){ 
    // this sets the current hand equal to the hand concatinated with the cards drawn
    this.playersArray[index].hand = this.playersArray[index].hand.concat(this.currentDeck.draw(cards));
    this.playersArray[index].totalhand();
};
 

// -------------------CHECK FOR WINNER -----------------

Game.prototype.checkForWinner = function(index) {
  this.dealerStatus();
  // Instance of the Dealer
  var dealer = this.playersArray[this.playersArray.length-1]; 
  var player = this.playersArray[index];
    
    // Player busted  
    if (player.totalValue > 21) {
        player.bet = 0;
        console.log("Player Busted (90)");
    // Player Win    
    } else if (player.totalValue > dealer.totalValue){
        if (player.blackjack()) {
          player.money += (player.bet * 2.5);  
          console.log("Player Wins with BLACKJACK (115)");
        } else {
          player.money += (player.bet * 2);  
          console.log("Player Wins (110)");
        } 
        player.bet = 0;
    // Dealer Busted - Player Win    
    } else if ((player.totalValue < dealer.totalValue) && (dealer.totalValue > 21)) {
      player.money += (player.bet * 2);
      player.bet = 0;  
      console.log("Player Wins - Dealer Busted (110)");
    // Dealer Win   
    } else if ((player.totalValue < dealer.totalValue) && (dealer.totalValue < 22)){
      player.bet = 0;
      console.log("Dealer Wins ");
    // Tie Game    
    } else if (player.totalValue === dealer.totalValue) {
      if (player.blackjack() && !dealer.blackjack()) {
        player.money += (player.bet * 2.5);  
        console.log("Player Win with BJ and Dealer only 21");    
      } 
      player.totalValue += player.bet;  
      player.bet = 0;
      console.log("Tie Game");
    }
};

//-------------- DELAER STATUS -----------------------

Game.prototype.dealerStatus = function(){
  while (this.dealerUnder17()){
    if (!this.playersArray[this.playersArray.length -1].blackjack()){
      this.deal(this.playersArray.length-1,1); // Check for hit 
      console.log("card delt");
    }
  }
};


//-------------- SUPPORTIVE FUNCTIONS ------------------



Player.prototype.busted = function(){
  var hand = this.totalhand();
  return hand > 21;
};

Player.prototype.blackjack = function(){
  if (this.hand.length === 2) {
    return (this.hand[0].face_card && this.hand[1].rank === 1) || (this.hand[1].face_card && this.hand[0].rank === 1);
  }else{
    return false;
  }
};

Player.prototype._21 = function() {
 return this.totalhand() === 21 && !this.blackjack();
};

Player.prototype.under21 = function() {
  return this.totalhand() < 21;
};

Game.prototype.dealerUnder17 =  function() {
  // console.log(this);
  // return this.playersArray[this.playersArray.length -1].totalhand() < 17;
  return this.playersArray[this.playersArray.length -1].totalValue < 17;
};

Game.prototype.dealerOver16 =  function() {
  var players = this.playersArray;
  var dealer = players[players.length -1];
  var x = dealer.totalValue;
  return ((21 > x) && (x > 16)); 
};


Game.prototype.initialDeal = function() {
  _this = this;
  this.playersArray.forEach(function(el, index){
     _this.deal(index,2);
  });
    
};

Game.prototype.hit = function(playerIndex){
  this.deal(playerIndex, 1);
};

Game.prototype.stand = function(){
this.turn += 1;
};


// -------------------TEST DECK  ------------------------------
var newArr = [];
Game.prototype.clearDeck = function(){
  for (var i=0; i<this.currentDeck.cards.length;i++){
    if ( 10 < this.currentDeck.cards[i].rank || this.currentDeck.cards[i].rank === 1){
    newArr.push(this.currentDeck.cards[i]);
    } 
  }
  // console.log(this.currentDeck.cards);
};

// -------------------START GAME  ------------------------------

var startGame = function(array){
    
    var g = new Game(array);
    // g.clearDeck();
    // g.currentDeck.cards = newArr;
    g.initialDeal(); 
    
    console.log("Dealer");
    console.log("0) " + g.playersArray[2].hand[0].rank);
    console.log("1) " +g.playersArray[2].hand[1].rank);
    console.log("Total: ", g.playersArray[2].totalValue);
    console.log("");
    
    console.log("Player 1");
    console.log("0) " + g.playersArray[0].hand[0].rank);
    console.log("1) " +g.playersArray[0].hand[1].rank);
    console.log("Total: ", g.playersArray[0].totalValue);

  
};

// -------------------ADD NEW PLAYERS  ------------------------------

startGame(["nick", "camilo"]);












//------------------- WE DO NOT NEED THIS -----------------------


// Game.prototype.checkForBlackjack = function() {
// var dealer = this.playersArray[this.playersArray.length-1];     
//  for(var i=0;i < this.playersArray.length-1;i++){
//    if (this.playersArray[i].blackjack() && dealer.blackjack()){
//     // put the bet back in the total money
//      var bjboth = this.playersArray[i].money += this.playersArray[i].bet;
//      console.log(bjuser);
//    }
//    else if (this.playersArray[i].blackjack() && !dealer._21()) {
//      var  bjplayer = this.playersArray[i].money += ( (this.playersArray[i].bet * 1.5) + this.playersArray[i].bet);
//      console.log(bjplayer);
//    }
//    else if (dealer.blackjack() && !(this.playersArray[i].blackjack())){
//      console.log("Dealer Wins");
//    }
//    else {
//      console.log("None has BLACKJACK");
//    }
//  } 
// };






// while (this.dealerUnder17()){
//     this.deal(this.playersArray.length-1,1); // Check for hit 
//   }      







