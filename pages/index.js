const inputCurrency = document.getElementById('input-currency');
const outputCurrency = document.getElementById('output-currency');
const inputValute = inputCurrency.querySelector('.currency__input');
const outputValute = outputCurrency.querySelector('.currency__input');
const inputValuteSelect = inputCurrency.querySelector('.currency__list');
const courseUSD = document.getElementById('course-USD');
const courseEUR = document.getElementById('course-EUR');
const courseGBP = document.getElementById('course-GBP');

let nameInValute = inputValuteSelect.value;
let inValute;

let valutes;

// Вписываем значения в блок courses
function changeCourses(valutes) {
  const USD = valutes.USD;
  const EUR = valutes.EUR;
  const GBP = valutes.GBP;

  courseUSD.textContent = USD.Value.toFixed(2);
  courseEUR.textContent = EUR.Value.toFixed(2);
  courseGBP.textContent = GBP.Value.toFixed(2);

  if(USD.Value > USD.Previous) {
    courseUSD.classList.add('course-item__value_type_increase');
  } else{
    courseUSD.classList.add('course-item__value_type_decrease');
  }

  if(EUR.Value > EUR.Previous) {
    courseEUR.classList.add('course-item__value_type_increase');
  } else{
    courseEUR.classList.add('course-item__value_type_decrease');
  }

  if(GBP.Value > GBP.Previous) {
    courseGBP.classList.add('course-item__value_type_increase');
  } else{
    courseGBP.classList.add('course-item__value_type_decrease');
  }
}

// Получаем данные из центробанка России (сайт по использованию api - https://www.cbr-xml-daily.ru/)
fetch('https://www.cbr-xml-daily.ru/daily_json.js')
  .then(res => res.json())
  .then(data => {
    valutes = data.Valute;
    inValute = valutes[nameInValute];
    outputValute.textContent = inValute.Value / inValute.Nominal;
    
    changeCourses(valutes);
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  });

// Cчитываем значение с input
inputValute.addEventListener('input', (e) => {
  outputValute.textContent = Number(e.target.value)*  inValute.Value / inValute.Nominal;
});

// Cчитываем значение с select
inputValuteSelect.addEventListener('change', (e) => {
  nameInValute = e.target.value;
  inValute = valutes[nameInValute];

  outputValute.textContent = Number(inputValute.value)* inValute.Value / inValute.Nominal;
});