var Card = function (suit, rank) {
  this.suit = suit
  this.rank = rank
}

Card.SUITS = [
  Card.CLUBS    = 'Clubs',
  Card.DIAMONDS = 'Diamonds',
  Card.HEARTS   = 'Hearts',
  Card.SPADES   = 'Spades'
]

Card.prototype = {
  get face_card() {
    return this.rank > 10
  },
  valueOf: function() {
    return this.rank
  },
  toString: function() {
    var rank = {1: 'Ace', 11: 'Jack', 12: 'Queen', 13: 'King'}[this.rank] || this.rank
    return rank + ' of ' + this.suit
  }
}


var Deck = function() {
  this.cards = []
  for (var i = 0; i < Card.SUITS.length; i++) {   
    for (var rank = 1; rank <= 13; rank++) {
      this.cards.push(new Card(Card.SUITS[i], rank))
    }
  }
  this.shuffle()
}

// gameState = {currentTurn: 2, players:[{name: "dealer"} {name: "nick", faceUp: [instances], faceDown: [instances], }]}


Deck.prototype = {
  count: function() {
    return this.cards.length
  },
  draw: function(n) {
    return this.cards.splice(-n, n)
  },
  shuffle: function() {
    this.cards.sort(function() { return Math.random() - 0.5 })   
  }
};


var Player = function(name){
    this.name = name;
    this.money = 100;
    this.hand = [];
}


// GAME CLASS + PROTOTYPE

var Game = function(name) {
    this.playersArray = []
    this.playersArray.push(new Player("Dealer"));
    this.playersArray.push(new Player(name));
    this.currentDeck = new Deck
};

Game.prototype.play = function() {

}

Game.prototype.deal = function(person, cards){ 
    // this sets the current hand equal to the hand concatinated with the cards drawn
    this.playersArray[person].hand = this.playersArray[person].hand.concat(this.currentDeck.draw(cards));
}
 

Game.prototype.checkForBlackjack = function() {
     
     cardDealer0 = this.playersArray[0].hand[0];
     cardDealer1 = this.playersArray[0].hand[1];

     for(var i = 1; i <= this.playersArray.length -1; i++){
     
        card0 = this.playersArray[i].hand[0];
        card1 = this.playersArray[i].hand[1];
        if ((card0 > 10 && card1.rank === 1) || (card1>10 && card0.rank === 1)){
            if((cardDealer0 > 10 && cardDealer1.rank === 1) || (cardDealer1 > 10 && cardDealer0.rank === 1)){
                return true;
            }else{
       
                return false;
            }
        }   
     } 
}

Game.prototype.gameWon = function() {
this.checkForBlackjack();
//   this.checkForHigherValue();
//   this.checkForDealerBust();   
  
}


// ---------------------------------------

var makeANewGame = function(){
    
    var g = new Game
   console.log(g)
    g.deal(0,2);
   
    g.deal(1,2);
    
    g.checkForBlackjack();

}

  

makeANewGame();
