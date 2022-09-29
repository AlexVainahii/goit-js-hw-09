import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
let dateNow = new Date();
let dateFuture = new Date();
let timerId = null;
let timerId1 = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateNow = new Date();
    dateFuture = selectedDates[0];
    makeMessage(selectedDates[0] > dateNow);
  },
};
function dateDiff() {
  const date = new Date();
  return convertMs(dateFuture - date);
}
function btnStartToggleDis(bool) {
  btnStartRef.disabled = bool ? false : true;
}
function makeMessage(bool) {
  bool
    ? btnStartToggleDis(bool)
    : Notiflix.Notify.failure('Please choose a date in the future');
}
const inDataTimeRef = document.querySelector('#datetime-picker');
const daysSpanRef = document.querySelector('[data-days]');
const hoursSpanRef = document.querySelector('[data-hours]');
const minutesSpanRef = document.querySelector('[data-minutes]');
const secondsSpanRef = document.querySelector('[data-seconds]');
const btnStartRef = document.querySelector('[data-start]');

flatpickr(inDataTimeRef, options);
btnStartToggleDis(false);
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function dataSet({ days, hours, minutes, seconds }) {
  daysSpanRef.textContent = days;
  hoursSpanRef.textContent = hours;
  minutesSpanRef.textContent = minutes;
  secondsSpanRef.textContent = seconds;
}
btnStartRef.addEventListener('click', () => {
  dataSet(dateDiff());
  timerId = setInterval(() => {
    dataSet(dateDiff());
  }, 1000);
});
