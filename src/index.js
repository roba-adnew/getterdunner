import { clearNewItemForm, createNewItemForm, addNewItem } from './listInterface.service.js';
import { parentList, organizeParentList } from './newItem.service.js'
import { buildListHtmlElements, clearList, setupCheckListeners } from './listDisplay.service.js';
import './style.css';

createNewItemForm();
buildListHtmlElements();
setupCheckListeners();

const submitButton =  document.getElementById('submit-button');
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    addNewItem();
   
    clearNewItemForm();
    clearList();

    organizeParentList();
    buildListHtmlElements();
    setupCheckListeners();
    
    console.table(parentList)
})

