(function() {
  class character {
		constructor(name) {
			this.name = name;
			this.health = 10;
			this.wins = 0;
			this.damage = 5;
		}
		
	getDamage() {
	  console.log(`${this.name} health points: ${this.health}`);
    return Math.floor(Math.random()* this.damage + 1);
  }
		
	attack() {
		this.health -= this.getDamage();
		console.log(`${this.name} health points: ${this.health}`);
  		return this.health;
	}
	
	
	heal() {
		this.health = 10;
		console.log(`${this.name} health points: ${this.health}`);
  			return this.health;
  		}
}

class player extends character {
  constructor(name) {
	  super(name);
	  this.name = name;
	  this.health = 40;
	  this.damage = 3;
	  this.healPower = 10;
	  this.healCount = 0;
  }
    getHeal() {
	  console.log(`${this.name} health points: ${this.health}`);
    return Math.floor(Math.random()* this.healPower + 1);
  }
  
  heal() {
    if (this.healCount === 2) {
      console.log("Sorry, you've used all your potions!");
    }
    else {
		  this.health += this.getHeal();
		  this.healCount++;
  			return this.health;
  		}
  }
  
}

const startGame = () => {
  
  var wantToPlay = prompt("Do you want to challenge the mighty Grant Chirpus? Y or N");
  
  if (wantToPlay.toUpperCase() === "Y") {
   return true;
}
  else {
  return false;
  }
};

let startCombat = () => {
   var continueCombat = prompt("Do you want to continue to fight against the mighty Grant Chirpus? Y or N");
  
  if (continueCombat.toUpperCase() === "Y") {
   return true;
}
  else {
    console.log("What a chicken! Bwaaaaak!");
  return false;
  }
};

const attackHeal = () => {
	let choice = prompt("Would you like to Attack or Heal? A or H");

	if (choice.toUpperCase() === "A") {
		return true;
	}
	else {
		return false;
	}
};


if (startGame()) {

  var playerOne = new player(prompt("What is your name, gladiator?"));
  var cpu = new character("Grant Chirpus");
  let doBattle = 1;

  do {
      while (playerOne.health > 0 && cpu.health > 0 && doBattle) {
    
    let randomNum = Math.random(0,1);
    
 attackChoice = attackHeal();

    if (attackChoice) {

    	if (randomNum > 0.5) {
     	 playerOne.attack();
    	}
  	  else {
      	cpu.attack();
 	 }
}

	else {
		playerOne.heal();
	}
  
  doBattle = startCombat();
  }

  
  //Breaks out of while loop when one player has reached 0 HP
//Checks user to see if GAME OVER
if( playerOne.health < 1) {
  console.log("\r" + "You won " + playerOne.wins + " against the invincible Grant Chirpus but have lost the war.");
  break;
}

else if (playerOne.health > 0 && !doBattle) {
  console.log("You ran away from your fight with Grant Chirpus. Game Over.");
  break;
}
//If user did not die, give them 1 more vistory and reset Grant's HP to 10
else {
  playerOne.wins++;
  console.log("Congratulations, hero, you have defeated the indefatigueable Grant Chirpus " + playerOne.wins + " times.");
  cpu.heal();
  }
}
  

  while (playerOne.wins < 3 && doBattle);

  if (playerOne.wins === 3) {
  console.log(playerOne.name + ", you have slain Grant 'apparently-not-as-strong-as-we-thought' Chirpus once and for all!");
  }
}


//If user doesn't want to fight, display taunt
else {
  console.log("What a little chicken.");
}
})();



// var cpu = new character("Grant Chirpus");
// var playerOne = new player("Keenan");
// console.log(playerOne.attack());
// console.log(playerOne.getDamage());
// console.log(playerOne.attack());
// console.log(playerOne.attack());
// console.log(playerOne.attack());
// console.log(cpu.getDamage());
// console.log(cpu.attack());
// console.log(cpu.heal());
// console.log(playerOne.heal());
// console.log(playerOne.heal());

