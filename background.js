let addNewProduct = async (newProduct) => {
    let products = [];
    // console.log(newProduct);

    await chrome.storage.sync.get(['temp'], (result) => {
        products = result.temp;
        products.push(newProduct);
        chrome.storage.sync.set({ temp: products }, (result) => {
            // console.log("Added newProduct to DB");
        })
    });
}

chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        sendResponse("New product received - from bg");
        request.productLink = sender.tab.url;
        await addNewProduct(request);
        return true;
    }
);