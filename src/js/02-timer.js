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
class Timer {
  constructor({markup}) {
    this.intervalID = null;
    this.isActiveTimer = false;
    this.markup = markup;
  }
  start() {
    if (this.isActiveTimer) return;

    this.isActiveTimer = true;
    const deadlineTime = calendar.selectedDates[0];
     
    // refs.startBtn.setAttribute('disabled', true) або зробити неактивною кнопку коли таймер вже запущено

    this.intervalID = setInterval(() => {
    
      const currentTime = Date.now();
      const deltaTime = deadlineTime - currentTime;
      const convertTime = this.convertMs(deltaTime);
      this.markup(convertTime);

      if (deltaTime <= 0) {
     
        clearInterval(this.intervalID);
        const endTime = this.convertMs(0);
        this.markup(endTime);
        this.isActiveTimer = false;
    }
    
    }, 1000);
    
  }
   
  convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {

  return String(value).padStart(2, '0');
   
};


}

const timer = new Timer({
  markup: updateTimerMarkup,
});

refs.startBtn.addEventListener('click', handleStartBtn);

function handleStartBtn() {
  timer.start();
  
}

function updateTimerMarkup({days, hours, minutes, seconds}) {

  refs.counterDays.textContent = days;
  refs.counterHours.textContent = hours;
  refs.counterMinutes.textContent = minutes;
  refs.counterSeconds.textContent = seconds;
  
};
