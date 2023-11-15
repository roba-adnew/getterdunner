// Filler code
import { clearNewItemForm, createNewItemForm, addNewItem } from './listInterface.service.js';
import { displayList, clearList } from './listDisplay.service.js';

createNewItemForm();
displayList();

const submitButton =  document.getElementById('submit-button');
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    addNewItem();

    clearNewItemForm();
    clearList();

    createNewItemForm();
    displayList();
})

