const productCard = document.querySelectorAll('#large-card')
const detailsButton = document.querySelectorAll("#details-btn")
const referProductCard = document.querySelectorAll("#product-card")
const selectCategory = document.querySelector("#select-category")
const myLazyLoad = new LazyLoad({
    elements_selector: ".photo"
})

async function createCategorys() {
    categorysList = []
    productCard.forEach(async (product) => {
    productCategory = product.lastElementChild.children[2].innerText
    if (!categorysList.includes(productCategory)) {
        categorysList.push(productCategory)
    }
    })
    for await (category of categorysList){
        const newOption = document.createElement("option")
        newOption.value = category
        newOption.innerText = category[0] + category.substring(1).toLowerCase()
        selectCategory.append(newOption)

    }
}

createCategorys()



detailsButton.forEach((button) => {
    button.addEventListener('click', () => {
        let location = `/r=${button.parentElement.parentElement.firstElementChild.innerText}`
        window.location = location
    })
})

selectCategory.addEventListener("change", () => {
    let location = `/q=${selectCategory.value}`
    window.location = location
})


// ----- Card Slide


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
