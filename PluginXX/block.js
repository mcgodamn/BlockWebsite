var blockway,blockkey;
var blockurl;
var pass = false;
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
	if (blockway == 'hard') {
		var keywords = blockkey.split(/[\s,]+/g);
		for (keyword in keywords) {
		if((details.url.indexOf(keywords[keyword]) != -1))
		{
			pass = false;
			return {cancel: true};
			break;
		}
	}
	}
	return {cancel: false};
  },
  {urls: ["*://*/*"]},
  ["blocking"]
);

chrome.webRequest.onCompleted.addListener(
  function(details) {
  	// compute a page hash etc, store it
  	pass = false;
  },
{
  urls: ['*://*/*'],
  types: ['main_frame']
}
);

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab)
{
	// alert(pass);
	if (blockway == 'soft') {
	if (pass) return;
		var keywords = blockkey.split(/[\s,]+/g);
		for (keyword in keywords)
		{
			if (changeInfo.url.indexOf(keywords[keyword]) != -1) {
				blockurl = changeInfo.url;
				chrome.tabs.update({url: chrome.extension.getURL("stop.html")});
				break;
			}
		}
	}
}
);

function resetWay()
{
	chrome.storage.sync.get('blockway',function(item){
		blockway = item.blockway;
		if (blockway == null) {
		chrome.storage.sync.set({
	          blockway: 'hard',
	        }, function(){});
		blockway = 'hard';
	}
	});
}
function resetKey()
{
	chrome.storage.sync.get('blockkey',function(item){
		blockkey = item.blockkey;
		if (blockkey == null) {
		chrome.storage.sync.set({
	          blockkey: 'facebook.com youtube.com',
	        }, function(){});
		blockkey = 'facebook.com youtube.com';
	}
	});
}
resetWay();
resetKey();