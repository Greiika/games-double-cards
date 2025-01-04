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
        if (strNum.length == 4) {
            return walletBalance.textContent = `${strNum[0]}.${strNum.slice(1)}`;
        } else if (strNum.length == 3) {
            return walletBalance.textContent = strNum;
        };

        if (strNum.length == 5) {
            return walletBalance.textContent = `${strNum.slice(0,2)}.${strNum.slice(2)}`;
        } else if (strNum.length == 3) {
            return walletBalance.innerHTML = strNum;
        };

        if (strNum.length == 6) {
            return walletBalance.textContent = `${strNum.slice(0,3)}.${strNum.slice(3)}`;
        } else if (strNum.length == 3) {
            return walletBalance.innerHTML = strNum;
        };

        if (strNum.length == 7) {
            return walletBalance.textContent = `${strNum[0]}.${strNum.slice(1, 4)}.${strNum.slice(1, 4)}`;
        } else if (strNum.length == 3) {
            return walletBalance.innerHTML = strNum;
        };
    });
};

walletBalances.forEach((walletBalance) => {
    console.log(walletBalance)
    addingApoint(walletBalance.innerHTML);
});


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

// modal close

let close = document.querySelector('.close');
let modal = document.querySelector('.modal-schop');
close.addEventListener('click', closeModal);

function closeModal(e) {
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
    };
};

let schopBtn = document.querySelector('.schopBtn');
schopBtn.addEventListener('click', schop);

function schop() { 
    if (!modal.classList.contains('active')) {
        modal.classList.add('active')
    };
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
    let arrId = ['all', 'vier', 'acht', 'zwolf', 'sechzehn', 'zwanzig'];
    let elemId = arrId.find(elem => elem == id);
    if (id == elemId) {
        console.log(id, elemId)
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
// if (elem.classList.contains('activeGame')) {
//     elem.classList.add('noneItem');
// }
gameItems.addEventListener('click', (e) => {
    let clickGame = e.target;
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