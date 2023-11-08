import { parentListKeeper } from "./newItem.service";

// This will export a function that will subdivide any list between things that have been completed and things that have not been completed 

export function displayList() {

    const completedList = [];
    const todoList = []

    for (let item in parentListKeeper.parentList) {
        if (!item.isCompleted) todoList.push(item);
        if (item.isCompleted) completedList.push(item);
    }

    const listDisplay = document.createElement('table');
    listDisplay.setAttribute('id','todo-list');
    
    function printList(list) {
        for (let item in list){
            const itemRow = document.createElement('tr');
            const checkBox = document.createElement('td');
            // Add a clickable check box for the cell data

            const itemDisplay = document.createElement('td');
            itemDisplay.innerHTML = item.name; 
            // if (item.isCompleted) Add in code for strikethrough css styling;

            itemRow.appendChild(checkBox);
            itemRow.appendChild(itemDisplay);
            listDisplay.appendChild(itemRow);
        } 
    }

    printList(todoList);
    printList(completedList);
}

export function clearList() {
    const listDisplay = document.getElementById('todo-list');
    if (listDisplay) {
        listDisplay.replaceChildren();
        listDisplay.remove();
    }
}