/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wished. Each result get added to his or her ROUND score
- If the player rolls a 1, it will reset their scrore to zero and it becomes the next players turn. 
- The player can 'Hold', which means that his/her score gets added to his total score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game.

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

init();

dice = Math.floor(Math.random()*6) + 1;


document.querySelector('.btn-roll').addEventListener( 'click', function() {
	//anonymous function will do something, anonymous function can be used as the call back function
	//needed actions for game to work
	if(gamePlaying){
		// 1) Random Number is needed for the game to work
		var dice = Math.floor(Math.random() * 6) + 1;
		// 2)display the results of numbers rolled
	  var diceDOM = document.querySelector('.dice');
	  diceDOM.style.display = 'block';
	  diceDOM.src = 'dice-' + dice + '.png';
	  // 3) Update round score if the rolled number was not a  1
	  if( dice !== 1 ){
	  	//add roll to score if dice is not a 1 by the number rolled on the eventListener
	    roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
	  } else {
	  	//Becomes next's players turn
	  	nextPlayer();
	  }
	} 
});
  
document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying) {
		//1) add current score to global score
		scores[activePlayer] += roundScore;

		//update UI
	  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//check if player has won the game
	  if(scores[activePlayer] >= 100) {
	  	document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
	  	document.querySelector('.dice').style.display = 'none';
	  	document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
	  	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	    gamePlaying = false;
	  } else {
			//It becomes the Next player's turns
			nextPlayer();
	  }
	}
})

function nextPlayer(){
    //It becomes the next player's turn if previous player rolled a 1
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //turns on or off active class of current player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Hides the dice when a player has zero
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}
