// This should be a simple array of to-do objects, possible and IIFE or the best alternative to an IIFE 


export const parentListKeeper = (function () {

    let parentList = [];
    const add = (item) => parentList.push(item);
    const remove = (item) => parentList.
        splice(parentList.indexOf(item),1);

    return {add, remove};
  })();