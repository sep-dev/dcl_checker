(function() {
  chrome.runtime.onMessage.addListener(function(message) {
    if (message.type === 'setImage') {
      chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
console.log('background.js:'+tab.id);
/*
        var tabUrl = encodeURIComponent(tab.url);
        var imageInformations = {};
        imageInformations[tabUrl] = {
          'imagePath':message.imagePath,
          'imageParentTag':message.imageParentTag
        };
        chrome.storage.local.set(imageInformations, function(){});
*/
        chrome.tabs.sendMessage(tab.id, {
          type: 'setImage',
          imagePath : message.imagePath,
          imageParentTag : message.imageParentTag
        });
      });

      return chrome.browserAction.setBadgeText({
        text: message.imageParentTag
      });
    /*}else if(message.type === 'getConfig'){
      var tabUrl = encodeURIComponent(tab.url);
console.log('background.js:'+tabUrl);
      chrome.storage.local.get([tabUrl], function(items) {
        console.log(items);
      });*/
    }
  });

  chrome.tabs.onActivated.addListener(function(activeInfo) {
    return chrome.tabs.sendMessage(activeInfo.tabId, {
      type: 'onActivated'
    });
  });

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
      return chrome.tabs.sendMessage(tabId, {
        type: 'onActivated'
      });
    }
  });

}).call(this);

var getUrl = (function(){
  chrome.tabs.query({active: true}, function(tabs) {
    return tabs[0].url;
  });
});
