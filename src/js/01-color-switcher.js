const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};

let timerID = null;

refs.startBtn.classList.add('btn', 'btn--play');
refs.stopBtn.classList.add('btn', 'btn--stop');

refs.startBtn.addEventListener('click', handleStartBtn);
refs.stopBtn.addEventListener('click', handleStopBtn);

function handleStartBtn() {
    if (refs.startBtn.hasAttribute('disabled')) {
        return;
    }

    timerID = setInterval(() => {
        const color = getRandomHexColor();
        document.body.style.backgroundColor = color;
        refs.startBtn.setAttribute('disabled', true)
        
    }, 1000);
    
};

function handleStopBtn() {
    refs.startBtn.removeAttribute('disabled');
    clearInterval(timerID);
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};