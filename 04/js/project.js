class Project{
    constructor(taskManager, filterView){

    }

    /**
     * Function to create the list of projects in the side menu
     */
    createAllProjects(){
        const ProjectList = document.getElementById("projects");
        for(const Project of this.taskManager.projects){
            const projectNode = this.createProjectNode(project);
            ProjectList.appendChild(projectNode);
        }
    }

    /**
     * Function to create a single project node
     * @param {*} project the project name that will be created
     */
    createProjectNode(project){
        const a = document.createElement('a');
        a.className = "list-group-item list-group-item-action";
        a.innerText = project;
        a.addEventListener('click', event=> {
            this.filterView.clearTasks();
            const taskList = document.getElementById("taskList");

            for(const task of this.taskManager.getElementById(project)){
                const taskNode = this.filterView.createTaskNode(task);
                taskList.appendChild(taskNode);
            }
        });
        return a;
    }

    /**
     * Function to destroy the list of projects in the side meau
     */
    clearProjects(){
        const ProjectList = document.getElementById('projects');
        ProjectList.innerHTML = '';
    }
}