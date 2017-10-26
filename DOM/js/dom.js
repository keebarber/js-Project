(function() {
// declare global variables
  let playerOne;
  let cpu;
  let doBattle = 0;
  // if these vars are declared in startGame(), they are not accessible in other functions


    // MAIN GAME FUNCTIONS

var playgame = document.getElementById("startButton");

playgame.onclick = function startGame() {
  var wantToPlay = window.confirm("Are you sure you want to challenge the mighty Grant Chirpus?");
  var UI = document.getElementById("UI");

  
  if (wantToPlay) {
    // hide start button and show playButtons
    var startEl = document.getElementById('startButton');
    startEl.style.display = "none";

    var playEls = document.getElementsByClassName('buttons');
    for (var i = 0; i < playEls.length; i++){
      playEls[i].style.display = "inline";
    }
    // create the objects

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
      document.getElementById("UI").innerHTML = `${this.name} attacked and did ${damageDealt} damage!`;
      updateGame();
        return this.health;
    }
   
   //Default setting for CPU is to heal to max health
    heal() {
      this.health = this.maxHealth;
      document.getElementById("UI").innerHTML = `${this.name} health points: ${this.health}`;
      updateGame();
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
        document.getElementById("UI").innerHTML = "Sorry, you've used all your potions!";
      } else {
        //If player still has heals, function executes
        let healthRestored = this.getHeal();
        let newHealth = this.health + healthRestored;
       
        //Checks new health with max health and returns max health is new health is over player max health
        if (newHealth > this.maxHealth) {
          let healthRestored = this.maxHealth - this.health;
          this.health = this.maxHealth;
          document.getElementById("UI").innerHTML = `${this.name} has restored ${healthRestored} HP and now has ${this.health} HP.`;
        } else {
          //Otherwise heals player based on getHeal function return value
          this.health = newHealth;
              document.getElementById("UI").innerHTML = `${this.name} has restored ${healthRestored} HP and now has ${this.health} HP.`;
        }
        //Checks amount of times healed and lets player know how many potions remain
        this.healCount++;
        switch(this.healCount) {
          case 1:
            document.getElementById("UI").innerHTML = `${this.name} has used 1 potion and has 1 remaining.`;
            break;
          case 2: 
            document.getElementById("UI").innerHTML = `${this.name} has used 2 potions and has 0 remaining.`;
            break;
          default:
            document.getElementById("UI").innerHTML = "This is the default potion message!";
            break;
        }
        return this.health;
      }
    }
  }
  playerOne = new player(prompt("What is your name, gladiator?"));
  cpu = new character("Grant Chirpus");
  doBattle = 1;

  updateGame();

  // document.getElementById("playername").innerHTML = playerOne.name;
  // document.getElementById("playerhealth").innerHTML = `${playerOne.name} Health: ${playerOne.health}`;
  // document.getElementById("playerheals").innerHTML = `${playerOne.name} Heals Used: ${playerOne.healCount}`;
  // document.getElementById("userwins").innerHTML = `${playerOne.name} Wins: ${playerOne.wins}`;

  // document.getElementById("cpuname").innerHTML = cpu.name;
  // document.getElementById("cpuhealth").innerHTML = `${cpu.name} Health: ${cpu.health}`;

  //   document.getElementById("UI").innerHTML = "Let's Battle!";

    
  } else {
    document.getElementById("UI").innerHTML = "What a little chicken! Bwaaak!";
    return false;
    // display message, keep start button visible
  }
}
// end of startGame function



// called by playButtons with arguments

// function startCombat(action){
//   if (playerOne.health > 0 && cpu.health > 0 && doBattle) {
//     console.log(action);
//     if(action === "quit"){
//       console.log("What a little chicken.");
//     }
//     else if (action === "heal"){
//       playerOne.heal();
//     }
//   } else {
//     console.log("game over");
//   }
// }

// called by startCombat function via ATTACK btn, determines who will attack
// function selectAttack(){
//   let randomNum = Math.random(0,1);
//   if (randomNum > 0.5) {
//    playerOne.attack();
//   } else {
//     cpu.attack();
//   }
// } 


//  Initializes the attack button
var attackbutton = document.getElementById("attackbutton");


attackbutton.onclick = function() {
  attack2();
};

function attack2() {

if (!doBattle) {
  return;
}
else {
  let randomNum = Math.random(0,1);
  if (randomNum > 0.5) {
   playerOne.attack();
  } else {
    cpu.attack();
  }
  updateGame();
}
}


//  Initializes the heal button
var healbutton = document.getElementById("healbutton");

healbutton.onclick = function() {
  heal2();
}

function heal2() {

  if (!doBattle) {
  return;
  }
else {
  playerOne.heal();
  updateGame();
  }
}

// Initializes the quit game button
var quitbutton = document.getElementById("quitbutton");

quitbutton.onclick = function() {
  quit2();
}

function quit2() {

  doBattle = 0;
  document.getElementById("UI").innerHTML = `Game Over! You decided to run away from Grant Chirpus to live to die another day.`;
  updateGame();
}



function updateGame() {

  document.getElementById("playername").innerHTML = playerOne.name;
  document.getElementById("playerhealth").innerHTML = `${playerOne.name} Health: ${playerOne.health}`;
  document.getElementById("playerheals").innerHTML = `${playerOne.name} Heals Used: ${playerOne.healCount}`;
  document.getElementById("userwins").innerHTML = `${playerOne.name} Wins: ${playerOne.wins}`;

  document.getElementById("cpuname").innerHTML = cpu.name;
  document.getElementById("cpuhealth").innerHTML = `${cpu.name} Health: ${cpu.health}`;

  endRoundCheck();
}

// var endRound = document.getElementById()

function endRoundCheck() {
  //Checks user to see if GAME OVER
if(playerOne.health < 1) {
  document.getElementById("UI").innerHTML = `You won ${playerOne.wins} rounds against Grant Chirpus but lost the war!`;
  startEl = document.getElementById('startButton');
  startEl.style.display = "block";
  doBattle = 0;
}

else if (playerOne.health > 0 && cpu.health < 1 && playerOne.wins < 2) {
  document.getElementById("UI").innerHTML = `You have stunned Grant Chirpus! But wait, he's rising again!`;
  playerOne.wins++;
  cpu.heal();
}
//If user did not die, give them 1 more vistory and reset Grant's HP to 10
else if (playerOne.health > 0 && cpu.health < 1 && playerOne.wins === 2) {
  ++playerOne.wins;
  document.getElementById("UI").innerHTML = `You have defeated the undefeatable Grant Chirpus!`;
  startEl = document.getElementById('startButton');
  startEl.style.display = "block";
  doBattle = 0;
    }
  }


})(); 
// MAIN GAME STATE


/* if (startGame()) {


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
*/