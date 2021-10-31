const form = document.querySelector('.js-form'),
    input = form.querySelector('input'),
    greetings = document.querySelector('.js-greetings'),
    rmUser = document.querySelector('.remove-user'),
    tdForm = document.querySelector('.js-todoForm')
    

//querySelectorAll은 해당 클래스, 태그 등등을 모두 가져와서 어레이에 담아줌.


//local storage : 작은 정보를 나의 로컬 컴푸터에 저장하는 방법

//local storage key값을 상수로 저장.
const User_LS = "currentUser",
// display 관련 대문자로 저장
    Showing_CN = 'showing'; 



function saveUser(name){
    localStorage.setItem(User_LS,name);

}    

function askUserName(){
    form.classList.add(Showing_CN); //user가 local storage 에 없으니까 form 을 보여줌.
    form.addEventListener('submit',handleSubmit); // form 을 제출할 때 handleSubmit 함수 실행
} 


function handleSubmit(event){
    //폼을 제출하는 이벤트가 발생되면 도큐먼트까지 이벤트가 계속 올라감. 
    event.preventDefault(); //form 의 기본 제출 이벤트를 막아주는 메소드.
    const currentValue = input.value; // enter 후 얻어지는 input value를 들고와서
    paintGreeting(currentValue); // 밑의 text를 필요로 하는 함수를 작동시켜서 해당 value값을 넣어서 greeting 띄워주기.
    saveUser(currentValue); // currentValue를 제출하면 saveUser에서 해당 벨류를 name 값으로 받아서 저장할거임!!
}



function paintGreeting(text){
    form.classList.remove(Showing_CN); //user 가 있는 경우 what is your name ? 이라는 form을 지움.
    greetings.classList.add(Showing_CN); //user 에게 헬로우를 보여줘야하니까 얘 ( h4) 는 보여줌.
    rmUser.classList.add(Showing_CN);
    tdForm.classList.add(Showing_CN);
    greetings.innerText = `Hello ${text}!`; //그래서 받아온 text value를 헬로우와 함께 헬로우 유저로 이름 바꿔줌.
}



function removeUser(name){
    if(confirm('삭제를 누르면 당신의 정보는 사라집니다 영원히 떠날래요..?')){
        localStorage.removeItem(User_LS,name);
        localStorage.removeItem("ToDos");
        window.location.reload();
    }
    
}

rmUser.addEventListener("click",removeUser);

//이 함수는 로드만 되는 것이지 저장하는 로직이 아님.
function loadUser(){
    const currentUser = localStorage.getItem(User_LS);
    if(currentUser === null) {
        //user가 없는 경우 == askUserName함수 실행.
        askUserName();

    }else{
        //user가 있는 경우 ==text
        paintGreeting(currentUser); //local storage 에 있는 유저를 가져옴과 동시에 paintGreeting 함수를 실행 시킴.
        
    }
}


function init(){
    loadUser();
}

init();