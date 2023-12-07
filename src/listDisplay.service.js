import * as listManagement from './listManager.service';
Object.entries(listManagement).forEach(([name, exported]) => window[name] = exported);
import { format } from 'date-fns'; 
import { getTodoByID } from './listManager.service';

export function buildListHtmlElements() {

    const parentList = getParentList();

    const content = document.getElementById(`content`);
    const listDisplay = document.createElement('table');
    content.appendChild(listDisplay);
    listDisplay.setAttribute('id','todo-list');

    
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
            itemDisplay.innerHTML = parentList[i][key]; 
            itemRow.appendChild(itemDisplay);
        }

        const editTodoButtonCell = document.createElement('td');
        itemRow.appendChild(editTodoButtonCell);
        const editTodoButton = document.createElement('button');
        editTodoButtonCell.appendChild(editTodoButton);
        editTodoButton.className = `editor`
        editTodoButton.type = `button`;
        editTodoButton.innerHTML = `&#xe3c9`;
        editTodoButton.addEventListener('click', () => {
            createEditTodoForm(itemRow);
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
}

export function clearListElements() {
    const listDisplay = document.getElementById('todo-list');
    if (listDisplay) {
        listDisplay.replaceChildren();
        listDisplay.remove();
    }
}


export function setupCheckListeners() {

    const checkBoxes = document.getElementsByClassName('checkbox');
    if(!checkBoxes) return;

    Array.from(checkBoxes).forEach((checkBox) => {
        checkBox.addEventListener('click', () => {
            changeCompletionStatus(checkBox.id);
            clearListElements();
            organizeParentList();
            buildListHtmlElements();
            setupCheckListeners();
        }, false)
    });   
}

export function createEditTodoForm(itemRow) {

    const currentTodo = getTodoByID(itemRow.id);
    const todoTemplate = newTodo();

    for (let key in todoTemplate) {
        if (key == 'isCompleted' || key == 'todoID')  continue; 

        const newField = document.createElement('input');
        newField.id = itemRow.id + '-' + key;
        newField.value = currentTodo[key];
        if (key == 'dueDate') newField.type = 'date';

        const itemNode = itemRow.getElementsByClassName(key);
        const item = Array.from(itemNode)[0];
        itemRow.replaceChild(newField, item)
    }

    const editButtonNode = itemRow.getElementsByClassName(`editor`);
    const editButton = Array.from(editButtonNode)[0];

    const submitEditButton = document.createElement('button');
    submitEditButton.type = `button`;
    submitEditButton.innerHTML = `&check`;
    submitEditButton.addEventListener('click', () => {
        const updatedTodo = 
            document.getElementById(`${itemRow.id}`+'-'+`todo`).value;
        const updatedDetails = 
            document.getElementById(`${itemRow.id}`+'-'+`details`).value;
        const updatedTags = 
            document.getElementById(`${itemRow.id}`+'-'+`tags`).value;
        const updatedDueDate = 
            document.getElementById(`${itemRow.id}`+'-'+`dueDate`).value;
        
        const updatedTodoItem = 
            newTodo(updatedTodo, updatedDetails, updatedTags, updatedDueDate);
        if (itemRow.className = 'completed') updatedTodoItem.isCompleted = true;
        
        removeTodo(itemRow.id);
        const parentList = getParentList();
        parentList.push(updatedTodoItem);
        setParentList(parentList);
        organizeParentList();
        clearListElements();
        buildListHtmlElements();
    })

    editButton.replaceWith(submitEditButton); 
}

export function changeCompletionStatus(todoID) {

    const parentList = getParentList();

    const index = parentList.findIndex(
        todo =>  todo.todoID == todoID);

    const itemChild = document.getElementById(todoID);
    if (!itemChild) return;

    const itemRow = itemChild.parentElement.parentElement;
    if (!itemRow) return;
    
    if (!parentList[index]['isCompleted']) {
        parentList[index]['isCompleted'] = true;
        itemRow.className = 'completed';
    }   
    else {
        parentList[index]['isCompleted'] = false;
        itemRow.className = 'not-completed';  
    };
    
    setParentList(parentList);
    console.table(getParentList());
}