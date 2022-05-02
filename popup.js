var tbodyRef = document.querySelector('#productTable');
var mailIdBtn = document.querySelector('#mail-id-btn');
var frequencyBtn = document.querySelector('#frequency-btn');

async function deleteRow(e) {
    let curName = e.path[2].cells[2].innerText;

    chrome.storage.sync.get(['temp'], function (res) {
        let products = res.temp;

        products = products.filter((e) => {
            return ((e.productName != curName) && (curName != 'undefined'));
        })

        chrome.storage.sync.set({ temp: products }, function () {
            (async () => {
                await fillTable();
            })()
        });
    });
}

async function changePrice(e) {
    let newValue = e.target.value;
    let productName = e.path[2].cells[2].innerText;

    chrome.storage.sync.get(['temp'], function (res) {
        let products = res.temp;

        for (let i = 0; i < products.length; ++i) {
            if (products[i].productName == productName) {
                products[i].productPrice = newValue;
            }
        }

        chrome.storage.sync.set({ temp: products }, function () {
            (async () => {
                await fillTable();
            })()
        })
    })
}

async function fillTable() {
    let rowLength = 1;
    let vis = new Map();

    chrome.storage.sync.get(['temp'], function (res) {
        let products = res.temp;

        if (products.length) {
            tbodyRef.style.display = 'block';

            for (cur of products) {
                let name = cur.productName;
                let link = cur.productLink;
                let price = cur.productPrice;

                if (vis[name] == true) continue;
                vis[name] = 1;

                let newRow = tbodyRef.insertRow();
                newRow.scope = 'row';

                let fourthCol = newRow.insertCell(0);
                let deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = 'Del';
                deleteBtn.addEventListener('click', (e) => deleteRow(e));
                deleteBtn.classList.add('btn');
                deleteBtn.classList.add('btn-danger');
                deleteBtn.classList.add('fw-bold');
                fourthCol.appendChild(deleteBtn);

                let thirdCol = newRow.insertCell(0);
                let aTag = document.createElement('a');
                aTag.setAttribute('href', link);

                if (name.length > 30)
                    name = name.slice(0, 30) + '...';

                aTag.innerText = name;
                thirdCol.appendChild(aTag);

                let secondCol = newRow.insertCell(0);
                let secondColInput = document.createElement('input');
                secondColInput.style.width = '4rem';
                price = price.split('.')[0];
                secondColInput.value = parseInt(price.replace(/\D/g, ''));
                secondColInput.addEventListener('change', (e) => changePrice(e));
                secondCol.appendChild(secondColInput);

                let firstCol = newRow.insertCell(0);
                let firstColText = document.createTextNode(rowLength);
                firstCol.appendChild(firstColText);

                rowLength++;
            }
        } else {
            tbodyRef.style.display = 'none';
        }
    });
}

async function setMail() {
    chrome.storage.sync.get(['mailId'], (res) => {
        if (res.mailId) { 
            document.querySelector('#mail-id').value = res.mailId;
        }
    });
}

async function setFrequency() {
    chrome.storage.sync.get(['frequency'], (res) => {
        if (res.frequency) {
            document.querySelector('#frequency').value = res.frequency;
        }
    });
}

async function getMail() {
    await chrome.storage.sync.set({ mailId: document.querySelector('#mail-id').value }, (res) => {
        console.log("Mail-id updated");
    });
    await setMail();
}

async function getFrequency() {
    await chrome.storage.sync.set({ frequency: parseInt(document.querySelector('#frequency').value) }, (res) => {
        console.log("Frequency updated");
    });
    await setFrequency();
}

mailIdBtn.addEventListener('click', () => getMail());
frequencyBtn.addEventListener('click', () => getFrequency());

(async () => {
    await fillTable();
    await setMail();
    await setFrequency();
})()