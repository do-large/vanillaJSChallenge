const askNameForm = document.querySelector(".js-askNameForm");
const askName = askNameForm.querySelector("input");
const showName = document.querySelector(".showName");

const SHOW_CS = "show";
const USER_LS = "currentUser";

function showNameFn (text){
    askNameForm.classList.remove(SHOW_CS);
    showName.classList.add(SHOW_CS);
    showName.innerText=`Hi ${text} 🙌🏻`;
} 

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const userName = askName.value;
    saveName (userName);
    showNameFn(userName);

}

function init(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser){
        showName.classList.add(SHOW_CS);
        showNameFn(currentUser);
    } else {
        askNameForm.classList.add(SHOW_CS);
    }
    
    askNameForm.addEventListener("submit", handleSubmit);
}

init();