import { newTodo, parentList } from './newItem.service';
import { format } from 'date-fns'; 

export function createNewItemForm () {
    
    const content = document.getElementById(`content`);
    const newItemForm = document.createElement(`form`);
    
    content.appendChild(newItemForm);
    newItemForm.id = `form`;
    newItemForm.style.cssText = `display: flex; flex-direction: column; 
        flex-basis: 50px; margin: 10px`;

    const todoExample = newTodo('example');
    for (let key in todoExample) {

        if (key == 'isCompleted' || key == 'todoID') continue; 

        const newItemField = document.createElement('input');
        newItemForm.appendChild(newItemField);

        if (key == 'dueDate') {
            newItemField.type = 'date';
            newItemField.value = setDefaultDueDate();   
        }
        else {
            newItemField.placeholder = key; 
            const newItemLabel = document.createElement('label');
            newItemLabel.innerHTML = key;
        }

        newItemField.id = key;       
        newItemField.style.cssText = `width: 500px`;
    }

    const addButton = document.createElement(`button`);
    newItemForm.appendChild(addButton)
    addButton.type = `button`;
    addButton.id = `submit-button`;
    addButton.innerHTML = `Add New Todo`;
    addButton.style.cssText = `width: 300px`;  
}

export function clearNewItemForm () {
    const currentForm = document.getElementById('form');
    if (!currentForm) return;
    
    currentForm.reset();
    const dateField = document.getElementById('dueDate');
    dateField.value = setDefaultDueDate();
}

export function addNewItem() {
    const newItemForm = document.getElementById('form');

    const estOffset = 5 * 60 * 60 * 1000;
    const dueDate = new Date(Date.parse(newItemForm.dueDate.value) + estOffset);
    console.log(dueDate);

    const newItem = newTodo(
        newItemForm.todo.value,
        newItemForm.details.value,
        newItemForm.tags.value,
        format(dueDate, 'MMM-dd-yyyy')
    )
    
    parentList.push(newItem);
}

function setDefaultDueDate() {
    const today = new Date;
    const tomorrow = new Date(); 
    tomorrow.setDate(today.getDate());
    return format(tomorrow, 'yyyy-MM-dd');
}