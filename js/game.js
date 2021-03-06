(function() {
  
	let userHealthPoints = 40;
	let grantHealthPoints = 10;
	let userWins = 0;
	let doBattle = 1;
	let randomNum;
	let damageDealt = 0;
	const moreHealthPoints = 10;

	//Function to return integer 1,2,3,4,5
	let getDamage = () => {
	  return Math.floor(Math.random()*5 + 1);
	};

	//Prompt user for input to play game and user name
	const startGame = () => {
  
	  	wantToPlay = window.confirm("Do you want to challenge the mighty Grant Chirpus?");
	  
		if (wantToPlay) {
			userName = prompt("What is your name, gladiator?");
			return true;
		}
		else {
			return false;
		}
	};

	let startCombat = () => {
		var continueCombat = window.confirm("Do you want to continue to fight against the mighty Grant Chirpus?");

		if (continueCombat) {
			return true;
		} else {
			console.log("What a chicken! Bwaaaaak!");
			return false;
		}
	};

	if (startGame()) {
  
  		do {

      		while (userHealthPoints > 0 && grantHealthPoints > 0 && doBattle) {
    
			    randomNum = Math.random(0,1);
			    damageDealt = getDamage();
			    
				if (randomNum > 0.5) {
				    userHealthPoints -= damageDealt;
				  	console.log(`${userName} has taken ${damageDealt} damage and has ${userHealthPoints} left.`);
				} else {
					grantHealthPoints -= damageDealt;
					console.log(`The Mighty Grant Chirpus has taken ${damageDealt} damage and has ${grantHealthPoints} left.`);
				}

				doBattle = startCombat();
			}

			//Breaks out of while loop when one player has reached 0 HP
			//Checks user to see if GAME OVER
			if(userHealthPoints < 1) {
	  			console.log("\r" + "You won " + userWins + " against the invincible Grant Chirpus but have lost the war.");
				break;
			} else if (userHealthPoints > 0 || !doBattle) {
				console.log("You ran away from your fight with Grant Chirpus. Game Over.");
				break;
			}
			//If user did not die, give them 1 more vistory and reset Grant's HP
			else {
				userWins++;
				console.log("Congratulations, hero, you have defeated the indefatigueable Grant Chirpus " + userWins + " times.");
				grantHealthPoints = moreHealthPoints;
			}
		}	
  
  		while ((userWins < 3 && doBattle));
	}


	if (userWins === 3) {
  		console.log(userName + ", you have slain Grant 'apparently-not-as-strong-as-we-thought' Chirpus once and for all!");
  	} else {
  		//If user doesn't want to fight, display taunt
  		console.log("What a little chicken.")
	}
	
})();
