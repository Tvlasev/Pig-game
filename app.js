/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his CURRENT score
- BUT, if the player rolls a 1, all his CURRENT score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his CURRENT score gets added to his MAIN score. After that, it's the next player's turn
- The first player to reach 100 points on MAIN score wins the game

*/

let totalScores;
let roundScore;
let activePlayer;
let gamePlaying;

newGame();

document.querySelector('.btn-new').addEventListener('click', newGame);

document.querySelector('.btn-roll').addEventListener('click', function(){

	if(gamePlaying){
		//Random number from the dice and display the result
		let dice = Math.floor(Math.random() * 6) + 1;
		let diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		//update the current score IF the rolled number was NOT a 1
		if(dice !== 1){
			roundScore += dice;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		}else{
			roundScore = 0;
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){

	if(gamePlaying){
		//add current score to main score, make the current one 0 and change the active player
		totalScores[activePlayer] += roundScore;
		roundScore = 0;
		document.getElementById('score-' + activePlayer).textContent = totalScores[activePlayer];
		if(totalScores[activePlayer] >= 100){
			document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
			document.querySelector('.dice').style.display = 'none';
			gamePlaying = false;
		}else{
			nextPlayer();
		}
	}

});

function newGame(){
	totalScores = [0, 0];
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
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer(){
	document.getElementById('current-' + activePlayer).textContent = 0;

	//Check who is the active player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	//Shows who is the active player
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
}