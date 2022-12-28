const addButton = document.getElementsByClassName("add-button")[0]; 
const percentage = document.getElementById("percentage"); 
const evaluate = document.getElementById("evaluate"); 
const taskList = document.getElementById("task-list");
const noneState = document.getElementById("none-state");
const monitor = document.getElementById("monitor");
let tasks = [];

addButton.addEventListener ("click", () =>{
    let input = prompt("Enter list");
    if (tasks.find(task => task.name.toLowerCase() === input.toLowerCase())){
        alert("Already in list");
        return;
    }
    const obj = {
        name: input,
        done: false,
    }
    tasks.push(obj);
    updateTaskListView();
});


function setPercentage() {
    let percent = 0;
    const totalDone = tasks.filter(task => task.done === true).length;
        const totalItems = tasks.length;
        percent = totalDone/totalItems * 100
    if( tasks.length > 0){
        
    }
    percentage.innerText = `${percent}%`;
    if (percent <= 0){
        evaluate.innerHTML = "NOT STARTED";
    }else if (percent >= 100){
        evaluate.innerHTML = "COMPLETED";
    }else {
        evaluate.innerHTML = "STARTED";
    }
}



function addItem(task, pos) {

    let newItem = document.createElement("li");
    newItem.className = task.done ? "done" : "";

    const img = document.createElement("img");
    img.className = "del";
    img.src = "images/delete.png";
    img.addEventListener("click", (e) => {
        e.stopPropagation();
       
        if (confirm(`Are you sure you want to delete: ${task.name}`)){
          
            tasks.splice(pos, 1);
            updateTaskListView();
        }
    })


    newItem.innerHTML = `
        <span>${task.name}</span>
        <button class="btn" ></button>
    `;
    newItem.appendChild(img);

    newItem.addEventListener("click", (e) => {
        let obj = tasks[pos];
        obj.done = !obj.done;
        tasks[pos] = obj;
        updateTaskListView(); 
    })

    taskList.prepend(newItem);
}


function updateTaskListView() {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        addItem(tasks[i], i)
    }
    setPercentage();
    if (tasks.length > 0){
        // hide none state and show task list
        noneState.style.display = "none";
        taskList.style.display = "inherit";
        monitor.style.display = "flex";

    }else {
        // hide task list and show none state
        noneState.style.display = "inherit";
        taskList.style.display = "none";
        monitor.style.display = "none";
    }
} 

updateTaskListView();

