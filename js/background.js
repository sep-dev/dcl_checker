(function(){
  chrome.runtime.onMessage.addListener(function(message){
    console.log('background.js:'+message.type);
    chrome.tabs.query({active: true}, function(tabs){
      var tab = tabs[0];
      //todo:if else の羅列はカッコ悪いので、switchかmapに直す。
      if (message.type === 'setImage'){
        chrome.tabs.sendMessage(tab.id, {
          type:'setImage',
          imagePath : message.imagePath,
          imageParentTag : message.imageParentTag,
          imagePositionX : message.imagePositionX,
          imagePositionY : message.imagePositionY,
          imageOpacity : message.imageOpacity,
        });
      }else if (message.type === 'removeImage'){
        chrome.tabs.sendMessage(tab.id, {
          type:'removeImage',
        });
      }else if (message.type === 'updateImagePositionX'){
        chrome.tabs.sendMessage(tab.id, {
          type:'updateImagePositionX',
          imagePositionX : message.imagePositionX,
        });
      }else if (message.type === 'updateImagePositionY'){
        chrome.tabs.sendMessage(tab.id, {
          type:'updateImagePositionY',
          imagePositionY : message.imagePositionY,
        });
      }else if (message.type === 'updateImageOpacity'){
        chrome.tabs.sendMessage(tab.id, {
          type:'updateImageOpacity',
          imageOpacity : message.imageOpacity,
        });
      }
    });
  });

}).call(this);
