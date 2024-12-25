import imgBackAcht from './arrImgs/arrImgAcht.js';
import imgBackSechZehn from './arrImgs/arrImgSechZehn.js';
import imgBackVierUndZwanZig from './arrImgs/arrImgBackVierUndZwanZig.js';
// import imgBackZweiUndDreiSig from './arrImgs/arrImgBackZweiUndDreiSig.js';
// import imgBackVierZig from './arrImgs/arrImgBackVierZig.js';

let parentCard = document.querySelector('.game-wrapper');
let clickItem = document.querySelectorAll('.card');
let walletBalance = document.querySelector('.balance');
let walletHoneycomb = document.querySelector('.wallet-honeycomb');

// background

let bodyBg = document.querySelector('body');
bodyBg.style.backgroundImage = 'url(img/bg/bgCardUp-1.jpg)';
bodyBg.style.backgroundRepeat = 'no-repeat';
bodyBg.style.backgroundSize = 'cover';


let honeyComb = 10; 

function doubleCard(arr) {

    let ArrImgBack = [];

    ArrImgBack.splice(0, ArrImgBack.length);

    for (let obj of arr) {
        for (let item in obj) {
            ArrImgBack.push(obj[item]);
        };
    };

    let RandomImg = ArrImgBack.sort(() => (Math.random() > .5) ? 2 : -1);

    for (let i = 0; i < ArrImgBack.length; i++) {
        // count = i;
        let card = document.createElement('div');
        card.className = 'card';

        let cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        let cardFront = document.createElement('div');
        let cardBack = document.createElement('div');
        let cardBackImg = document.createElement('img');

        cardFront.className = 'card-front';
        cardBack.className = 'card-back';
        cardBackImg.className = 'card-img';
        cardBackImg.src = `img/${RandomImg[i]}`;
        
        card.appendChild(cardInner);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardBack.append(cardBackImg);
        parentCard.appendChild(card);
    };

    clickItem = document.querySelectorAll('.card');

    clickItem.forEach(elem => {
        elem.addEventListener('click', clickCard);
    });
};

doubleCard(imgBackAcht);


let matchedCard = 0;
let cardOne, cardTwo, cardOneImg, cardTwoImg;
let disableDeck = false;

function clickCard(e) {
    let clickedCard = e.target;

    if (clickedCard != cardOne && !disableDeck) {
        clickedCard.classList.add('visible');
        if (!cardOne) {
            return (cardOne = clickedCard);
        }
    
        cardTwo = clickedCard;
        disableDeck = true;

        cardOneImg = cardOne.querySelector('img').src,
        cardTwoImg = cardTwo.querySelector('img').src;
        matchCards(cardOneImg, cardTwoImg);
    };
};


function matchCards(img1, img2) {
    let countCard = 0;
    let resultNum, getNum, setNum;
    let index = 0;
    let balance = Number(walletBalance.innerHTML);
    if (img1 == img2) {
        matchedCard++;
        index = matchedCard;

        if (index) {
            if (walletHoneycomb.classList.contains('numX2')) {
                setNum = honeyComb * matchedCard;
                getNumX2(setNum);
            } else {
                getNum = balance + (honeyComb * matchedCard);
                walletBalance.innerHTML = getNum;
            }
        }

        for (let i = 1; i <= clickItem.length; i++) {
            countCard = i;
            resultNum = countCard / 2;
        }

        if (matchedCard == resultNum) {

            setTimeout(() => {
                shuffleCard();
            }, 1000);
        };
        cardOne.removeEventListener('click', clickCard);
        cardTwo.removeEventListener('click', clickCard);

        cardOne = cardTwo = '';
        return (disableDeck = false);
    }

    
    setTimeout(() =>  {
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
    }, 200)


    setTimeout(() => {
        cardOne.classList.remove('visible', 'shake');
        cardTwo.classList.remove('visible', 'shake');
        cardOne = cardTwo = '';
        disableDeck = false;
    }, 600);
};

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = '';
    disableDeck = false;

    clickItem.forEach(elem => {
        elem.classList.remove('visible');

        elem.addEventListener('click', clickCard);
    });
};


// levelUp

let nextBtn = document.querySelector('.arrow-next');
let countLevel = document.querySelector('.count');

nextBtn.addEventListener('click', levelUp);

let level = 1;

function levelUp () {
    if (level < 5) {
        countLevel.innerHTML =  ++level;
        parentCard.innerHTML = '';
        if (level == 2 ) {
            doubleCard(imgBackSechZehn);
        };

        if (level == 3 ) {
            parentCard.style.cssText = 'grid-template-columns: repeat(6, 1fr)';
            doubleCard(imgBackVierUndZwanZig);
        };

        if (level == 4 ) {
            parentCard.style.cssText = 'grid-template-columns: repeat(8, 1fr)';
            doubleCard(imgBackZweiUndDreiSig);
        };

        if (level == 5 ) {
            parentCard.style.cssText = 'grid-template-columns: repeat(10, 1fr)';
            doubleCard(imgBackVierZig);
        };
    };
};


// placecholder card


let hint = document.querySelector('.placeholder');

hint.addEventListener('click', hintCard);

function hintCard(e) {
    let clickHint = e.target;
    let childClickHint = clickHint.getElementsByClassName('game-price');
    let img1, img2;
    getBalance(childClickHint[0])
    for (let item of clickItem) {
        if (item.classList.contains('visible') ) {
            let cardsImg = document.querySelectorAll('.card');
            for (let elem of cardsImg) {
                img1 = item.querySelector('img').src;
                img2 = elem.querySelector('img').src;
                if (img1 == img2) {
                    if (!elem.classList.contains('visible')) {
                        elem.childNodes[0].classList.add('activeCard');
                        elem.childNodes[0].style.cssText = 'transition: all 0.5s';
                    }
                    setTimeout (() => {
                        elem.childNodes[0].classList.remove('activeCard');
                        elem.childNodes[0].style.cssText = 'transition: all 0.5s';
                        elem.childNodes[0].style.cssText = '';
                    }, 2000)
                };
            };
        };   
    };
};


// start price 

let numPrice, getNumPrice;

function getBalance(price) {
    numPrice = Number(price.innerHTML);
    let balance = Number(walletBalance.innerHTML);
    let parent = price.parentElement;
    for (let item of clickItem) {
        if (item.classList.contains('visible') && balance >= numPrice ) {
            getNumPrice = balance - numPrice;
            walletBalance.innerHTML = getNumPrice;
            return walletBalance.innerHTML = getNumPrice;
        } else if (parent.classList.contains('multiplierX2') && balance >= numPrice ) {
            getNumPrice = balance - numPrice;
            walletBalance.innerHTML = getNumPrice;
            return walletBalance.innerHTML = getNumPrice;
        } else if (balance <= 0) {
            walletBalance.style.color = 'red', 
            walletBalance.innerHTML = '0';
            setTimeout (() => {
                walletBalance.style.color = 'black';
            }, 1000)
        } else if (balance < numPrice && balance > 0) {
            price.classList.remove('visible');
            walletBalance.style.color = 'red';
            setTimeout (() => {
                walletBalance.style.color = 'black';
            }, 200)
        };
    };
};


// multiplierX2

let multiplierX2 = document.querySelector('.multiplierX2');
let sumHoneyComb;

multiplierX2.addEventListener('click', numX2Card);

function numX2Card(e) {
    walletHoneycomb.classList.add('numX2');
    if (walletHoneycomb.childNodes[1].classList.contains('x2')) {
        walletHoneycomb.childNodes[1].classList.add('activeX2');
    }
    let clickNumX2 = e.target;
    console.log(clickNumX2)
    let childclickNumX2 = clickNumX2.getElementsByClassName('game-price');
    console.log(childclickNumX2[0])
    getBalance(childclickNumX2[0]);
    timerX2();
};

function getNumX2(num) {
    sumHoneyComb = num * 2;
    walletBalance.innerHTML = Number(walletBalance.innerHTML) + sumHoneyComb;
};


// timer

let gameMultiplierX2 = document.querySelector('.game-multiplierX2');

let second = 30;
let flagTimer = false;
let div;

function timerX2() {
    if (!flagTimer) {
        div  = document.createElement('div');
        div.classList.add('timer');
        gameMultiplierX2.append(div);
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.position = 'absolute';
        div.style.zIndex = '20';
        div.style.top = '0';
        div.style.borderRadius = '10px';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.fontSize = '20px';
        div.style.color = 'white';
        flagTimer = true;
    };
    
    div.innerHTML = `0:${second--}`
    setTimeout(() => {
        if (second < 10) {
            div.innerHTML = `0:0${second}`
        };
        if (second > 0) {
            timerX2()
        } else if (second == 0) {
            div.style.display = 'none';
            walletHoneycomb.childNodes[1].classList.remove('activeX2');
            walletHoneycomb.classList.remove('numX2');
        };
    }, 1000);   
};