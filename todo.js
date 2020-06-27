const toDoForm = document.querySelector(".js-toDoForm"),
    toDoinput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

const toDos = []; //paintToDo에서 쓸 배열

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //JSON.stringify(객체); ->자바스크립트의 객체를 스트링으로 만들어줌! (Javascript Object Notation의 줄임말)
    //로컬 저장소의 value값은 무조건 string이기 떄문에 이렇게 바꿔서 저장해야 한다.
}

function paintToDo(text) {
    //createElement함수 -> 인자에 해당하는 형태의 element를 만든다.
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newID = toDos.length + 1;

    delBtn.innerText = "❌";
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newID; //li에도 id값을 준다. -> 삭제할 때 어떤 아이디를 삭제할 지를 알기 위함!
    //appendChile함수의 기능 -> 인자를 그것의 father element 안에 넣는다.form
    toDoList.appendChild(li);

    const toDoObj = { //toDos배열에 push할 값(obj)
        text: text,
        id: newID
    };
    toDos.push(toDoObj); //push

    saveToDos(); //로컬 저장소에 저장하는 함수를 호출
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
    const loadedToDos = localStorage.getItem(TODOS_LS);
    //TODOS_LS(key)의 value값을 가져오기
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        //loaedeToDos가 string으로 되어있기 떄문에 다시 obj로 바꿔줌
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
        //foreach(함수) -> 배열 안의 모든 값들에 대해 해당 함수 실행(중요!)
        //함수를 바깥에 두고 함수 이름만 넣을 수도 있음!
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();