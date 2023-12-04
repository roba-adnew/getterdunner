import { newTodo, organizeParentList, getParentList, setParentList } from './listManager.service';

// This will export a function that will subdivide any list between things that have been completed and things that have not been completed 

export function buildListHtmlElements() {

    const parentList = getParentList();

    const content = document.getElementById(`content`);
    const listDisplay = document.createElement('table');
    content.appendChild(listDisplay);
    listDisplay.setAttribute('id','todo-list');

    
    
    for (let i = 0; i < parentList.length; i++){
        const itemRow = document.createElement('tr');
        const checkBoxCell = document.createElement('td');
        itemRow.appendChild(checkBoxCell);
        const checkBox = document.createElement('input');
        checkBoxCell.append(checkBox);
        
        checkBox.className = `checkbox`;
        checkBox.type = `checkbox`;
        checkBox.id = parentList[i]['todoID'];

        if(parentList[i][`isCompleted`]) {
            checkBox.checked = true;
            itemRow.className = 'completed'
        }
        else {
            checkBox.checked = false;
            itemRow.className = 'not-completed'
        }

        const itemExample = newTodo();
        for (let key in itemExample) {
            if (key == 'isCompleted' || key == 'todoID')  continue; 
            const itemDisplay = document.createElement('td');
            itemDisplay.innerHTML = parentList[i][key]; 
            itemRow.appendChild(itemDisplay);
        }
        listDisplay.appendChild(itemRow);
    }
}

export function clearList() {
    const listDisplay = document.getElementById('todo-list');
    if (listDisplay) {
        listDisplay.replaceChildren();
        listDisplay.remove();
    }
}

export function setupCheckListeners() {

    const checkBoxes = document.getElementsByClassName('checkbox');
    if(!checkBoxes) return;

    Array.from(checkBoxes).forEach((checkBox) => {
        checkBox.addEventListener('click', () => {
            changeCompletionStatus(checkBox.id);
            checkBox.removeEventListener('click', changeCompletionStatus(checkBox.id), false);
            buildListHtmlElements();
            setupCheckListeners();
        }, false)
    });   
}

export function changeCompletionStatus(todoID) {

    const parentList = getParentList();
    const index = parentList.findIndex(
        todo =>  todo.todoID == todoID);

    const itemChild = document.getElementById(todoID);
    if (!itemChild) return;

    const itemRow = itemChild.parentElement.parentElement;
    if (!itemRow) return;
    
    if (!parentList[index]['isCompleted']) {
        parentList[index]['isCompleted'] = true;
        itemRow.className = 'completed';
    }   
    else {
        parentList[index]['isCompleted'] = false;
        itemRow.className = 'not-completed';  
    };
    
    setParentList();
    clearList();
    organizeParentList();
    console.table(getParentList());
}