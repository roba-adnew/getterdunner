// Filler code
import { clearNewItemForm, createNewItemForm, addNewItem } from './listInterface.service.js';
import { displayList, clearList } from './listRender.service.js';

createNewItemForm();
displayList();

const submitButton =  document.getElementById('submit-button');
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    addNewItem();
    clearNewItemForm();
    createNewItemForm();
    clearList();
    displayList();
})

