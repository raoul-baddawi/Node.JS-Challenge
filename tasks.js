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
const tasks = [
  { taskNumber: 1, description: 'Task one' },
  { taskNumber: 2, description: 'Task two' },
  { taskNumber: 3, description: 'Task three' },
  { taskNumber: 4, description: 'Task four' }
];

// This function below lists all tasks
function list(){
  tasks.map(function(element){ 
    console.log(element.taskNumber);
   });
}


// The following line starts the application
startApp("Raoul Baddawi")