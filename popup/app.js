document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("page-choice")) {
    return;
  }

  var fullURL = browser.runtime.getURL("popup/options.html");
  browser.tabs.create({
    url: fullURL
  });

});
