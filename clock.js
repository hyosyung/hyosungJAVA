const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector(".js-title");

function getTime() {
    const date = new Date(); // 날짜 - 시간에 대한 정보가 담긴 객체 생성
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds(); //시,분,초를 저장    
    clockTitle.innerText = `${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`;
    //삼항연산자를 사용하여 시 분 초가 10보다 작으면 0이 붙도록 만듬
    clockTitle.style.color = "white"; //검정 배경에 글자 안보여서 색상 바꿈
}

function init() {
    // 현재 시각을 먼저 얻기!
    getTime();
}

setInterval(init, 1000);
//setInterval의 첫번째 인자 : 실행할 함수
//setInterval의 두번째 인자 : 간격