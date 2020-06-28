const toDoForm = document.querySelector(".js-toDoForm"),
    toDoinput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = []; //paintToDo에서 쓸 배열


function deleteToDo(event) {
    //console.dir(event.target)을 해서 필요한 정보를 알 수 있음! event.target를 해야함. event는 이벤트 자체가 출력되기 때문
    //event.target은 이벤트가 일어난 대상임!
    //id에 접근하려면 event.target.parentNode를 보면 됨을 알 수 있음!
    //console.log(event.target.parentNode); //콘솔창에 누른 리스트의 아이디가 출력됨을 알 수 있음

    //delete child element mdn을 구글에 검색해보면 Node.removeChile() 라는 함수가 있음을 알 수 있음
    const btn = event.target; //지역 변수이기 때문에 이름이 중복되도 상관 없음
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id); //li.id는 string임! parseInt(인자) : 스트링을 int로 바꾸어 반환!
    });
    //filter함수는 foreach처럼 array의 모든 아이템을 통해 함수를 실행함! 그리고 trued인 아이템들만 가지고 새로운 array를 만듬
    //filter함수의 사용법도 알아두기! foreach와 아주 비슷함!!
    toDos = cleanToDos; //필터링된 배열을 다시 toDos에 저장!
    saveToDos(); //저장
}

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
    delBtn.className = "toDo__button";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);

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