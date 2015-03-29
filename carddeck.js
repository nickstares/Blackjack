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

var Player = function(name){
    this.name = name;
    this.money = 100;
    this.hand = [];
    this.totalValue = 0;
    this.bet = 10;
};

Player.prototype.totalhand = function(){
  // this.totalValue = 0;
  for(var i = 0 ;i < this.hand.length; i++){
    this.totalValue += this.hand[i].value;
  }
  // console.log("This Hand Dealer",this.totalValue);
  return this.totalValue;
};


// GAME CLASS + PROTOTYPE

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
 

// 
Game.prototype.checkForHigherValue = function(position) {
  
  // Instances of the Dealer and the Player
  var dealer = this.playersArray[this.playersArray.length-1]; 
  // var player = this.playersArray[position];
  
  while (this.dealerUnder17()){
    this.deal(this.playersArray.length-1,1);
    dealer.totalhand();  
    console.log("Deal 2) " + this.playersArray[2].hand[2].value);
    console.log("D New Total: ", this.playersArray[2].totalValue);
    if (dealer.totalValue > 21) {
      console.log("House Loose");
    }
  }      
  
  for(var i=0;i < this.playersArray.length-1;i++){
    if (this.playersArray[i].totalValue > dealer.totalValue){
         if (this.playersArray[i].blackjack()) {
          this.playersArray[i].money += ( (this.playersArray[i].bet * 1.5) + this.playersArray[i].bet);
          console.log("Player Wins with Blackjack"); 
         }else{
          console.log("Player Wins this Hand"); 
          this.playersArray[i].money += ( (this.playersArray[i].bet) + this.playersArray[i].bet);
         }
    }
  }    
   // } else if ((player.totalValue > dealer.totalValue) && (this.dealerUnder17())){
   //    // It draws a card to (dealer index, # of cards)
   //    this.deal(this.playersArray.length-1,1);
   //    dealer.totalhand();
      
   //    console.log("Deal 2) " + this.playersArray[2].hand[2].value);
   //    console.log("D New Total: ", this.playersArray[2].totalValue);
   // }
   
};

Player.prototype.busted = function(){
  var hand = this.totalhand();
  return hand > 21;
};

Player.prototype.blackjack = function(){
  return (this.hand[0].face_card && this.hand[1].rank === 1) || (this.hand[1].face_card && this.hand[0].rank === 1);
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



Game.prototype.gameWon = function() {
  
  // if (this.checkForBlackjack()) {
  //     //Return Winners
  // } else if (this.checkForHigherValue()) {
  //     //Return winners
  // }  
  
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

Game.prototype.play = function() {
  
};

// ---------------------------------------
var newArr = [];
Game.prototype.clearDeck = function(){
  for (var i=0; i<this.currentDeck.cards.length;i++){
    if ( 9 < this.currentDeck.cards[i].rank || this.currentDeck.cards[i].rank === 1){
    newArr.push(this.currentDeck.cards[i]);
    } 
  }
  // console.log(this.currentDeck.cards);
};

var startGame = function(array){
    
    var g = new Game(array);
    // g.clearDeck();
    // g.currentDeck.cards = newArr;
    g.initialDeal(); 
    g.play();



    console.log("Deal 0) " + g.playersArray[2].hand[0].rank);
    console.log("Deal 1) " +g.playersArray[2].hand[1].rank);
    console.log("Total: ", g.playersArray[2].totalValue);
    // g.deal(0,1);
    console.log(" ");
    console.log("Pla1 0) " +g.playersArray[0].hand[0].rank);
    console.log("Pla1 1) " +g.playersArray[0].hand[1].rank);
    console.log("Total: ", g.playersArray[0].totalValue);
    console.log(" ");
    // console.log("CHECK FOR HIGHER BJ: " + g.checkForBlackjack(0));    

    console.log("CHECK FOR HIGHER VALUE: " + g.checkForHigherValue(0));
  
};

  
// on timer finishing
startGame(["nick", "camilo"]);












//-------------------


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
