"use strict"

import imgBack8 from './arrImgs/arrImgBack8.js';
import imgBack16 from './arrImgs/arrImgBack16.js';
import imgBack24 from './arrImgs/arrImgBack24.js';
import imgBack32 from './arrImgs/arrImgBack32.js';
import imgBack40 from './arrImgs/arrImgBack40.js';

import imgBack8V2 from './arrImgs/arrImgBack8V2.js';
import imgBack16V2 from './arrImgs/arrImgBack16V2.js';
import imgBack24V2 from './arrImgs/arrImgBack24V2.js';
import imgBack32v2 from './arrImgs/arrImgBack32V2.js';
import imgBack40v2 from './arrImgs/arrImgBack40V2.js';



let walletBalances = document.querySelectorAll('.balance');

// background

function getBackground (img) {
    let bodyBg = document.querySelector('body');
    bodyBg.style.backgroundImage = `url(${img})`;
    bodyBg.style.backgroundRepeat = 'no-repeat';
    bodyBg.style.backgroundSize = 'cover';
}

getBackground('img/bg/bgCardUp-1.jpg')

// balance

function addingApoint(numBalance) {
    let strNum = String(numBalance);
    walletBalances.forEach((walletBalance) => {
        if (strNum.length <= 3) {
            walletBalance.textContent = strNum;
        } else if (strNum.length == 4) {
            walletBalance.textContent = `${strNum[0]}.${strNum.slice(1)}`;
        } else if (strNum.length == 5) {
            walletBalance.textContent = `${strNum.slice(0,2)}.${strNum.slice(2)}`;
        } else if (strNum.length == 6) {
            walletBalance.textContent = `${strNum.slice(0,3)}.${strNum.slice(3)}`;
        } else if (strNum.length == 7) {
            walletBalance.textContent = `${strNum[0]}.${strNum.slice(1, 4)}.${strNum.slice(1, 4)}`;
        };
        let b = String(getNumberBalance(walletBalance));
        localStorage.setItem('balance', b);
    });
};

let valueBalance = JSON.parse(localStorage.getItem('balance'));
let localBalance = valueBalance === null ? 0 : valueBalance;
addingApoint(localBalance);

function getNumberBalance(str) {
    let getBalance = str.innerHTML; // поолучем значения баланса 
    let balance = Number(getBalance.split('.').join('')); // преобразуем баланс к читаему значению
    return balance; // возвращаем баланс в виде числа
};

function animateNumber(start, end, duration = 1000) {
    console.log(start, end)
    if (start === end) return;
    let range = end - start;
    let current = start;
    let increment = end > start? 10 : -10;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function() {
        current += increment;
        addingApoint(current);
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// start price 

let numPrice, getNumPrice;

function getBalance(price, balance) {
    numPrice = Number(price.innerHTML); // преобразуем стоимость буста из строки в число
    walletBalances.forEach(walletBalance => {
        if (price.classList.contains('buyPriceImg') && balance >= numPrice ) {
            getNumPrice = balance - numPrice;
            animateNumber(balance, getNumPrice);
        } else if (balance <= 0) {
            walletBalance.style.color = 'red', 
            walletBalance.innerHTML = '0';
            setTimeout (() => {
                walletBalance.style.color = 'white';
            }, 1000)
        } else if (balance < numPrice && balance > 0) {
            walletBalance.style.color = 'red';
            setTimeout (() => {
                walletBalance.style.color = 'white';
            }, 500)
        };
    });

};

// modal buy price img

let buyImgPrices = document.querySelectorAll('.modal-price');
buyImgPrices.forEach(buyImgPrice => {
    buyImgPrice.addEventListener('click', clickBuy);
});

let modalCards = document.querySelectorAll('.modal-card');
function clickBuy(e) {
    let buyPrice = e.target;
    
    walletBalances.forEach(walletBalance => {
        getBalance(buyPrice, getNumberBalance(walletBalance));

        if (getNumberBalance(walletBalance) < numPrice && getNumberBalance(walletBalance) > 0) {
            walletBalance.style.color = 'red';
            setTimeout (() => {
                walletBalance.style.color = 'white';
            }, 500);
        } else {
            let modalBtn = buyPrice.parentElement;
            let modalShadow = modalBtn.children[0];
            modalShadow.classList.add('activeShadow');
            buyPrice.textContent = 'Куплено';
            if (modalShadow.classList.contains('activeShadow')) {
                buyPrice.removeEventListener('click', clickBuy);
            };
        };
    });
};


// filter

document.addEventListener("DOMContentLoaded", function() {
    let cardsGame = document.querySelector('.modal-cards');
    let childrens = cardsGame.children;
    for (let elem of childrens) {
        if (!elem.classList.contains('activeGame')) {
            elem.classList.add('noneItem');
        };
    };
});

let filters = document.querySelector('.filter-items');
filters.addEventListener('click', (e) => {
    let clickFilter = e.target;
    let filters = document.querySelectorAll('.filter-item');
    filters.forEach(filter => {
        if (filter.classList.contains('activeFilter')) {
            filter.classList.remove('activeFilter');
        };
    });

    filterCard(clickFilter.dataset.itemid, clickFilter);
})


function filterCard (id, thisElem) {
    console.log(id)
    let arrId = ['all', 'vier', 'vierV2', 'acht', 'zwolf', 'sechzehn', 'zwanzig'];
    let elemId = arrId.find(elem => elem == id);
    if (id == elemId) {
        thisElem.classList.add('activeFilter')
        let cards = document.querySelectorAll('.modal-card');
        cards.forEach(card => {
            if (card.classList.contains(elemId)) {
                card.classList.add('activeModalCard');
                card.classList.remove('none');
            } else {
                card.classList.remove('activeModalCard');
            };
            if (!card.classList.contains('activeModalCard')) {
                card.classList.add('none');
            };
            if (card.classList.contains('none') && elemId == 'all' || card.classList.contains('activeModalCard') && elemId == 'all') {
                card.classList.remove('none');
                card.classList.remove('activeModalCard');
            };
        });
    };
};


let gameItems = document.querySelector('.modal-items');
gameItems.addEventListener('click', (e) => {
    let clickGame = e.target;
    console.log(clickGame.dataset)
    let gameItems = document.querySelectorAll('.modal-game');
    gameItems.forEach(gameItem => {
        if (gameItem.classList.contains('activeGame')) {
            gameItem.classList.remove('activeGame');
        };
    });
    gameItem(clickGame.dataset.gamesname, clickGame);
});

function gameItem(item, thisElem ) {
    let arrItem = ['fаindApairForTheCard', 'gameZwei', 'gameDrei', 'gameVier', 'gameFunf'];
    let elemItem = arrItem.find(elem => elem == item );
    if (item == elemItem) {
        thisElem.classList.add('activeGame');
        let cardsGame = document.querySelector('.modal-cards');
        let childrens = cardsGame.children;
        for (let elem of childrens) {
            if (elem.classList.contains(elemItem)) {
                elem.classList.add('activeGame');
                elem.classList.remove('noneItem');
            } else if (!elem.classList.contains(elemItem)) {
                elem.classList.add('noneItem');
                elem.classList.remove('activeGame');
            };
        };
    };
};


// localStorage

let imgPrices = document.querySelectorAll('.modal-price');
imgPrices.forEach(imgPrice => {
    imgPrice.addEventListener('click', getArrImgs);
});

let localArrCard = {
    imgBack8: [],
    imgBack16: [],
    imgBack24: [],
    imgBack32: [],
    imgBack40: [],
    imgBack8V2: [],
    imgBack16V2: [],
    imgBack24V2: [],
    imgBack32V2: [],
    imgBack40V2: [],
};

function getArrImgs (e) {
    let buyCard = e.target.closest('.modal-card');
    let datasetCard = buyCard.dataset.cardid;
    let arrId = ['imgBack8', 'imgBack8V2', 'imgBack16', "imgBack16V2", 'imgBack24', "imgBack24V2", 'imgBack32',  "imgBack32V2", 'imgBack40', "imgBack40V2"];
    let arrArrsImg = [imgBack8, imgBack8V2, imgBack16, imgBack16V2, imgBack24, imgBack24V2, imgBack32, imgBack32v2, imgBack40, imgBack40v2];
    let getIdArr = arrId.findIndex(elemId => elemId == datasetCard);
    arrArrsImg.forEach((arrImg, index) => {
        if (getIdArr == index) {
            Object.entries(localArrCard).forEach(([key, value]) =>  {
                if (key == datasetCard) {
                    value.push(arrImg);
                };
            });
        };
    });
};

function getArrElem(arr) {
    let arrImg = []
    console.log(arrImg,arr)
    for (let elem of arr) {
        arrImg.push(elem);
    };
    return arrImg;
};


// modal close

let close = document.querySelector('.close');
let modal = document.querySelector('.modal-schop');
close.addEventListener('click', closeModal);

function closeModal(e) {
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
    };
    let arrBuyImgCard = JSON.stringify(localArrCard);
    console.log(arrBuyImgCard)
    localStorage.setItem("shop-json", arrBuyImgCard)
};

let schopBtn = document.querySelector('.schopBtn');
schopBtn.addEventListener('click', schop);

function schop() { 
    if (!modal.classList.contains('active')) {
        modal.classList.add('active');
    };
};

let gameNew = document.querySelector('.game-new');
let modalNewGame = document.querySelector('.modal-newGame');
let yesClickBtn = document.querySelector('.button-yes');
let noClickBtn = document.querySelector('.button-no');

yesClickBtn.addEventListener('click', newGame);
noClickBtn.addEventListener('click', closeModalQuestion);
gameNew.addEventListener('click', activeModalQuestionGame);

function newGame() {
    localStorage.clear();
}

function activeModalQuestionGame() {
    modalNewGame.classList.add('openModalQuestion');
}

function closeModalQuestion() {
    modalNewGame.classList.remove('openModalQuestion');
}