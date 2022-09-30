const lettersArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const numbersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolsArray = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

let numbersCircle = document.getElementById("numbers-circle")
let symbolsCircle = document.getElementById("symbols-circle")

let passwordOneEl = document.getElementById('password-one-el')
let passwordTwoEl = document.getElementById('password-two-el')

let errorMessage = document.getElementById('error-message-el')

let generatePasswordBtn = document.getElementById("generate-password-btn")

let isCopiedEl = document.getElementById('is-copied-el')

let numbersToggleSwitch = document.getElementById("numbers-toggle-switch")
let symbolsToggleSwitch = document.getElementById("symbols-toggle-switch")


numbersToggleSwitch.addEventListener("click", isNumberToggled)
symbolsToggleSwitch.addEventListener("click", isSymbolToggled)

isNumberToggled = false;
isSymbolToggled = false;

numbersCircle.style.transform = 'translatex(0px)'
symbolsCircle.style.transform = 'translatex(0px)'

numbersToggleSwitch.style.backgroundColor = 'var(--password-background-color)'
symbolsToggleSwitch.style.backgroundColor = 'var(--password-background-color)'

passwordOneEl.addEventListener('click', copyPasswordOne)
passwordTwoEl.addEventListener('click', copyPasswordTwo)



let passwordOne = []; //empty array for first password
let passwordTwo = []; //empty array for second password

generatePasswordBtn.addEventListener('click', generatePassword)

let characterLength = document.getElementsByClassName('input-text')[0].value

// testAllRandomGenerators();

function generatePassword(){

    characterLength = document.getElementsByClassName('input-text')[0].value

    if(characterLength >= 8 && characterLength <= 20){

        errorMessage.textContent = ' '
        
        if(isNumberToggled === true && isSymbolToggled === true){
            passwordOne.push(allCharactersGenerator());
            passwordTwo.push(allCharactersGenerator());
    
            passwordOneEl.textContent = passwordOne.join('')
            passwordTwoEl.textContent = passwordTwo.join('')
    
            passwordOne.length = 0
            passwordTwo.length = 0
        }
        else if (isNumberToggled === true && isSymbolToggled === false){
            passwordOne.push(numbersLettersGenerator());
            passwordTwo.push(numbersLettersGenerator());
    
            passwordOneEl.textContent = passwordOne.join('')
            passwordTwoEl.textContent = passwordTwo.join('')
    
            passwordOne.length = 0
            passwordTwo.length = 0
        }
        else if (isNumberToggled == false && isSymbolToggled === true){
            passwordOne.push(symbolsLettersGenerator());
            passwordTwo.push(symbolsLettersGenerator());
    
            passwordOneEl.textContent = passwordOne.join('')
            passwordTwoEl.textContent = passwordTwo.join('')
    
            passwordOne.length = 0
            passwordTwo.length = 0
        }
        else{
            passwordOne.push(letterGenerator());
            passwordTwo.push(letterGenerator());
    
            passwordOneEl.textContent = passwordOne.join('')
            passwordTwoEl.textContent = passwordTwo.join('')
    
            passwordOne.length = 0
            passwordTwo.length = 0
        }
    }
    else{
        errorMessage.textContent = 'Please enter a character count between 8 and 20'

        passwordOneEl.textContent = ' '
        passwordTwoEl.textContent = ' '
    }

   
}

function allCharactersGenerator() {
  //This will be the default state. User leaves both Numbers and Symbols toggled on
  let arguments = [];

  for (let i = 0; i < characterLength; i++) {
    let randomArrayPicker = getRandomInt(3);

    if (randomArrayPicker === 1) {
      //Picks a random letter and adds it to the arguments array
      arguments.push(randomLetter());
    } else if (randomArrayPicker === 2) {
      //Picks a random number and adds it to the arguments array
      arguments.push(randomNumber());
    } else {
      //Picks a random symbol and adds it to the arguments array
      arguments.push(randomSymbol());
    }
  }
  return arguments.join("");
}

function numbersLettersGenerator() {
  //Numbers is toggled on. Symbols toggled off
  let arguments = [];

  for (let i = 0; i < characterLength; i++) {
    let randomArrayPicker = getRandomInt(2);

    if (randomArrayPicker === 1) {
      arguments.push(randomLetter());
    } else {
      arguments.push(randomNumber());
    }
  }
  return arguments.join("");
}

function symbolsLettersGenerator() {
  //Numbers toggled off. Symbols toggled on
  let arguments = [];

  for (let i = 0; i < characterLength; i++) {
    let randomArrayPicker = getRandomInt(2);

    if (randomArrayPicker === 1) {
      arguments.push(randomLetter());
    } else {
      arguments.push(randomSymbol());
    }
  }
  return arguments.join("");
}

function letterGenerator() {
  //numbers and symbols toggled off
  let arguments = [];

  for (let i = 0; i < characterLength; i++) {
    arguments.push(randomLetter());
  }
  return arguments.join("");
}

//Individual Random Array Generators

function randomLetter() {
  let randomLetter = Math.floor(Math.random() * lettersArray.length);
  return lettersArray[randomLetter];
}

function randomNumber() {
  let randomNumber = Math.floor(Math.random() * numbersArray.length);
  return numbersArray[randomNumber];
}

function randomSymbol() {
  let randomSymbol = Math.floor(Math.random() * symbolsArray.length);
  return symbolsArray[randomSymbol];
}


//Utility:

function getRandomInt(maxNumber) {
  let randomInt = Math.floor(Math.random() * maxNumber) + 1;
  return randomInt;
}

function copyPasswordOne(){
    navigator.clipboard.writeText(passwordOneEl.textContent)
    isCopiedEl.style.animationName = 'FadeInFadeOut'
    isCopiedEl.style.animationDuration = '1000ms'
}

function copyPasswordTwo(){
    navigator.clipboard.writeText(passwordTwoEl.textContent)
    isCopiedEl.style.animationName = 'FadeInFadeOut'
    isCopiedEl.style.animationDuration = '1000ms'
}


//Toggle Switches

function isNumberToggled(){
  isNumberToggled =  !isNumberToggled

  if(isNumberToggled){
    numbersToggleSwitch.style.backgroundColor = 'var(--contrast-color)'
    numbersCircle.style.transform = 'translatex(22px)'
  }
  else if(isNumberToggled === false){
    numbersToggleSwitch.style.backgroundColor = 'var(--password-background-color)'
    numbersCircle.style.transform = 'translatex(0px)'
  }
  return isNumberToggled
}

function isSymbolToggled(){
    isSymbolToggled = !isSymbolToggled
    if(isSymbolToggled){
      symbolsToggleSwitch.style.backgroundColor = 'var(--contrast-color)'
      symbolsCircle.style.transform = 'translatex(22px)'
    }
    else if(isSymbolToggled === false){
      symbolsToggleSwitch.style.backgroundColor = 'var(--password-background-color)'
      symbolsCircle.style.transform = 'translatex(0px)'
    }
    return isSymbolToggled
}

//Used for testing password generators on the console

// function testAllRandomGenerators() {
//   passwordOne.push(allCharactersGenerator());
//   passwordTwo.push(allCharactersGenerator());

//   console.log("All Characters Password Generator");
//   console.log("Password 1: " + passwordOne.join(" "));
//   console.log("Password 2: " + passwordTwo.join(" "));
//   console.log("\n");

//   passwordOne.length = 0;
//   passwordTwo.length = 0;

//   passwordOne.push(numbersLettersGenerator());
//   passwordTwo.push(numbersLettersGenerator());

//   console.log("Numbers and Letters Generator:");
//   console.log("Password 1: " + passwordOne.join(" "));
//   console.log("Password 2: " + passwordTwo.join(" "));
//   console.log("\n");

//   passwordOne.length = 0;
//   passwordTwo.length = 0;

//   passwordOne.push(symbolsLettersGenerator());
//   passwordTwo.push(symbolsLettersGenerator());

//   console.log("Symbols and Letters Generator");
//   console.log("Password 1: " + passwordOne.join(" "));
//   console.log("Password 2: " + passwordTwo.join(" "));
//   console.log("\n");

//   passwordOne.length = 0;
//   passwordTwo.length = 0;

//   console.log("Only Letters Generator");
//   passwordOne.push(letterGenerator());
//   passwordTwo.push(letterGenerator());

//   console.log("Password 1: " + passwordOne.join(" "));
//   console.log("Password 2: " + passwordTwo.join(" "));
// }
