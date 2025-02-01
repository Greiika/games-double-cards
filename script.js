"use strict"

import imgBack8 from './arrImgs/arrImgBack8.js';
import imgBack16 from './arrImgs/arrImgBack16.js';
import imgBack24 from './arrImgs/arrImgBack24.js';
import imgBack32 from './arrImgs/arrImgBack32.js';
import imgBack40 from './arrImgs/arrImgBack40.js';


let parentCard = document.querySelector('.game-wrapper');
let clickItem = document.querySelectorAll('.card');
let walletBalance = document.querySelector('.balance');
let walletHoneycomb = document.querySelector('.wallet-honeycomb');
let shadowLevelUp = document.querySelector('.game-shadow');  

if (JSON.parse(localStorage.getItem('flag')) !== true || JSON.parse(localStorage.getItem('flag')) !== null) {
    let localFlag = JSON.stringify(false);
    localStorage.setItem('flag', localFlag);
}

// background

function getBackground (img) {
    let bodyBg = document.querySelector('body');
    bodyBg.style.backgroundImage = `url(${img})`;
    bodyBg.style.backgroundRepeat = 'no-repeat';
    bodyBg.style.backgroundSize = 'cover';
}

getBackground('img/bg/bgCardUp-1.jpg')

// balance

function addingApoint(str) {
    let strNum = String(str);
    if (strNum.length <= 3) {
        walletBalance.innerHTML = strNum;
    } else if (strNum.length == 4) {
        walletBalance.innerHTML = strNum[0] + '.' + strNum.slice(1);
    } else if (strNum.length == 5) {
        walletBalance.textContent = strNum.slice(0,2) + '.' + strNum.slice(2);
    } else if (strNum.length == 6) {
       walletBalance.textContent = strNum.slice(0,3) + '.' + strNum.slice(3);
    } else if (strNum.length == 7) {
        walletBalance.textContent = strNum[0] + '.' + strNum.slice(1, 4) + '.' + strNum.slice(1, 4);
    };
    let b = String(getNumberBalance(walletBalance));
    localStorage.setItem('balance', b);
};

let valueBalance = JSON.parse(localStorage.getItem('balance'));
let localBalance = valueBalance === null ? 0 : valueBalance;
addingApoint(localBalance);


// animation balance

function getNumberBalance(str) {
    let getBalance = str.innerHTML; // поолучем значения баланса 
    let balance = Number(getBalance.split('.').join('')); // преобразуем баланс к читаему значению
    return balance; // возвращаем баланс в виде числа
};


function animateNumber(start, end, duration = 100) {
    if (start === end) return;
    let range = end - start;
    let current = start;
    let increment = end > start? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function() {
        current += increment;
        addingApoint(current);
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
};


let honeyComb = 10;


function doubleCard(dataId, arr) {
    let ArrImgBack = [];

    ArrImgBack.splice(0, ArrImgBack.length);

    for (let elem of arr) {
        ArrImgBack.push(elem)
    }

    let randomImg = ArrImgBack.sort(() => (Math.random() > .5) ? 2 : -1);

    let cards = document.createElement('div');
    cards.classList.add('game-cards');
    cards.dataset.cardsIndex = `${dataId}`;
    // cards.firstChild.classList.add('activeBoxCards');
    
    for (let i = 0; i < ArrImgBack.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');

        let cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        let cardFront = document.createElement('div');
        let cardBack = document.createElement('div');
        let cardBackImg = document.createElement('img');

        cardFront.classList.add('card-front');
        cardBack.classList.add('card-back');
        cardBackImg.classList.add('card-img');

        cardBackImg.src = `${randomImg[i]}`;
        cardBackImg.alt = `${randomImg[i]}`;
        
        card.appendChild(cardInner);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardBack.append(cardBackImg);
        cards.appendChild(card);
        parentCard.append(cards);
    };
    
    clickItem = document.querySelectorAll('.card');

    clickItem.forEach(elem => {
        elem.addEventListener('click', clickCard);
    });
};

let objArrImg = {
    imgBack8: imgBack8,
    imgBack16: imgBack16,
    imgBack24: imgBack24,
    imgBack32: imgBack32,
    imgBack40: imgBack40,
};

if (JSON.parse(localStorage.getItem('flag')) === false) {
    Object.entries(objArrImg).forEach(([key, value]) => {
        doubleCard(key, value);
    })

} else if (JSON.parse(localStorage.getItem('flag')) === true && JSON.parse(localStorage.getItem('flag')).length !== null) {
    let lengthLocal = JSON.parse(localStorage.getItem('cards')).length;

    for (let key in objArrImg) {
        if (objArrImg[key].length == lengthLocal) {
            objArrImg[key] = JSON.parse(localStorage.getItem('cards'));
        };
    };

    Object.entries(objArrImg).forEach(([key, value]) => {
        doubleCard(key, value);
    })
}

// window.addEventListener('load', function () {
//     if (JSON.parse(localStorage.getItem('flag')) === true) {
//         Object.entries(objArrImg).forEach(([key, value]) => {
//             let lengthLocal = JSON.parse(localStorage.getItem('cards')).length;
//             if (value.length == lengthLocal) {
//                 console.log(value)
//                 value = JSON.parse(localStorage.getItem('cards'));
//                 doubleCard(key, value);
//                 console.log(value)

//             }
//         });
//     } 
// });



let gameCards = document.querySelectorAll('.game-cards');
let newGameCards = Array.from(gameCards);

let matchedCard = 0;
let allMatchedCard = 0; 
let cardOne, cardTwo, cardOneImg, cardTwoImg;
let disableDeck = false;

let localArrImg = [];

function clickCard(e) {
    let clickedCard = e.target;
    let parent = clickedCard.closest('div.card-inner');
    
    let parentCardImg = parent.parentElement;
    if (parentCardImg != cardOne && !disableDeck) {
        parentCardImg.classList.add('visible');
        let img = parentCardImg.querySelector('img').src;
        localArrImg.push(img);
        console.log(localArrImg)
        if (!cardOne) {
            return (cardOne = parentCardImg);
        };
        
        cardTwo = parentCardImg;
        disableDeck = true;

        cardOneImg = cardOne.querySelector('img').src,
        cardTwoImg = cardTwo.querySelector('img').src;
        matchCards(cardOneImg, cardTwoImg, getNumberBalance(walletBalance));
    };
};


function matchCards(img1, img2, balance) {
    let countCard = 0;
    let resultNum, getNum, setNum;
    let index = 0;
    if (img1 == img2) {
        matchedCard++;
        allMatchedCard++;
        index = matchedCard;
        if (index) {
            if (walletHoneycomb.classList.contains('numX2')) {
                setNum = honeyComb * allMatchedCard;
                getNumX2(setNum);
            } else {
                getNum = balance + (honeyComb * allMatchedCard);
                animateNumber(balance , getNum);
            };
        };

        newGameCards.forEach(cardsElem => {
            if (cardsElem.classList.contains('activeBoxCards')) {
                for (let i = 1; i <= cardsElem.childNodes.length; i++) {
                    countCard = i;
                    resultNum = countCard / 2;
                };
                if (matchedCard == resultNum) {
                    if (shadowLevelUp.classList.contains('game-shadow')) {
                        shadowLevelUp.classList.remove('activeShadow');
                    }
                    setTimeout(() => {
                        shuffleCard();
                    }, 1000);
                };
            };
        });

        // setTimeout(() => {
        //     cardOne.style.visibility = 'hidden';
        //     cardTwo.style.visibility = 'hidden';
        // }, 1000);


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
let clickIndex = 0;
let nodeListElem, newUrl, strCards;
let localImg = [];


newGameCards.forEach((cardsElem, index) => {
    cardsElem.classList.add('hidden');
    if (clickIndex == index) {
        cardsElem.classList.add('activeBoxCards');
        cardsElem.classList.remove('hidden');
        nodeListElem = cardsElem.querySelectorAll('.card');
        nodeListElem.forEach(elem => {
            newUrl = new URL(elem.querySelector('img').src);
            // localImg.push(newUrl.pathname)
            // strCards = JSON.stringify(localImg);
            // localStorage.setItem('cards', strCards);
            // let flag = JSON.parse(localStorage.getItem('flag'));
            // flag = true;
            // let newValueFlag = JSON.stringify(flag);
            // localStorage.setItem('flag', newValueFlag)
        });
    };
});

function getNewCards(dataId, arr) {    
    let cards = document.createElement('div');
    cards.classList.add('game-cards');
    // cards.dataset.cardsIndex = `${dataId}`;
    cards.classList.add('activeBoxCards');
    
    for (let i = 0; i < newCards.length; i++) {
    
        let card = document.createElement('div');
        card.classList.add('card');
    
        let cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
    
        let cardFront = document.createElement('div');
        let cardBack = document.createElement('div');
        let cardBackImg = document.createElement('img');
    
        cardFront.classList.add('card-front');
        cardBack.classList.add('card-back');
        cardBackImg.classList.add('card-img');
    
        cardBackImg.src = `${newCards[i]}`;
        cardBackImg.alt = `${newCards[i]}`;
        
        card.appendChild(cardInner);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardBack.append(cardBackImg);
        cards.appendChild(card);
        parentCard.append(cards);
    };

    clickItem = document.querySelectorAll('.card');

    clickItem.forEach(elem => {
        elem.addEventListener('click', clickCard);
    });
}

function levelUp (e) {
    let objGrid = {
        2: 6,
        3: 8,
        4: 10
    };
    let objBg = {
        1: 2,
        2: 3,
        3: 4,
        4: 5
    }
    if (level < 5) {
        countLevel.innerHTML = ++level;
        if (level == 5) {
            let btn = document.querySelector('.game-arrows');
            btn.style.display = "none";
        }
        ++clickIndex;
        // shadowLevelUp.classList.add('activeShadow');
        newGameCards.forEach((gameCardsElem, index) => { 
            if (gameCardsElem.classList.contains('activeBoxCards')) {
                gameCardsElem.classList.remove('activeBoxCards');
                gameCardsElem.classList.add('hidden');
            };

            if (clickIndex == index) {
                gameCardsElem.classList.add('activeBoxCards');
                gameCardsElem.classList.remove('hidden');
                nodeListElem = gameCardsElem.querySelectorAll('.card');
                nodeListElem.forEach(elem => {
                    newUrl = new URL(elem.querySelector('img').src);
                    localImg.push(newUrl.pathname)
                    localStorage.setItem('cards', JSON.stringify(localImg));                    
                    let flag = JSON.parse(localStorage.getItem('flag'));
                    flag = true;
                    let newValueFlag = JSON.stringify(flag);
                    localStorage.setItem('flag', newValueFlag)
                });

                Object.entries(objGrid).forEach(([key,value]) => {
                    if (index == key) {
                        gameCardsElem.style.cssText = `grid-template-columns: repeat(${value}, 1fr)`;
                        if (document.documentElement.clientWidth <= 378) {
                            gameCardsElem.style.cssText = `grid-template-columns: repeat(6, 1fr)`;
                        }
                    };
                });

                Object.entries(objBg).forEach(([key, value]) => {
                    if (index == key) {
                        getBackground(`img/bg/bgCardUp-${value}.jpg`)
                        if (document.documentElement.clientWidth <= 378) {
                            getBackground(`img/bg/bgCardUp-mobile-${value}.jpg`);
                        }
                    };
                });
            };
        });
    };
};


// placecholder card


let hint = document.querySelector('.placeholder');

hint.addEventListener('click', hintCard);

let shadowHint = document.createElement('div');
shadowHint.classList.add('shadowHint');

function hintCard(e) {
    let clickHint = e.target;
    let childClickHint = clickHint.getElementsByClassName('game-price');
    let img1, img2;
    getBalance(childClickHint[0], getNumberBalance(walletBalance));
    for (let item of clickItem) {
        if (item.classList.contains('visible') ) {
            let cardsImg = document.querySelectorAll('.card');
            for (let elem of cardsImg) {
                img1 = item.querySelector('img').src;
                img2 = elem.querySelector('img').src;
                if (img1 == img2) {
                    if (!elem.classList.contains('visible')) {
                        parentCard.append(shadowHint);
                        elem.style.zIndex = 10;
                    }
                    setTimeout (() => {
                        parentCard.removeChild(shadowHint);
                        elem.style.zIndex = 0;
                    }, 1000);
                };
            };
        };   
    };
};


// start price 

let numPrice, getNumPrice;

function getBalance(price, balance) {
    numPrice = Number(price.innerHTML); // преобразуем стоимость буста из строки в число
    let parent = price.parentElement; // получаем родительский элемент для нахождения класса
    for (let item of clickItem) {
        if (item.classList.contains('visible') && balance >= numPrice ) { // проверяем есть ли данный класс у карточки и соотвествует ли баланс стоимости буста
            getNumPrice = balance - numPrice; // вычитаем стоимость буста из баланса
            animateNumber(balance, getNumPrice);
        } else if (parent.classList.contains('multiplierX2') && balance >= numPrice ) {
            getNumPrice = balance - numPrice;
            animateNumber(balance, getNumPrice);
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

multiplierX2.addEventListener('click', numX2Card);

function numX2Card(e) {
    walletHoneycomb.classList.add('numX2');
    if (walletHoneycomb.childNodes[1].classList.contains('x2')) {
        walletHoneycomb.childNodes[1].classList.add('activeX2');
    }
    let clickNumX2 = e.target;
    let childclickNumX2 = clickNumX2.getElementsByClassName('game-price');
    getBalance(childclickNumX2[0], getNumberBalance(walletBalance));
    timerX2();
};

function getNumX2(num) {
    let sumHoneyComb = num * 2;
    let summaX2 = getNumberBalance(walletBalance) + sumHoneyComb;
    animateNumber(getNumberBalance(walletBalance), summaX2);
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
    
    
    setTimeout(() => {
        div.innerHTML = `0:${second--}`
        if (second == 10) {
            div.innerHTML = `0:${second}`
        };
        if (second < 10) {
            div.innerHTML = `0:0${second}`
        }
        if (second > 0) {
            timerX2()
        } else if (second == 0) {
            div.style.display = 'none';
            walletHoneycomb.childNodes[1].classList.remove('activeX2');
            walletHoneycomb.classList.remove('numX2');
        };
    }, 1000);   
};


// album 

let album = document.querySelector('.album-wrapper');
let modalAlbum = document.querySelector('.modal-album');
let modalPocket = document.querySelectorAll('.modal-pocket');
album.addEventListener('click', openAlbum);

function openAlbum() {
    modalAlbum.classList.toggle('activeAlbum');

    // if (modalAlbum.classList.contains('activeAlbum')) {
    //     window.addEventListener('click', () => {
    //         modalAlbum.classList.remove('activeAlbum');
    //     });
    // };
};


// modal-album

let albumPocketDiv, pocketDiv, previewDiv, pocketBtnDiv, modalTextLevel;

let albumPocket = document.querySelectorAll('.modal-album__pocket');
let albumWrapper = document.querySelector('.modal-album__wrapper');
let pocketArr = Array.from(albumPocket);
let shopLocalObj = JSON.parse(localStorage.getItem('shop-json'));

function creatingPreviewCard(key, arr) {
    let arrDataset = ['imgBack8', 'imgBack8V2', 'imgBack16', "imgBack16V2", 'imgBack24', "imgBack24V2", 'imgBack32',  "imgBack32V2", 'imgBack40', "imgBack40V2"];
    let lengthArr, resDelete;
    
    // albumPocketDiv = document.createElement('div');
    // albumPocketDiv.classList.add('modal-album__pocket');
    
    // pocketDiv = document.createElement('div');
    // pocketDiv.classList.add('modal-pocket');
    
    // pocketBtnDiv = document.createElement('div');
    // pocketBtnDiv.classList.add('modal-pocket__btn');
    // pocketBtnDiv.textContent = 'Применить';
    
    // pocketDiv.append(pocketBtnDiv);
    // albumPocketDiv.append(pocketDiv);
    // albumWrapper.append(albumPocketDiv);
    
    pocketArr.find(elem => {
        if (!elem.firstElementChild.classList.contains('modal-pocket__preview')) {
            previewDiv = document.createElement('div');
            previewDiv.classList.add('modal-pocket__preview');
            
            for (let j = 0; j < arrDataset.length; j++) {
                lengthArr = j;
                resDelete = (lengthArr + 1) % 2;
                if (key == arrDataset[j]) {
                    modalTextLevel = document.createElement('p');
                    modalTextLevel.classList.add('modal-pocket__text');
                    modalTextLevel.textContent = `level${j}`;

                    previewDiv.dataset.arrimgs = arrDataset[j];
                };
            };
            
            let imgPreview = document.createElement('img');
            imgPreview.classList.add('modal-pocket__preview-img');
            let imgEins = arr.find(elem => elem);
            imgPreview.src = `img/${imgEins}`;
            imgPreview.alt = 'preview img';

            elem.firstElementChild.prepend(modalTextLevel);
            previewDiv.append(imgPreview);
            elem.prepend(previewDiv);
            return true;
        };
    });
};


function objSort(obj) {
    Object.entries(obj).forEach(([key, value]) => {
        for(let arr of value) {
            creatingPreviewCard(key, arr)
        };
    });
};

objSort(shopLocalObj);


let modalPreview = document.querySelectorAll('.modal-pocket__preview');
modalPreview.forEach(preview => {
    preview.addEventListener('click', previewImg);
});


let boxImg;
function previewImg(e) {
    let clickImg = e.target;
    let parent = clickImg.parentElement;
    let cardId = parent.dataset.arrimgs;
    let setImgs;

    let boxImgs = document.querySelector('.modal-box__imgs');
    boxImgs.classList.add('activeBoxImgs');
    boxImg = document.querySelector('.modal-box__img');

    let shopLocalObj = JSON.parse(localStorage.getItem('shop-json'));
    Object.entries(shopLocalObj).forEach(([key, value]) => {
        for (let arr of value) {
            if (cardId == key) {
                setImgs = setDubl(arr)
                setImgs.forEach(imgs => {
                    let img = document.createElement('img');
                    img.src = `img/${imgs}`;
                    img.classList.add('preview-img')
                    boxImg.append(img);
                });
            };
        };
    });
};

function setDubl (str) {
    return new Set(str);
};


// modal btn

let previewBtns = document.querySelectorAll('.modal-pocket__btn');
previewBtns.forEach(elemBtn => {
    elemBtn.addEventListener('click', newImgCardBack) 
})

function newImgCardBack (e) {
    let getBtn = e.target;
    let parentBtn = getBtn.parentElement;
    let previousElementBtn = parentBtn.previousElementSibling;
    let datasetId = previousElementBtn.dataset.arrimgs;
    let newArr = [];
    
    let shopLocalObj = JSON.parse(localStorage.getItem('shop-json'));
    Object.entries(shopLocalObj).forEach(([key, value]) => {
        for (let arr of value) {
            if (datasetId == key) {{
                newArr = arr;
            }};
        };
    });

    let randomImg = newArr.sort(() => (Math.random() > .5) ? 2 : -1);

    newGameCards.forEach(cards => {
        if (cards.dataset.cardsIndex == datasetId) {
            cards.childNodes.forEach((elem, index) => {
                elem.querySelector('img').src = `img/${randomImg[index]}`;
            });
        };
    });

    if (!getBtn.classList.contains('activeBtn')) {
        getBtn.textContent = 'Активно';
        getBtn.classList.add('activeBtn');
    } else {
        getBtn.textContent = 'Применить';
        getBtn.classList.remove('activeBtn');
    };
}

// modal-album close

let boxClose = document.querySelector('.modal-box__close');
let modalImgs = document.querySelector('.modal-box__imgs');
boxClose.addEventListener('click', closeModal);

function closeModal(e) {
    if (modalImgs.classList.contains('activeBoxImgs')) {
        modalImgs.classList.remove('activeBoxImgs');
        while(boxImg.firstChild) {
            boxImg.removeChild(boxImg.firstChild);
        };
    };
};


window.addEventListener('click', (e)=> {
    let closeModalWindow = e.target;
    if (closeModalWindow == window.document.querySelector('.main-wrapper') && modalAlbum.classList.contains('activeAlbum')) {
        modalAlbum.classList.remove('activeAlbum');
    }
})
