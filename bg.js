const body = document.body;

const BG_NUM = 6;

function paintImage(randomNum){
    body.style.backgroundImage = `url(images/${randomNum}.jpg)`
    
}

function getRandom(){
    const num = Math.floor(Math.random() * BG_NUM +1);
    return num;
}

function init(){
    const randomNum = getRandom();
    paintImage(randomNum);
}

init();