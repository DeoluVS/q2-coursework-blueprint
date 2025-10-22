//LEVEL 2 CODE
let gameArr = [];
let sequenceToMatch = [];
let activeTimeouts = [];
let points = 0;
let playerInputs = 0;
let correctInputs = 0;
let maxInputs = 3;
let sequencePoints = 0;
const numberOfSquares = 9;
const highestScorePossible = (3*100)+(4*100)+(5*100)+(6*100);
//level 1 should have 4 max rounds just to ease the user in 
const lastRound = 6;
//This boolean will turn off some functionality depending on if the sequence is being actively shown or not. 
let shownSequence = false;

//This a function that gets a random number between min and max including max and min 
//Code gotten from the JavaScript documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

//Await function used from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
function hideButton1() {
    //When the sequence runs after the button has been pressed this function will mostly work to remove 
    //buttons. When the sequence has finished showing itself it will take in user inputs to check if they 
    //remember the sequence.
    console.log('showSequence = ',shownSequence);
    if(shownSequence === false){
        let button = document.getElementById("shapeX1");
        button.style.visibility = "hidden";
        console.log('Hidden 1');
        gameArr = [];
    }else{
        //GameArr will be removed but is mostly used for testing. In the deployment phase it will be removed.
        console.log('Taking points in');
        pointCheck(1);  //Depending on the square an input will be sent to the pointCheck function to see if the user
        gameArr.push(1);//is correct. This is the same for all hideButton functions
         
    }
    
    console.log('GameArr: ',gameArr);
}

function hideButton2(){
    console.log('showSequence = ',shownSequence);
    if(shownSequence === false){
        let button = document.getElementById("shapeX2");
        button.style.visibility = "hidden";
        console.log('Hidden 2');
        gameArr = [];
    }else{
        console.log('Taking points in');
        pointCheck(2);
        gameArr.push(2);
         
    }
    
    console.log('GameArr: ',gameArr);
}
function hideButton3(){
    console.log('showSequence = ',shownSequence);
    if(shownSequence === false){
        let button = document.getElementById("shapeX3");
        button.style.visibility = "hidden";
        console.log('Hidden 3');
        gameArr = [];
    }else{
        console.log('Taking points in');
        pointCheck(3);
        gameArr.push(3);    
    }
    console.log('GameArr: ',gameArr);
}
function hideButton4(){
    console.log('showSequence = ',shownSequence);
    if(shownSequence === false){
        let button = document.getElementById("shapeX4");
        button.style.visibility = "hidden";
        console.log('Hidden 4');
        gameArr = [];
    }else{
        console.log('Taking points in');
        pointCheck(4);
        gameArr.push(4);    
    }
      console.log('GameArr: ',gameArr);
}

function hideButton5(){
    console.log('showSequence = ',shownSequence);
    if(shownSequence === false){
        let button = document.getElementById("shapeX5");
        button.style.visibility = "hidden";
        console.log('Hidden 5');
        gameArr = [];
    }else{
        console.log('Taking points in');
        pointCheck(5);
        gameArr.push(5);    
    }
      console.log('GameArr: ',gameArr);
}

function hideButton6(){
    console.log('showSequence = ',shownSequence);
    if(shownSequence === false){
        let button = document.getElementById("shapeX6");
        button.style.visibility = "hidden";
        console.log('Hidden 6');
        gameArr = [];
    }else{
        console.log('Taking points in');
        pointCheck(6);
        gameArr.push(6);    
    }
      console.log('GameArr: ',gameArr);
}

function hideButton7(){
    console.log('showSequence = ',shownSequence);
    if(shownSequence === false){
        let button = document.getElementById("shapeX7");
        button.style.visibility = "hidden";
        console.log('Hidden 7');
        gameArr = [];
    }else{
        console.log('Taking points in');
        pointCheck(7);
        gameArr.push(7);    
    }
      console.log('GameArr: ',gameArr);
}

function hideButton8(){
    console.log('showSequence = ',shownSequence);
    if(shownSequence === false){
        let button = document.getElementById("shapeX8");
        button.style.visibility = "hidden";
        console.log('Hidden 8');
        gameArr = [];
    }else{
        console.log('Taking points in');
        pointCheck(8);
        gameArr.push(8);    
    }
      console.log('GameArr: ',gameArr);
}

function hideButton9(){
    console.log('showSequence = ',shownSequence);
    if(shownSequence === false){
        let button = document.getElementById("shapeX9");
        button.style.visibility = "hidden";
        console.log('Hidden 9');
        gameArr = [];
    }else{
        console.log('Taking points in');
        pointCheck(9);
        gameArr.push(9);    
    }
      console.log('GameArr: ',gameArr);
}

//Since document.getElementById uses a string value to find the element it is possible to use
//a for loop to iterate through all buttons but for now I will keep it simple but implement it 
//if there are more levels
function showButton1(){
    let button = document.getElementById("shapeX1");
    button.style.visibility = "visible";
    console.log("Shown 1");
}

function showButton2(){
    let button = document.getElementById("shapeX2");
    button.style.visibility = "visible";
    console.log("Shown 2");
}
function showButton3(){
    let button = document.getElementById("shapeX3");
    button.style.visibility = "visible";
    console.log("Shown 3");
}
function showButton4(){
    let button = document.getElementById("shapeX4");
    button.style.visibility = "visible";
    console.log("Shown 4");
}

function showButton5(){
    let button = document.getElementById("shapeX5");
    button.style.visibility = "visible";
    console.log("Shown 4");
}
function showButton6(){
    let button = document.getElementById("shapeX6");
    button.style.visibility = "visible";
    console.log("Shown 6");
}
function showButton7(){
    let button = document.getElementById("shapeX7");
    button.style.visibility = "visible";
    console.log("Shown 7");
}
function showButton8(){
    let button = document.getElementById("shapeX8");
    button.style.visibility = "visible";
    console.log("Shown 8");
}
function showButton9(){
    let button = document.getElementById("shapeX9");
    button.style.visibility = "visible";
    console.log("Shown 9");
}

//Hides all buttons at the same time. Normally used at the beginning on the game when the sequence hasn't been played.
//Or before the sequence starts.
function hideButtons(){
    hideButton1();
    hideButton2();
    hideButton3();
    hideButton4();
    hideButton5();
    hideButton6();
    hideButton7();
    hideButton8();
    hideButton9();
}

//Normally used after the sequence has done showing itself ready for the user to enter their inputs
function showButton(){
    showButton1();
    showButton2();
    showButton3();
    showButton4();
    showButton5();
    showButton6();
    showButton7();
    showButton8();
    showButton9();
}

//This function is mostly for testing and will be removed after the deployment phase starts
function updateArr(){
    if (shownSequence){
        document.getElementById("sequence-order").innerHTML = gameArr;
    }else{
        document.getElementById('check-array').innerHTML = sequenceToMatch;
    }
}

//This randomly generates the sequence and adds it to the array
function generateSequence(){
    for (let i=0; i<maxInputs;i++){
        sequenceToMatch.push(getRandomIntInclusive(1,numberOfSquares));
    }
    console.log(sequenceToMatch);
}

//Reworking the for loop to work by recursion instead of the normal for loop:
//https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
function myLoop() {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    console.log('hello');   //  your code here
    i++;                    //  increment the counter
    if (i < 10) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 3000)
} 

let i=0;

//This starts the sequence and resets all the necessary arrays and variables.
function startMemorySequence(){
    document.getElementById('startBtnL2').disabled = true;
    sequenceToMatch = [];
    //This clears all timers that may still be running.
    for (const t of activeTimeouts) clearTimeout(t);
    activeTimeouts = [];
    shownSequence = false;
    i=0;
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

function showEndGameModal(){
    document.getElementById('finalScoreL2').textContent = points;
    let percent = parseInt((points/highestScorePossible)*100);
    let percentScore = `${percent}%`;
    document.getElementById('finalPercentScoreL2').textContent = percentScore;
    const endModal = new bootstrap.Modal(document.getElementById('endGameModalL2'));
    endModal.show();
}

function resetButtons(){
    for (let i=0; i<9;i++){
        document.getElementById(`square-labelX${i+1}`).innerText = 0;
    }
}

function restartGame(){
    const modalElement = document.getElementById("endGameModalL2");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if(modalInstance){
        modalInstance.hide();
    }
    maxInputs = 3;
    points = 0;
    sequencePoints = 0;
    shownSequence = false;
    startMemorySequence();
}

//This is the main function that presents the sequence to the user
function showButtonsPeriodically(){
    //This function uses recursion to call itself just like a for loop. Using a for loop or while
    //loop felt too restrictive so making an iterator outside of the function made it less prone to
    //being reset on each recursive call or iteration. 
    setTimeout(function() {
        i=i+1;
        //Eventually the condition of it being i<5 will be more automated to allow for an increase of difficulty and more values coming up. 
        if(i<maxInputs+1 && sequenceToMatch){
            //ChatGPT helped out for the check between the current and previous element. 
            //Its a quality of life improvement that allows for a value to appear on the square for any repeat
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
            const squareElement = document.getElementById('square-labelX' + current);
            if (squareElement) {
                squareElement.innerText = repeatCount; // show 1, 2, 3, ...
            }
            //This will increase to more if statements when there are more squares. 
            //To recreate the sequence it iterates through the sequenceToMatch function and shows,
            //the button in relation to i (i-1 since the sequence only includes numbers 1-4 but array starts from
            //0-3). 
            if(sequenceToMatch[i-1] === 1){
                showButton1();
                //Changed to be iniitialised each time to ensure there aren't repeat old timers being used.
                const t = setTimeout(() => {hideButton1();
                }, 2000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 2){
                showButton2();
                const t = setTimeout(() => {hideButton2();
                }, 2000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 3){
                showButton3();
                const t = setTimeout(() => {hideButton3();
                }, 2000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 4){
                showButton4();
                const t = setTimeout(() => {hideButton4();
                }, 2000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 5){
                showButton5();
                const t = setTimeout(() => {hideButton5();
                }, 2000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 6){
                showButton6();
                const t = setTimeout(() => {hideButton6();
                }, 2000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 7){
                showButton7();
                const t = setTimeout(() => {hideButton7();
                }, 2000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 8){
                showButton8();
                const t = setTimeout(() => {hideButton8();
                }, 2000);
                activeTimeouts.push(t);
            }else if(sequenceToMatch[i-1] === 9){
                showButton9();
                const t = setTimeout(() => {hideButton9();
                }, 2000);
                activeTimeouts.push(t);
            
            }else{
                console.log("Something is wrong");
            }
            showButtonsPeriodically();
        }else if(i>=(maxInputs+1) && sequenceToMatch){
            //After sequenceToMatch has been fully gone through all buttons are shown for the user to 
            //enter what they remember
            showButton();
            shownSequence = true;
            i=0;    
        }
        
        //There's a 2 second delay after each recursive call. It will change depending on difficulty.
    },2000)
}

function updateScoreBoard(){
    document.getElementById("scoreBoardL2").value = points;
}

//This is shown after the sequence has done being shown. It checks if the user enters the right inputs in
//relation to the sequenceToMatch array. 
function pointCheck(squareX){
    console.log('Function activated');
    //Takes the first value at sequenceToMatch[0] removes it from the array and stores it in curSquare.
    //Eventually shift() will empty the array fully.
    let curSquare = sequenceToMatch.shift();
    //If curSquare is the same as the first value
    if(squareX === curSquare && curSquare){
        console.log("Correct");
        //100 points for the correct input and -50 for anything wrong
        points = points + 100;
        sequencePoints+=100;
        updateScoreBoard();
        //playerInputs checks if the user has chosen the same amount of inputs as the sequenceToMatch initial length (4),
        //and gets incremented by 1 each time the user inputs something.
        playerInputs+=1;
        correctInputs+=1;
        console.log("Current total points: ", points);
        //4 will be replaced by a variable to make it easier to increase difficulty
        if(playerInputs === maxInputs){
            //Depending on how many inputs the user got correct a value will be passed into changeBackgroundColor()
            changeBackgroundColor(sequencePoints);
            //There will be a mini delay for when the background colour changes back to normal
            setTimeout(() => {changeBackgroundColor(1000000);
                }, 500);
            //This resets the values to allow for the user to play the next sequence    
            correctInputs = 0;
            playerInputs = 0;
            sequencePoints = 0;
            //This is for testing and checks if all the values have been emptied out
            console.log('Sequence to match array: ',sequenceToMatch);
            maxInputs+=1;
            startMemorySequence();
            resetButtons();
        }
    }else if (squareX !== curSquare && curSquare){
        console.log("Wrong");
        points = points - 50;
        sequencePoints-=50;
        updateScoreBoard();
        playerInputs+=1;
        console.log("Current total points: ", points);
        if(playerInputs === maxInputs){
            changeBackgroundColor(sequencePoints);
            setTimeout(() => {changeBackgroundColor(1000000);
                }, 500);
            correctInputs = 0;
            playerInputs = 0;
            sequencePoints = 0;
            console.log('Sequence to match array: ',sequenceToMatch);
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
    //Depending on how correct the player is the screen will change to the corresponding colours.
    //To increase difficulty, the level of accuracy will be done by percent of max number of points. For example, 
    //level 1 max points = (lengthOfSequence*100). And done by what amount of points obtained that level instead of
    //overall points. As that would make it really hard to ever get a full correct green win. 
    //Green is maxpoint, orange is green/yellow is 80%, orange is 60%, orange/red is 40, and red is 20 and below. 
    if(typeof levelOfAccuracy == 'number'){
        if(levelOfAccuracy === 1000000){
            document.body.style.backgroundColor = 'white';
        }else if(levelOfAccuracy === maxPointsPossible){
            document.body.style.backgroundColor = '#2bd42f'
        }else if(levelOfAccuracy < maxPointsPossible && levelOfAccuracy >= (maxPointsPossible*0.75)){
            document.body.style.backgroundColor = '#d5e41b';
        }else if(levelOfAccuracy < (maxPointsPossible *0.75) && levelOfAccuracy >= (maxPointsPossible*0.5)){
            document.body.style.backgroundColor = '#f1990e';
        }else if(levelOfAccuracy < (maxPointsPossible * 0.5) && levelOfAccuracy >= (maxPointsPossible*0.25)){
            document.body.style.backgroundColor = '#ff6000';
        }else if(levelOfAccuracy < (maxPointsPossible *0.25)){
            document.body.style.backgroundColor = '#ff1300';
        }else{
            console.log('No colours left');
        } 
    }else{
        console.log('Invalid levelOfAccuracy: ', levelOfAccuracy);
    }
}
