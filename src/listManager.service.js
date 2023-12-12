import { v1 as uuidv1 } from 'uuid';
import { format } from 'date-fns'; 

export function newTodo(todo, details, dueDate) {    

    let isCompleted = false;
    const todoID = uuidv1();
    return { isCompleted, todoID, todo, details, dueDate }
} 

export function setParentList(list) {
    const jsonList = JSON.stringify(list);
    localStorage.setItem('parentList', jsonList);
}

export function getParentList() {
    if (localStorage.length != 1) {
        const newList = [];
        return newList;
    }
    else {
         const currentListJSON = localStorage.getItem('parentList');
         let storedList = JSON.parse(currentListJSON)
         return storedList;
    }
}

export function getTodoByID(todoID) {
    const parentList = getParentList();
    const index = parentList.findIndex(
        todo =>  todo.todoID == todoID);
    return parentList[index];
}

export function organizeParentList() {

    const parentList = getParentList();
    parentList.sort(function(todo1, todo2) {
        if (!todo1 || !todo2) return;

        if (todo1[`isCompleted`] && todo2[`isCompleted`]) return 0;
        if (todo1[`isCompleted`] && !todo2[`isCompleted`]) return 1;
        if (!todo1[`isCompleted`] && todo2[`isCompleted`]) return -1;
    }) 
    setParentList(parentList);
}

export function addNewTodo() {
    const newItemForm = document.getElementById('form');
    if (!newItemForm) return;

    const todo = newItemForm.todo.value; 
    const details = !newItemForm.details ? '' : newItemForm.details.value;

    let dueDate = correctDateOffset(newItemForm.dueDate.value);
    dueDate = format(dueDate, 'YYY-MM-dd');

    const newItem = newTodo(todo, details, dueDate);
    
    const parentList = getParentList();
    parentList.push(newItem);
    setParentList(parentList);
    organizeParentList();
}

export function correctDateOffset(date) {
    const estOffset = 5 * 60 * 60 * 1000;
    const correctedDate = new Date(Date.parse(date) + estOffset);
    return correctedDate;
}

export function removeTodo(todoID) {
    const parentList = getParentList();
    const index = parentList.findIndex(todo =>  todo.todoID == todoID);
    parentList.splice(index, 1);
    setParentList(parentList);
    organizeParentList();
}

export function updateTodo(todoID, updatedTodoItem) {
    removeTodo(todoID);
    const parentList = getParentList()
    parentList.push(updatedTodoItem);
    setParentList(parentList);
    organizeParentList();
}