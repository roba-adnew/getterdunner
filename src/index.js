import { clearNewItemForm, createNewItemForm } from './listForm.service.js';
import { organizeParentList, addNewTodo } from './listManager.service.js'
import { buildListHtmlElements, clearListElements } from './listDisplay.service.js';
import './style.css';

createNewItemForm();
buildListHtmlElements();

const addButton =  document.getElementById('add');
addButton.addEventListener('click', function(event) {
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