import { clearNewItemForm, createNewItemForm } from './listForm.service.js';
import { organizeParentList, addNewTodo } from './listManager.service.js'
import { buildListHtmlElements, clearListElements } from './listDisplay.service.js';
import './style.css';

createNewItemForm();
buildListHtmlElements();