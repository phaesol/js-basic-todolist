const body = document.querySelector('body');



// js Math.random >> 임의의 숫자를 생성.
// Math.ceil -  올림 >> 3.1 ~3.9 는 4 return
// Math.floor - 내림 >> 3.1~3.9 는 3 return 


const IMG_Number = 3; 


function handleLoadImage(image){
    // console.log('image loading complete') 
    image.classList.add('bgImage');
    //prepend 는 appendChild 와 같이 부모요소에 자식요소로 추가되나, 그 위치가 맨 위로 표시
    body.prepend(image) ;
}


function paintImage(imgNUmber){
    const image = new Image();
    //왜 +1 ? 랜덤으로 0,1,2가 도니까.
    image.src = `images/${imgNUmber +1}.png`;
    image.addEventListener('load',handleLoadImage(image)); //로딩이 전부 완료 되었을 때 이미지를 뜨게 함. 이미지가 뚝뚝 끊기지 않음.
   
   
}

function genRandom(){
    // 3 번 반복하는데, 0,1,2 이렇게 반복.
    const number = Math.floor(Math.random() * IMG_Number );
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();

// const images = ["0.jpeg", "1.jpeg", "2.jpeg"];

// const chosenImage = images[Math.floor(Math.random() * images.length)];

// const bgImage = document.createElement("img");

// bgImage.src = `images/${chosenImage}`;

// document.body.appendChild(bgImage);

const message = document.querySelector('#message');

const messages = [
"반드시 좋은 날은 찾아와. 포기하지만 않는다면.",
"사는게 염증이 날 때 당신이 울지 않았으면 좋겠다.",
"바다는 비에 젖지 않는다.",
"우리는 완벽하게 이해할 수 없어도 온전하게 사랑할 수는 있습니다.",
"그냥 흘려넘쳐도 좋아요.",
"아무것도 안해도 아무렇지 않구나",
"그래도 괜찮은 하루",
"안녕, 나의모든하루",
"나는 여러가지 종류를 조금씩 예쁘게 담아 성대하게 만드는데 천재다.",
"점점 기운이 나는 것이 눈에 보여서 재미있어.",
"나른하고 구체적인 생활의 냄새로 가득한 낮이 지나가고.",
"인생은 간단한 것이고 운명은 용기를 내어 새로운 한 걸음을 내미는 자에게 언제나 선량하다.",
"고양이들은 어디에 앉으면 가장 불편할지를 수학적으로 정확히 측정해 낼 수 있다.",
"고양이는 한 사람을 자기가 감당하기 힘들 정도로 사랑한다. 하지만 그들은 너무나 지혜롭기 때문에 그것을 밖으로 완전히 드러내지 않는다.",
"나의 하루에게, 그리고 나에게 박수를.",
"수고했어 오늘도!",
"사람은 누구나 꽃이다.",
"뜨겁지 않은. 따뜻한 밤 되세요!",
"살며, 사랑하며, 배우며.",
"어른들은 누구나 처음에는 어린이였다. 그러나 그것을 기억하는 어른은 별로 없다.",
"너무 오래 생각하지말자. 붙잡지 말자.",
"온전히 당신 그자체를 살아가길.",
];



const num = Math.floor(Math.random() *messages.length);

message.innerHTML = `${messages[num]}`
console.log(typeof num);