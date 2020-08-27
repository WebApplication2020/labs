//Tasks definitions

const tasks = [
    {
        "id": 1,
        "description": "Complete Lab 3",
        "important": true,
        "private": false,
        "sharedWith": "Marco",
        "deadline": new Date("2020-04-03T11:00:00"),
        "project": "WebApp I"
    },
    {
        "id": 2,
        "description": "Watch Mr. Robot",
        "important": false,
        "private": true,
        "deadline": new Date("2020-05-31T18:59:00"),
        "project": "Personal"
    },
    {
        "id": 3,
        "description": "Go for a walk",
        "important": true,
        "private": true,
        "deadline": new Date("2020-04-18T08:00:00"),
        "project": "Personal"
    },
];


//Functions Definitions

/**
 * Function to check if a date is today. Returns true if the date is today, false otherwise.
 * @param {*} date the javascript Date to be checked
 */
function isToday(date) {
    const today = new Date();
    return date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear();
}

/**
 * Function to check if a date is in the next week. Returns true if the date is in the next week, false otherwise.
 * @param {*} date the javascript Date to be checked
 */
function isNextWeek(date) {
    const tommory = new Date();
    tommory.setDate(tommory.getDate() + 1);
    tommory.setHours(0);
    tommory.setMinutes(0);
    tommory.setSeconds(0);
    tommory.setMilliseconds(0);

    const nextWeek = new Date();
    nextWeek.setDate(tommory.getDate() + 8);
    nextWeek.setHours(0);
    nextWeek.setMinutes(0);
    nextWeek.setSeconds(0);
    nextWeek.setMilliseconds(0);

    return date.getTime() >= tommory.getTime() && date.getTime() < nextWeek.getTime();
}

/**
 * Function to create a single task enclosed in an <li> tag
 * @param {*} task the task object
 */
function createTaskNode(task) {
    const li = document.createElement("li");
    li.id = "task" + task.id;
    li.className = 'list-group-item';

    const innerDiv = document.createElement('div');
    innerDiv.className = 'custom-control custom-checkbox';

    const externalDiv = document.createElement('div');
    externalDiv.className = 'd-flex w-100 justify-content-between';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'check-t' + task.id;

    if(task.important)
        checkbox.className = 'custom-control-input important';
    else
        checkbox.className = 'custom-control-input';
    
        innerDiv.appendChild(checkbox);

    const descriptionText = document.createElement('label');
    descriptionText.htmlFor = 'check-t' + task.id;
    descriptionText.className = 'custom-control-label';
    descriptionText.innerText = task.description;
    innerDiv.appendChild(descriptionText);

    if(task.project){
        const projectText = document.createElement('span');
        projectText.className = 'badge badge-success ml-4';
        projectText.innerText = task.project;
        innerDiv.appendChild(projectText);
    }

    const dateText = document.createElement('small');
    dateText.innerText = task.deadline.toString();
    //mark the expired tasks
    const now = new Date();
    if(task.deadline.getTime() < now.getTime()){
        dateText.classList.add('bg-danger');
        dateText.classList.add('text-white');
    }

    externalDiv.appendChild(innerDiv);
    externalDiv.appendChild(innerDiv);

    if(!task.private && task.sharedWith != undefined){
        innerDiv.insertAdjacentHTML("afterend", `<svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg> `);
    }

    li.appendChild(externalDiv);
    return li;
}

/**
 * Function to create the <ul></ul> list of tasks, without any filters
 */
function createAllTasks() {
    const taskList = document.getElementById('taskList');
    for(const task of tasks){
        const taskNode = createTaskNode(task);
        taskList.appendChild(taskNode);

        //set timeout to mark the deadline, if the deadline is valid
        if (!Number.isNaN(task.deadline.getTime())){
            const now = new Date();
            setTimeout(function(){
                const li = getElementById("task"+ task.id);
                li.classList.add('bg-danger');
                li.classList.add('text-white');
            }, task.deadline.getTime() - now.getTime(), task);
        }
    }
}

/**
 * Function to destroy the <ul></ul> list of tasks,
 */
function clearTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ' ';
}

//Filters definition

//Get the references to the filter links

const all = document.getElementById('filter-all');
const important = document.getElementById('filter-important');
const today = document.getElementById('filter-today');
const week = document.getElementById('filter-week');
const private = document.getElementById('filter-private');
const shared = document.getElementById('filter-shared');
const filterTitle = document.getElementById('filter-title');
//Set the callbacks

all.addEventListener('click', event=>{
    all.classList.add('active');
    important.classList.remove('active');
    today.classList.remove('active');
    week.classList.remove('active');
    private.classList.remove('active');
    shared.classList.remove('active');
    filterTitle.innerText ='All';

    clearTasks();
    createAllTasks();
});

important.addEventListener('click', event=>{
    all.classList.remove('active');
    important.classList.all('active');
    today.classList.remove('active');
    week.classList.remove('active');
    private.classList.remove('active');
    shared.classList.remove('active');
    filterTitle.innerText ='Important';

    clearTasks();

    const taskList = document.getElementById('taskList');

    for(const task of tasks){
        if(task.important){
            const taskNode = createTaskNode(task);
            taskList.appendChild(taskNode);
        }
    }
});

today.addEventListener('click', event=>{
    all.classList.remove('active');
    important.classList.remove('active');
    today.classList.add('active');
    week.classList.remove('active');
    private.classList.remove('active');
    shared.classList.remove('active');
    filterTitle.innerText = 'Today';

    clearTasks();

    const taskList = document.getElementById('taskList');

    for(const task of tasks){
        if(isToday(task.deadline)){
            const taskNode = createTaskNode(task);
            taskList.appendChild(taskNode);
        }
    }
});

week.addEventListener('click', event=>{
    all.classList.remove('active');
    important.classList.remove('active');
    today.classList.remove('active');
    week.classList.add('active');
    private.classList.remove('active');
    shared.classList.remove('active');
    filterTitle.innerTex ='Next 7 Days';

    clearTasks();

    const taskList = document.getElementById('taskList');

    for(const task of tasks){
        if(isNextWeek(task.deadline)){
            const taskNode = createTaskNode(task);
            taskList.appendChild(taskNode);
        }
    }
});

private.addEventListener('click', event=>{
    all.classList.remove('active');
    important.classList.remove('active');
    today.classList.remove('active');
    week.classList.remove('active');
    private.classList.add('active');
    shared.classList.remove('active');
    filterTitle.innerText ='Private';

    clearTasks();

    const taskList = document.getElementById('taskList');

    for(const task of tasks){
        if(task.private){
            const taskNode = createTaskNode(task);
            taskList.appendChild(taskNode);
        }
    }
});

shared.addEventListener('click', event=>{
    all.classList.remove('active');
    important.classList.remove('active');
    today.classList.remove('active');
    week.classList.remove('active');
    private.classList.remove('active');
    shared.classList.add('active');
    filterTitle.innerText='Shared With...';

    clearTasks();

    const taskList = document.getElementById('taskList');

    for(const task of tasks){
        if(!task.private){
            const taskNode = createTaskNode(task);
            taskList.appendChild(taskNode);
        }
    }
});

// Functions invocation
createAllTasks();