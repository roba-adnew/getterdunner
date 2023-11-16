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

export const parentListKeeper = (function () {

    const parentList = [];
    const add = (item) => parentList.push(item);
    const remove = (item) => parentList.
        splice(parentList.indexOf(item),1);

    const print = () => console.table(parentList);

    return {add, remove, print, parentList};
  })();