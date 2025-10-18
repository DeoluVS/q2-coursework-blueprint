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
    if(shownSequence === false){
        let button = document.getElementById("shape1");
        button.style.visibility = "hidden";
        console.log('Hidden 1');
    }else{
        console.log('Taking points in');
        pointCheck(1);
        gameArr.push(1);
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

function hideButtons(){
    hideButton1();
    hideButton2();
    hideButton3();
    hideButton4();
}

function showButton(){
    showButton1();
    showButton2();
    showButton3();
    showButton4();
}

function updateArr(){
    if (shownSequence){
        document.getElementById("sequence-order").innerHTML = gameArr;
    }else{
        document.getElementById('check-array').innerHTML = sequenceToMatch;
    }
    
    //console.log("Sequ",sequenceToMatch);
}

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

function startMemorySequence(){
    sequenceToMatch = [];
    gameArr = [];
    shownSequence = false;
    hideButtons();
    generateSequence();
    showButtonsPeriodically();
}

function showButtonsPeriodically(){
    setTimeout(function() {
        i=i+1;
        if(i<5 && sequenceToMatch){
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
            showButton();
            shownSequence = true;
            i=0;    
        }
        document.getElementById('sequence-order').innerHTML = sequenceToMatch;

    },2000)
}

function pointCheck(squareX){
    console.log('Function activated');
    let curSquare = sequenceToMatch.shift();
    if(squareX === curSquare && curSquare){
        console.log("Correct");
        points = points + 100;
        playerInputs+=1;
        correctInputs+=1;
        if(playerInputs === 4){
            console.log("Sequence over");
            changeBackgroundColor(correctInputs);
            setTimeout(() => {changeBackgroundColor(20);
                }, 500);
            correctInputs = 0;
        }
    }else if (squareX !== curSquare && curSquare){
        console.log("Wrong");
        points = points - 50;
        playerInputs+=1;
        console.log('Number of inputs: ', playerInputs);
        if(playerInputs === 4){
            console.log("Sequence over");
            changeBackgroundColor(correctInputs);
            setTimeout(() => {changeBackgroundColor(20);
                }, 500);
            correctInputs = 0;
        }
    }else{
        console.log("Empty array or something went wrong");
    }
}

function changeBackgroundColor(levelOfAccuracy){
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
