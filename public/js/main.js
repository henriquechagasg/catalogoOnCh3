const productCard = document.querySelectorAll('#large-card')
const detailsButton = document.querySelectorAll("#details-btn")
const referProductCard = document.querySelectorAll("#product-card")

productCard.forEach((product) => {
    if (product.firstElementChild.firstElementChild.innerText == 'None') {
        product.classList.add('remove')
    }
})

referProductCard.forEach((product) => {
    if (product.firstElementChild.firstElementChild.innerText == 'None') {
        product.classList.add('remove')
    }
})



detailsButton.forEach((button) => {
    button.addEventListener('click', () => {
        let location = `/r=${button.parentElement.parentElement.firstElementChild.innerText}`
        window.location = location
    })
})
