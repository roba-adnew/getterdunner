import { newTodo, parentList, organizeParentList } from "./newItem.service";

// This will export a function that will subdivide any list between things that have been completed and things that have not been completed 

export function buildListHtmlElements() {

    const content = document.getElementById(`content`);
    const listDisplay = document.createElement('table');
    listDisplay.setAttribute('id','todo-list');
    content.appendChild(listDisplay);
    
    for (let i = 0; i < parentList.length; i++){
        const itemRow = document.createElement('tr');

        const checkBoxCell = document.createElement('td');
        const checkBox = document.createElement('input');
        checkBox.className = `checkbox`;
        checkBoxCell.append(checkBox);
        itemRow.appendChild(checkBoxCell);

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

export function setupCheckListeners () {

//     Array.from(document.getElementsByClassName("myElement"))
//   .forEach((element) => element.style.size = "100px");

    const checkBoxes = document.getElementsByClassName('checkbox');
    if(!checkBoxes) return;

    Array.from(checkBoxes).forEach((checkBox) => {
        checkBox.addEventListener('click', (event) => {
            event.preventDefault;

            const index = parentList.findIndex(
                todo =>  todo.todoID == checkBox.id);            
            const itemRow = checkBox.parentElement.parentElement;
            
            if (!parentList[index]['isCompleted']) {
                parentList[index]['isCompleted'] = true;
                itemRow.className = 'completed';
            }   
            else {
                parentList[index]['isCompleted'] = false;
                itemRow.className = 'not-completed';  
            };

            console.table(parentList);
        
            organizeParentList();
        })
    });   
}

export function clearList() {
    const listDisplay = document.getElementById('todo-list');
    if (listDisplay) {
        listDisplay.replaceChildren();
        listDisplay.remove();
    }
}