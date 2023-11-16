/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/listDisplay.service.js":
/*!************************************!*\
  !*** ./src/listDisplay.service.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearList: () => (/* binding */ clearList),
/* harmony export */   displayList: () => (/* binding */ displayList)
/* harmony export */ });
/* harmony import */ var _newItem_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newItem.service */ "./src/newItem.service.js");


// This will export a function that will subdivide any list between things that have been completed and things that have not been completed 

function displayList() {

    const completedList = [];
    const todoList = []

    for (let item in _newItem_service__WEBPACK_IMPORTED_MODULE_0__.parentListKeeper.parentList) {
        if (!item.isCompleted) todoList.push(item);
        if (item.isCompleted) completedList.push(item);
    }

    const listDisplay = document.createElement('table');
    listDisplay.setAttribute('id','todo-list');
    
    function buildHtmlList(list) {
        for (let item in list){
            const itemRow = document.createElement('tr');
            const checkBox = document.createElement('td');
            // Add a clickable check box for the cell data

            const itemDisplay = document.createElement('td');
            console.log(item.nameInput);
            itemDisplay.innerHTML = item.nameInput; 
            // if (item.isCompleted) Add in code for strikethrough css styling;

            itemRow.appendChild(checkBox);
            itemRow.appendChild(itemDisplay);
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

function clearList() {
    const listDisplay = document.getElementById('todo-list');
    if (listDisplay) {
        listDisplay.replaceChildren();
        listDisplay.remove();
    }
}

/***/ }),

/***/ "./src/listInterface.service.js":
/*!**************************************!*\
  !*** ./src/listInterface.service.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addNewItem: () => (/* binding */ addNewItem),
/* harmony export */   clearNewItemForm: () => (/* binding */ clearNewItemForm),
/* harmony export */   createNewItemForm: () => (/* binding */ createNewItemForm)
/* harmony export */ });
/* harmony import */ var _newItem_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newItem.service */ "./src/newItem.service.js");


function createNewItemForm () {
    
    const content = document.getElementById(`content`);

    const newItemForm = document.createElement(`form`);
    newItemForm.setAttribute(`id`,`form`);
    newItemForm.style.cssText = `display: flex; flex-direction: column; 
        flex-basis: 50px; margin: 10px`;

    const itemExample = (0,_newItem_service__WEBPACK_IMPORTED_MODULE_0__.newTodo)('example');
    for (let key in itemExample) {

        if (key.substring(key.length - 5, key.length) != 'Input') continue; 

        const newItemField = document.createElement(`input`);
        newItemField.setAttribute(`id`, key);
        newItemField.style.cssText = `width: 500px` ;
        newItemForm.appendChild(newItemField);
    
        const newItemLabel = document.createElement('label');
        newItemLabel.style.cssText = `width: 100px`;
        newItemLabel.innerHTML = key;
    }

    const submitButton = document.createElement(`button`);
    submitButton.setAttribute(`id`, `submit-button`)
    submitButton.innerHTML = `Add New Todo` ;
    submitButton.style.cssText = `width: 300px` ;

    newItemForm.appendChild(submitButton)

    content.appendChild(newItemForm);
}

function clearNewItemForm () {
    const currentForm = document.getElementById('form');
    if (!currentForm) return;
    
    currentForm.reset();
}

function addNewItem() {
    const newItemForm = document.getElementById('form');
    const newItem = (0,_newItem_service__WEBPACK_IMPORTED_MODULE_0__.newTodo)(newItemForm.nameInput.value);
    
    _newItem_service__WEBPACK_IMPORTED_MODULE_0__.parentListKeeper.add(newItem);
    _newItem_service__WEBPACK_IMPORTED_MODULE_0__.parentListKeeper.print();
}

/***/ }),

/***/ "./src/newItem.service.js":
/*!********************************!*\
  !*** ./src/newItem.service.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newTodo: () => (/* binding */ newTodo),
/* harmony export */   parentListKeeper: () => (/* binding */ parentListKeeper)
/* harmony export */ });
// Create a factory function that creates new to-do items
// It should take in a number of parameters such as 
//      name (r), details (o), tags (r) (which it can take multiple), 

function newTodo (name) {   
    
    // add in function parameters for "details" and "tags"

    // let detailsProper = details ? details : '';
    let isCompleted = false;

    // in the return object add in properties for details and tags 
    // ...details : detailsProper, tags : tags

    return {nameInput : name, isCompleted : isCompleted}
} 

const parentListKeeper = (function () {

    const parentList = [];
    const add = (item) => parentList.push(item);
    const remove = (item) => parentList.
        splice(parentList.indexOf(item),1);

    const print = () => console.table(parentList);

    return {add, remove, print, parentList};
  })();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _listInterface_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listInterface.service.js */ "./src/listInterface.service.js");
/* harmony import */ var _listDisplay_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listDisplay.service.js */ "./src/listDisplay.service.js");
// Filler code



(0,_listInterface_service_js__WEBPACK_IMPORTED_MODULE_0__.createNewItemForm)();
(0,_listDisplay_service_js__WEBPACK_IMPORTED_MODULE_1__.displayList)();

const submitButton =  document.getElementById('submit-button');
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    (0,_listInterface_service_js__WEBPACK_IMPORTED_MODULE_0__.addNewItem)();

    (0,_listInterface_service_js__WEBPACK_IMPORTED_MODULE_0__.clearNewItemForm)();
    (0,_listDisplay_service_js__WEBPACK_IMPORTED_MODULE_1__.clearList)();

    (0,_listDisplay_service_js__WEBPACK_IMPORTED_MODULE_1__.displayList)();
})


})();

/******/ })()
;
//# sourceMappingURL=main.js.map