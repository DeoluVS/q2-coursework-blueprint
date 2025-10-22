# Memory Bank 

## About the Game 
This game was inspired by the Human Benchmark game where you have a sequence of squares appear on the screen and you have to follow the pattern in order to get points. The more you get correct the more points you acrue over time. This game is to test your memory and eventually it will test your cognitive functions, such as reaction time to gauge where you are at personally. This game is designed in a way where any age group could play it to work on their ability to retain information and replay it. Also, sometimes these memory test can be seen during the pre-screening phase of a graduate role in IT. They will use a series of games and test your ability to retain information and use it to progress through the game. However, for this instance, the memory game will be the main focus of this website. 

## Strategy
### Goals
- One of the goals for this project is to challenge the user's capability to remember the sequence.
- Create a game that has an increasing level of difficulty for each round the user passes.
- Create multiple levels that increase in dimensions of squares the user has to play.
- Create easy navigation for the user to move around the website.
- Create 3 levels ranging from a 2x2 grid to a 4x4 grid.
- Making the game difficulty at a manageable level, making it more accesible to more players.

### Research
From looking at other memory games, I had noticed a lot of different functionalities that seemed interesting. One of the more notable examples was Human Benchmark. One of the more interesting things that they had in their game was a way to build on their previous sequence and keep adding one more item to the sequence the user started with. They also added some audio cues to help the user remember which block to press. 

![Sequence-Game](/assets/images/Screenshot%202025-10-20%2010.02.55%20PM.png)

The game starts with flashing one square and the game starts to create a longer sequence building off of the previous squares the user can remember. I like this idea but I will take my own spin on it by making each square a different colour and indicate a duplicate square in the series by placing a number on each square indicating that. Instead of having just one continuous level, I will have multiple levels with different grid matrixes from 2x2 to 4x4 with a cap on the increasing difficulty. 

### Target Audience
The intended audience for the game is for anyone who wants to assess their cognitive abilities. One target audience might also be job seekers looking for a role in IT as some companies require you to do an IQ test or a series of activities and questionnaires to assess if you're a right fit for the company. Being able to retain and reproduce information is one of the more important things to work on and it's the one game type that I tend to practice that game mode the most. It mainly targets short term memory as you need to look at a sequence and replay the same order of inputs as shown to the user. 

I noticed that when I was applying for many different graduate IT roles, one of the common games was something in relation to short term memory or working with information and using it. Since, it is relevant to me it can be relevant to other graduate students or prospective interns looking for work in the IT industry. 

### Wireframes
For this website, I want it to be more JavaScript heavy rather than design heavy so one of the things I will work towards is just using a simplistic design but still doing the best I can to make it pass all the validator pass checks. This game is more geared towards the mobile view but it can be played on desktop, mobiles and tablets. Here is the mobile view of the wireframe:

![Wireframe Mobile View](assets/images/wireframes%20mobile%20view.drawio.png)

As you can see the basic design is a hero on the landing page with an easy and visible button that should re-route the user to the level select window. When you click one of the levels it will make the user navigate to the game window where you have to click the start button and the game will start working. For any levels that haven't been completed yet, the user will be sent to the coming-soon page which should redirect the user to back to the level select screen or back to the homepage screen. 

### Functions
#### **`getRandomIntInclusive()`**
```
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
```
This function is from this website: 
[Math.Random() functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

What this function does is that it creates a random integer from a given range between min and max including the min and max numbers. This function is important for creating a sequence of numbers for the sequenceMatch game to play. 

#### **`HideButtonX()`**
```
function hideButton1(){
    if(shownSequence === false){
        let button = document.getElementById("shape1");
        button.style.visibility = "hidden";
    }else{
        pointCheck(1);
    }
}
```
This function grabs an individual button and depending on whether there is a sequence being shown to the user it hides the button. If the sequence has been shown already or shownSequence is set to true, the function sends the specific button's number index to the **`pointCheck()`**. This function will be activated on whatever button it is assigned to but the naming convention instead of **`hideButtonX()`** it would instead be **`hideButton1()`** for button 1 for example. 

#### **`ShowButtonX()`**
```
function showButton1(){
    let button = document.getElementById("shape1");
    button.style.visibility = "visible";
}
```
This function sets the button to visible. The normal naming convention instead of **`showButtonX()`** it would instead be **`showButton1()`** if it's for `button 1`.

#### **`hideButtons()`**
```
function hideButtons(){
    hideButton1();
    hideButton2();
    hideButton3();
    hideButton4();
}
```
This function hides all buttons simulatenously. 

#### **`showButton()`**
```
function showButton(){
    showButton1();
    showButton2();
    showButton3();
    showButton4();
}
```
This function shows all buttons simultaneously. 

#### **`generateSequence()`**
```
function generateSequence(){
    for (let i = 0; i < maxInputs; i++){
        sequenceToMatch.push(getRandomIntInclusive(1,numberOfSquares));
    }
}
```
This function runs a for loop using the `maxInputs` variable as the condition for how many iterations to run through. `maxInputs` is a variable that sets how many buttons are in the sequence. For example, with level 1 the initial value assigned to `maxInputs` is set to 2 meaning the initial sequence will only have 2 values. So, this for loop will only have 2 iterations and push 2 random numbers onto the **`sequenceToMatch`** array using the **`getRandomIntInclusive()`** function. Inside of the for loop, the code uses the range between 1 and numberOfSqaures. Depending on the level, the webpage will have a different amount of buttons and a different js file. Level 1 uses the js file `script-game.js` and in that `numberOfSquares` would be equal to 4, level 2 `numberOfSquares` is set to 9 and level 3 will eventually be set to 16 which would be the max number of squares irregardless of difficulty, the difficulty will be increased in other ways. 

#### **`startMemorySequence()`**
```
function startMemorySequence(){
    document.getElementById('startBtnL2').disabled = true;
    sequenceToMatch = [];
    for (const t of activeTimeouts) clearTimeout(t);
    activeTimeouts = [];
    shownSequence = false;
    i=0;
    if(maxInputs <= lastRound){
        hideButtons();
        generateSequence();
        showButtonsPeriodically();
    }else{
        showEndGameModal();
        return;
    }   
}
```
This function starts everything up and resets all the relevant variables and data structures that may cause bugs if not emptied.  This function is attached to the `startBtn` button using the `onclick` event. The function also disables the `startBtn` button to ensure that you can't start playing multiple sequences on top of each other. It also clears any timers so that there isn't any overlapping old timers that aren't being used. It also sets `shownSequence` to false to allow for other functions to work amd replay the sequence created by **`generateSequence()`**. `i` is set to 0 as it will be the iterator for the **`showButtonsPeriodically()`** function. 
```
if(maxInputs <= lastRound){
    hideButtons();
    generateSequence();
    showButtonsPeriodically();
}else{
    showEndGameModal();
    return;
} 
```
Just to break down this if statement, `if(maxInputs <= lastRound)` checks whether `maxInputs` (which is the max number of squares in a sequence for a round) is less than the `lastRound` variable which is amount of squares going to be shown in the final round. For as long as condition is met, each round the game will hide the buttons, generate the sequence and then display the generated sequence on the screen using **`showButtonsPeriodically()`** function. If the condition isn't met (due to maxInputs being greater than lastRound) then it will show a modal window `showEndGameModal()` which will play an instance of `endGameModal` modal window.

#### **`showEndGameModal()`**
```
function showEndGameModal(){
    document.getElementById('finalScoreL2').textContent = points;
    let percent = parseInt((points/highestScorePossible)*100);
    let percentScore = `${percent}%`;
    document.getElementById('finalPercentScoreL2').textContent = percentScore;
    const endModal = new bootstrap.Modal(document.getElementById('endGameModalL2'));
    endModal.show();
}
```
