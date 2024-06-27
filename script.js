let minValue;
let maxValue;
let answerNumber;
const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
const openPopUp = document.querySelector('#btnRetry');
const closePopUp = document.querySelector('.pop_up_close');
const popUp = document.querySelector('.pop_up');
let orderNumber = 1;
let gameRun = false;

openPopUp.addEventListener('click', function (e) {
    e.preventDefault();
    popUp.classList.add('active');
    gameRun = true;
    orderNumber = 1;
})

closePopUp.addEventListener('click', function(){
    popUp.classList.remove('active');
})

document.querySelector('#submit-button').addEventListener('click', function(){
    minValue = parseInt(inputMinValue.value);
    maxValue = parseInt(inputMaxValue.value);
    orderNumberField.innerText = orderNumber;
    checkMinMax ();
    popUp.classList.remove('active');
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    openPopUp.innerText = 'Заново';
    answerField.innerText = `Вы загадали число ${numberToText(answerNumber) }?`;
})

function numberToText(num) {
    if (num === 0) return 'ноль';

  const negative = num < 0 ? 'минус ' : '';
  num = Math.abs(num);

  const ones = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
  const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
  const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
  const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

  const getTens = (n) => {
    if (n < 10) {
        return ones[n];
    }
    else if (n >= 10 && n < 20) {
        return teens[n - 10];
    }
    else { 
        return tens[Math.floor(n / 10)] + ' ' + ones[n % 10];
    }
  };

  let text = negative + hundreds[Math.floor(num / 100)] + ' ';
  text += getTens(num % 100);

  return text.trim();
}

function correctPhrase() {
    let correctPhrase = [
        `Вы загадали число ${numberToText(answerNumber)} ?`,
        `Мне кажется это ${numberToText(answerNumber)}!`,
        `Ванга подсказала что это ${numberToText(answerNumber)}!`,
        `Это же ${numberToText(answerNumber)}?`
    ];
    let phrase = correctPhrase[ Math.floor ( Math.random() * correctPhrase.length ) ];
    answerField.innerText = phrase;
}

function errorPhrase() {
    let errorPhrase = [
        'Вы загадали неправильное число!\n\u{1F914}',
        'Я сдаюсь..\n\u{1F92F}',
        'Нажми кнопку заново,ты ошибся...\n\u{1F92F}',
        'Не ври мне,я никогда не ошибаюсь\n\u{1F624}',
        'Неужели я просчитался\n\u{1F633}'
    ];
    let phrase = errorPhrase[ Math.floor ( Math.random() * errorPhrase.length ) ];
    answerField.innerText = phrase;
    gameRun = false;
}

function checkMinMax () {
    if (isNaN(minValue)) {
        minValue = -999;
    } 
    if (isNaN(maxValue)) {
        maxValue = 999;
    } 
    if (minValue <= -1000 || minValue >= 1000 || minValue >= maxValue) {
        minValue = -999;
        
    } 
    if (maxValue >= 1000 || maxValue <= -1000 || maxValue <= minValue) {
        maxValue = 999;
    }
}

document.querySelector('#btnOver').addEventListener('click', function () {
    if (!gameRun){
        return;
       }
        if (minValue >= maxValue){
            errorPhrase();
            openPopUp.innerText = 'Заново';
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            correctPhrase();
        }
})

document.querySelector('#btnLess').addEventListener('click', function () {
   if (!gameRun){
    return;
   }
        if (minValue + 1 >= maxValue){
            errorPhrase();
            openPopUp.innerText = 'Заново';
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            correctPhrase();
        }
})

document.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun){
        let gameEndPhrase = [
            `Я всегда угадываю\n\u{1F60E}`,
            `Это было слишком легко\n\u{1F609}`,
            `Для меня это просто\n\u{1F60F}`
        ];
        
        let phrase = gameEndPhrase [Math.floor (Math.random() * gameEndPhrase.length)];
        answerField.innerText = phrase;
        openPopUp.innerText = 'Заново';
        gameRun = false;
    }
})