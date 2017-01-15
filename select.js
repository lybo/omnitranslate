const service = browser.storage.local;
const LOCAL_STORAGE_KEY = 'omnitranslate';

function getData() {
    return new Promise((resolve, reject) => {

        try {
            let data = null;
            service.get()
                .then(resolve)
                .catch(reject);
        } catch(error) {
            reject(error);
        }

    });
}

function setData(newData) {
    return new Promise((resolve, reject) => {
        try {
            service.set(newData);
            resolve(newData);
        } catch(error) {
            reject(error);
        }
    });
}




function translate(from, to, text, cb) {
    const onComplete = res => {
        // console.log('response', res);
        // const translation = translationResult(res, () => {
        //     console.log(`[gtranslate] parse error with ${url}`)
        // })
        return cb(res)
    }
    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                // console.log(xmlHttp);
                callback(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }
    // Far below what google's cutoff is to decide
    // to use get or post, but post works anyway.
    if (text.length < 200) {
        const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20161230T002122Z.dd291852ae5a1057.e7b90ce2d93f2ebf6c7f027a855ab78287aa633d&text=${text}&lang=${from}-${to}`;
        httpGetAsync(url, onComplete)
            // httpGetAsync(apiUrl(from, to, text, true), onComplete)
    }
}

/*
   copy the selected text to clipboard
   */
function copySelection(e) {
    var selectedText = window.getSelection().toString().trim();
    var langs = ['en', 'el'];
    var newVocabulary = {
        url: location.href,
        id: location.href + '-' + langs[0]  + '-' + langs[1] + new Date().getTime(),
        langs: langs,
        title: document.title,
        words: [],
    };

    if (selectedText) {
        getData()
            .then(function(res) {
                var data = res[0];
                if (!data || !data.vocabularyList) {
                    console.log('OXI', data);
                    data = {
                        vocabularyList: [],
                    };
                    data.vocabularyList.push(newVocabulary);
                }

                console.log('data', data);
                var vocabulary = data.vocabularyList.find(function (x) {
                    return x.url === location.href;
                });

                if (!vocabulary) {
                    data.vocabularyList.push(newVocabulary);
                }


                // document.execCommand('Copy');
                translate(langs[0], langs[1], selectedText, function(res) {
                    var response = JSON.parse(res);
                    // console.log('tran:', response);
                    if (response.code === 200) {
                        vocabulary = data.vocabularyList.find(function (x) {
                            console.log(x.url, location.href);
                            return x.url === location.href;
                        });
                        var exists = vocabulary.words.find(function (x) {
                            return x.translation[0] === selectedText;
                        });
                        var words = [selectedText, response.text[0]];
                        if (!exists) {
                            vocabulary.words.push({
                                selectedText: selectedText,
                                translation: words,
                            });
                            vocabulary.title = document.title;
                            setData(data);
                        }
                    }
                });
            });
    }
}

getData().then((data) => console.log(data));

document.addEventListener('mouseup', copySelection);
