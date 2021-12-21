const main = document.querySelector('main');

const circle = document.createElement('div');
circle.id = 'circle';

const circleP = document.createElement('p');
circleP.innerText = '?';
circle.appendChild(circleP);

const firstMainDiv = document.createElement('div');
firstMainDiv.id = 'first-div';

const secondMainDiv = document.createElement('div');
secondMainDiv.id = 'second-div';

const showRgb = document.createElement('h2');
showRgb.id = 'rgb-color';

const title = document.createElement('h2');
title.id = 'title';
title.innerHTML = 'QUE COR É ESSA?';

const many = document.createElement('h3');
many.id = 'answer';
many.innerHTML = 'Escolha uma cor:';

const divPoints = document.createElement('div');
divPoints.id = 'score';

const scoreValues = [];

function scoreSum() {
  let score = 0;
  const scoreString = 'Score: ';
  for (let i = 0; i < scoreValues.length; i += 1) {
    score += scoreValues[i];
  }
  divPoints.innerHTML = scoreString + score;
}

const thirdMainDiv = document.createElement('div');
const buttonReset = document.createElement('button');
buttonReset.id = 'reset-game';
buttonReset.innerText = 'Play Again';
thirdMainDiv.appendChild(buttonReset);

firstMainDiv.append(divPoints, circle, showRgb, title);
main.append(firstMainDiv, many, secondMainDiv, thirdMainDiv);

function randomize() {
  const r = () => Math.floor(Math.random() * 256);
  const color = `rgb(${r()}, ${r()}, ${r()})`;
  return color;
}

showRgb.innerHTML = randomize();

function sixColors() {
  for (let i = 0; i < 6; i += 1) {
    const listColor = document.createElement('li');
    listColor.className = 'ball';
    listColor.style.backgroundColor = randomize();
    secondMainDiv.appendChild(listColor);
  }
}

function changeRandColor() {
  const selectBalls = document.querySelectorAll('.ball');
  const randNum = Math.floor(Math.random() * selectBalls.length);
  selectBalls[randNum].style.backgroundColor = showRgb.innerHTML;
}

function trueOrFalse() {
  secondMainDiv.addEventListener('click', (e) => {
    const trueBg = e.target.style.backgroundColor === showRgb.innerHTML;

    if (trueBg) {
      many.innerHTML = 'Acertou!';
      circle.style.backgroundColor = showRgb.innerHTML;
      circleP.innerText = 'yes';
      scoreValues.push(1);
      scoreSum();
    } else {
      many.innerHTML = 'Errou! Tente novamente!';
      circleP.innerText = 'no';
    }
  }, { once: true });
}

function resetAll() {
  buttonReset.addEventListener('click', () => {
    secondMainDiv.innerHTML = '';
    many.innerHTML = 'Escolha uma cor:';
    showRgb.innerHTML = randomize();
    circle.style.backgroundColor = 'black';
    circleP.innerText = '?';
    sixColors();
    changeRandColor();
    trueOrFalse();
  });
}

sixColors();
changeRandColor();
trueOrFalse();
resetAll();
scoreSum();
