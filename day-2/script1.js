let gameno=25;
let usename=prompt("guess the number between 1 to 100: ");
console.log(usename);
while(usename!=gameno){
    usename=prompt("you are wrong, guess again: ");
}
console.log("you win"); 