/**
 * Return a welcome message from a teacher to a student
 */
function welcomeMessage(studentFirstName, teacherName){
    let message = `Hello ${studentFirstName}!!\nWelcome to the new school year!!!\nYour teacher,\n${teacherName}`;
    return message;
}

let matWelcomeMessage = welcomeMessage("Matilda", "Jennifer Honey");
//console.log(matWelcomeMessage);

let hannahWelcomeMessage = welcomeMessage("Hannah", "Professor Sprout");
console.log(hannahWelcomeMessage);