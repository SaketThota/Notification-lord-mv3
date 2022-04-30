document.body.style.backgroundColor = 'orange';

var nameContainer = document.getElementsByClassName("aMaAEs");
console.log(nameContainer);
// document.getElementById("yhB1nd").appendChild(nameContainer);

/*
1. Amazon, flipkart button after product title.
2. Button UI
3. Get the price of the product name, product link, product price.
*/



let productPrices = [];
let productNames = [];

// amazon
productNames.push(document.querySelector('#productTitle'));
let ourPrice = document.querySelector('#priceblock_ourprice');
let dealPrice = document.querySelector('#priceblock_dealprice');
if (ourPrice) productPrices.push(ourPrice);
else productPrices.push(dealPrice);

// flipkart
productNames.push(document.querySelector('.B_NuCI'));
productPrices.push(document.getElementsByClassName('_30jeq3 _16Jk6d')[0]);
console.log(productNames, productPrices)
// myntra
productNames.push(document.getElementsByClassName('pdp-name')[0]);
productPrices.push(document.getElementsByClassName('pdp-price')[0]);

let btn = document.createElement("BUTTON");
btn.innerHTML = 'ADD';
btn.style.borderRadius = '8px';
btn.style.outline = 'none';
btn.style.height = 'min-content';
btn.style.padding = '3px';
btn.style.outlineColor = 'none';
btn.style.fontSize = '1.1rem';
btn.style.margin = '3px';
btn.style.borderColor = '#4884ee';
btn.style.backgroundColor = 'white';

btn.onmouseover = (() => {
    btn.style.backgroundColor = '#4884ee'
    btn.style.color = 'white'
})

btn.onmouseout = (() => {
    btn.style.backgroundColor = 'white'
    btn.style.color = 'black'
})

btn.addEventListener("click", (e) => addProduct(e));

let productName, productPrice;

for (let i = 0; i < 3; ++i) {
    if (productNames[i] && productPrices[i]) {
        productName = productNames[i].textContent.trim();
        productPrice = productPrices[i].textContent.trim();
        productNames[i].appendChild(btn);

        if (productPrice[0] == 'R') {
            productPrice = productPrice.slice(4);
        }
        break;
    }
}

function addProduct(e) {
    let product = {
        message: 'product',
        productName: productName,
        productPrice: productPrice
    };
    console.log(product);
}