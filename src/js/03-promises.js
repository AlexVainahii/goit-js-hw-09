import Notiflix from 'notiflix';
let promiseOptions = {};
const formRef = document.querySelector('.form');
formRef.addEventListener('input', event => {
  const { name, value } = event.target;
  promiseOptions[name] = value;
});

function formSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = promiseOptions;
  for (let i = 0; i < Number(amount); i++) {
    createPromise(i + 1, Number(delay) + Number(step) * i)
      .then(onSuccess)
      .catch(onErorr);
  }
}

formRef.addEventListener('submit', formSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  console.log(position, delay);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const onSuccess = ({ position, delay }) => {
  console.log(position, delay);
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};
const onErorr = ({ position, delay }) => {
  console.log(position, delay);
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
