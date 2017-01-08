function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        yandex: document.querySelector("#yandex").value
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#yandex").value = result.yandex || "";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get("yandex");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
