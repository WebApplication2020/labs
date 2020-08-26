"use strict"

const readline = require('readline-sync');

function printMenu(){
    console.log("1 - Insert a new Task");
    console.log("2 - remove a task");
    // console.log("3 - remove a task by deadline");
    console.log("3 - Print tasks");
    console.log("4 - Exit Program");
}
    
function addTask(tasks){
    let describtion = readline.question('Task describtion: ');
    const urgent = (readline.question('Is the task urgent (Y/N)').toLowerCase().trim() === 'y');
    const privateTask = (readline.question('Is the task private (Y/N)?: ',{defaultInput: 'y'}).toLowerCase().trim() === 'y');
    let date = readline.question('Task deadline (YYYY-MM-DD): ').trim();
    if(!date.includes(" ")){
        date += "23:59:59z";
    }
    const deadline = new Date(date);

    const task = {"describtion": describtion, "urgent": urgent, "privateTask": privateTask, "deadline": deadline};

    tasks.push(task);
}

function removeTaskBydescribtion(tasks){
    const remove = readline.question('Task to be removed (description): ');
    const toBeRemoved = [];
    for(const task of tasks){
        if(task.describtion === remove){
            toBeRemoved.push(task);
        }
    }
    for(const removeTask of toBeRemoved){
        tasks.splice(tasks.indexOf(removeTask), 1);
    }
}

function printTasks(tasks){
    tasks.sort((a, b) => a.describtion.localeCompare(b.describtion));
    console.log(tasks);
}

function closeProgram(tasks){

}

if (require.main === module){
    const tasks = [];
    const memu = setInterval(() => {
       printMenu();
       let choice = readline.question('Your choice: ');
       switch(choice.trim()){
            case '1':
                addTask(tasks);
                break;
            case '2':
                removeTaskBydescribtion(tasks);
                break;
            case '3':
                printTasks(tasks);
                break;
            default:
                clearInterval(memu);
       } 
    }, 500);
}