export function createNewItemForm () {
    
    const content = document.getElementById(`content`);

    const newItemForm = document.createElement(`form`);
    newItemForm.setAttribute(`id`,`form`);
    newItemForm.style.cssText = `display: flex; flex-direction: column; 
        flex-basis: 50px; margin: 10px`;

    const newItemField = document.createElement(`input`);
    newItemField.setAttribute(`id`,`input`);
    newItemField.style.cssText = `width: 500px` ;
    
    newItemForm.appendChild(newItemField);

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
    
    currentForm.replaceChildren();
    currentForm.remove()
}