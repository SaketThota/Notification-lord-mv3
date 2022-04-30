// chrome.runtime.onInstalled.addListener(() => {
//     console.log("Registered");

//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { greeting: "This is from background" }, function (response) {
//             if (response)
//                 console.log(response.farewell);
//         });
//     });
// });

let addNewProduct = async (newProduct) => {
    let products = [];

    await chrome.storage.sync.get(['temp'], (result) => {
        products = result.temp;

        products.push(newProduct);

        chrome.storage.sync.set({ temp: products }, (result) => {
            console.log("Added newProduct to DB");
        })
    });
}

chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        sendResponse("New product received - from bg");
        await addNewProduct(request);
        return true;
    }
);