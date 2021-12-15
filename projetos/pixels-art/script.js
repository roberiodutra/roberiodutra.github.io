const main = document.querySelector('main');
const menuGuia = document.querySelector('#menu-guia');

const rubber = document.createElement('div');
  rubber.classList.add('color', 'rubber');

const rubber2 = document.createElement('div');
  rubber2.classList.add('color', 'rubber');

const rubber3 = document.createElement('div');
  rubber3.classList.add('color', 'rubber');

const rubber4 = document.createElement('div');
  rubber4.classList.add('color', 'rubber');

const colorPalette = document.createElement('section');
  colorPalette.setAttribute('id', 'color-palette');
  main.appendChild(rubber);
  main.appendChild(colorPalette);
  main.appendChild(rubber2);

const panel = document.createElement('div');
  panel.setAttribute('id', 'panel');
  main.appendChild(panel);

const colorPalette3 = document.createElement('section');
  colorPalette3.setAttribute('id', 'color-palette3');
  panel.appendChild(colorPalette3);

const pixelColumns = document.createElement('section');
  pixelColumns.setAttribute('id', 'pixel-board');
  panel.appendChild(pixelColumns);

const colorPalette2 = document.createElement('section');
  colorPalette2.setAttribute('id', 'color-palette2');
  main.appendChild(rubber3);
  main.appendChild(colorPalette2);
  main.appendChild(rubber4);

const colorPalette4 = document.createElement('section');
  colorPalette4.setAttribute('id', 'color-palette4');
  panel.appendChild(colorPalette4);

function randomColor() {
  const xzero = ['0', '#'];
  function color() {
    const hexC = Math.floor(Math.random() * 16777215).toString(16);
    return (xzero[0] + String(hexC)).substr(-1);
  }
  return xzero[1] + color() + color() + color();
}

const colorName = [12];

function addPalette() {
  for (let i = 0; i < colorName; i += 1) {
    const paletteList = document.createElement('li');

    if (colorName[i] === colorName[0]) {
      paletteList.classList.add('selected');
    }

    paletteList.classList.add('color', randomColor());
    paletteList.style.backgroundColor = randomColor();
    colorPalette.appendChild(paletteList);
  }
}

function addPalette2() {
  for (let i = 0; i < colorName; i += 1) {
    const paletteList2 = document.createElement('li');
    paletteList2.classList.add('color', randomColor());
    paletteList2.style.backgroundColor = randomColor();
    colorPalette2.appendChild(paletteList2);
  }
}

function addPalette3() {
  for (let i = 0; i < colorName; i += 1) {
    const paletteList3 = document.createElement('li');
    paletteList3.classList.add('color', randomColor());
    paletteList3.style.backgroundColor = randomColor();
    colorPalette3.appendChild(paletteList3);
  }
}

function addPalette4() {
  for (let i = 0; i < colorName; i += 1) {
    const paletteList4 = document.createElement('li');
    paletteList4.classList.add('color', randomColor());
    paletteList4.style.backgroundColor = randomColor();
    colorPalette4.appendChild(paletteList4);
  }
}

function changeSelected() {
  document.addEventListener('click', (event) => {
    const selectedColor = document.querySelector('.selected');

    if (event.target.classList.contains('color')) {
      selectedColor.classList.remove('selected');
      event.target.classList.add('selected');
    }
  });
}

function pixels(param1, param2) {
  for (let j = 0; j < param2; j += 1) {
    const pixelsLines = document.createElement('div');
    pixelsLines.classList.add('pixel');
    param1.appendChild(pixelsLines);
  }
}

function columns(param) {
  for (let k = 0; k < param; k += 1) {
    const column = document.createElement('div');
    pixels(column, param);
    pixelColumns.appendChild(column);
  }
}

function paintPixels() {
  document.addEventListener('click', (event) => {
    const clicked = document.querySelector('.selected').style.backgroundColor;
    const pixelTarget = event.target;

    if (pixelTarget.classList.contains('pixel')) {
      pixelTarget.style.backgroundColor = clicked;
      pixelTarget.style.opacity = '1';
    }
  });
}

function hideGuia () {
  if (menuGuia.style.display === 'block') {
    menuGuia.style.display = 'none';
  }
}

function clearColors() {
  const btn = document.querySelector('#clear-board');
  const selectBg = document.getElementsByClassName('pixel');

  btn.addEventListener('click', () => {
    for (let l = 0; l < selectBg.length; l += 1) {
      selectBg[l].style.backgroundColor = 'transparent';
    }
    hideGuia();
  });
}

function homeButton() {
  const button = document.querySelector('#home-background');

  button.addEventListener('click', () => {
    hideGuia();
    pixelColumns.style.background = 'transparent';
  });
}

function guiaButton() {
  const gButton = document.querySelector('#guia');

  gButton.addEventListener('click', () => {
    if (menuGuia.style.display === 'block') {
      menuGuia.style.display = 'none';
    } else {
      menuGuia.style.display = 'block';
    }
  });
}

function changeBg() {
  const imgCount = 11;
  const dir = '/bgimages/';
  const randomCount = (Math.floor(Math.random() * imgCount));
  const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg'];
  document.getElementById('pixel-board').setAttribute("style", "background-image: url(" + dir + images[randomCount] + ")");
}

function buttonVQV() {
  const buttonVQV = document.querySelector('#generate-board');

  buttonVQV.addEventListener('click', () => {
    changeBg();
    hideGuia();
  });
}

columns(32);
addPalette();
addPalette2();
addPalette3();
addPalette4();
changeSelected();
paintPixels();
clearColors();
homeButton();
guiaButton();
buttonVQV();
changeBg();
