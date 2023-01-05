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
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  text = text.trim();
  if(text.startsWith('hello')){
    const input = text.split(' ')[1];
    if (input) {
      hello(input);
    } else {
      hello();
    }
  }
  else if (text === 'quit') {
    quit();
  }
  else if(text === 'exit'){
    exit();
  }
  else if(text.startsWith('help')){
    const input = text.split(' ')[1];
    if (input) {
      help(input);
    } else {
      help();
    }
  }
  else if(text === 'clear'){
    clear();
  }
  else if(text === 'list'){
    list();
  }
  else if(text.startsWith('add')){
    const input = text.split(' ')[1];
    if (input) {
      add(input);
    } else {
      err();
    }
  }
  else if(text === 'remove'){
    rem();
  }
  else if(text === 'remove 1'){
    remone();
  }
  else if(text === 'remove 2'){
    remtwo();
  }
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
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
function exit(){
  console.log('Exiting now, goodbye!')
  process.exit();
}

// Adding a new command functions

// this function clears the console
function clear(){
  console.clear();
}

// This function below lists all the possible commands
function help(){
  console.log('These are the possible commands:\n hello\n quit\n exit\n help\n clear')
}

// Global section
const tasks = [];

// This function below lists all tasks
function list(){
  for (let i=+1;i<=tasks.length;i++){
  console.log(i+"-"+tasks[i-1])
  }
}
// These function are to add and remove tasks
function add(input){
  tasks.push(input)
}

function err(){
  console.log('Error');
}

function rem(){
  tasks.pop();
}

function remone(){
  tasks.shift();
}

function remtwo(){
  tasks.splice(1, 1);
}

// The following line starts the application
startApp("Raoul Baddawi")