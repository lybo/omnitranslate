document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('page-choice')) {
        return;
    }

    var fullURL = browser.runtime.getURL('options/index.html');
    browser.tabs.create({
        url: fullURL
    });

});
