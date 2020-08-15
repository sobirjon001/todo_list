// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getrecords);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletCheck);
filterOption.addEventListener("click", filterTodo);


// Functions

// Create todos from local storage saved records
function getrecords() {
    // Check If records storage exist
    let records;
    if (localStorage.getItem("records") === null) {
        records = [];
    } else {
        records = JSON.parse(localStorage.getItem("records"));
    }
    records.forEach(function(record) {
        // Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        if (record.checked === "compl") {
            todoDiv.classList.add("completed");
        }
        // Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = record.text;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // Check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Appent to list
        todoList.appendChild(todoDiv);
    });
}

    // Create todos by user
function addTodo(event) {
    // Prevent from submitting
    event.preventDefault();
    // Check If records storage exist
    let records;
    if (localStorage.getItem("records") === null) {
        records = [];
    } else {
        records = JSON.parse(localStorage.getItem("records"));
    }
    // Check if this entry exist
    if (records.find(record => record.text === todoInput.value)) {
        alert("This Entry already exist, please write different")
    } else {
        // Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // Add todo to localStorage
        saveLocalrecords({"text":todoInput.value, "checked":"uncompl"});
        // Check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Appent to list
        todoList.appendChild(todoDiv);
        // Clear Todo input value
        todoInput.value = "";
    }
}

function deletCheck(e) {
    const item = e.target;
    // Delete todo
    if (item.classList[0] === "trash-btn") {
        const todobox = item.parentElement;
        const todoIndex = todobox.children[0].innerText;
        // Animation
        todobox.classList.add("fall");
        removeLocalrecords(todoIndex);
        todobox.addEventListener("transitionend", function() {
            todobox.remove();
        });
    }
    // Check mark
    if (item.classList[0] === "complete-btn") {
        const todobox = item.parentElement;
        const todoIndex = todobox.children[0].innerText;
        todobox.classList.toggle("completed");
        saveCheck(todobox, todoIndex);
    }
}

function filterTodo(e) {
    const records = todoList.childNodes;
    records.forEach(function(todo){
        switch(e.target.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed": 
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalrecords(record) {
    // Check If records storage exist
    if (localStorage.getItem("records") === null) {
        records = [];
    } else {
        records = JSON.parse(localStorage.getItem("records"));
    }

    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));
}

function removeLocalrecords(todoIndex) {
    // Check If todo storage exist
    let records;
    if (localStorage.getItem("records") === null) {
        records = [];
    } else {
        records = JSON.parse(localStorage.getItem("records"));
    }
    const i = records.findIndex(record => record.text === todoIndex);
    records.splice(i, 1);
    localStorage.setItem("records", JSON.stringify(records));
}

function saveCheck(todobox, todoIndex) {
    // Check If todo storage exist
    let records;
    if (localStorage.getItem("records") === null) {
        records = [];
    } else {
        records = JSON.parse(localStorage.getItem("records"));
    }
    if (todobox.classList.contains("completed")) {
        records.find(record => record.text === todoIndex).checked = "compl";
    } else {
        records.find(record => record.text === todoIndex).checked = "uncompl";
    }
    localStorage.setItem("records", JSON.stringify(records));
}