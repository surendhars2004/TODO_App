document.addEventListener("DOMContentLoaded", () => {
    const taskAddButton = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("input");
    const taskList = document.getElementById("taskList");

    let task = JSON.parse(localStorage.getItem("tasks")) || [];
    
    renderTask() // render the UI when website is loaded

    //add task to array
    taskAddButton.addEventListener("click", () => {
        let taskText = taskInput.value.trim();
        if(taskText.length == 0) return;
        const newtask = {
            id: Date.now(),
            text: taskText,
            isComplete: false,
        };
        task.unshift(newtask);
        saveTask();
        renderTask()
        taskInput.value = ""; // clear input field
    });

    //save task array in local storage
    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(task));
    }

    //render the task list
    function renderTask() {
        taskList.innerHTML=" "
        task.forEach(element => {
            let newDiv = document.createElement('div')
            newDiv.classList.add('task')
            newDiv.setAttribute('data-id',element.id)
            newDiv.innerHTML = `<i class="bi bi-check-all ${element.isComplete ? "" : "d-none"}"></i>
                                <i class="bi bi-exclamation-circle ${element.isComplete ? "d-none" : "" }"></i>
                                <p style="color: ${element.isComplete ? "grey" : ""}; text-decoration:${element.isComplete ? "line-through" : ""}">${element.text} </p>
                                <button style="${element.isComplete ? 'text-decoration: line-through; background-color: rgb(245, 56, 56)' : ''}" class="deleteBtn">Delete</button>`
            taskList.appendChild(newDiv)

            newDiv.addEventListener('dblclick',(event) =>{  // directly aplying to the child div
                if(event.target.tagName === "BUTTON") {
                    console.log("bi")
                    return
                }
                else{
                    element.isComplete = !element.isComplete;
                    saveTask();
                    renderTask() // for applying the css chages for icon and paragraph tag color changing
                }
            })
            newDiv.querySelector('.deleteBtn').addEventListener('click',()=>{
                task=task.filter((t)=> t.id != element.id)
                saveTask();
                newDiv.remove()
                renderTask()
            })
        })
        
    }
});
