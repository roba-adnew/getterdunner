// Filler code
import * as listInterface from './listInterface.service.js';

listInterface.createNewItemForm();

const submitButton =  document.getElementById('submit-button');
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(`we added the new item`);

    listInterface.clearNewItemForm();
    listInterface.createNewItemForm();
})

