const eachProduct = document.querySelectorAll('.each-product');
const addToCart = document.querySelectorAll('.add-btn');
const myLazyLoad = new LazyLoad({
    elements_selector: ".photo"
})

if (!localStorage.getItem("items")){
    localStorage.setItem("items", "[]")
}

// Go to Cart
const products = JSON.parse(localStorage.getItem('items'));
const goToCartButton = document.querySelector('.goToCart-btn');
if (products && products.length > 0){
    goToCartButton.setAttribute('style', 'display: block;')
    goToCartButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location = '/cart'
    })
}


// Modal
eachProduct.forEach(product => {

    const cartButton = product.querySelector('.buy-btn');
    const modalContainer = product.querySelector('.modal-container');
    const closeModal = product.querySelector('.close-btn');
    const orderLines = product.querySelectorAll('.size-order-line');
    

    
    cartButton.addEventListener('click', (e) => {
        e.preventDefault();
        modalContainer.setAttribute("style", "display: flex;")
    });

    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        modalContainer.setAttribute("style", "display: none;")
      
    })


    orderLines.forEach(line => {
        const arrowUp = line.querySelector('.fas.fa-sort-up');
        const arrowDown = line.querySelector('.fas.fa-sort-down');
        const value = line.querySelector('.order-counter');


        // Update Quantities
        arrowUp.addEventListener('click', () => {
            let newValue = Number(value.innerText) + 1;
            value.innerText = newValue;
        });

        arrowDown.addEventListener('click', () => {
            if (value.innerText != "0") {
                let newValue = Number(value.innerText) - 1;
                value.innerText = newValue
            }
        });
    });

    
});

// Add To Cart
addToCart.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
    
        const targetProduct = e.target.parentElement.parentElement.parentElement.parentElement
        
        const productRefer = targetProduct.querySelector('#productRefer').value;
        const productDescri = targetProduct.querySelector('#productDescri').value;
        const productDescr = targetProduct.querySelector('#productDescr').value;
        const productImage = targetProduct.querySelector('#productImage').value;
        const price = Number(targetProduct.querySelector('#productPrice').value) || "0";
        const GGprice = Number(targetProduct.querySelector('#productGGPrice').value) || "0";

        const P = targetProduct.querySelector("#P") || "0";
        const M = targetProduct.querySelector("#M") || "0";
        const G = targetProduct.querySelector("#G") || "0";
        const GG = targetProduct.querySelector("#GG") || "0";
    
        const productId = `${productRefer}&${productDescr}`
    
        const items = JSON.parse(localStorage.getItem("items"));
    
        const Item = {
            productId,
            productRefer,
            productDescri,
            productDescr,
            productImage,
            Price: price || 0,
            GGPrice: GGprice || 0,
            P: Number(P.innerText) || 0,
            M: Number(M.innerText) || 0,
            G: Number(G.innerText) || 0,
            GG: Number(GG.innerText) || 0
        }

    
        items.push(Item);

        var result = []
        items.reduce(function (res, value) {
            if (!res[value.productId]){
                res[value.productId] = {
                    productId: value.productId,
                    productRefer: value.productRefer,
                    productDescri: value.productDescri,
                    productDescr: value.productDescr,
                    productImage: value.productImage,
                    Price: value.Price,
                    GGPrice: value.GGPrice,
                    P: 0,
                    M: 0,
                    G: 0,
                    GG: 0
                }
                result.push(res[value.productId])
            }
            res[value.productId].P += value.P
            res[value.productId].M += value.M
            res[value.productId].G += value.G
            res[value.productId].GG += value.GG
            return res
        }, {})
        

        localStorage.setItem("items", JSON.stringify(result));
    
        console.log(JSON.parse(localStorage.getItem("items")))
    
        if(P){P.innerText = "0"};
        if(M){M.innerText = "0"};
        if(G){G.innerText = "0"};
        if(GG){GG.innerText = "0"};

        if (!goToCartButton.attributes.style){
            goToCartButton.setAttribute('style', 'display: block;')
            goToCartButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.location = '/cart'
            })
        };
    
    })
})