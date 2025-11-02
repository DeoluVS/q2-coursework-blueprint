//LEVEL 4
/*jshint esversion: 6 */
/* global bootstrap */

//This level will go on continuously until the user loses all lives.
let sequenceToMatch = [];
let copyOfSequence = [];
let activeTimeouts = [];
let points = 0;
let lives = 3;
let roundID = 0;
let playerInputs = 0;
let correctInputs = 0;
let maxInputs = 1;
let repeatCount = 1;
let sequencePoints = 0;
let sequenceSpeed = 2500;
const HIGHEST_SCORE_POSSIBLE = (3*100)+(4*100)+(5*100)+(6*100);
const numberOfSquares = 16;
//level 1 should have 4 max rounds just to ease the user in
const lastRound = 6;
//This boolean will turn off some functionality depending
//  on if the sequence is being actively shown or not.
let shownSequence = false;

//This a function that gets a random number between
// min and max including max and min
//Code gotten from the JavaScript documentation:
// https://developer.mozilla.org/en-US
// /docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    // The maximum is inclusive and the minimum is inclusive
}


function hideButtonX(buttonID){
    console.log("Button pressed");
    if(typeof buttonID == "number"){
        if(shownSequence === false){
            let button = document.getElementById(`shapeA${buttonID}`);
            button.style.visibility = "hidden";
        }else{
            pointCheck(buttonID);
        }
    }
}


//Since document.getElementById uses a string value to
//  find the element it is possible to use
//a for loop to iterate through all buttons but for
// now I will keep it simple but implement it
//if there are more levels
function showButtonX(buttonID){
    if(typeof buttonID == "number"){
        let button = document.getElementById(`shapeA${buttonID}`);
        button.style.visibility = "visible";
    }
}



//Hides all buttons at the same time. Normally used at the
//  beginning on the game when the sequence hasn"t been played.
//Or before the sequence starts.
function hideButtons(){
    for(let i=0; i<numberOfSquares; i++){
        hideButtonX(i+1);
    }
}

//Normally used after the sequence has done showing itself
//  ready for the user to enter their inputs
function showButtons(){
    for(let i=0; i<numberOfSquares; i++){
        showButtonX(i+1);
    }
}

//Every three rounds the timeDelay decreases
function increaseSpeed(){
    let timeDelay = (roundID % 3 == 0) ? -250 : 0;
    if(sequenceSpeed > 1000){
        sequenceSpeed += timeDelay;
    }
    console.log(`Current round Id is ${roundID} and current speed is ${sequenceSpeed}`);
}

//This randomly generates the sequence and adds it to the array
function generateSequence(){
    for (let i = 0; i < maxInputs; i++){
        sequenceToMatch.push(getRandomIntInclusive(1,numberOfSquares));
    }
    copyOfSequence = [...sequenceToMatch];
}

//Reworking the for loop to work by recursion instead
//  of the normal for loop:
//https://stackoverflow.com/questions/
// 3583724/how-do-i-add-a-delay-in-a-javascript-loop
/*function myLoop() {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    console.log("hello");   //  your code here
    i++;                    //  increment the counter
    if (i < 10) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another
    }                       //  ..  setTimeout()
  }, 3000);
}
let i=0;*/

//This starts the sequence and resets all the necessary
//  arrays and variables.


function resetButtonsIndex(){
    for (let i=0; i<numberOfSquares;i++){
        document.getElementById(`shapeA${i+1}`).style.backgroundColor =
         "rgb(0, 0, 255)";
    }
}

function resetButtons(){
    for (let i=0; i<numberOfSquares;i++){
        document.getElementById(`square-labelA${i+1}`).innerText = 0;
    }
}

function showEndGameModal(){
    document.getElementById("finalScoreL5").textContent = points;
    document.getElementById("finalPercentScoreL5").textContent
        = `You completed ${roundID} rounds`;
    const endModal = new bootstrap.Modal
    (document.getElementById("endGameModalL5"));
    endModal.show();
}

function restartGame(){
    const modalElement = document.getElementById("endGameModalL5");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if(modalInstance){
        modalInstance.hide();
    }

    //Fully reset all variables
    sequenceToMatch = [];
    copyOfSequence = [];
    activeTimeouts = [];
    maxInputs = 1;
    points = 0;
    lives = 3;
    i=0;
    playerInputs = 0;
    sequenceSpeed = 2500;

    showHearts();
    updateScoreBoard();
    shownSequence = false;
    startMemorySequence();
    console.log("Sequence to Match Array: ",sequenceToMatch);
}
let i = 0;
//This is the main function that presents the sequence to the user
function showButtonsPeriodically(){
    //This function uses recursion to call itself
    // just like a for loop. Using a for loop or while
    //loop felt too restrictive so making an iterator
    //  outside of the function made it less prone to
    //being reset on each recursive call or iteration.
    setTimeout(function() {
        i=i+1;
        // If the iterator is still less than maxInputs
        if(i<maxInputs+1 && sequenceToMatch){
            // Working off of previous iterations of this function it still uses similar logic to
            // level 4 but the speed of each sequence changes depending on the increaseSpeed()
            // function.
            const current = sequenceToMatch[i - 1];
            const prev = sequenceToMatch[i - 2];
            // Track consecutive counts
            if (current === prev) {
                repeatCount++;
            } else {
                repeatCount = 1;
            }
            //Simplified to just check if a number came through instead of making
            // multiple else if statements
            if(typeof sequenceToMatch[i-1] == "number"
                && sequenceToMatch[i-1] <= numberOfSquares
                && sequenceToMatch[i-1] > 0){
                oddOrEven(repeatCount,current);
                showButtonX(current);
                const t = setTimeout(() => {hideButtonX(current);
                }, sequenceSpeed);
                activeTimeouts.push(t);

            }else{
                console.log("Something is wrong");
            }
            showButtonsPeriodically();
        // If the maximum items match the iterator or more then let the user
        // Enter the sequence they remember
        }else if(i>=(maxInputs+1) && sequenceToMatch){
            //After sequenceToMatch has been fully gone through
            //  all buttons are shown for the user to
            //enter what they remember
            console.log("Showing buttons");
            resetButtonsIndex();
            showButtons();
            shownSequence = true;
            i=0;
        }

        //There"s a 2 second delay after each recursive call.
        //  It will change depending on difficulty.
    },sequenceSpeed);
}

//This function takes away a heart icon whenever the user picks the wrong button
function loseLife(){
    console.log("Lost life function called");
    document.getElementById(`live${lives}`).style.visibility = "hidden";
    lives-=1;
}

//Updates the current score. Attached to the pointScore() function.
function updateScoreBoard(){
    document.getElementById("scoreBoardL5").value = points;
}

function oddOrEven(number, buttonID){
    let button = document.getElementById(`shapeA${buttonID}`);
    if(typeof number == "number"){
        if(number %2 == 0){
            button.style.backgroundColor = "black";
        }else{
            button.style.backgroundColor = "rgb(0, 0, 255)";
        }
    }
}

function showHearts(){
    for (let i = 0; i<3; i++){
        document.getElementById(`live${i+1}`).style.visibility = "visible";
    }
}

//This is shown after the sequence has done being shown.
//  It checks if the user enters the right inputs in
//relation to the sequenceToMatch array.
function pointCheck(squareX){
    //Takes the first value at sequenceToMatch[0] removes
    //  it from the array and stores it in curSquare.
    //Eventually shift() will empty the array fully.
    let curSquare = sequenceToMatch.shift();
    //If curSquare is the same as the first value +100 points else
    //  -50 points
    let curScore = (squareX === curSquare) ? 100 : -50;
    points+=curScore;
    updateScoreBoard();
    playerInputs+=1;

    //If they chose wrong enter this if statement
    if (curScore === -50){
        //If they chose wrong and on their last life then end the game
        if (lives === 1){
            loseLife();
            showEndGameModal();
        }else{
            //If they chose wrong but still has more than 1 life lose 1 life
            // and remove a heart
            loseLife();
            shownSequence = false;
            //Make sure the pointCheck() function isn't accessible
            //Flash the screen red then after half a second switch back to white
            changeBackgroundColor(2);
            const t = setTimeout(() => {changeBackgroundColor(0);
                    }, 500);
            //Deep copy of copyOfSequence array to sequenceToMatch
            sequenceToMatch = [...copyOfSequence];
            playerInputs = 0;
            //Reset iterator
            i=0;
            //Hide all the buttons
            hideButtons();
            //Start the sequence again
            showButtonsPeriodically();
        }
    // If the user chose all the right buttons
    }else if (playerInputs === maxInputs){
        // Flash the screen green and switch back to white after half a second
        changeBackgroundColor(1);
        const t = setTimeout(() => {changeBackgroundColor(0);
                }, 500);
        playerInputs = 0;
        //maxInputs+=1 makes the next sequence longer
        maxInputs+=1;
        //Increase the roundID
        roundID+=1;
        // Reset the buttons colours back to blue
        resetButtonsIndex();
        //Start a new sequence
        startMemorySequence();

    }

}

function startMemorySequence(){
    document.getElementById("startBtnL5").disabled = true;
    sequenceToMatch = [];
    copyOfSequence = [];
    //This clears all timers that may still be running.
    for (const t of activeTimeouts) clearTimeout(t);
    activeTimeouts = [];
    shownSequence = false;
    i=0;
  	repeatCount = 1;
    increaseSpeed();
    if(lives>0){
        hideButtons();
        generateSequence();
        showButtonsPeriodically();
    }else{
        //This calls the bootstrap API to create a new modal instance
        showEndGameModal();
        return;
    }
}

function changeBackgroundColor(levelOfAccuracy){
    // Simplified since you can only be right or wrong and return to normal
    if(typeof levelOfAccuracy == "number"){
        if(levelOfAccuracy === 0){
            document.body.style.backgroundColor = "white";
        }else if(levelOfAccuracy === 1){
            document.body.style.backgroundColor = "#2bd42f";
        }else if(levelOfAccuracy === 2){
            document.body.style.backgroundColor = "#ff1300";
        }else{
            console.log("No colours left");
        }
    }else{
        console.log("Invalid levelOfAccuracy: ", levelOfAccuracy);
    }
}
