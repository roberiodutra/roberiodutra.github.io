const main = document.querySelector('main');

const firstMainDiv = document.createElement('div');
firstMainDiv.id = 'first-div';

const secondMainDiv = document.createElement('div');
secondMainDiv.id = 'second-div';

const showRgb = document.createElement('h3');
showRgb.id = 'rgb-color';

const many = document.createElement('h2');
many.id = 'answer';
many.innerHTML = 'Escolha uma cor';

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

firstMainDiv.appendChild(showRgb);
main.append(firstMainDiv, divPoints, secondMainDiv, many, thirdMainDiv);

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
      scoreValues.push(3);
      scoreSum();
    } else {
      many.innerHTML = 'Errou! Tente novamente!';
    }
  }, { once: true });
}

function resetAll() {
  buttonReset.addEventListener('click', () => {
    secondMainDiv.innerHTML = '';
    many.innerHTML = 'Escolha uma cor';
    showRgb.innerHTML = randomize();
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
