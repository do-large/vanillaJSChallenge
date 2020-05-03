const toDoBox = document.querySelector(".js-toDoBox");
const toDoForm = toDoBox.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pendTodoList = toDoBox.querySelector(".showPendToDos");
const finishTodoList = toDoBox.querySelector(".showFinishToDos");
const askNameFormShowToDo = document.querySelector(".js-askNameForm");

let pendTodos = [];
let finishTodos = [];
const PEND_TODOS_LS= "pend";
const FINISH_TODOS_LS = "finish";

//////////////////////////////////////////////////////////////////

function savePend(){
    localStorage.setItem(PEND_TODOS_LS, JSON.stringify(pendTodos));
}

function showPend(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const nextBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    span.innerText = text;
    nextBtn.innerText = "✅";
    delBtn.innerText = "⛔";
    nextBtn.addEventListener("click", handleNextPend);
    delBtn.addEventListener("click", handelDelPend);
    const newPendId  = pendTodos.length + 1;
    li.setAttribute("id",newPendId);
    li.appendChild(span);
    li.appendChild(nextBtn);
    li.appendChild(delBtn);
    pendTodoList.appendChild(li);
    const todoObj = {
        text,
        id:newPendId
    };
    pendTodos.push(todoObj);
    savePend();
}


function loadPend(){
    const loadedPends = localStorage.getItem(PEND_TODOS_LS);
    const parsedPends = JSON.parse(loadedPends);
    if(loadedPends){
        parsedPends.map(pend => {
            showPend(pend.text);
        });
        savePend();
    }
}

function handleNextPend(event){
    handelDelPend(event);
    const clickedLi = event.target.parentNode;
    showFinish(clickedLi.querySelector("span").innerText);
}

function handelDelPend(event){
    const clickedLi = event.target.parentNode;
    const resultArr = pendTodos.filter(pendTodo => {
        return pendTodo.id !== parseInt(clickedLi.id);
    })
    pendTodos = resultArr;
    savePend();
    pendTodoList.removeChild(clickedLi);
    
}
//////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////

function saveFinish(){
    localStorage.setItem(FINISH_TODOS_LS, JSON.stringify(finishTodos));
}

function showFinish(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const nextBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    span.innerText = text;
    nextBtn.innerText = "🔄";
    delBtn.innerText = "⛔";
    nextBtn.addEventListener("click", handleNextFinish);
    delBtn.addEventListener("click", handelDelFinish);
    const newFinishId  = finishTodos.length + 1;
    li.setAttribute("id",newFinishId);
    li.appendChild(span);
    li.appendChild(nextBtn);
    li.appendChild(delBtn);
    finishTodoList.appendChild(li);
    const todoObj = {
        text,
        id:newFinishId
    };
    finishTodos.push(todoObj);
    saveFinish();
}


function loadFinish(){
    const loadedFinish = localStorage.getItem(FINISH_TODOS_LS);
    const parsedFinish = JSON.parse(loadedFinish);
    if(loadedFinish){
        parsedFinish.map(finish => {
            showFinish(finish.text);
        });
        saveFinish();
    }
}

function handleNextFinish(event){
    handelDelFinish(event);
    const clickedLi = event.target.parentNode;
    showPend(clickedLi.querySelector("span").innerText);
}

function handelDelFinish(event){
    const clickedLi = event.target.parentNode;
    const resultArr = finishTodos.filter(finishTodo => {
        return finishTodo.id !== parseInt(clickedLi.id);
    })
    finishTodos = resultArr;
    saveFinish();
    finishTodoList.removeChild(clickedLi);
}
//////////////////////////////////////////////////////////////////

function handleSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    showPend(newTodo);
    toDoInput.value = "";
}

const TODO = "toDo";
const SHOW = "show";
const HIDE = "hide";

function init(){
    show();
    toDoForm.addEventListener("submit", handleSubmit);
    loadPend();
    loadFinish();
}

function show(){
    const haveUser = localStorage.getItem('currentUser');
    if(haveUser !== null){
        toDoBox.classList.add(TODO);
        toDoBox.classList.add(SHOW);
    }
}

askNameFormShowToDo.addEventListener("submit", show);
init();