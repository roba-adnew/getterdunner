import { v1 as uuidv1 } from 'uuid';
import { format } from 'date-fns'; 

export function newTodo(todo, details, tags, dueDate) {    
    let isCompleted = false;
    let todoID = uuidv1();
    return { isCompleted, todoID, todo, details, tags, dueDate }
} 

const parentListName = 'parentList';

export function setParentList(list) {
    localStorage.setItem(parentListName, JSON.stringify(list))
}

export function getParentList() {
    if (localStorage.length != 1) {
        const newList = [];
        return newList;
    }
    else {
         const currentListJSON = localStorage.getItem(parentListName);
         let storedList = JSON.parse(currentListJSON)
         return storedList;
    }
}

export function organizeParentList() {

    const parentList = getParentList();
    parentList.sort(function(todo1, todo2) {

        if (!todo1 || !todo2) return;

        if (todo1[`isCompleted`] && todo2[`isCompleted`]) return 0;
        if (todo1[`isCompleted`] && !todo2[`isCompleted`]) return 1;
        if (!todo1[`isCompleted`] && todo2[`isCompleted`]) return -1;
    }) 
}

export function addNewItem() {
    const newItemForm = document.getElementById('form');
    if (!newItemForm) return;

    const estOffset = 5 * 60 * 60 * 1000;
    const dueDate = new Date(Date.parse(newItemForm.dueDate.value) + estOffset);
    console.log(dueDate);

    const newItem = newTodo(
        newItemForm.todo.value,
        newItemForm.details.value,
        newItemForm.tags.value,
        format(dueDate, 'MMM-dd-yyyy')
    )
    
    const parentList = getParentList();
    parentList.push(newItem);
    setParentList(parentList);
    console.table(parentList);
}