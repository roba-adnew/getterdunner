// Filler code
import { clearNewItemForm, createNewItemForm, addNewItem } from './listInterface.service.js';
import { parentList } from './newItem.service.js'
import { displayList, clearList } from './listDisplay.service.js';
import './style.css';

createNewItemForm();
displayList();

const submitButton =  document.getElementById('submit-button');
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    addNewItem();

    clearNewItemForm();
    clearList();

    displayList();
    console.table(parentList)
})

