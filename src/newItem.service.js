// Create a factory function that creates new to-do items
// It should take in a number of parameters such as 
//      name (r), details (o), tags (r) (which it can take multiple), 

export function newTodo (name) {   
    
    // add in function parameters for "details" and "tags"

    // let detailsProper = details ? details : '';
    let isCompleted = false;

    // in the return object add in properties for details and tags 
    // ...details : detailsProper, tags : tags

    return {nameInput : name, isCompleted : isCompleted}
} 

export const parentListKeeper = (function () {

    let parentList = [];
    const add = (item) => parentList.push(item);
    const remove = (item) => parentList.
        splice(parentList.indexOf(item),1);

    const print = () => console.table(parentList);

    return {add, remove, print, parentList};
  })();