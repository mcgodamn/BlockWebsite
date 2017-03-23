document.getElementById("herebutton").addEventListener("click", function(){
    alert("騙你的咧～快用功唸書！")
});

document.getElementById("herebutton2").addEventListener("click", function(){
    url = chrome.extension.getBackgroundPage().blockurl;
    chrome.extension.getBackgroundPage().pass = true;
    chrome.tabs.update({url: url});
});