var Card = function (suit, rank) {
  this.suit = suit;
  this.rank = rank;
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
  }
};


var Player = function(name){
    this.name = name;
    this.money = 100;
    this.hand = [];
    this.bet = 0;
};

Player.prototype.totalhand = function(){
return this.hand.reduce(function(first, second){
  return first + second;
});
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
};
 

Game.prototype.checkForBlackjack = function() {
var dealer = this.playersArray[-1];     
 for(var i=0;i<playersArray.length-1;i++){
   if (playersArray[i].blackjack() && dealer.blackjack()){
    // put the bet back in the total money
    playersArray[i].money += playersArray[i].bet;
   }
   else if (playersArray[i].blackjack() && !dealer._21()) {
    return playersArray[i].money += ( (playersArray[i].bet * 1.5) + playersArray[i].bet);
   }
 } 
};

Game.prototype.checkForHigherValue = function() {

};

Player.prototype.busted = function(){
  return this.totalhand > 21;
};

Player.prototype.blackjack = function(){
  return this.hand[0] > 10 && this.hand[1] === 1;
};

Player.prototype._21 = function() {
 return this.totalhand === 21 && !this.blackjack;
};

Player.prototype.under21 = function() {
  return this.totalhand < 21;
};

Game.prototype.dealerUnder17 =  function() {
  return this.playersArray[-1].totalhand < 17;
};

Game.prototype.dealerOver16 =  function() {
  return 21 > this.playersArray[-1].totalhand > 16;
};

dealerValue();

Game.prototype.gameWon = function() {
this.checkForBlackjack();
//   this.checkForHigherValue();

//   
  
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
  // figures out what turn it is
  // renders buttons to that person.
 this.gameWon();
};

// ---------------------------------------

var startGame = function(array){
    
    var g = new Game(array);
    console.log(g);
    g.initialDeal(); 
    console.log(g.hit(1));
    console.log(g.playersArray[1].totalhand());

};

  
// on timer finishing
startGame(["nick", "camilo"]);