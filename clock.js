const clock = document.querySelector(".js-clock");
const showDate = clock.querySelector("h4");
const showTime = clock.querySelector("h1");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function handleLoad(){
    const now = new Date();
    const monthNum = now.getMonth();
    const month = months[monthNum];
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    showDate.innerText = `${date} ${month}`;
    showTime.innerText = `${hour < 10 ? `0${hour}` : hour} : ${minute < 10 ? `0${minute}`: minute} : ${second < 10 ? `0${second}` : second}`;
}

function init(){
    window.addEventListener("load", handleLoad);
    setInterval(handleLoad, 1000);
}

init();