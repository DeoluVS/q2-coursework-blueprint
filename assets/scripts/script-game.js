let gameArr = [];
let sequenceToMatch = [];
let points = 0;
let playerInputs = 0;
let correctInputs = 0;
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
    if(shownSequence === false){
        let button = document.getElementById("shape1");
        button.style.visibility = "hidden";
        console.log('Hidden 1');
    }else{
        //GameArr will be removed but is mostly used for testing. In the deployment phase it will be removed.
        console.log('Taking points in');
        pointCheck(1);  //Depending on the square an input will be sent to the pointCheck function to see if the user
        gameArr.push(1);//is correct. This is the same for all hideButton functions
        updateArr();
    }
    
    console.log(gameArr);
}

function hideButton2(){
    if(shownSequence === false){
        let button = document.getElementById("shape2");
        button.style.visibility = "hidden";
        console.log('Hidden 2');
    }else{
        console.log('Taking points in');
        pointCheck(2);
        gameArr.push(2);
        updateArr();
    }
    
    console.log(gameArr);
}
function hideButton3(){
    if(shownSequence === false){
        let button = document.getElementById("shape3");
        button.style.visibility = "hidden";
        console.log('Hidden 3');
    }else{
        console.log('Taking points in');
        pointCheck(3);
        gameArr.push(3);
        updateArr();
    }
    
    console.log(gameArr);
}
function hideButton4(){
    if(shownSequence === false){
        let button = document.getElementById("shape4");
        button.style.visibility = "hidden";
        console.log('Hidden 4');
    }else{
        console.log('Taking points in');
        pointCheck(4);
        gameArr.push(4);
        updateArr();
    }
    
    console.log(gameArr);
}

//Since document.getElementById uses a string value to find the element it is possible to use
//a for loop to iterate through all buttons but for now I will keep it simple but implement it 
//if there are more levels
function showButton1(){
    let button = document.getElementById("shape1");
    button.style.visibility = "visible";
    console.log("Shown 1");
}

function showButton2(){
    let button = document.getElementById("shape2");
    button.style.visibility = "visible";
    console.log("Shown 2");
}
function showButton3(){
    let button = document.getElementById("shape3");
    button.style.visibility = "visible";
    console.log("Shown 3");
}
function showButton4(){
    let button = document.getElementById("shape4");
    button.style.visibility = "visible";
    console.log("Shown 4");
}

//Hides all buttons at the same time. Normally used at the beginning on the game when the sequence hasn't been played.
//Or before the sequence starts.
function hideButtons(){
    hideButton1();
    hideButton2();
    hideButton3();
    hideButton4();
}

//Normally used after the sequence has done showing itself ready for the user to enter their inputs
function showButton(){
    showButton1();
    showButton2();
    showButton3();
    showButton4();
}

//This function is mostly for testing and will be removed after the deployment phase starts
function updateArr(){
    if (shownSequence){
        document.getElementById("sequence-order").innerHTML = gameArr;
    }else{
        document.getElementById('check-array').innerHTML = sequenceToMatch;
    }
    
    //console.log("Sequ",sequenceToMatch);
}

//This randomly generates the sequence and adds it to the array
function generateSequence(){
    for (let i=0; i<4;i++){
        sequenceToMatch.push(getRandomIntInclusive(1,4));
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
    sequenceToMatch = [];
    gameArr = [];
    shownSequence = false;
    hideButtons();
    generateSequence();
    showButtonsPeriodically();
}

//This is the main function that presents the sequence to the user
function showButtonsPeriodically(){
    //This function uses recursion to call itself just like a for loop. Using a for loop or while
    //loop felt too restrictive so making an iterator outside of the function made it less prone to
    //being reset on each recursive call or iteration. 
    setTimeout(function() {
        i=i+1;
        //Eventually the condition of it being i<5 will be more automated to allow for an increase of difficulty and more values coming up. 
        if(i<5 && sequenceToMatch){
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
            const squareElement = document.getElementById('shape' + current);
            if (squareElement) {
                squareElement.innerText = repeatCount; // show 1, 2, 3, ...
            }
            //This will increase to more if statements when there are more squares. 
            //To recreate the sequence it iterates through the sequenceToMatch function and shows,
            //the button in relation to i (i-1 since the sequence only includes numbers 1-4 but array starts from
            //0-3). 
            if(sequenceToMatch[i-1] === 1){
                showButton1();
                setTimeout(() => {hideButton1();
                }, 2000);
            }else if(sequenceToMatch[i-1] === 2){
                showButton2();
                setTimeout(() => {hideButton2();
                }, 2000);
            }else if(sequenceToMatch[i-1] === 3){
                showButton3();
                setTimeout(() => {hideButton3();
                }, 2000);
            }else if(sequenceToMatch[i-1] === 4){
                showButton4();
                setTimeout(() => {hideButton4();
                }, 2000);
            }else{
                console.log("Something is wrong");
            }
            showButtonsPeriodically();
        }else if(i>=5 && sequenceToMatch){
            //After sequenceToMatch has been fully gone through all buttons are shown for the user to 
            //enter what they remember
            showButton();
            shownSequence = true;
            i=0;    
        }
        //This will eventually be removed but it is here for testing purposes.
        document.getElementById('sequence-order').innerHTML = sequenceToMatch;
        //There's a 2 second delay after each recursive call. It will change depending on difficulty.
    },2000)
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
        //playerInputs checks if the user has chosen the same amount of inputs as the sequenceToMatch initial length (4),
        //and gets incremented by 1 each time the user inputs something.
        playerInputs+=1;
        correctInputs+=1;
        //4 will be replaced by a variable to make it easier to increase difficulty
        if(playerInputs === 4){
            //Depending on how many inputs the user got correct a value will be passed into changeBackgroundColor()
            changeBackgroundColor(correctInputs);
            //There will be a mini delay for when the background colour changes back to normal
            setTimeout(() => {changeBackgroundColor(20);
                }, 500);
            //This resets the values to allow for the user to play the next sequence    
            correctInputs = 0;
            playerInputs = 0;
            //This is for testing and checks if all the values have been emptied out
            console.log('Sequence to match array: ',sequenceToMatch);
        }
    }else if (squareX !== curSquare && curSquare){
        console.log("Wrong");
        points = points - 50;
        playerInputs+=1;
        if(playerInputs === 4){
            changeBackgroundColor(correctInputs);
            setTimeout(() => {changeBackgroundColor(20);
                }, 500);
            correctInputs = 0;
            playerInputs = 0;
            console.log('Sequence to match array: ',sequenceToMatch);
        }
    }else{
        console.log("Empty array or something went wrong");
    }
}

function changeBackgroundColor(levelOfAccuracy){
    //Depending on how correct the player is the screen will change to the corresponding colours.
    if(levelOfAccuracy && typeof levelOfAccuracy == 'number'){
        if(levelOfAccuracy === 4){
            document.body.style.backgroundColor = '#2bd42f'
        }else if(levelOfAccuracy === 3){
            document.body.style.backgroundColor = '#d5e41b';
        }else if(levelOfAccuracy === 2){
            document.body.style.backgroundColor = '#f1990e';
        }else if(levelOfAccuracy === 1){
            document.body.style.backgroundColor = '#ff6000';
        }else if(levelOfAccuracy === 0){
            document.body.style.backgroundColor = '#ff1300';
        }else if(levelOfAccuracy === 20){
            document.body.style.backgroundColor = 'white';
        }else{
            console.log('No colours left');
        } 
    }
}

/*
function showButtonsPeriodically(){
    generateSequence();
    for (let i=0; i<4; i++){
        if(sequenceToMatch){
            if(sequenceToMatch[i] === 1){
                showButton1();
                setTimeout(() => {hideButton1();
                }, 2000);
            }else if(sequenceToMatch[i] === 2){
                showButton2();
                setTimeout(() => {hideButton2();
                }, 2000);
            }else if(sequenceToMatch[i] === 3){
                showButton3();
                setTimeout(() => {hideButton3();
                }, 2000);
            }else if(sequenceToMatch[i] === 4){
                showButton4();
                setTimeout(() => {hideButton4();
                }, 2000);
            }else{
                console.log("Something is wrong");
            }
        }else{
            console.log("Empty Array")
        }
    }
    sequenceToMatch = [];
    document.getElementById('sequence-order').innerHTML = "";
}
*/
