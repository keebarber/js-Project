var attackbutton = document.getElementById("attackbutton");

attackbutton.onclick = function() {

 //  let randomNum = Math.random(0,1);
 //    attackChoice = attackHeal();

 //    if (attackChoice) {

 //      if (randomNum > 0.5  ) {
 //       playerOne.attack();
 			document.getElementById("roundresult").innerHTML = "You attacked Grant Chirpus and did";
 //      }
 //      else {
 //        cpu.attack();
 			document.getElementById("roundresult").innerHTML = "Grant Chirpus attacked you and did ";
 //   }  
 // }

}

var healbutton = document.getElementById("healbutton");

healbutton = function() {

		playerOne.heal();
	 	document.getElementById("roundresult").innerHTML = "You chose to heal and recovered" + playerHealth;

}

var runbutton = document.getElementById("runbutton");

runbutton = function() {

		doBattle = 0;
	 	document.getElementById("roundresult").innerHTML = "You chickened out and ran away from Grant Chirpus!";

}



// btn.click = function click(){
//   var newElement = document.createElement("p");                 // Create a <li> node
//   var insertText = document.createTextNode("hello!");         // Create a text node
//   newElement.appendChild(insertText);                              // Append the text to <li>
//   document.body.appendChild(newElement);  
// }