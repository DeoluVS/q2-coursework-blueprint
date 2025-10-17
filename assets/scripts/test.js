/*setTimeout(() => {
  console.log("this is the first message");
}, 5000);
setTimeout(() => {
  console.log("this is the second message");
}, 3000);
setTimeout(() => {
  console.log("this is the third message");
}, 1000);
*/
/*
let i=0;
function showButtonsPeriodically(){
    setTimeout(function() {
        i=i+1;
        generateSequence();
        if(i<4 && sequenceToMatch){
            if(sequenceToMatch[i] === 1){
                showButton1();
                setTimeout(() => {hideButton1();
                }, 1000);
            }else if(sequenceToMatch[i] === 2){
                showButton2();
                setTimeout(() => {hideButton2();
                }, 1000);
            }else if(sequenceToMatch[i] === 3){
                showButton3();
                setTimeout(() => {hideButton3();
                }, 1000);
            }else if(sequenceToMatch[i] === 4){
                showButton4();
                setTimeout(() => {hideButton4();
                }, 1000);
            }else{
                console.log("Something is wrong");
            }
            showButtonsPeriodically();
        }else{
            i=0;
        }
        i=0;
        sequenceToMatch = [];
        document.getElementById('sequence-order').innerHTML = "";
        
    },1000)
}

showButtonsPeriodically();
*/
let i=0;
function myLoop() {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    console.log('hello');   //  your code here
    i++;                    //  increment the counter
    if (i < 4) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 1000)
} 

myLoop();