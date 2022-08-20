let inputAdd = document.querySelector('#inputAdd');
let sectionList = document.querySelector('.section-list');
let menuLista = document.querySelector('.menu');
let elementoPrincipal = document.querySelector('.main-elements');
let seccionLista = document.querySelector('.section-list');
let tasks = [];
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        createHTML();
    });
}

elementoPrincipal.addEventListener("click", (e) => {
    if (e.target.classList.contains('add')) {
        if(inputAdd.value === ""){
            alert("Agrega algo.....");
            return;
        }else{
            addTask();
        }
    }    
});
elementoPrincipal.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        if(inputAdd.value === ""){
            alert("Agrega algo.....");
            return;
        }else{
            addTask();
        }
    }    
});
/* Add Task */
function addTask(){
    let task = inputAdd.value;
    const taskObj = {
        task,
        id: Date.now(),
    }
    tasks = [...tasks,taskObj];
    createHTML();
    inputAdd.value = "";
    sincronizationStorage();
    console.log(tasks);
}

/* Create HTML */
function createHTML(){
    clearHTML();
    if(tasks.length > 0){
        tasks.forEach((valor) => {
            let btnLi = document.createElement('li');
            menuLista.append(btnLi);
            btnLi.innerHTML = `${valor.task} <span data-id=${valor.id} class="close">X</span>`
        })
    }
    sincronizationStorage();
}


let menu = document.querySelector('.menu');
menu.addEventListener('click',(e) => {
    if(e.target.className === "close"){
        const deleteId = parseInt(e.target.getAttribute('data-id'));
        tasks.filter((task) => task.id !== deleteId);
        e.target.parentElement.remove();
        tasks.pop();
        createHTML();
    }
    if (e.target.tagName === 'LI') {
        if(e.target.classList.contains('checked')){
            e.target.classList.remove('checked');
        }else{
            e.target.classList.add('checked');
        }
    }
})

function sincronizationStorage(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function clearHTML (){
    menuLista.innerHTML = "";
}

