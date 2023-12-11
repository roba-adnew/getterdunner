import { newTodo } from './listManager.service';
import { format } from 'date-fns'; 

export function createNewItemForm () {
    
    const content = document.getElementById(`content`);
    const title = document.createElement('h3');
    title.innerHTML = `lets getter dunn`;
    content.appendChild(title);
    const newItemForm = document.createElement(`form`);
    content.appendChild(newItemForm);

    newItemForm.id = `form`;
    newItemForm.style.cssText = `display: flex; flex-direction: column; 
        flex-basis: 50px; margin: 10px`;

    const todoExample = newTodo('example');
    for (let key in todoExample) {

        if (key == 'isCompleted' || key == 'todoID') continue;    

        if (key == 'todo') {
            const newItemField = document.createElement('input');
            newItemForm.appendChild(newItemField);
            newItemField.placeholder = `wuts gotta get dunn`; 
            newItemField.id = key;       
        }

        if (key == 'details') {
            const optionalButton = document.createElement('button');
            newItemForm.appendChild(optionalButton);
            optionalButton.type = 'button';
            optionalButton.className = 'optional'
            optionalButton.innerHTML =  '+ ' + key;
            optionalButton.addEventListener('click', function() {
                const newItemField = document.createElement('input');
                newItemField.placeholder = `wut else ya need to know`; 
                newItemField.id = key;       
                optionalButton.replaceWith(newItemField);
            }) 
        }
        
        if (key == 'dueDate') {
            const newItemField = document.createElement('input');
            newItemForm.appendChild(newItemField);
            newItemField.id = key;  
            newItemField.type = 'date';
            newItemField.value = `setDefaultDueDate(); `  
        }
    }

    const addButton = document.createElement(`button`);
    newItemForm.appendChild(addButton)
    addButton.type = `button`;
    addButton.id = `add`;
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

export function setDefaultDueDate() {
    const today = new Date;
    const tomorrow = new Date(); 
    tomorrow.setDate(today.getDate());
    return format(tomorrow, 'yyyy-MM-dd');
}