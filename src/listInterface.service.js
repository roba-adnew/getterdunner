import { newTodo, parentList } from './newItem.service';
import { format } from 'date-fns'; 

export function createNewItemForm () {
    
    const content = document.getElementById(`content`);

    const newItemForm = document.createElement(`form`);
    newItemForm.setAttribute(`id`,`form`);
    newItemForm.style.cssText = `display: flex; flex-direction: column; 
        flex-basis: 50px; margin: 10px`;

    const todoExample = newTodo('example');
    for (let key in todoExample) {

        if (key == 'isCompleted' || key == 'todoID') continue; 
        if (key == 'dueDate') {
            const newItemField = document.createElement('input');
            newItemForm.appendChild(newItemField);
            newItemField.type = 'date';
            newItemField.id = key;
            const today = new Date;
            const tomorrow = new Date(); 
            tomorrow.setDate(today.getDate() + 1);
            newItemField.value = format(tomorrow, 'yyyy-mm-dd');
            continue;
        };

        const newItemField = document.createElement(`input`);
        if (key == 'dueDate') {
            newItemField.type = 'date';
            const date = new Date();
            let today = date.getDate() + 1;
            newItemField.value = today;
        }
        newItemField.id = key;
        newItemField.placeholder = key;           
        newItemField.style.cssText = `width: 500px` ;
        newItemForm.appendChild(newItemField);
    
        const newItemLabel = document.createElement('label');
        newItemLabel.style.cssText = `width: 100px`;
        newItemLabel.innerHTML = key;
    }

    const submitButton = document.createElement(`button`);
    submitButton.setAttribute(`id`, `submit-button`)
    submitButton.innerHTML = `Add New Todo` ;
    submitButton.style.cssText = `width: 300px` ;

    newItemForm.appendChild(submitButton)

    content.appendChild(newItemForm);
}

export function clearNewItemForm () {
    const currentForm = document.getElementById('form');
    if (!currentForm) return;
    
    currentForm.reset();
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