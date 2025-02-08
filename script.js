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
let shadowLevelBtn = document.querySelector('.game-shadow');  

if (JSON.parse(localStorage.getItem('flag')) !== true || JSON.parse(localStorage.getItem('flag')) === null) {
    let localFlag = JSON.stringify(false);
    localStorage.setItem('flag', localFlag);
}

// background

// function getBackground (img) {
//     let bodyBg = document.querySelector('body');
//     bodyBg.style.backgroundImage = `url(${img})`;
//     bodyBg.style.backgroundRepeat = 'no-repeat';
//     bodyBg.style.backgroundSize = 'cover';
// }

// getBackground('img/bg/bgCardUp-1.jpg')

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


function doubleCard(dataId, arr, key) {
    let arrImgBack = [];
    let randomImg;

    if (dataId == key ) {
        console.log(true)
    }
    arrImgBack.splice(0, arrImgBack.length);

    for (let elem of arr) {
        arrImgBack.push(elem)
    }

    // if (JSON.parse(localStorage.getItem('cards')) == false) {
    // }
    randomImg = arrImgBack.sort(() => (Math.random() > .5) ? 2 : -1);

    let cards = document.createElement('div');
    cards.classList.add('game-cards');
    cards.dataset.cardsIndex = `${dataId}`;
    if (dataId == key) {
        cards.classList.add('activeBoxCards');
    }
    
    renderElemenet(arrImgBack, randomImg, cards)
    
    clickItem = document.querySelectorAll('.card');

    clickItem.forEach(elem => {
        elem.addEventListener('click', clickCard);
    });
};

function renderElemenet(arr, img, cards) {
    for (let i = 0; i < arr.length; i++) {
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

        cardBackImg.src = `${img[i]}`;
        cardBackImg.alt = `${img[i]}`;
        
        card.appendChild(cardInner);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardBack.append(cardBackImg);
        cards.appendChild(card);
        parentCard.append(cards);
    };
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

} else if (JSON.parse(localStorage.getItem('flag')) === true && JSON.parse(localStorage.getItem('cards')).length !== null) {
    let lengthLocal = JSON.parse(localStorage.getItem('cards')).length;
    let keySave;
    for (let key in objArrImg) {
        if (objArrImg[key].length == lengthLocal) {
            keySave = key;
            objArrImg[key] = JSON.parse(localStorage.getItem('cards'));
        };
    };
    console.log(objArrImg)
    Object.entries(objArrImg).forEach(([key, value]) => {
        doubleCard(key, value, keySave);
    })
}

let gameCards = document.querySelectorAll('.game-cards');
let newGameCards = Array.from(gameCards);
let imgCardIndexLocal = JSON.parse(localStorage.getItem('imgCardIndex'));
let imgCardLocal = JSON.parse(localStorage.getItem('imgCard'));

let matchedCard;
if (imgCardIndexLocal == null) {
    matchedCard = 0;
} else {
    matchedCard = +JSON.parse(localStorage.getItem('imgCardIndex'));
    console.log(matchedCard)
}

newGameCards.forEach(card => {
    if (card.classList.contains('activeBoxCards') && JSON.parse(localStorage.getItem('imgCard')) !== null) {
        imgCardLocal.forEach(img => {
            for (let i = 0; i < card.childNodes.length; i++) {
                let cardElem = card.childNodes[i];
                let tagImg = cardElem.querySelector('img');
                let imgElem = tagImg.src;
                if (img == imgElem) {
                    let parent = tagImg.closest('div.card-inner');
                    let parentCardImg = parent.parentElement;
                    parentCardImg.classList.add('visible');
                };
            };
        });
    };
});

let allMatchedCard = 0; 
let cardOne, cardTwo, cardOneImg, cardTwoImg;
let disableDeck = false;
let localArrImg;
if (JSON.parse(localStorage.getItem('imgCard')) == null) {
    localArrImg = [];
} else if (JSON.parse(localStorage.getItem('imgCardIndex')) == 0) {
    localArrImg = JSON.parse(localStorage.getItem('imgCard'));
    localArrImg = [];
    localStorage.setItem('imgCard', JSON.stringify(localArrImg));
} else {
    localArrImg = JSON.parse(localStorage.getItem('imgCard'));
}

function clickCard(e) {
    let clickedCard = e.target;
    let parent = clickedCard.closest('div.card-inner');
    let img;
    let parentCardImg = parent.parentElement;
    if (parentCardImg != cardOne && !disableDeck) {
        parentCardImg.classList.add('visible');
        // console.log(parentCardImg.querySelector('img').src)
        // img = parentCardImg.querySelector('img').src;
        // localArrImg.push(img);
        // localStorage.setItem('imgCard', JSON.stringify(localArrImg));
        // console.log(localArrImg)

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
    // localArrImg = JSON.parse(localStorage.getItem('imgCard'));
    // console.log(localArrImg)
    // localStorage.setItem('imgCard', JSON.stringify(localArrImg));
    // if (img1 !== img2) {
    //     localArrImg.pop(img1);
    //     localStorage.setItem('imgCard', JSON.stringify(localArrImg));
    // }

    if (img1 == img2) {
        localArrImg.push(img1, img2);
        localStorage.setItem('imgCard', JSON.stringify(localArrImg));

        matchedCard++;
        allMatchedCard++;
        index = matchedCard;
        localStorage.setItem('imgCardIndex', JSON.stringify(matchedCard));
        if (index) {
            if (walletHoneycomb.classList.contains('numX2')) {
                setNum = honeyComb * allMatchedCard;
                getNumX2(setNum);
            } else {
                getNum = balance + (honeyComb * allMatchedCard);
                animateNumber(balance , getNum);
            };
        };

        
        console.log(cardOne)
        
        cardVisibity(cardOne, cardTwo)

        newGameCards.forEach(cardsElem => {
            if (cardsElem.classList.contains('activeBoxCards')) {
                for (let i = 1; i <= cardsElem.childNodes.length; i++) {
                    countCard = i;
                    resultNum = countCard / 2;
                };

                if (matchedCard == resultNum) {
                    localArrImg = JSON.parse(localStorage.getItem('imgCard'));
                    localArrImg = [];
                    localStorage.setItem('imgCard', JSON.stringify(localArrImg));
                    if (shadowLevelBtn.classList.contains('game-shadow')) {
                        shadowLevelBtn.classList.remove('activeShadow');
                    }
                    setTimeout(() => {
                        shuffleCard();
                        for (let i = 0; i < cardsElem.childNodes.length; i++) {
                            console.log(cardsElem.childNodes[i])
                            cardsElem.childNodes[i].removeAttribute('style')
                        }
                    }, 1000);
                    
                };
            };
        });

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
    localStorage.setItem('imgCardIndex', JSON.stringify(matchedCard))
    cardOne = cardTwo = '';
    disableDeck = false;

    clickItem.forEach(elem => {
        elem.classList.remove('visible');

        elem.addEventListener('click', clickCard);
    });
};

function cardVisibity(card1, card2) {
    console.log(card1, card2)
    setTimeout(() => {
        card1.style.visibility = 'hidden';
        card2.style.visibility = 'hidden';
    }, 600);
}

// levelUp

let btns = document.querySelector('.game-arrows');
let nextBtn = document.querySelector('.arrow-next');
let prevBtn = document.querySelector('.arrow-prev');
let countLevel = document.querySelector('.count');

prevBtn.addEventListener('click', levelDown);
nextBtn.addEventListener('click', levelUp);

let level, clickIndex;
if (JSON.parse(localStorage.getItem('level-count')) == null) {
    level = 1;
    clickIndex = 0;
} else {
    level = +JSON.parse(localStorage.getItem('level'));
    clickIndex = +JSON.parse(localStorage.getItem('level-count'));
    countLevel.innerHTML = +JSON.parse(localStorage.getItem('level'));
    if (+JSON.parse(localStorage.getItem('level')) == 5) {
        nextBtn.style.display = "none";
        btns.style.justifyContent = "flex-start";
    };
};

let nodeListElem, newUrl;
let localImg = [];

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


newGameCards.forEach((cardsElem, index) => {
    if (cardsElem.classList.contains('activeBoxCards')) {
        cardsElem.classList.remove('hidden');
        let oneCards = newGameCards.find(elem => elem.classList.contains('activeBoxCards'));
        oneCards.classList.remove('activeBoxCards');
        oneCards.classList.add('hidden');
    } else  {
        cardsElem.classList.add('hidden');
    };

    Object.entries(objGrid).forEach(([key,value]) => {
        if (+JSON.parse(localStorage.getItem('level-count')) == key) {
            cardsElem.style.cssText = `grid-template-columns: repeat(${value}, 1fr)`;
            if (document.documentElement.clientWidth <= 378) {
                cardsElem.style.cssText = `grid-template-columns: repeat(6, 1fr)`;
            };
        };
    });

    if (clickIndex == index) {
        cardsElem.classList.add('activeBoxCards');
        cardsElem.classList.remove('hidden');
        nodeListElem = cardsElem.querySelectorAll('.card');
        prevBtn.style.display = 'inline-block';
        shadowLevelBtn.classList.add('activeShadow');
        if (clickIndex == 0) {
            prevBtn.style.display = 'none';
            btns.style.justifyContent = 'flex-end';
        } else {
            btns.style.justifyContent = 'space-evenly';
        }
        nodeListElem.forEach(elem => {
            newUrl = new URL(elem.querySelector('img').src);
            localImg.push(newUrl.pathname);
            if (JSON.parse(localStorage.getItem('flag')) === false) {
                localStorage.setItem('cards', JSON.stringify(localImg));   
            } else {
                JSON.parse(localStorage.getItem('cards'));
            };
        });
        if (JSON.parse(localStorage.getItem('flag')) === false) {
            let flag = JSON.parse(localStorage.getItem('flag'));
            flag = true;
            localStorage.setItem('flag', JSON.stringify(flag));
        };
    } else {
        cardsElem.removeAttribute('style');
    }
});


function levelUp () {
    newGameCards.forEach(gameCardsElem => {
        let cardVisible = gameCardsElem.querySelectorAll('.card');
        cardVisible.forEach(card => {
            if (card.classList.contains('visible')) {
                card.classList.remove('visible');
            };
        });
    });

    let arrImg = JSON.parse(localStorage.getItem('cards'));
    arrImg = [];

    if (level < 5) {
        countLevel.innerHTML = ++level;
        localStorage.setItem('level', JSON.stringify(level))
        prevBtn.style.display = 'inline-block'
        if (level == 5) {
            nextBtn.style.display = "none";
            btns.style.justifyContent = 'flex-start';
        }

        if (level > 1 && level < 5) {
            btns.style.justifyContent = 'space-evenly';

        }
        clickIndex++;
        localStorage.setItem('level-count', JSON.stringify(clickIndex))
        shadowLevelBtn.classList.add('activeShadow');
        saveElement(arrImg);
    };
};


function levelDown() {
    newGameCards.forEach(gameCardsElem => {
        let cardVisible = gameCardsElem.querySelectorAll('.card');
        cardVisible.forEach(card => {
            if (card.classList.contains('visible')) {
                card.classList.remove('visible');
            };
        });
    });

    let arrImg = JSON.parse(localStorage.getItem('cards'));
    arrImg = [];


    if (level > 1 ) {
        countLevel.innerHTML = --level;
        localStorage.setItem('level', JSON.stringify(level));

        if (level < 5) {
            nextBtn.style.display = "inline-block";
            btns.style.justifyContent = 'space-evenly';

            if (level == 1) {
                prevBtn.style.display = "none"; 
                btns.style.justifyContent = 'flex-end';
            } else {
                btns.style.justifyContent = 'space-evenly';
            };
        };
        
        clickIndex--;
        localStorage.setItem('level-count', JSON.stringify(clickIndex));
        shadowLevelBtn.classList.add('activeShadow');
        saveElement(arrImg);
    }
}


function saveElement(img) {
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
                img.push(newUrl.pathname);
                localStorage.setItem('cards', JSON.stringify(img));       
            });


            if (JSON.parse(localStorage.getItem('flag')) === false) {
                let flag = JSON.parse(localStorage.getItem('flag'));
                flag = true;
                localStorage.setItem('flag', JSON.stringify(flag));
            }

            Object.entries(objGrid).forEach(([key,value]) => {
                if (+JSON.parse(localStorage.getItem('level-count')) == key) {
                    gameCardsElem.style.cssText = `grid-template-columns: repeat(${value}, 1fr)`;
                    if (document.documentElement.clientWidth <= 378) {
                        gameCardsElem.style.cssText = `grid-template-columns: repeat(6, 1fr)`;
                    }
                };
            });

            // Object.entries(objBg).forEach(([key, value]) => {
            //     if (index == key) {
            //         getBackground(`img/bg/bgCardUp-${value}.jpg`)
            //         if (document.documentElement.clientWidth <= 378) {
            //             getBackground(`img/bg/bgCardUp-mobile-${value}.jpg`);
            //         }
            //     };
            // });
        };
    });
}


// placecholder card


let hints = document.querySelectorAll('.placeholder');
hints.forEach(hint => {
    hint.addEventListener('click', hintCard);
});

let shadowHint = document.createElement('div');
parentCard.append(shadowHint);

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
                        shadowHint.classList.add('shadowHint');
                        elem.style.zIndex = 10;
                    }
                    setTimeout (() => {
                        shadowHint.classList.remove('shadowHint');
                        elem.removeAttribute('style');
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
                walletBalance.style.color = 'white';
            }, 1000)
        } else if (balance < numPrice && balance > 0) {
            price.classList.remove('visible');
            walletBalance.style.color = 'red';
            setTimeout (() => {
                walletBalance.style.color = 'white';
            }, 200)
        };
    };  
};


// multiplierX2

let multipliersX2 = document.querySelectorAll('.multiplierX2');
multipliersX2.forEach(multiplierX2 => {
    multiplierX2.addEventListener('click', numX2Card);
})

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

let gameMultipliersX2 = document.querySelectorAll('.game-multiplierX2');

let second = 59;
let flagTimer = false;
let div;

function timerX2() {
    if (!flagTimer) {
        div = document.createElement('div');
        div.classList.add('timer');
        gameMultipliersX2.forEach(gameMultiplierX2 => {
            gameMultiplierX2.append(div);
        }) 
        flagTimer = true;
    };
    
    
    setTimeout(() => {
        div.innerHTML = `0:${second--}`;
        if (second == 10) {
            div.innerHTML = `0:${second}`;
        };
        if (second < 10) {
            div.innerHTML = `0:0${second}`;
        }
        if (second > 0) {
            timerX2();
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
    console.log(1)
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
            imgPreview.src = `${imgEins}`;
            imgPreview.alt = 'preview img';

            elem.firstElementChild.prepend(modalTextLevel);
            previewDiv.append(imgPreview);
            elem.prepend(previewDiv);
            return true;
        };
    });
};


function objSort(obj) {
    if (obj !== null) {
        Object.entries(obj).forEach(([key, value]) => {
            for(let arr of value) {
                creatingPreviewCard(key, arr)
            };
        });
    }
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
                    img.src = `${imgs}`;
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
