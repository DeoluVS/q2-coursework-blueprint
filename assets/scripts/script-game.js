let gameArr = [];
let sequenceToMatch = [];

//This a function that gets a random number between min and max including max and min 
//Code gotten from the JavaScript documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

//Await function used from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
function hideButton1() {
    let button = document.getElementById("shape1");
    button.style.visibility = "hidden";
    gameArr.push(1);
    updateArr();
    console.log("Hidden 1"); // 10
}

function hideButton2(){
    let button = document.getElementById("shape2");
    button.style.visibility = "hidden";
    gameArr.push(2);
    updateArr();
    console.log('Hidden 2');
}
function hideButton3(){
    let button = document.getElementById("shape3");
    button.style.visibility = "hidden";
    gameArr.push(3);
    updateArr();
    console.log('Hidden 3');
}
function hideButton4(){
    let button = document.getElementById("shape4");
    button.style.visibility = "hidden";
    gameArr.push(4);
    updateArr();
    console.log('Hidden 4');
}

function showButton1(){
    let button = document.getElementById("shape1");
    button.style.visibility = "visible";
    console.log("Shown 1")
}

function showButton2(){
    let button = document.getElementById("shape2");
    button.style.visibility = "visible";
    console.log("Shown 2")
}
function showButton3(){
    let button = document.getElementById("shape3");
    button.style.visibility = "visible";
    console.log("Shown 3")
}
function showButton4(){
    let button = document.getElementById("shape4");
    button.style.visibility = "visible";
    console.log("Shown 4")
}

function showButton(){
    showButton1();
    showButton2();
    showButton3();
    showButton4();
}

function updateArr(){
    document.getElementById("sequence-order").innerHTML = gameArr;
    console.log(sequenceToMatch);
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
    sequenceToMatch = []
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
        }else{
            console.log('End')
            i=0;    
        }
        document.getElementById('sequence-order').innerHTML = sequenceToMatch;
    },2000)
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
