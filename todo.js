const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(toDo => {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    syncToDos();
}

function syncToDos() {
    console.log('sync to local storage');
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveToDos(text) {
    const date = new Date();
    const newId = date.getTime();

    const toDoObj = {
        text: text,
        id: newId,
    };
    toDos.push(toDoObj);
    syncToDos();
    
    return toDoObj;
}

function paintToDo(toDo) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');

    delBtn.innerText = '❌';
    delBtn.addEventListener('click', deleteToDo);

    span.innerText = toDo.text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = toDo.id;

    toDoList.appendChild(li);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    toDoObj = saveToDos(currentValue);
    paintToDo(toDoObj);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        toDos = JSON.parse(loadedToDos);
        toDos.forEach(toDoObj => {
            paintToDo(toDoObj);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit)
}

init();
