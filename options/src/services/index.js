const service = window.browser ? window.browser.storage.local : localStorage;
const LOCAL_STORAGE_KEY = 'omnitranslate';

export function getData() {
    return new Promise((resolve, reject) => {

        try {
            let data = null;
            if (window.browser) {
                service.get()
                    .then(resolve)
                    .catch(reject);
            } else {
                const data = JSON.parse(service.getItem(LOCAL_STORAGE_KEY));
                resolve(data || {});
            }

        } catch(error) {
            reject(error);
        }

    });
}

export function setData(newData) {
    return new Promise((resolve, reject) => {

        try {
            if (window.browser) {
                service.set(newData);
            } else {
                service.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
            }
            resolve(newData);
        } catch(error) {
            reject(error);
        }
    });
}

export function updateData(key, value) {
    return new Promise((resolve, reject) => {

        try {
            getData()
                .then(data => {
                    data[key] = value;
                    setData(data)
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        } catch(error) {
            reject(error);
        }
    });
}

window.getData = getData;
window.setData = setData;
window.updateData = updateData;
