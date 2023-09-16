const STORAGE_TOKEN = '22IHGHSO6RK69ZWRK7OJ83P8M7HBHL2ZBOQ17FRQ';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

//Save and load contacts in remoteStorage
async function saveContactsToStorage() { // Name muss dann angepasst werden
    let key = 'contacts';
    let value = Contacts;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}

async function getContactsFromStorage() {
    let key = 'contacts';
    let url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.data) {
            Contacts = JSON.parse(data.data.value);
        } else {
            throw new Error(`Could not find data with key "${key}".`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

//Save and load cards in remoteStorage
async function saveCardsToStorage() { // Name muss dann angepasst werden
    let key = 'cards';
    let value = cards;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}

async function getCardsFromStorage() { // Name muss dann angepasst werden
    let key = 'cards';
    let url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.data) {
            cards = JSON.parse(data.data.value);
        } else {
            throw new Error(`Could not find data with key "${key}".`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

//Save and load categories in remoteStorage
async function saveCategoriesToStorage() { // Name muss dann angepasst werden
    let key = 'categories';
    let value = categories;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}

async function getCategoriesFromStorage() { // Name muss dann angepasst werden
    let key = 'categories';
    let url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.data) {
            categories = JSON.parse(data.data.value);
        } else {
            throw new Error(`Could not find data with key "${key}".`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}