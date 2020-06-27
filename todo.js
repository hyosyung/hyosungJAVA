const toDoForm = document.querySelector(".js-toDoForm"),
    toDoinput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

function paintToDo(text) {
    //createElement함수 -> 인자에 해당하는 형태의 element를 만든다.
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    //appendChile함수의 기능 -> 인자를 그것의 father element 안에 넣는다.form
    toDoList.appendChild(li);
}

function handleSubmit(event) {
    event.preventDefault();
    //input태그의 기본값을 막음
    const currentValue = toDoinput.value;
    //submit했을 때 텍스트 창 안에 있던 값을 가져오기
    paintToDo(currentValue);
    console.log(currentValue);
    toDoinput.value = "";
    //submit하고나면 입력 창은 다시 비어있게 만들기
}

function loadToDos() {
    const toDos = localStorage.getItem(TODOS_LS);
    //TODOS_LS(key)의 value값을 가져오기
    if (toDos !== null) {

    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();