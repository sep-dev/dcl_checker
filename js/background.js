(function(){
  chrome.runtime.onMessage.addListener(function(message){
    if (message.type === 'setImage'){
      chrome.tabs.query({active: true}, function(tabs){
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {
          type: 'setImage',
          imagePath : message.imagePath,
          imageParentTag : message.imageParentTag
        });
      });
    }
  });
  /*
  chrome.tabs.onActivated.addListener(function(activeInfo){
    return chrome.tabs.sendMessage(activeInfo.tabId, {
      type: 'onActivated'
    });
  });

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
    if (changeInfo.status === 'complete'){
      return chrome.tabs.sendMessage(tabId, {
        type: 'onActivated'
      });
    }
  });
  */
}).call(this);
