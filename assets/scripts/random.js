/**
 * Create a function that randomly picks a meal from an array
 */
//This a function that gets a random number between min and max including max and min 
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
//let num = getRandomIntInclusive(0,5);

function randomMeal(mealArr, drinksArr){
    const randomMealNum = Math.floor(Math.random() * mealArr.length);
    const randomDrinkNUm = Math.floor(Math.random() * drinksArr.length);
    return [mealArr[randomMealNum], drinksArr[randomDrinkNUm]];
}

let meals = ['Lasagna', 'Chicken Burger and Chips', 'Jollof Rice and Chicken', 'Special Fried Rice w/ Sweet and Sour Chicken', 'Spaghetti Bolognese'];
let drinks = ['Strawberry Milkshake', 'J20', 'Ginger Beer', 'Coca Cola', 'Sprite'];
let todaysMeal = randomMeal(meals, drinks);
//console.log(`Today's meal is ${todaysMeal[0]}, with ${todaysMeal[1]}`);

console.log(getRandomIntInclusive(1,4));
//console.log(typeof todaysMeal);
//console.log(todaysMeal);
//let num;
//for (let i=0; i< 5; i++){
  //  todaysMeal = randomMeal(meals, drinks);
    //console.log(`Today's meal is ${todaysMeal[0]}, with ${todaysMeal[1]}`);
//}
