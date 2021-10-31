const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList");

const TODO_LS = "ToDos"; // 상수로 문자열을 먼저 생성해줌으로써 실수를 방지하고, 헷갈리지 않기 위해. 담아둔 것.

let todos = []; //저장할 todo list들을 담을 빈 array 생성.

// //html 요소를 지우는 것. 로컬스토리지는 그대로.
// function delToDos(e){
//   //console.log(e.target.parentNode);
//   //click 된 버튼을 e.target 으로 찾는데 우리가 지워줘야할 것은, 클릭된 버튼의 부모인 id를 가진 li 를 모두 지워야함. 그래서 dir로 속성을 알아보는것 li는 dir로 parentNode가 li로 확인
//   const btn = e.target;
//   const li = btn.parentNode;
//   todoList.removeChild(li);

//   //여기서 filter를 사용해서 new array를 다시출력

//   // function filterFn(todo){
//   //   return todo.id===1;
//   //   //밑에서 cleanTodos에 담아서 filter를 할 때, 해당 함수를 실행 시키는데, 이 필터기능은 forEach 처럼 하나하나 돌면서, 해당 함수의 조건에 true 값만 리턴하는 새 array를 만듬.
//   // }
//   // const cleanTodos = todos.filter(filterFn);
//   // console.log(cleanTodos); // id값이 1인 것만 출력 됨.

//   const cleanTodos = todos.filter(function(todo){
//     // console.log(todo.id,li.id);   // li.id는 string . parseInt로 숫자로 변환필요.
//     return todo.id !== parseInt(li.id);

//   });

//   // todos = cleanTodos; //const로 먼저 선언했기 때문에 이렇게 안됨. 그러니 todos 를 let 으로 바꾼것.

//   todos = cleanTodos;

//   //새로운 array를 replace하고,
//   saveToDOs();

//   //로컬스토리지에 저장.

// }

function delToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function saveToDos() {
  //todos array 저장하는 함수.
  localStorage.setItem(TODO_LS, JSON.stringify(todos)); //JSON.stringify >> javascript obect 를 string 형태로 저장.
}

let intID = 1;

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");

  //해결 방법 : 배열과 상관없는 intID 를 하나 선언해주고, 현재의 intID 값을 newID로 지정해주고, +1 시킴. 그러면, 생성될때마다 +1되어 생성될 것이고, 삭제했을때는 id값이 변하지 않음.
  const newID = intID;
  intID += 1;

  //참고 : push 와 다르게 리스트에서 지우는 splice 함수를 쓰면 간단하게 기존 array에서 삭제가능.

  // const newID = todos.length +1 ; //array의 길이에 1을 더해서 빈 어레이에 무언가를 추가하게 되면, 아이디 값은 1이 될 거임 ㅇㅇ! //근데 이렇게 하면 배열의 길이에 따라 Id 값이 선언되므로, id값이 중복되는 에러가 발생.

  delBtn.innerText = "✅";
  delBtn.classList.add('delTodo-btn');
  delBtn.addEventListener("click", delToDo);
  span.innerText = text; // 여기서 text는 함수의 parameter 인 text 를 말함.
  li.appendChild(span);
  li.appendChild(delBtn); // li안에 자식요소로 span과 btn을 넣음.
  li.id = newID; // 나중에 어떠한 list 를 지울지 id 값을 줘서 알 수 있음.
  todoList.appendChild(li); // 마지막으로 이렇게 만들어진 list 를 todoList 안에 넣음.

  const todoObj = {
    text: text, // text 라는 key 값으로 paintToDO 함수에서 parameter인 text 를 value로 가져옴.
    id: newID, // 위에서 상수 처리 해준, ID 값을 오브젝트에 넣었음.
  };

  todos.push(todoObj); //push == append . todos arraay 안에 todo obj 를 append.
  saveToDos();
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = todoInput.value;
  paintToDo(currentValue);
  console.log("paintTODO");
  todoInput.value = ""; // 엔터를 치고 눌렀을때 인풋창 공백으로 바뀌면서, 제출효과를 주기 위해 넣음.
}

function loadToDos() {
  const loadedTodos = localStorage.getItem(TODO_LS); //local storage key 으로 불러와줌.

  //   if(loadedTodos===null){
  //     //여기서 form 은 항상 showing 일거기 떄문에 뭔가를 해줄 필요가 없음.
  //   }else{

  //   }

  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos); //local storage 에서 string type 으로 저장한 것을 다시 object 형태로 들고옴.

    //parsing 해온 오브젝트들을 forEach 로 하나하나 들고오는데, todos.text 즉, 오브젝트에서 text value만 들고와서 위에 있는 paintToDo 함수를 실행. text 값을 삭제 버튼과 함께 나타내줌.
    parsedTodos.forEach(function (todos) {
      paintToDo(todos.text);
    });
  }
}

function init() {
  loadToDos();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
