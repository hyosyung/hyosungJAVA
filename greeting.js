//로컬 스토리지에 저장하기 위한 js파일
//크롬의 검사-어플리케이션-저장소-로컬 저장소에 가면 저장된 값들을 확인 가능
//웹페이지마다 필요한 정보를 저장할 수도 있음을 의미
// key 와 value의 형태로 저장됨.
//localStorage.setItem("저장할 키", 키에 저장할 값); 와 같은 형태로 사용
//꺼낼 떄는 localStorage.getItem("저장된 키");를 하면 키값이 반환됨
//저장되지 않은 값을 꺼내면 null 반환 

const form = document.querySelector(".js-form"), //js-form이라는 클래스를 선택
    input = form.querySelector("input"),
    //form객체 안에있는 input태그를 선택하여 객체로 가져옴
    greeting = document.querySelector(".js-greetings");
//js-greeting 클래스 가져와서 객체로 만듬

const USER_LS = "currentUser",
    SHOWING_className = "showing";

function saveName(text) { //제일 마지막에 만든 함수
    localStorage.setItem(USER_LS, text);
    //로컬 저장소에 key값은 USER_LS으로, value값은 text으로 저장
    //저장되어 있지 않은 상태라면
    //loadName함수 호출->askForName함수 호출->입력 폼을 보이게 한 뒤
    //submit 이벤트가 발생하면 handleSubmit 함수 호출 -> 입력의 Default 이벤트를 막은 뒤
    //input으로 입력된 value값을 받아와서 paintGreeting실행(Hello value가 보이게함)->이름 저장
}

function handleSubmit(event) {
    event.preventDefault();
    //이벤트의 Default값을 막는다.
    //form의 Default가 실행되지 않도록 함
    //default는 입력값이 사라지는 것임
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_className); //이름 입력창을 보이게 함
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) { //argument의 이름이 text임
    form.classList.remove(SHOWING_className);
    greeting.classList.add(SHOWING_className);
    //입력 form은 지우고, 인삿말을 출력하기
    greeting.innerText = `Hello ${text}`;
    //greeting 태그안의 text를 바꿈 -> 'Hello + text' 로
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) { //localstorage에 저장된 값이 없을 때
        askForName();

    } else { //반대로 저장된 값이 있을 때
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();