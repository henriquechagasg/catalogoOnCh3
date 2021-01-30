const productCard = document.querySelectorAll('#large-card')
const detailsButton = document.querySelectorAll("#details-btn")
const referProductCard = document.querySelectorAll("#product-card")
const myLazyLoad = new LazyLoad({
    elements_selector: ".photo"
})

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


// ----- Slide Logic


productCard.forEach((element) => {
    if (element.firstElementChild.children[1]) {
        let slides = element.firstElementChild.firstElementChild.children;
        let prevSlide = element.firstElementChild.children[1];
        let nextSlide = element.firstElementChild.lastElementChild;
        let totalSlides = slides.length;
        let index = 0;


        nextSlide.onclick = function () {
            next("next");
        }
        
        prevSlide.onclick = function () {
            next("prev");
        }
        
        function next(direction) {
            if (direction == "next"){
                index++;
                if (index==totalSlides){
                    index=0
                }
            } else {
                if(index == 0){
                    index=totalSlides-1;
                }else{
                    index--;
                }
            }
            for (i=0; i<slides.length;i++){
                slides[i].classList.remove("active")
            }
            slides[index].classList.add("active")
    }
    }
    
})


// const slides = document.querySelector('.slider-itens').children;
// const prevSlide = document.querySelector(".left-slide");
// const nextSlide = document.querySelector(".right-slide");
// const totalSlides = slides.length;
// let index = 0;

// nextSlide.onclick = function () {
//     next("next");
// }

// prevSlide.onclick = function () {
//     next("prev");
// }

// function next(direction) {
//     if (direction == "next"){
//         index++;
//         if (index==totalSlides){
//             index=0
//         }
//     } else {
//         if(index == 0){
//             index=totalSlides-1;
//         }else{
//             index--;
//         }
//     }
//     for (i=0; i<slides.length;i++){
//         slides[i].classList.remove("active")
//     }
//     slides[index].classList.add("active")
// }