const main = document.querySelector('main');
const section = document.createElement('section');
const olist = document.createElement('ol');
olist.setAttribute('id', 'lista-tarefas');

const button = document.querySelector('#criar-tarefa');
const tarefaValue = document.querySelector('#texto-tarefa');

main.appendChild(section);
section.appendChild(olist);

const divButtons = document.createElement('div');
main.appendChild(divButtons);

const buttons = {
  'apaga-tudo': 'Apagar Tudo',
  'remover-finalizados': 'Remover Concluídos',
  'salvar-tarefas': 'Salvar Tarefas',
  'mover-cima': 'MoveUP',
  'mover-baixo': 'MoveDown',
  'remover-selecionado': 'Remover Selecionado',
};

function createButtons() {
  const keys = Object.keys(buttons);
  const values = Object.values(buttons);

  for (let i = 0; i < keys.length; i += 1) {
    const buttonElement = document.createElement('button');
    buttonElement.id = keys[i];
    buttonElement.innerHTML = values[i];
    divButtons.appendChild(buttonElement);
  }
}

function ButtonAdd() {
  button.addEventListener('click', () => {
    const newItem = document.createElement('li');
    newItem.classList.add('bg');
    newItem.innerHTML = tarefaValue.value;
    olist.appendChild(newItem);
    tarefaValue.value = '';
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
      targety.style.backgroundColor = 'grey';
    }
  });
}

function through() {
  olist.addEventListener('dblclick', (event) => {
    const complete = event.target;

    if (complete.classList.contains('completed')) {
      complete.classList.remove('completed');
    } else {
      complete.classList.add('completed');
    }
  });
}

function clearList() {
  const buttonClear = document.querySelector('#apaga-tudo');

  buttonClear.addEventListener('click', () => {
    olist.innerHTML = '';
  });
}

function removeFinished() {
  const removeLi = document.querySelector('#remover-finalizados');

  removeLi.addEventListener('click', () => {
    const clearSelected = document.querySelectorAll('.bg');

    for (let k = 0; k < clearSelected.length; k += 1) {
      if (clearSelected[k].classList.contains('completed')) {
        clearSelected[k].parentNode.removeChild(clearSelected[k]);
      }
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

/* Melhorei e simplifiquei essa função (onLoad) com base no código do Otto Micheletti */
/* Minha função estava complexa e com o dobro de linhas */
/* Preferi utilizar o DOMContentLoaded em vez de window.onload, para que ficasse uma função especifica e eu pudesse ter maior controle. */

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

function buttonUp() {
  const up = document.querySelector('#mover-cima');

  up.addEventListener('click', () => {
    const slct = document.querySelectorAll('.bg');
    for (let l = 0; l < slct.length; l += 1) {
      if (slct[l].style.backgroundColor === 'grey' && slct[l].previousElementSibling !== null) {
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
      if (slct[m].style.backgroundColor === 'grey' && slct[m].nextElementSibling !== null) {
        insertAfter(slct[m + 1], slct[m]);
      }
    }
  });
}

function removeSelected() {
  const remove = document.querySelector('#remover-selecionado');

  remove.addEventListener('click', () => {
    const find = document.querySelectorAll('.bg');

    for (let n = 0; n < find.length; n += 1) {
      if (find[n].style.backgroundColor === 'grey') {
        olist.removeChild(find[n]);
      }
    }
  });
}

onLoad();
createButtons();
ButtonAdd();
changeLiBackground();
through();
clearList();
removeFinished();
saveActualTaskList();
buttonUp();
buttonDown();
removeSelected();
