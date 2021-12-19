const main = document.querySelector('main');
const section = document.createElement('section');
const olist = document.createElement('ol');
olist.setAttribute('id', 'lista-tarefas');

main.appendChild(section);
section.appendChild(olist);

const button = document.querySelector('#criar-tarefa');
const tarefaValue = document.querySelector('#texto-tarefa');

const divButtons = document.createElement('div');
divButtons.className = 'div-buttons';
main.appendChild(divButtons);

const bgColor = 'rgba(2, 79, 129, 0.7)';

const buttons = {
  'linkX': 'xfull.png',
  'linkV': 'vfull.png',
  'linkF': 'star.png', 
  'mover-cima': 'up.png',
  'mover-baixo': 'down.png',
  'salvar-tarefas': 'save.png',
  'apaga-tudo': 'del.png',
};


function checkInputs() {
  const inputs = document.querySelectorAll('#texto-tarefa');
  window.addEventListener("keyup", () => {

    if (inputs.value) {
      button.style.display = 'none';
    } else {
      button.style.display = 'block';
    }
  });
}

function createButtons() {
  const keys = Object.keys(buttons);
  const values = Object.values(buttons);

  for (let i = 0; i < keys.length; i += 1) {
    const buttonElement = document.createElement('button');
    buttonElement.id = keys[i];
    buttonElement.style.cursor = 'pointer';
    buttonElement.innerHTML = '<img src="/projetos/todo-list/images/' + values[i] + '" />';
    divButtons.appendChild(buttonElement);
  }
}

function buttonPrincipal() {
  button.addEventListener('click', () => {
    if (tarefaValue.value !== '') {
      const newItem = document.createElement('li');
      newItem.classList.add('bg');
      newItem.innerHTML = tarefaValue.value;
      tarefaValue.value = '';
      button.style.display = 'none';
      olist.appendChild(newItem);
    }
  });

  document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      button.click();
    }
  });
}

function saveActualTaskList() {
  const clickSave = document.querySelector('#salvar-tarefas');

  clickSave.addEventListener('click', () => {
    const savedList = document.querySelector('#lista-tarefas').innerHTML;
    const toString = JSON.stringify(savedList);
    if (savedList.length > 0) {
      localStorage.setItem('saves', toString);
    }
  });
}

function onLoad() {
  window.addEventListener('DOMContentLoaded', () => {
    const loadSaves = localStorage.getItem('saves');
    const parseSaves = JSON.parse(loadSaves);
    const taskList = document.querySelector('#lista-tarefas');

    if (parseSaves) {
      taskList.innerHTML = parseSaves;
    }
  });
}

function changeLiBackground() {
  olist.addEventListener('click', (event) => {
    const targety = event.target;
    const clearBg = document.querySelectorAll('.bg');

    for (let j = 0; j < clearBg.length; j += 1) {
      clearBg[j].style.backgroundColor = '';
    }

    if (targety.classList.contains('bg')) {
      targety.style.backgroundColor = bgColor;
    }
  });
}

function buttonX() {
  const buttX = document.querySelector('#linkX');

  buttX.addEventListener('click', () => {
    const find = document.querySelectorAll('.bg');

    for (let n = 0; n < find.length; n += 1) {
      if (find[n].style.backgroundColor === bgColor) {
        olist.removeChild(find[n]);
      }
    }
  });
}

function buttonV() {
  const buttV = document.querySelector('#linkV');

  buttV.addEventListener('click', () => {
    const findV = document.querySelectorAll('.bg');

    for (let n = 0; n < findV.length; n += 1) {
      if (findV[n].style.backgroundColor === bgColor && findV[n].classList.contains('completed')) {
        findV[n].classList.remove('completed');
        findV[n].style.backgroundImage = "url('/projetos/todo-list/images/vgrey-mini.png')";
      } 
      else if (findV[n].style.backgroundColor === bgColor) {
        findV[n].classList.add('completed');
        findV[n].style.backgroundImage = "url('/projetos/todo-list/images/vfull-mini.png')";
      }
    }
  });
}

function buttonF() {
  const buttF = document.querySelector('#linkF');

  buttF.addEventListener('click', () => {
    const findF = document.querySelectorAll('.bg');

    for (let n = 0; n < findF.length; n += 1) {
      if (findF[n].style.backgroundColor === bgColor && findF[n].classList.contains('favorite')) {
        findF[n].classList.remove('favorite');
        findF[n].style.backgroundImage = "url('/projetos/todo-list/images/vgrey-mini.png')";
        olist.appendChild(findF[n]);
      } 
      else if (findF[n].style.backgroundColor === bgColor) {
        findF[n].classList.add('favorite');
        findF[n].style.backgroundImage = "url('/projetos/todo-list/images/star-mini.png')";
        olist.insertBefore(findF[n], olist.firstChild);
      }
    }
  });
}

function clearList() {
  const buttonClear = document.querySelector('#apaga-tudo');

  buttonClear.addEventListener('click', () => {
    divButtons.style.position = 'relative';
    olist.innerHTML = '';
  });
}

function buttonUp() {
  const up = document.querySelector('#mover-cima');

  up.addEventListener('click', () => {
    const slct = document.querySelectorAll('.bg');
    for (let l = 0; l < slct.length; l += 1) {
      if (slct[l].style.backgroundColor === bgColor && slct[l].previousElementSibling !== null) {
        slct[l].parentNode.insertBefore(slct[l], slct[l].previousElementSibling);
      }
    }
  });
}

function buttonDown() {
  const down = document.querySelector('#mover-baixo');

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  down.addEventListener('click', () => {
    const slct = document.querySelectorAll('.bg');

    for (let m = 0; m < slct.length; m += 1) {
      if (slct[m].style.backgroundColor === bgColor && slct[m].nextElementSibling !== null) {
        insertAfter(slct[m + 1], slct[m]);
      }
    }
  });
}

function checkScroll() {
  window.addEventListener('scroll', function(){

    if (divButtons.getBoundingClientRect().top < this.window. innerHeight) {
      divButtons.style.position = 'fixed';
    }
  });
}

onLoad();
checkInputs();
createButtons();
buttonPrincipal();
saveActualTaskList();
changeLiBackground();
clearList();
buttonX();
buttonV();
buttonF();
buttonUp();
buttonDown();
checkScroll();
