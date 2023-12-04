import { clearNewItemForm, createNewItemForm } from './listForm.service.js';
import { organizeParentList, getParentList, addNewItem } from './listManager.service.js'
import { buildListHtmlElements, clearList, setupCheckListeners } from './listDisplay.service.js';
import './style.css';

createNewItemForm();
buildListHtmlElements();
setupCheckListeners();

const submitButton =  document.getElementById('submit-button');
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    const todo = document.getElementById('todo');
    if (todo.value == '') alert('You must fill out the todo field');
    else {
        addNewItem();
   
        clearNewItemForm();
        clearList();

        organizeParentList();
        buildListHtmlElements();
        setupCheckListeners();
        }
    
    console.table(getParentList())
})