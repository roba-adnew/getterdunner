import { newTodo, parentList } from './newItem.service';

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
    const newItem = newTodo(
        newItemForm.todo.value,
        newItemForm.details.value,
        newItemForm.tags.value,
        newItemForm.dueDate.value
    )
    
    parentList.push(newItem);
}