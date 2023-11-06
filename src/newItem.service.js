// Create a factory function that creates new to-do items
// It should take in a number of parameters such as 
//      name (r), details (o), tags (r) (which it can take multiple), 

export function newTodo (name) {   
    
    // add in function parameters for "details" and "tags"
    
    // let detailsProper = details ? details : '';
    let isCompleted = true;

    // in the return object add in properties for details and tags 
    // ...details : detailsProper, tags : tags

    return {name : name, isCompleted : isCompleted}
} 

