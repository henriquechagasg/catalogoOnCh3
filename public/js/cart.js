
const displayProducts = document.querySelector('.product-cards');
const products = JSON.parse(localStorage.getItem("items"))

// Setting form Client Order value
const clientOrderInput = document.querySelector("#clientOrder");
clientOrderInput.value = JSON.stringify(products)


// Rendering page rather there is something on cart
const cartSection = document.querySelector("#cart-section");
const nothingOnCartSection = document.querySelector("#nothing-on-cart");
if (products.length == 0){
    cartSection.setAttribute("style", "display: none;")
    nothingOnCartSection.setAttribute("style", "display: flex;")
}


function getProductSum(product$){

    if (product$.length){

        let totalResult = []
        let priceResult = []

        product$.forEach(element => {

            totalResult.push(element.P || 0);
            totalResult.push(element.M || 0);
            totalResult.push(element.G || 0);
            totalResult.push(element.GG || 0);

            priceResult.push((element.P * element.Price) || 0)
            priceResult.push((element.M * element.Price) || 0)
            priceResult.push((element.G * element.Price) || 0)
            priceResult.push((element.GG * element.GGPrice) || 0)
        });

        const total = totalResult.reduce((acc, element) => {
            return acc += element
        }, 0)
        
        const price = priceResult.reduce((acc, element) =>{
            return acc += element
        }, 0)

        totalResult = null
        priceResult = null

        return [total, Math.round(price*100)/100];

    } else {
        
        let totalResult = []
        let priceResult = []

        totalResult.push(product$.P || 0);
        totalResult.push(product$.M || 0);
        totalResult.push(product$.G || 0);
        totalResult.push(product$.GG || 0);

        priceResult.push((product$.P * product$.Price) || 0)
        priceResult.push((product$.M * product$.Price) || 0)
        priceResult.push((product$.G * product$.Price) || 0)
        priceResult.push((product$.GG *product$.GGPrice) || 0)


        const total = totalResult.reduce((acc, element) => {
            return acc += element
        }, 0)

        const price = priceResult.reduce((acc, element) =>{
            return acc += element
        }, 0)


        totalResult = null
        priceResult = null


        return [total, Math.round(price*100)/100]
    }
}

function addCartTotals(){
    const totalsModal = document.querySelector(".modal");
    const totalDePeças = totalsModal.querySelector("#totalDePeças");
    const totalDaCompra = totalsModal.querySelector("#totalDaCompra")
    const [peças, valor] = getProductSum(products);
    totalDePeças.innerText = `Total de Peças: ${peças}`;
    totalDaCompra.innerText = `Total do Pedido: R$ ${valor}`

}

function generateProducts(products){

    products.forEach(product => {

        let [ sumEachProduct, sumEachPrice ] = getProductSum(product);

        // Product Card
        let eachCartProduct = document.createElement("div");
        eachCartProduct.setAttribute("class", "each-cart-product")
        if (product == products[products.length - 1]){
            eachCartProduct.setAttribute('style', 'margin: 0 0 80px 0')
        }

        let productID = document.createElement('p');
        productID.innerText = product.productId
        productID.setAttribute('style', "display: none;");

        // Image Area
        let imageArea = document.createElement("div");
        imageArea.setAttribute("class", "img-card");

        //Img
        let img = document.createElement("img");
        img.setAttribute("src", product.productImage)
        imageArea.append(img)

        let productInfo = document.createElement('div');
        productInfo.setAttribute("class", "product-info")

        let productOrderInfo = document.createElement('div');
        productOrderInfo.setAttribute('class', 'product-order-info');
        productInfo.append(productOrderInfo);

        let productName = document.createElement('h2');
        productName.innerText = product.productDescri

        let productVariation = document.createElement('h2');
        productVariation.innerText = product.productDescr;

        let sizeOrdersArea = document.createElement("div");
        sizeOrdersArea.setAttribute("class", "size-orders-area");


        productOrderInfo.append(productName, productVariation, sizeOrdersArea)

        if (product.P && product.P > 0){
            let eachSize = document.createElement('div');
            eachSize.setAttribute('class', 'each-size');

            let sizeDiv = document.createElement('div');
            let sizeParagraph = document.createElement('p');
            sizeParagraph.innerText = "P";
            sizeDiv.append(sizeParagraph);
            
            let addRemoveArea = document.createElement('div');
            addRemoveArea.setAttribute('class', 'add-remove');

            let plusIcon = document.createElement('i');
            plusIcon.setAttribute('class', 'fas fa-plus-circle');
            plusIcon.setAttribute('style', 'display: none;')
            let minusIcon = document.createElement('i');
            minusIcon.setAttribute('class', 'fas fa-minus-circle')
            minusIcon.setAttribute('style', 'display: none;')
            let sizeQuantity = document.createElement('p');
            sizeQuantity.innerText = product.P
            
            addRemoveArea.append(plusIcon, sizeQuantity, minusIcon);

            eachSize.append(sizeDiv, addRemoveArea)

            sizeOrdersArea.append(eachSize)
        }
        if (product.M && product.M > 0){
            let eachSize = document.createElement('div');
            eachSize.setAttribute('class', 'each-size');

            let sizeDiv = document.createElement('div');
            let sizeParagraph = document.createElement('p');
            sizeParagraph.innerText = "M";
            sizeDiv.append(sizeParagraph);
            
            let addRemoveArea = document.createElement('div');
            addRemoveArea.setAttribute('class', 'add-remove');

            let plusIcon = document.createElement('i');
            plusIcon.setAttribute('class', 'fas fa-plus-circle');
            plusIcon.setAttribute('style', 'display: none;')
            let minusIcon = document.createElement('i');
            minusIcon.setAttribute('class', 'fas fa-minus-circle')
            minusIcon.setAttribute('style', 'display: none;')
            let sizeQuantity = document.createElement('p');
            sizeQuantity.innerText = product.M
            
            addRemoveArea.append(plusIcon, sizeQuantity, minusIcon);

            eachSize.append(sizeDiv, addRemoveArea)

            sizeOrdersArea.append(eachSize)
        }
        if (product.G && product.G > 0){
            let eachSize = document.createElement('div');
            eachSize.setAttribute('class', 'each-size');

            let sizeDiv = document.createElement('div');
            let sizeParagraph = document.createElement('p');
            sizeParagraph.innerText = "G";
            sizeDiv.append(sizeParagraph);
            
            let addRemoveArea = document.createElement('div');
            addRemoveArea.setAttribute('class', 'add-remove');

            let plusIcon = document.createElement('i');
            plusIcon.setAttribute('class', 'fas fa-plus-circle');
            plusIcon.setAttribute('style', 'display: none;')
            let minusIcon = document.createElement('i');
            minusIcon.setAttribute('class', 'fas fa-minus-circle')
            minusIcon.setAttribute('style', 'display: none;')
            let sizeQuantity = document.createElement('p');
            sizeQuantity.innerText = product.G
            
            addRemoveArea.append(plusIcon, sizeQuantity, minusIcon);

            eachSize.append(sizeDiv, addRemoveArea)

            sizeOrdersArea.append(eachSize)
        }
        if (product.GG && product.GG > 0){
            let eachSize = document.createElement('div');
            eachSize.setAttribute('class', 'each-size');

            let sizeDiv = document.createElement('div');
            let sizeParagraph = document.createElement('p');
            sizeParagraph.innerText = "GG";
            sizeDiv.append(sizeParagraph);
            
            let addRemoveArea = document.createElement('div');
            addRemoveArea.setAttribute('class', 'add-remove');

            let plusIcon = document.createElement('i');
            plusIcon.setAttribute('class', 'fas fa-plus-circle');
            plusIcon.setAttribute('style', 'display: none;')
            let minusIcon = document.createElement('i');
            minusIcon.setAttribute('class', 'fas fa-minus-circle')
            minusIcon.setAttribute('style', 'display: none;')
            let sizeQuantity = document.createElement('p');
            sizeQuantity.innerText = product.GG
            
            addRemoveArea.append(plusIcon, sizeQuantity, minusIcon);

            eachSize.append(sizeDiv, addRemoveArea)

            sizeOrdersArea.append(eachSize)
        }

        
        
        let productTotals = document.createElement('div');
        productTotals.setAttribute('class', 'product-total');

        let totalDePeças = document.createElement('p');
        totalDePeças.innerText = 'Peças: '

        let sumTotalProduct = document.createElement('p');
        sumTotalProduct.setAttribute('id', 'sum-total-product');
        sumTotalProduct.innerText = sumEachProduct;

        let valorUnitario = document.createElement('p');
        if (product.Price && product.GGPrice){
            valorUnitario.innerText = `Valor: ${product.Price} / ${product.GGPrice}`
        } else if (product.Price && !product.GGPrice){
            valorUnitario.innerText = `Valor: ${product.Price}`
        } else{
            valorUnitario.innerText = `Valor: ${product.GGPrice}`
        }


        let totalParagraph = document.createElement('p');
        totalParagraph.innerText = "Total: "

        let sumPriceProduct = document.createElement('p');
        sumPriceProduct.setAttribute('id', 'sum-price-product');
        sumPriceProduct.innerText = sumEachPrice;

        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'delete-btn');

        let trashIcon = document.createElement('i');
        trashIcon.setAttribute('class', 'far fa-trash-alt');
        deleteButton.append(trashIcon);
        
        // deleteButton.addEventListener('click', (e) =>{
        //     e.preventDefault();
        //     console.log(e.target);
        // })

        productTotals.append(totalDePeças, sumTotalProduct, valorUnitario, totalParagraph, sumPriceProduct)

        productInfo.append(productTotals)

        eachCartProduct.append(productID, imageArea, productInfo, deleteButton)


        displayProducts.append(eachCartProduct)
    })
}

function deleteProduct(id) {
    if (products){
        productToDeleteIndex = []
        products.forEach((element, index) => {
            if (element.productId == id){
                productToDeleteIndex.push(index)
            }
        })
        products.splice(productToDeleteIndex[0], 1)
        console.log("Removed")
        localStorage.setItem("items", JSON.stringify(products))
    } else{
        alert("Adicione algo ao carrinho antes!")
    }
    
}

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    })
}

function listenEventsOnElements() {

    // Delete product button
    addGlobalEventListener('click', '.delete-btn', e => {
        const productId = e.target.parentElement.firstChild.innerText;
        deleteProduct(productId)
        window.location = '/cart'
    })
    addGlobalEventListener('click', '.fa-trash-alt', e => {
        e.target.parentElement.click()
    })

    // Open and closing modal
    const openModal = document.querySelector('.open-modal-btn');
    const Modal = document.querySelector('.modal-container');
    const closeModal = document.querySelector('.close-modal-btn');
    openModal.addEventListener('click', (e) => {
        e.preventDefault();
        Modal.setAttribute('style', 'display: flex;')
        openModal.setAttribute('style', 'display: none;')

    });
    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        Modal.setAttribute('style', 'display: none;')
        openModal.setAttribute('style', 'display: block;')
    })

}

// Celphone mask

function cellphoneMask(number){
    let text = number.value
    text = text.replace(/\-/g, '');
    text = text.replace(/\s/g, '');
    text = text.replace(/\(/g, '');
    text = text.replace(/\)/g, '');
    text = text.replace(/[A-Za-z]/g, '')
    let fixedText;
    if (text.length === 10) {
        const ddd = text.slice(0,2);
        const part1 = text.slice(2,6)
        const part2 = text.slice(6,10)
        fixedText = `(${ddd}) 9${part1}-${part2}`
    } else if(text.length === 11){
        const ddd = text.slice(0,2);
        const part1 = text.slice(2,6)
        const part2 = text.slice(6,10)
        fixedText = `(${ddd}) ${part1}-${part2}`
    }
    if (fixedText.length){
        number.value = fixedText;    
    }
}

async function app(){

    addCartTotals()
    generateProducts(products);
    listenEventsOnElements()
    
}

app()   