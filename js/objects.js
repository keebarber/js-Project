(function() {
  class character {
		constructor(name) {
			this.name = name;
			this.health = 10;
			this.wins = 0;
			this.damage = 3;
      this.maxHealth = 10;
		}
		

    //Get's attack damage for each character
	getDamage() {
    return Math.floor(Math.random()* this.damage + 1);
  }
		
    //Calls attack function to do damage when in battle
	attack() {
    let damageDealt = this.getDamage()
		this.health -= damageDealt;
		console.log(`${this.name} health points: ${this.health}`);
  		return this.health;
	}
	
	 
   //Default setting for CPU is to heal to max health
	heal() {
		this.health = this.maxHealth;
		console.log(`${this.name} health points: ${this.health}`);
  			return this.health;
  		}
}

  //Creates the player class using similar functions to parent class: character

class player extends character {
  constructor(name) {
	  super(name);
	  this.name = name;
	  this.health = 40;
	  this.damage = 5;
	  this.healPower = 10;
	  this.healCount = 0;
    this.maxHealth = 40;
  }

      //Randomly returns amount between 1-10HP to heal
  getHeal() {
	  console.log(`${this.name} health points: ${this.health}`);
    return Math.floor(Math.random()* this.healPower + 1);
  }
  
    //Function called to heal. Checks if character hasn't used all their heals first
  heal() {
    if (this.healCount === 2) {
      console.log("Sorry, you've used all your potions!");
    }

      //If player still has heals, function executes
    else {
      let healthRestored = this.getHeal();
		  let newHealth = this.health + healthRestored;
     

        //Checks new health with max health and returns max health is new health is over player max health
      if (newHealth > this.maxHealth) {
        let healthRestored = this.maxHealth - this.health;
        this.health = this.maxHealth;
        console.log(`${this.name} has restored ${healthRestored} HP and now has ${this.health} HP.`);
      }
        //Otherwise heals player based on getHeal function return value
      else {
        this.health = newHealth;
            console.log(`${this.name} has restored ${healthRestored} HP and now has ${this.health} HP.`);
      }
        //Checks amount of times healed and lets player know how many potions remain
		  this.healCount++;
      switch(this.healCount) {
        case 1:
          console.log(`${this.name} has used 1 potion and has 1 remaining.`);
          break;
        case 2: 
          console.log(`${this.name} has used 2 potions and has 0 remaining.`);
          break;
        default:
          console.log("This is the default potion message!");
          break;
        }
  			return this.health;
      }
  		
  }
  
}

    // MAIN GAME FUNCTIONS

const startGame = () => {
  
  var wantToPlay = window.confirm("Do you want to challenge the mighty Grant Chirpus?");
  
  if (wantToPlay) {
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
}
  else {
    console.log("What a chicken! Bwaaaaak!");
  return false;
  }
};

const attackHeal = () => {
	let choice = window.confirm("Would you like to Attack or Heal? OK: Attack - Cancel: Heal");


	if (choice) {
		return true;
	}
	else { 
		return false;
	}
};


// MAIN GAME STATE


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
  if (playerOne.wins < 3) {
    cpu.heal();
    }
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