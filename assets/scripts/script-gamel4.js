//LEVEL 4
/*jshint esversion: 6 */
/* global bootstrap */

let sequenceToMatch = [];
let activeTimeouts = [];
let points = 0;
let playerInputs = 0;
let correctInputs = 0;
let maxInputs = 3;
let repeatCount = 1;
let sequencePoints = 0;
const HIGHEST_SCORE_POSSIBLE = (3*100)+(4*100)+(5*100)+(6*100);
const numberOfSquares = 9;
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
            let button = document.getElementById(`shapeZ${buttonID}`);
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
        let button = document.getElementById(`shapeZ${buttonID}`);
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

//This randomly generates the sequence and adds it to the array
function generateSequence(){
    for (let i = 0; i < maxInputs; i++){
        sequenceToMatch.push(getRandomIntInclusive(1,numberOfSquares));
    }
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
function startMemorySequence(){
    document.getElementById("startBtnL4").disabled = true;
    sequenceToMatch = [];
    //This clears all timers that may still be running.
    for (const t of activeTimeouts) clearTimeout(t);
    activeTimeouts = [];
    shownSequence = false;
    i=0;
  	repeatCount = 1;
    if(maxInputs <= lastRound){
        hideButtons();
        generateSequence();
        showButtonsPeriodically();
    }else{
        //This calls the bootstrap API to create a new modal instance
        showEndGameModal();
        return;
    }
}


function resetButtons(){
    for (let i=0; i<numberOfSquares;i++){
        document.getElementById(`shapeZ${i+1}`).style.backgroundColor =
         "rgb(0, 0, 255)";
    }
}

function showEndGameModal(){
    document.getElementById("finalScoreL4").textContent = points;
    let percent = parseInt((points/HIGHEST_SCORE_POSSIBLE)*100);
    let percentScore = `${percent}%`;
    document.getElementById("finalPercentScoreL4").textContent = percentScore;
    const endModal = new bootstrap.Modal
    (document.getElementById("endGameModalL4"));
    endModal.show();
}

function restartGame(){
    const modalElement = document.getElementById("endGameModalL4");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if(modalInstance){
        modalInstance.hide();
    }
    maxInputs = 3;
    points = 0;
    updateScoreBoard();
    sequencePoints = 0;
    shownSequence = false;
    startMemorySequence();
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
        //Eventually the condition of it being i<5 will
        //  be more automated to allow for an increase of difficulty
        //  and more values coming up.
        if(i<maxInputs+1 && sequenceToMatch){
            //ChatGPT helped out for the check between the current
            //  and previous element.
            //Its a quality of life improvement that allows for a
            // value to appear on the square for any repeat
            //squares chosen in the sequence.
            const current = sequenceToMatch[i - 1];
            const prev = sequenceToMatch[i - 2];
            // Track consecutive counts
            if (current === prev) {
                repeatCount++;
            } else {
                repeatCount = 1;
            }
            // Update display number on the square
            const squareElement = document.getElementById(
                "square-labelZ" + current
            );
            if (squareElement) {
                squareElement.innerText = repeatCount; // show 1, 2, 3, ...
            }
            //This will increase to more if statements when there
            //  are more squares.
            //To recreate the sequence it iterates through the
            //  sequenceToMatch function and shows,
            //the button in relation to i (i-1 since the sequence only
            //  includes numbers 1-4 but array starts from
            //0-3).
            if(sequenceToMatch[i-1] === 1){
                oddOrEven(repeatCount, 1);
                showButtonX(1);
                //Changed to be iniitialised each time to ensure there
                // aren't repeat old timers being used.
                const t = setTimeout(() => {hideButtonX(1);
                }, 1000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 2){
                oddOrEven(repeatCount,2);
                showButtonX(2);
                const t = setTimeout(() => {hideButtonX(2);
                }, 1000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 3){
                oddOrEven(repeatCount,3);
                showButtonX(3);
                const t = setTimeout(() => {hideButtonX(3);
                }, 1000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 4){
                oddOrEven(repeatCount,4);
                showButtonX(4);
                const t = setTimeout(() => {hideButtonX(4);
                }, 1000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 5){
                oddOrEven(repeatCount,5);
                showButtonX(5);
                const t = setTimeout(() => {hideButtonX(5);
                }, 1000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 6){
                oddOrEven(repeatCount,6);
                showButtonX(6);
                const t = setTimeout(() => {hideButtonX(6);
                }, 1000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 7){
                oddOrEven(repeatCount,7);
                showButtonX(7);
                const t = setTimeout(() => {hideButtonX(7);
                }, 1000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 8){
                oddOrEven(repeatCount,8);
                showButtonX(8);
                const t = setTimeout(() => {hideButtonX(8);
                }, 1000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 9){
                oddOrEven(repeatCount,9);
                showButtonX(9);
                const t = setTimeout(() => {hideButtonX(9);
                }, 1000);
                activeTimeouts.push(t);

            }else{
                console.log("Something is wrong");
            }
            showButtonsPeriodically();
        }else if(i>=(maxInputs+1) && sequenceToMatch){
            //After sequenceToMatch has been fully gone through
            //  all buttons are shown for the user to
            //enter what they remember
            console.log("Showing buttons");
            showButtons();
            shownSequence = true;
            i=0;
        }
        //document.getElementById("sequence-order").innerHTML
        // = sequenceToMatch;
        //There"s a 2 second delay after each recursive call.
        //  It will change depending on difficulty.
    },1000);
}

function updateScoreBoard(){
    document.getElementById("scoreBoardL4").value = points;
}

function oddOrEven(number, buttonID){
    let button = document.getElementById(`shapeZ${buttonID}`);
    if(typeof number == "number"){
        if(number %2 == 0){
            button.style.backgroundColor = "black";
        }else{
            button.style.backgroundColor = "rgb(0, 0, 255)";
        }
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
    //If curSquare is the same as the first value
    if(squareX === curSquare && curSquare){
        //100 points for the correct input and -50 for anything wrong
        points = points + 100;
        sequencePoints+=100;
        updateScoreBoard();
        //playerInputs checks if the user has chosen the same
        //  amount of inputs as the sequenceToMatch initial length (4),
        //and gets incremented by 1 each time the user inputs something.
        playerInputs+=1;
        correctInputs+=1;
        //4 will be replaced by a variable to make it easier to
        //  increase difficulty
        if(playerInputs === maxInputs){
            //Depending on how many inputs the user got correct
            //  a value will be passed into changeBackgroundColor()
            changeBackgroundColor(sequencePoints);
            //There will be a mini delay for when the background
            // colour changes back to normal
            setTimeout(() => {changeBackgroundColor(1000000);
                }, 500);
            //This resets the values to allow for the user
            // to play the next sequence
            correctInputs = 0;
            playerInputs = 0;
            sequencePoints = 0;
            //This is for testing and checks if all the values
            //  have been emptied out
            maxInputs+=1;
            resetButtons();
            startMemorySequence();
        }
    }else if (squareX !== curSquare && curSquare){
        points = points - 50;
        sequencePoints-=50;
        updateScoreBoard();
        playerInputs+=1;
        if(playerInputs === maxInputs){
            changeBackgroundColor(sequencePoints);
            setTimeout(() => {changeBackgroundColor(1000000);
                }, 500);
            correctInputs = 0;
            playerInputs = 0;
            sequencePoints = 0;
            maxInputs+=1;
            startMemorySequence();
            resetButtons();
        }
    }else{
        console.log("Empty array or something went wrong");
    }
}

function changeBackgroundColor(levelOfAccuracy){
    const maxPointsPossible = maxInputs * 100;
    //Depending on how correct the player is the screen
    //  will change to the corresponding colours.
    //To increase difficulty, the level of accuracy will be
    //  done by percent of max number of points. For example,
    //level 1 max points = (lengthOfSequence*100). And done by
    //  what amount of points obtained that level instead of
    //overall points. As that would make it really hard to ever
    //  get a full correct green win.
    //Green is maxpoint, orange is green/yellow is 80%, orange
    //  is 60%, orange/red is 40, and red is 20 and below.
    if(typeof levelOfAccuracy == "number"){
        if(levelOfAccuracy === 1000000){
            document.body.style.backgroundColor = "white";
        }else if(levelOfAccuracy === maxPointsPossible){
            document.body.style.backgroundColor = "#2bd42f";
        }else if(levelOfAccuracy < maxPointsPossible &&
             levelOfAccuracy >= (maxPointsPossible*0.75)){
            document.body.style.backgroundColor = "#d5e41b";
        }else if(levelOfAccuracy < (maxPointsPossible *0.75) &&
         levelOfAccuracy >= (maxPointsPossible*0.5)){
            document.body.style.backgroundColor = "#f1990e";
        }else if(levelOfAccuracy < (maxPointsPossible * 0.5) &&
         levelOfAccuracy >= (maxPointsPossible*0.25)){
            document.body.style.backgroundColor = "#ff6000";
        }else if(levelOfAccuracy < (maxPointsPossible *0.25)){
            document.body.style.backgroundColor = "#ff1300";
        }else{
            console.log("No colours left");
        }
    }else{
        console.log("Invalid levelOfAccuracy: ", levelOfAccuracy);
    }
}
