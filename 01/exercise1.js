"use strict"

const readline = require('readline-sync');

const tasks = [];

function printMenu(){
    console.log("1 - Insert a new Task");
    console.log("2 - remove a task");
    console.log("3 - remove a task by deadline");
    console.log("4 - Print tasks");
    console.log("5 - Exit Program");
}
    
function addTask(tasks){
    let describtion = readline.question('Task describtion: ');
    const urgent = (readline.question('Is the task urgent (Y/N)').toLowerCase().trim() === 'y');
    

}

function removeTask(tasks){

}

function printTasks(tasks){

}

function closeProgram(tasks){

}

addTask();