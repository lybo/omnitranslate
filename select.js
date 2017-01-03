function translationResult(str, onError) {
	let newstr = '['
	let insideQuote = false
	str = str.replace(/\\(?=[^u])/g, '\\')
	// Fix the Google Translate JSON
	// start at 1, take into acount opening brace
	for (let i = 1, q = 0, len = str.length, prev; i < len; i++) {
		prev = str[i - 1]
		if (str[i] === '"' && prev !== '\\') {
			q++
		}
		insideQuote = q % 2 !== 0
		if (!insideQuote && str[i] === ',' && (prev === ',' || prev === '[')) {
			newstr += '""'
		}
		newstr += str[i]
	}
	let result = [null, null, null]
	let parseError = false
	try {
		result = JSON.parse(newstr)
	} catch (e) {
		if (onError) {
			onError(newstr)
		}
		parseError = true
	}
	const translation = parseError ? LABEL_TRANSLATE_ERROR : (result[0] && result[0].map(chunk=>chunk[0]).join(' ')) || null
	const alternatives = (result[1] && result[1].map(chunk=>(chunk[0] + ':\n ' + chunk[2].map(chunk=>(chunk[0] + ': ' + Array((10 - chunk[0].length) > 0 ? 10 - chunk[0].length : 0).join(' ') + '\t' + chunk[1].join(', '))).join('\n '))).join('\n\n')) || null
	const dict = (result[12] && result[12].map(chunk=>(chunk[0] + ' \n ' + chunk[1].map(chunky=>(chunky[0] + ' \n  "' + chunky[2] + '"')).join(' \n '))).join('\n\n')) || null
	const syno = (result[11] && result[11].map(chunk=>(chunk[0] + ' \n ' + chunk[1].map(chunky=>(chunky[0].join(', '))).join(' \n '))).join('\n\n')) || null
	return {
		detectedSource: result[2],
		translation: translation ? translation.trim() : null,
		alternatives: alternatives ? alternatives.trim() : null,
		dictionary: dict ? dict.trim() : null,
		synonyms: syno ? syno.trim() : null,
	}
}
// Some sort of token google uses
function generateToken(a) {
	// at first sight seems to be a constant, but couldn't easily find how it was
	// generated. May change.
	const b = 406394
	// text to utf8 codepoints
	let d = []
	for (let e = 0, f = 0; f < a.length; f++) {
		let g = a.charCodeAt(f)
		0x80 > g ? d[e++] = g : (0x800 > g ? d[e++] = g >> 6 | 192 : (55296 === (g & 64512) && f + 1 < a.length && 56320 === (a.charCodeAt(f + 1) & 64512) ? (g = 65536 + ((g & 1023) << 10) + (a.charCodeAt(++f) & 1023),
			d[e++] = g >> 18 | 240,
			d[e++] = g >> 12 & 0x3f | 0x80) : d[e++] = g >> 12 | 0xe0,
			d[e++] = g >> 6 & 0x3f | 0x80),
			d[e++] = g & 0x3f | 0x80)
	}
	a = b
	for (let e = 0; e < d.length; e++) {
		a += d[e],
			a = tokenhelper(a, '+-a^+6')
	}
	a = tokenhelper(a, '+-3^+b+-f')
	a ^= 2641390264
	0 > a && (a = (a & 2147483647) + 2147483648)
	a %= 1E6
	return ( a.toString() + '.' + (a ^ b))
}
function tokenhelper(a, b) {
	for (let c = 0; c < b.length - 2; c += 3) {
		let d = b.charAt(c + 2)
		d = d >= 'a' ? d.charCodeAt(0) - 87 : Number(d)
		d = b.charAt(c + 1) === '+' ? a >>> d : a << d
		a = b.charAt(c) === '+' ? a + d & 4294967295 : a ^ d
	}
	return a
}
function apiUrl(from, to, text, includeText) {
	const protocol = 'https://'
	const host = 'translate.google.com'
	const token = generateToken(text)
	let path = (`/translate_a/single?client=t&ie=UTF-8&oe=UTF-8` + `&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&tk=` + token + `&sl=${from}&tl=${to}&hl=${to}`)
	if (typeof text !== 'undefined' && includeText) {
		path += `&q=${encodeURIComponent(text)}`
	}
	return `${protocol}${host}${path}`
}
function pageUrl(from, to, text) {
	const protocol = 'https://'
	const host = 'translate.google.com'
	return `${protocol}${host}/#${from}/${to}/${encodeURIComponent(text)}`
}
function wholePageUrl(from, to, url) {
	const base = 'https://translate.google.com'
	return `${base}/translate?sl=${from}&hl=${to}&u=${encodeURIComponent(url)}`
}
function translate(from, to, text, cb) {
	const url = apiUrl(from, to, text)
	const onComplete = res => {
    console.log('response', res);
		// const translation = translationResult(res, () => {
		// 	console.log(`[gtranslate] parse error with ${url}`)
		// })
		return cb(res)
	}
	function httpGetAsync(theUrl, callback) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4) {
        console.log(xmlHttp);
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

	if (selectedText) {
		// document.execCommand('Copy');
		translate('en', 'el', selectedText, function(res) {
			console.log('tran:', res);
		});
	}
}

/*
                    Add copySelection() as a listener to mouseup events.
                    */
document.addEventListener('mouseup', copySelection);