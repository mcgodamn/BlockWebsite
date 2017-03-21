var blockway,blockkey;

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
	var keywords = blockkey.split(/[\s,]+/g);
	for (keyword in keywords) {
		//alert(keywords[keyword]);
		console.log(keywords[keyword] + " " + blockway);
		if((details.url.indexOf(keywords[keyword]) != -1))
		{
			if (blockway == 'hard') return {cancel: true};
			else
			{
				return {cancel: false};
			}
			break;
		}
	}
	return {cancel: false};
  },
  {urls: ["*://*/*"]},
  ["blocking"]
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