import { clearNewItemForm, createNewItemForm } from './listForm.service.js';
import { organizeParentList, getParentList, addNewTodo } from './listManager.service.js'
import { buildListHtmlElements, clearListElements, setupCheckListeners } from './listDisplay.service.js';
import './style.css';

createNewItemForm();
buildListHtmlElements();

const submitButton =  document.getElementById('submit-button');
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    const todo = document.getElementById('todo');
    if (todo.value == '') alert('You must fill out the todo field');
    else {
        addNewTodo();
   
        clearNewItemForm();
        clearListElements();

        organizeParentList();
        buildListHtmlElements();
        }
})