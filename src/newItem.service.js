// Create a factory function that creates new to-do items
// It should take in a number of parameters such as 
//      name (r), details (o), tags (r) (which it can take multiple), 

export function newTodo(todo, details, tags, dueDate) {   
    
    let isCompleted = false;

    return {
        todo,
        details, 
        tags,
        dueDate,
        isCompleted
    }
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