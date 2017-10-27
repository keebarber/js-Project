(function() {
// declare global variables
  let playerOne;
  let cpu;
  let doBattle = 0;


// MAIN GAME FUNCTIONS

//  Sets StartGame function to begin game by using 'Start' button
var playgame = document.getElementById("startButton");

playgame.onclick = function startGame() {
  var wantToPlay = window.confirm("Are you sure you want to challenge the mighty Grant Chirpus?");
  var UI = document.getElementById("UI");


  //  Checks if the user wants to play the game. Initilizes objects if yes, quits game if no  
  if (wantToPlay) {
    // hide start button and show playButtons
    var startEl = document.getElementById('startButton');
    startEl.style.display = "none";

    var playEls = document.getElementsByClassName('buttons');
    for (var i = 0; i < playEls.length; i++){
      playEls[i].style.display = "flex";
    }
    
    let infoEls = document.getElementsByClassName('interface');
      for (let i = 0; i < infoEls.length; i++){
        infoEls[i].style.display = "flex";
    }
    
  // Creates character class with common functions/properties for players to share
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
      
    //Calls attack function to do damage when in battle. Calculates damages and prints result to screen
    attack() {
      let damageDealt = this.getDamage()
      this.health -= damageDealt;
      console.log(`${this.name} health points: ${this.health}`);
      if (this.name === playerOne.name) {
            document.getElementById("UI").innerHTML = `${cpu.name} attacked and did ${damageDealt} damage!`;
      }
      else {
          document.getElementById("UI").innerHTML = `${playerOne.name} attacked and did ${damageDealt} damage!`;
      }
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

    //Randomly returns amount between 1-10HP to heal and outputs result
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

          //Otherwise heals player based on getHeal function random return value
          this.health = newHealth;
              document.getElementById("UI").innerHTML = `${this.name} has restored ${healthRestored} HP and now has ${this.health} HP.`;
        }

        //Checks amount of times healed and lets player know how many potions remain
        this.healCount++;
        let potionsRemaining = 2 - this.healCount;
        switch(this.healCount) {
          case 1:
            document.getElementById("UI").innerHTML = `${this.name} has used 1 potion and has ${potionsRemaining} remaining.`;
            break;
          case 2: 
            document.getElementById("UI").innerHTML = `${this.name} has used 2 potions and has ${potionsRemaining} remaining.`;
            break;
          default:
            document.getElementById("UI").innerHTML = "This is the default potion message!";
            break;
        }
        return this.health;
      }
    }
  }

  //Sets up character objects and prints initial game data
  playerOne = new player(prompt("What is your name, gladiator?"));
  cpu = new character("Grant Chirpus");
  doBattle = 1;
  document.getElementById("UI").innerHTML = ``;

  updateGame();

    
  //If player does not want to play the game, outputs message, recalls 'Start' button and quits main playGame state
  } else {
    document.getElementById("UI").innerHTML = "What a little chicken! Bwaaak!";
    return false;
    // display message, keep start button visible
  }
}

//  Initializes the attack button event
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


//  Initializes the heal button event
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

// Initializes the quit game button event
var quitbutton = document.getElementById("quitbutton");

quitbutton.onclick = function() {
  quit2();
}

function quit2() {

  doBattle = 0;
  document.getElementById("UI").innerHTML = `Game Over! You decided to run away from Grant Chirpus to live to die another day.`;
  let startEl = document.getElementById('startButton');
  startEl.style.display = "flex";
  updateGame();
}



//  Updates the screen text after each round. 
function updateGame() {

  document.getElementById("playername").innerHTML = playerOne.name;
  document.getElementById("playerhealth").innerHTML = `${playerOne.name} Health: ${playerOne.health}`;
  document.getElementById("playerheals").innerHTML = `${playerOne.name} Heals Used: ${playerOne.healCount}`;
  document.getElementById("userwins").innerHTML = `${playerOne.name} Wins: ${playerOne.wins}`;

  document.getElementById("cpuname").innerHTML = cpu.name;
  document.getElementById("cpuhealth").innerHTML = `${cpu.name} Health: ${cpu.health}`;

  endRoundCheck();
}



function endRoundCheck() {

  //Checks user to see if GAME OVER
if(playerOne.health < 1) {
  document.getElementById("UI").innerHTML = `You won ${playerOne.wins} rounds against Grant Chirpus but lost the war!`;
  let startEl = document.getElementById('startButton');
  startEl.style.display = "flex";
  doBattle = 0;
}

//  Outputs if player has beating CPU 1 or 2 times. If user did not die, give them 1 more vistory and reset Grant's HP to 10
else if (playerOne.health > 0 && cpu.health < 1 && playerOne.wins < 2) {
  document.getElementById("UI").innerHTML = `You have stunned Grant Chirpus! But wait, he's rising again!`;
  playerOne.wins++;
  cpu.heal();
}

//  If player has made it to 3 vistories, output winning message
else if (playerOne.health > 0 && cpu.health < 1 && playerOne.wins === 2) {
  ++playerOne.wins;
  document.getElementById("UI").innerHTML = `You have defeated the undefeatable Grant Chirpus!`;
  let startEl = document.getElementById('startButton');
  startEl.style.display = "flex";
  doBattle = 0;
    }
  }
  
})(); 