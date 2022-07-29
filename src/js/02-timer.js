import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

Notify.init({position: 'center-top'})

const refs = {
startBtn: document.querySelector('[data-start]'),
counterDays: document.querySelector('[data-days]'),
counterHours: document.querySelector('[data-hours]'),
counterMinutes: document.querySelector('[data-minutes]'),
counterSeconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', true)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
  }
    refs.startBtn.removeAttribute('disabled');
    Notify.success('Please, press to Start to activate countdown');
    
  },
};

const calendar = flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener('click', handleStartBtn);

function handleStartBtn() {
  let isActiveTimer = false;
  let intervalID = null;
  if (isActiveTimer)  return ;

  isActiveTimer = true;
  const deadlineTime = calendar.selectedDates[0];
  
// refs.startBtn.setAttribute('disabled', true) або зробити неактивною кнопку коли таймер вже запущено

  intervalID = setInterval(() => {
    
  const currentTime = Date.now();
  const deltaTime = deadlineTime - currentTime;
  const convertTime = convertMs(deltaTime);
  updateTimerMarkup(convertTime);
  
    if (deltaTime <= 0) {
     
      clearInterval(intervalID);
      updateTimerMarkup({ days:0,hours:0,minutes:0,seconds:0});
      isActiveTimer = false;
    }
  }, 1000);
    
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {

  return String(value).padStart(2, '0');
   
};

function updateTimerMarkup({days, hours, minutes, seconds}) {

  refs.counterDays.textContent = addLeadingZero(days);
  refs.counterHours.textContent = addLeadingZero(hours);
  refs.counterMinutes.textContent = addLeadingZero(minutes);
  refs.counterSeconds.textContent = addLeadingZero(seconds);
  
};
