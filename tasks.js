var fs = require("fs");
const tasks = ["hello", "byebye"];

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * 
 * node tasks.js batata
 * 
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  text = text.trim();

  // Hello command
  if(text.startsWith('hello')){
    const input = text.split(' ')[1];
    if (input) {
      hello(input);
    } else {
      hello();
    }
  }

  // Exit and Quit command
  else if (text === 'quit') {
    quit();
  }
  else if(text === 'exit'){
    exit();
  }

  // Help command
  else if(text.startsWith('help')){
    const input = text.split(' ')[1];
    if (input) {
      help(input);
    } else {
      help();
    }
  }

  // Clear command
  else if(text === 'clear'){
    clear();
  }

  // List command
  else if(text === 'list'){
    list();
  }
  // Add command
  else if(text.startsWith('add')){
    const input = text.split(' ')[1];
    if (input) {
      add(input);
    } else {
      err();
    }
  }
  // Remove command
  else if(text === 'remove\n'){
    rem(tasks.length)
  }
  else if(text.substring(0, 6) === 'remove'){
    rem(text.trim().substring(7));
  }
  // Edit command
  else if(text === 'edit'){
    err();
  }
  else if(text.substring(0, 4) === "edit"){
    text.replace("\n","");
    const input = text.split(" ");
    if(!isNaN(input[1])){
      let one = input.slice(2).join(" ");
      edit(input[1], one);
    }
    else{
      text.replace("\n", "");
      edit(tasks.length -1, text.substring(4));
    }
  }
  //check/uncheck commands
  else if (text === "check") {   
    err();
  } 
  else if (text.substring(0, 5) === "check") {
    check(text.trim().substring(6));
  }
  else if (text === "uncheck") {
    err();
  } 
  else if (text.substring(0, 7) === "uncheck") {
    unCheck(text.trim().substring(8));
  } 

  // For unknown commands
  else{
    unknownCommand(text);
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(){
  console.log('hello!')
}

function hello(input) {
  console.log(`hello${input ? ` ${input}`:''}!`);
}
/**
 * Exits the application
 *
 * @returns {void}
 */

// Adding a new command functions
// Quit and exit functions
function writeToJson(data, fileName){
  fs.writeFile(fileName, JSON.stringify(data), (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
}


let saveFile;
if (process.argv[2] == null) {
  saveFile = "database.json";
} else {
  saveFile = process.argv[2];
}

try {
  fs.readFileSync(saveFile);
}
catch (e) {
  console.log(`Everything you write will be saved on quit to the specified json file!`)
}
function quit() {
  let data = JSON.stringify(tasks);
  try {
    fs.writeFileSync(saveFile, data);
    console.log(`Saving changes...`);
  } catch (error) {
    console.error(error);
  }

  console.log("Quitting now, goodbye!");
  process.exit();
}

function exit(){
  console.log('Exiting now, goodbye!')
  process.exit();
}

// this function clears the console
function clear(){
  console.clear();
}

// This function below lists all the possible commands
function help(){
  console.log('These are the possible commands:\n hello\n quit\n exit\n help\n clear\n list\n add\n remove\n remove 1\n remove 2\n check\n uncheck\n')
}

// This function below lists all tasks
function list(){
  for (let i=+1;i<=tasks.length;i++){
  console.log(i+"-"+slotMt[i-1]+tasks[i-1])
  }

  fs.readFile("database.json", function(err, buf) {
    console.log(buf.toString());
  });
}
// These function are to add, remove and edit tasks
// Add
function add(input){
  slotMt.push('[]')
  tasks.push(input)
}

// Remove
function rem(value){
  if(value > tasks.length || value == 0){
    err()
  }
  else{
    tasks.splice(value -1, 1);
  }
  
}
// Edit
function edit(value, text){
  tasks[value -1]= text;
}

// everything below this line is related to check/uncheck tasks
const slotMt = [];
for (let i = 0; i < tasks.length; i++) {
  slotMt[i] = "[]";
}

// Check
function check(index) {
  if(index > tasks.length || index == 0){
    err()
  }
  slotMt[Number(index-1)] = slotMt[Number(index-1)].replace("[]", "[???]");
}

// Uncheck
function unCheck(index) {
  if(index > tasks.length || index == 0){
    err()
  }
  slotMt[Number(index-1)] = slotMt[Number(index-1)].replace("[???]", "[]");
}

// Error function
function err(){
  console.log('Error!');
}

// The following line starts the application
startApp("Raoul Baddawi")