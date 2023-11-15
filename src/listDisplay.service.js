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
    
    function buildHtmlList(list) {
        for (let item in list){
            const itemRow = document.createElement('tr');
            const checkBox = document.createElement('td');
            // Add a clickable check box for the cell data

            const itemDisplay = document.createElement('td');
            console.log(item);
            itemDisplay.innerHTML = item.nameInput; 
            // if (item.isCompleted) Add in code for strikethrough css styling;

            itemRow.appendChild(checkBox);
            itemRow.appendChild(itemDisplay);
            listDisplay.appendChild(itemRow);
        } 

        return listDisplay;
    }

    const todoHtml = buildHtmlList(todoList);
    const completedHTML = buildHtmlList(completedList);

    const content = document.getElementById(`content`);
    content.appendChild(todoHtml);
    content.appendChild(completedHTML);
}

export function clearList() {
    const listDisplay = document.getElementById('todo-list');
    if (listDisplay) {
        listDisplay.replaceChildren();
        listDisplay.remove();
    }
}