// Create a factory function that creates new to-do items
// It should take in a number of parameters such as 
//      name (r), details (o), tags (r) (which it can take multiple), 

export default function newTodo (name, details, tags) {

    
    let detailsProper = details ? details : '';
    let isCompleted = true;

    return {name : name, details : detailsProper, tags : tags, isCompleted : isCompleted}
} 