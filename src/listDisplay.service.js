import * as listManagement from './listManager.service';
Object.entries(listManagement).forEach(([name, exported]) => window[name] = exported); 
import { format } from 'date-fns'; 
import { getTodoByID } from './listManager.service';

export function buildListHtmlElements() {
    // Creating the title and header row for the list 
    const content = document.getElementById(`content`);
    const title = document.createElement('h3');
    title.id = 'listHeader';
    title.innerHTML = `wut we gotta get dunn`;
    content.appendChild(title);
    const listDisplay = document.createElement('table');
    content.appendChild(listDisplay);
    listDisplay.setAttribute('id','todo-list');

    const parentList = getParentList();
    const todoExample = newTodo();
    const headerRow = document.createElement(`tr`);
    listDisplay.appendChild(headerRow);
    for (let key in todoExample) {
        if (key == `todoID`) continue;
        const headerCell = document.createElement(`th`);
        switch (key) {
            case `isCompleted`: headerCell.innerHTML = `dunn?`; break;
            case `todo`: headerCell.innerHTML = `wut wer doin`; break;
            case `details`: headerCell.innerHTML = `the other stuf`; break;
            case `dueDate`: headerCell.innerHTML = `wen we gotta do it`; break;
        }
        headerRow.appendChild(headerCell);
    }
    const editHeader = document.createElement(`th`);
    editHeader.innerHTML = `&#9998`;
    headerRow.appendChild(editHeader);

    const deleteHeader = document.createElement(`th`);
    deleteHeader.innerHTML = `&#x2716`;
    headerRow.appendChild(deleteHeader);
    

    // Creating elements to display todo item details
    for (let i = 0; i < parentList.length; i++){
        const itemRow = document.createElement('tr');
        const checkBoxCell = document.createElement('td');
        itemRow.appendChild(checkBoxCell);
        itemRow.id = parentList[i]['todoID'];
        const checkBox = document.createElement('input');
        checkBoxCell.append(checkBox);
        
        checkBox.className = `checkbox`;
        checkBox.type = `checkbox`;
        checkBox.id = parentList[i]['todoID'];

        if(parentList[i][`isCompleted`]) {
            checkBox.checked = true;
            itemRow.className = 'completed'
        }
        else {
            checkBox.checked = false;
            itemRow.className = 'not-completed'
        }

        const todoTemplate = newTodo();
        for (let key in todoTemplate) {
            if (key == 'isCompleted' || key == 'todoID')  continue; 
            const itemDisplay = document.createElement('td');
            itemDisplay.className = key;
            const value = parentList[i][key];
            if (key == 'dueDate') {
                const correctedDate = correctDateOffset(value);
                itemDisplay.innerHTML = format(correctedDate, 'MMM-dd-yyyy') 
            }
            else {
                itemDisplay.innerHTML = value;
            }
            itemRow.appendChild(itemDisplay);
        }

        // Creating the edit and delete buttons for each todo item
        const editTodoButtonCell = document.createElement('td');
        itemRow.appendChild(editTodoButtonCell);
        const editTodoButton = document.createElement('button');
        editTodoButtonCell.appendChild(editTodoButton);
        editTodoButton.className = `editor`
        editTodoButton.type = `button`;
        editTodoButton.innerHTML = `&#9998`;
        editTodoButton.addEventListener('click', () => {
            if (editTodoButtonCell.parentNode.className == 'completed') {
                alert(`You can only edit items that haven't been completed`);
            }
            else {
                createEditTodoForm(itemRow);
            }
        })

        const deleteTodoButtonCell = document.createElement('td');
        itemRow.appendChild(deleteTodoButtonCell);
        const deleteTodoButton = document.createElement('button');
        deleteTodoButtonCell.appendChild(deleteTodoButton)
        deleteTodoButton.type = `button`;
        deleteTodoButton.innerHTML = `&#x2716`;
        deleteTodoButton.addEventListener('click', () => {
            removeTodo(parentList[i].todoID);
            itemRow.parentElement.removeChild(itemRow);
        }) 

        listDisplay.appendChild(itemRow);
    }
    setupCheckListeners();
}

export function clearListElements() {
    const listDisplay = document.getElementById('todo-list');
    const listHeader = document.getElementById(`listHeader`)
    if (listDisplay) {
        listDisplay.replaceChildren();
        listDisplay.remove();
    }
    if(listHeader) {
        listHeader.remove();
    }
}

function setupCheckListeners() {
    // Sets up the event listeners that check if todo item completion has been 
    const checkBoxes = document.getElementsByClassName('checkbox');
    if(!checkBoxes) return;

    Array.from(checkBoxes).forEach((checkBox) => {
        checkBox.addEventListener('click', () => {
            changeCompletionStatus(checkBox.id);
            clearListElements();
            organizeParentList();
            buildListHtmlElements();
        }, false)
    });   
}

function createEditTodoForm(itemRow) {

    const currentTodo = getTodoByID(itemRow.id)

    for (let key in currentTodo) {
        if (key == 'isCompleted' || key == 'todoID')  continue; 

        const newField = document.createElement('input');
        newField.id = itemRow.id + '-' + key;
        newField.value = currentTodo[key];
        if (key == 'dueDate') newField.type = 'date';

        const itemNode = itemRow.getElementsByClassName(key);
        const item = Array.from(itemNode)[0];
        item.innerHTML = '';
        item.appendChild(newField);
    }

    const editButtonNode = itemRow.getElementsByClassName(`editor`);
    const editButton = Array.from(editButtonNode)[0];

    const submitEditButton = document.createElement('button');
    submitEditButton.type = `button`;
    submitEditButton.innerHTML = `&#x2713`;
    submitEditButton.addEventListener('click', () => {
        
        const idStr = `${itemRow.id}`+'-';
        
        const updatedTodo = document.getElementById(idStr + `todo`).value;
        const updatedDetails = document.getElementById(idStr + `details`).value;
        const updatedDueDate = document.getElementById(idStr + `dueDate`).value;
        
        const updatedTodoItem = newTodo(updatedTodo, updatedDetails, updatedDueDate);

        if (itemRow.className = 'completed') updatedTodoItem.isCompleted = true;
        
        updateTodo(itemRow.id, updatedTodoItem);
        clearListElements();
        buildListHtmlElements();
    })

    editButton.replaceWith(submitEditButton); 
}

function changeCompletionStatus(todoID) {
    // Updates todo item completion status in the parent list 

    const parentList = getParentList();

    const index = parentList.findIndex(
        todo =>  todo.todoID == todoID);

    const todoElement = document.getElementById(todoID);
    if (!todoElement) return;
    
    if (!parentList[index]['isCompleted']) {
        parentList[index]['isCompleted'] = true;
        todoElement.className = 'completed';
    }   
    else {
        parentList[index]['isCompleted'] = false;
        todoElement.className = 'not-completed';  
    };
    
    setParentList(parentList);
    organizeParentList();
}