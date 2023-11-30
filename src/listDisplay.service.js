import { newTodo, parentList } from "./newItem.service";

// This will export a function that will subdivide any list between things that have been completed and things that have not been completed 

export function displayList() {

    const completedList = [];
    const todoList = []

    for (let i = 0; i < parentList.length; i++) {
        const item = parentList[i];
        if (!item.isCompleted) todoList.push(item);
        if (item.isCompleted) completedList.push(item);
    }

    
    const listDisplay = document.createElement('table');
    listDisplay.setAttribute('id','todo-list');
    
    function buildHtmlList(list) {
        for (let i = 0; i < list.length; i++){
            const itemRow = document.createElement('tr');
            itemRow.className = 'not-completed';
            const checkBoxCell = document.createElement('td');
            
            const checkBox = document.createElement('input');
            checkBox.type = `checkbox`;
            checkBox.id = i;

            checkBoxCell.append(checkBox);
            itemRow.appendChild(checkBoxCell);

            const itemExample = newTodo();
            for (let key in itemExample) {
                if (key == 'isCompleted') continue; 
                const itemDisplay = document.createElement('td');
                console.log(list[i].key);
                itemDisplay.innerHTML = list[i][key]; 
                // if (item.isCompleted) Add in code for strikethrough css styling;
                itemRow.appendChild(itemDisplay);
            }

            checkBox.addEventListener('click', (event) => {
                event.preventDefault;
                if (!checkBox.checked) {
                    list[i]['isCompleted'] = false;
                    itemRow.className = 'not-completed';
                }   
                else {
                    list[i]['isCompleted'] = true;
                    itemRow.className = 'completed';
                };
                console.table(list[i]);
            })
            
            listDisplay.appendChild(itemRow);
        } 

        return listDisplay;
    }

    const todoHtml = buildHtmlList(todoList);
    const completedHTML = buildHtmlList(completedList);

    const content = document.getElementById(`content`);
    content.appendChild(todoHtml);
    content.appendChild(completedHTML);
}

export function clearList() {
    const listDisplay = document.getElementById('todo-list');
    if (listDisplay) {
        listDisplay.replaceChildren();
        listDisplay.remove();
    }
}