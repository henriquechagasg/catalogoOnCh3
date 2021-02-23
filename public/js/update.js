const allCards = document.querySelectorAll(".card");

allCards.forEach((el, i) => {
    let realFileButton = el.querySelector('.realFileButton');
    let fakeFileButton = el.querySelector('.fakeFileButton');
    let checkMark = el.querySelector('.fas.fa-check');
    
    if (fakeFileButton) {
        fakeFileButton.addEventListener('click',  (e) => {
            e.preventDefault()
            realFileButton.click()
        });
        realFileButton.addEventListener('change', () => {
            checkMark.classList.remove('hide');
        });    
    }
})