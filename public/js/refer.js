const eachSize = document.querySelectorAll('.each-size');
const orderCards = document.querySelectorAll('.order-cards');

eachSize.forEach(el => {
    let arrowUp = el.firstElementChild.firstElementChild;
    let arrowDown = el.firstElementChild.lastElementChild;
    let sizeQuantity = el.firstElementChild.children[1];
    let sizeValue = el.firstElementChild.children[1].innerText;
    arrowUp.addEventListener('click', () => {
        sizeQuantity.innerText = Number(sizeQuantity.innerText) + 1;
    })
    arrowDown.addEventListener('click', () => {
        if (Number(sizeQuantity.innerText) != 0) {
            sizeQuantity.innerText = Number(sizeQuantity.innerText) - 1;
        }
    })
})

// orderCards.forEach(el => {

// })