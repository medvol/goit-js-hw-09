import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

Notify.init({position: 'right-top'})

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(event) {
  event.preventDefault();
  const { amount, delay, step } = event.currentTarget.elements;
  const amountNumber = parseInt(amount.value);
  let delayNumber = parseInt(delay.value);
  const stepNumber = parseInt(step.value);
 
  for (let i = 0; i < amountNumber; i += 1){
    createPromise(amountNumber, delayNumber)
    .then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });
    delayNumber += stepNumber;
  };

};


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
    }, delay)
      
  })
  
};

