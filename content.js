let productPrice = 200
let productLink = "https://developer.chrome.com/"
let productName = "Apple 12"

let product = {
    productLink,
    productName,
    productPrice
}

chrome.runtime.sendMessage({ product }, function (response) {
    console.log(response);
});