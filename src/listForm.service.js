import { newTodo, organizeParentList } from './listManager.service';
import { buildListHtmlElements, clearListElements } from './listDisplay.service';
import { format } from 'date-fns'; 

export function createNewItemForm () {
    const title = document.createElement('h3');
    document.body.appendChild(title);
    const newItemForm = document.createElement(`form`);
    document.body.appendChild(newItemForm);

    title.innerHTML = `lets getter dunn`;
    
    newItemForm.id = `form`;

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
            newItemField.value = setDefaultDueDate();   
        }
    }

    const addButton = document.createElement(`button`);
    newItemForm.appendChild(addButton)
    addButton.type = `button`;
    addButton.id = `add`;
    addButton.innerHTML = `Add New Todo`;
    addButton.style.cssText = `width: 300px`;  

    addButton.addEventListener('click', function(event) {
        const todo = document.getElementById('todo');
        if (todo.value == '') alert('You must fill out the todo field');
        else {
            addNewTodo();
    
            resetNewItemForm();
            clearListElements();

            organizeParentList();
            buildListHtmlElements();
            }
    })
}

function resetNewItemForm () {
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