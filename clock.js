const ClockContainer = document.querySelector('.js-clock'),
    ClockTitle = ClockContainer.querySelector('.js-title');
//const 2개 한꺼번에 생성

function getTime(){
    const date = new Date(); //date >> class
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    ClockTitle.innerText =
     //삼항 연산자 ? >> if, : >> else 백틱 위치랑 template iternal 헷갈려서 위에 따로 정리. 10보다 작은 숫자는 앞에 0과 함께 붙여서 리턴. 
    // `
    // ${hours<10 ? `0${hours}`:hours}
    // :${minutes<10 ?`0${minutes}`:minutes}
    // :${seconds<10 ?`0${seconds}`:seconds}
    // `; 
   
    `${hours<10 ? `0${hours}`:hours}:${minutes<10 ?`0${minutes}`:minutes}:${seconds<10 ?`0${seconds}`:seconds}`; 
   
}
function init(){
    getTime(); //여기서 함수 받아오지 않으면 00:00 에서 시작해서 1초 뒤에 시간이 업뎃됨.
    setInterval(getTime,1000); //setInterval >> param 2개, 첫번째 실행할 함수, 두번째 실행시킬 초 밀리세컨즈 단위.
}

init();