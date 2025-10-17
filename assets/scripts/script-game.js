let gameArr = [];
let sequenceToMatch = [];

//This a function that gets a random number between min and max including max and min 
//Code gotten from the JavaScript documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function resolveAfterXSeconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 1000);
  });
}

//Await function used from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
async function hideButton1() {
    //let button = document.getElementById("shape1");
    //button.style.visibility = await resolveAfterXSeconds("hidden");
    button.style.visibility = await resolveAfterXSeconds(1);
    gameArr.push(1);
    updateArr();
    console.log("1"); // 10
}

async function hideButton2() {
    //let button = document.getElementById("shape2");
    //button.style.visibility = await resolveAfterXSeconds("hidden");
    button.style.visibility = await resolveAfterXSeconds(2);
    gameArr.push(2);
    updateArr();
    console.log("2"); // 10
}

async function hideButton3() {
    //let button = document.getElementById("shape3");
    //button.style.visibility = await resolveAfterXSeconds("hidden");
    button.style.visibility = await resolveAfterXSeconds(3);
    gameArr.push(3);
    updateArr();
    console.log("3"); // 10
}

async function hideButton4() {
    //let button = document.getElementById("shape4");
    //button.style.visibility = await resolveAfterXSeconds("hidden");
    button.style.visibility = await resolveAfterXSeconds(4);
    gameArr.push(4);
    updateArr();
    console.log("4"); // 10
}

/*
function hideButton2(){
    let button = document.getElementById("shape2");
    button.style.visibility = "hidden";
    gameArr.push(2);
    updateArr();
}
function hideButton3(){
    let button = document.getElementById("shape3");
    button.style.visibility = "hidden";
    gameArr.push(3);
    updateArr();
}
function hideButton4(){
    let button = document.getElementById("shape4");
    button.style.visibility = "hidden";
    gameArr.push(4);
    updateArr();
}
    */

function showButton1(){
    //let button = document.getElementById("shape1");
    //button.style.visibility = "visible";
    console.log("Show Button1");
}

function showButton2(){
    //let button = document.getElementById("shape2");
    //button.style.visibility = "visible";
    console.log("Show Button2");
}
function showButton3(){
    let button = document.getElementById("shape3");
    button.style.visibility = "visible";
}
function showButton4(){
    let button = document.getElementById("shape4");
    button.style.visibility = "visible";
}

function showButton(){
    showButton1();
    showButton2();
    showButton3();
    showButton4();
}

function updateArr(){
    document.getElementById("sequence-order").innerHTML = gameArr;
}

function generateSequence(){
    for (let i=0; i<4;i++){
        sequenceToMatch.push(getRandomIntInclusive(1,4));
    }
    console.log(sequenceToMatch);
}

function showButtonsPeriodically(){
    generateSequence();
    for (let i=0; i<4; i++){
        if(sequenceToMatch){
            if(sequenceToMatch[i] === 1){
                showButton1();
                hideButton1();
            }else if(sequenceToMatch[i] === 2){
                showButton2();
                hideButton2();
            }else if(sequenceToMatch[i] === 3){
                showButton3();
                hideButton3();
            }else if(sequenceToMatch[i] === 4){
                showButton4();
                hideButton4();
            }else{
                console.log("Something is wrong");
            }
        }else{
            console.log("Empty array");
        }
    }
    sequenceToMatch = [];
    document.getElementById('sequence-order').innerHTML = "";
}

showButtonsPeriodically();