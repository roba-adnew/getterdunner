import { v1 as uuidv1 } from 'uuid';

export function newTodo(todo, details, tags, dueDate) {    
    let isCompleted = false;
    let todoID = uuidv1();
    return { isCompleted, todoID, todo, details, tags, dueDate }
} 

export let parentList = [];

export function organizeParentList() {
    parentList.sort(function(todo1, todo2) {

        if (!todo1 || !todo2) return;

        if (todo1[`isCompleted`] && todo2[`isCompleted`]) return 0;
        if (todo1[`isCompleted`] && !todo2[`isCompleted`]) return 1;
        if (!todo1[`isCompleted`] && todo2[`isCompleted`]) return -1;
    }) 
}