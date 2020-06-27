 const body = document.querySelector("body");

 const IMG_NUMBER = 6; //내가 추가한 이미지는 6개임!

 function handleImgLoad() {
     console.log("finished load");
 }

 function paintImage(imgNumber) {
     const image = new Image();
     image.src = `photo/${imgNumber+1}.jpg`;
     image.classList.add("bgImage");
     body.prepend(image);
 }

 function genRandom() {
     const number = Math.floor(Math.random() * 6);
     //Math.random() 은 0에서 1사이의 무작위 수를 만들어줌
     //Math.ceil()은 정수자리까지 올림
     //Math.floor()은 정수자리까지 내림
     return number;
 }

 function init() {
     const randomNumber = genRandom();
     paintImage(randomNumber);
 }

 init();