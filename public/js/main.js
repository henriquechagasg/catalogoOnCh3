const categorySelect = document.querySelector("#select-category");
const collectionSelect = document.querySelector("#select-collection");
const refInput = document.querySelector('#ref-input');
const productsList = document.querySelector("#products-list");
const productCards = document.querySelectorAll("#large-card");
const backToPage = document.querySelector(".arrow-left");
const showOrdersbtn = document.querySelector("#orders-button");
const modal = document.querySelector("#orders-modal")

// Backend For Search


let allProducts = Object.assign([], [...productsList.children])


// Buttons

productCards.forEach((product) => {
    product.addEventListener('click', () => {
        refInput.value = ''
        categorySelect.selectedIndex = "all"
        collectionSelect.selectedIndex = "allCollections"
        window.location = `/r=${product.firstElementChild.firstElementChild.innerText.trim()}`
    })
})


refInput.addEventListener('input', async () => {
    if ( refInput.value != '') {
        const valueToSearch = refInput.value.trim();
        const filterSearch = await allProducts.filter((product) => {
            let reference = product.firstElementChild.firstElementChild.innerText.trim()
            return reference == valueToSearch
        })
        productsList.innerHTML = ""
        await filterSearch.forEach((product2) => {
            productsList.append(product2)
        })
    } else {
        allProducts.forEach((product) => {
            productsList.append(product)
         })
         categorySelect.selectedIndex = "all"
    }
})

categorySelect.addEventListener('change', async () => {
    collectionSelect.selectedIndex = "allCollections"
    refInput.value = ''
    if (categorySelect.value != 'all') {
        const valueToSearch = categorySelect.value;
        const filterSearch = await allProducts.filter((product) => {
            let reference = product.firstElementChild.firstElementChild.innerText.trim()
            if (reference.length >= 6 && !reference.includes('-')){
                return reference[2] == valueToSearch
            }else{
                return reference[0] == valueToSearch
            }
            
        })
        productsList.innerHTML = ""
        await filterSearch.forEach((product2) => {
            productsList.append(product2)
        })
    }else{
        allProducts.forEach((product) => {
            productsList.append(product)
         })
    }
})

collectionSelect.addEventListener('change', async () => {
    categorySelect.selectedIndex = "all"
    refInput.value = ''
    if (collectionSelect.value != 'allCollections') {
        const valueToSearch = String(collectionSelect.value.trim());
        const filterSearch = await allProducts.filter((product) => {
            let collection = product.firstElementChild.lastElementChild.firstElementChild.innerText.trim()
            return collection === valueToSearch
        })
        productsList.innerHTML = ""
        await filterSearch.forEach((product2) => {
            productsList.append(product2)
        })
    }else{
        allProducts.forEach((product) => {
            productsList.append(product)
         })
    }
})

