class App {
    constructor() {
        this.taskManager = new TaskManager();

        //create filters
        this.filterView = new Filter(this.taskManager);

        //create projects
        this.projectView = new Project(this.taskManager, this.filterView);

        //set up cutom validtion callback -> if I insert a time for the deadline, then the date is required
        const timeIpunt = document.getElementById('form_deadline_time');
        const dateInput = document.getElementById('form_deadline_date');
        timeIpunt.addEventListener("input", function (evennt) {
            if (timeIpunt.value !== "") {
                //check date
                if (dateInput.value !== "") {
                    dateInput.setCustomValidity("Please, specify the date!");
                    dateInput.classList.add("invalid");
                }
            } else {
                dateInput.setCustomValidity("");
                dateInput.classList.remove("invalid");
            }
        });

        dateInput.addEventListener("input", function (evennt) {
            if (dateInput.value !== "")
                dateInput.setCustomValidity("")
        });

        //set up form callback
        document.getElementById('addForm').addEventListener('submit', event => {
            event.preventDefault();
            const addForm = document.getElementById('addForm');
            const description = addForm.elements["form_description"].value;
            let project = addForm.elements["form_project"].value;
            if (project === "")
                project = undefined;

            const important = addForm.elements["form_important"].checked;
            const privateTask = addForm.elements["form_private"].checked;

            const deadlineDate = addForm.elements["form_deadline_date"].value;
            const deadlineTime = addForm.elements["form_deadline_time"].value;

            let deadline = undefined;
            if(deadlineDate !== "" && deadlineTime!== "")
                deadline = moment(deadlineDate + " " + deadlineTime);
            else if(deadlineDate !=="")
                deadline = moment(deadlineDate);
            const task = new Task(description, important, privateTask, deadline, project);

            this.taskManager.addTask(task);

            //refresh the user inerface
            this.filterView.clearTasks();
            this.filterView.showTasks('all');

            this.projectView.clearTasks();
            this.projectView.createAllProjects();

            //reset the form and close the modal
            addForm.reset();
            document.getElementById('closeModal').click();
        });

        this.taskManager.showTasks('all');
        this.projectView.createAllProjects();
    }
}