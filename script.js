import imgBackAcht from './arrImgs/arrImgAcht.js';
import imgBackSechZehn from './arrImgs/arrImgSechZehn.js';
import imgBackVierUndZwanZig from './arrImgs/arrImgBackVierUndZwanZig.js';
// import imgBackZweiUndDreiSig from './arrImgs/arrImgBackZweiUndDreiSig.js';
// import imgBackVierZig from './arrImgs/arrImgBackVierZig.js';

let parentCard = document.querySelector('.game-wrapper');
let clickItem = document.querySelectorAll('.card');

function doubleCard(arr) {

    let ArrImgBack = [];
    let count = 1;

    ArrImgBack.splice(0, ArrImgBack.length);

    for (let obj of arr) {
        for (let item in obj) {
            ArrImgBack.push(obj[item]);
        };
    };

    let RandomImg = ArrImgBack.sort(() => (Math.random() > .5) ? 2 : -1);

    for (let i = 0; i < ArrImgBack.length; i++) {
        count = i;
        console.log(count)
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

    let matchedCard = 0;
    let cardOne, cardTwo, cardOneImg, cardTwoImg;
    let disableDeck = false;

    clickItem = document.querySelectorAll('.card');

    clickItem.forEach(elem => {
        elem.addEventListener('click', clickCard);
    });

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
        }
    }

    function matchCards(img1, img2) {
        if (img1 == img2) {
            matchedCard++;
            console.log(count)
            if (matchedCard == 4 && matchedCard == count ) {
                setTimeout(() => {
                    shuffleCard();
                }, 1000)
            }
            cardOne.removeEventListener('click', clickCard);
            cardTwo.removeEventListener('click', clickCard);

            cardOne = cardTwo = '';
            return (disableDeck = false);
        }

        
        setTimeout(() =>  {
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        }, 400)


        setTimeout(() => {
            cardOne.classList.remove('visible', 'shake');
            cardTwo.classList.remove('visible', 'shake');
            cardOne = cardTwo = '';
            disableDeck = false;
        }, 1200);
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

}

doubleCard(imgBackAcht);


// placecholder card

let plachecholder = document.querySelector('.game-placeholder');

plachecholder.addEventListener('click', hintCard);

function hintCard() {
    let img1, img2;
    for (let item of clickItem) {
        if (item.classList.contains('visible')) {
            let cardsImg = document.querySelectorAll('.card');
            for (let elem of cardsImg) {
                img1 = item.querySelector('img').src;
                img2 = elem.querySelector('img').src;
                if (img1 == img2) {
                    if (!elem.classList.contains('visible')) {
                        elem.classList.add('active');
                    }
                    setTimeout (() => {
                        elem.classList.remove('active');
                        elem.style.cssText = 'transition: all 0.5s'
                    }, 2000)
                };
            };
        };   
    };
};


// lvl up

let nextBtn = document.querySelector('.arrow-next');
let countLvL = document.querySelector('.count');

nextBtn.addEventListener('click', lvl);

let count = 1;

function lvl () {
    if (count < 5) {
        countLvL.innerHTML =  ++count;
        parentCard.innerHTML = '';
        if (count == 2 ) {
            doubleCard(imgBackSechZehn);
        };

        if (count == 3 ) {
            parentCard.style.cssText = 'grid-template-columns: repeat(6, 1fr)';
            doubleCard(imgBackVierUndZwanZig);
        };

        if (count == 4 ) {
            parentCard.style.cssText = 'grid-template-columns: repeat(8, 1fr)';
            doubleCard(imgBackZweiUndDreiSig);
        };

        if (count == 5 ) {
            parentCard.style.cssText = 'grid-template-columns: repeat(10, 1fr)';
            doubleCard(imgBackVierZig);
        };
    };
};
