## Task 1 - color switcher

Do this task in the 01-color-switcher.html and 01-color-switcher.js files. 

ATENTION
Please note that the «Start» button can be clicked an infinite number of times. Make sure that the «Start» button is disabled while the theme change is running.

Use the getRandomHexColor function to generate a random color.

## Task 2 - countdown timer

Do this task in the 02-timer.html and 02-timer.js files. Write a timer script that counts down to a specific date. Such a timer can be used in blogs and online stores, event-logging pages, during maintenance, etc. Watch a demo video of the timer.

**Interface elements**

In HTML, there is ready-made markup for the timer, end date selection field and a button that should trigger the timer when clicked. Add at least some decoration to the interface elements.

**flatpickr library**

Use the flatpickr library to allow cross-browser selection of the end date and time in a single UI element. In order to add the CSS code of the library to the project, you need to add one more import, aside from the one described in the documentation.

An optional parameter object can be passed as the second argument to the flatpickr(selector, options) function. We have prepared an object for you that you need to complete the task. Find about the role of each property in the Options documentation and use it in your code.

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

**Date selection**

The onClose() method is called from the parameter object every time the interface element that creates flatpickr is closed. It should be used to handle the date selected by the user. The selectedDates parameter is an array of the selected dates, so the first element is taken.

- If the user selects a date from the past, show window.alert() with the text "Please choose a date in the future".
- If the user has selected a valid date (in the future), the "Start" button becomes active.
- The "Start" button must be inactive until the user has selected a date in the future.
- When you click the "Start" button, the countdown to the selected date starts from the time of clicking.
Countdown
- When you click on the "Start" button, the script must calculate once a second how much time is left until the specified date and update the timer interface, showing four numbers: days, hours, minutes and seconds in the following format: xx:xx:xx:xx.

The number of days can be more than two digits.
The timer must stop when it reaches the end date, that is, 00:00:00:00.

LET'S NOT COMPLICATE THINGS
If the timer is running, in order to select a new date and restart it, you need to reload the page.

**Time formatting**

The convertMs() function returns an object with the calculated time remaining until the end date. Note that it does not format the result. That is, if there are 4 minutes (or any other time unit) left, the function will return 4, not 04. In the timer interface, you need to add 0 if there are less than two digits in the number. Write an addLeadingZero(value) function that uses the padStart() method and format the value before rendering the interface.

**Notification library**

ATTENTION
The following features are optional, but they will be a good additional practice.

Use the notiflix library to display notifications to the user instead of window.alert().

## Task 3 - promise generator

Do this task in the 03-promises.html and 03-promises.js files. Watch a demo video of the promise generator.

In HTML, there is form markup; in its fields, the user will enter the first delay in milliseconds, the delay increment for each promise after the first one and the number of promises to be created.

- Write a script that, when submitting the form, calls the createPromise(position, delay) function as many times as you entered in the amount field. On each call, pass it the number of the promise to be created (position) and the delay given the first delay (delay) and step (step) entered by the user.
- Supplement the code of the createPromise function so that it returns one promise that will be fulfilled or rejected after delay time. The value of the promise must be an object containing the position and delay properties with the values of these parameters. Use the initial function code to choose whether to fulfill or reject the promise.

**Notification library**

ATTENTION
The following features are optional, but they will be a good additional practice.
