var tabUrl = "";

(function(){
  main = function(){
    chrome.tabs.query({active: true}, function(tabs){
      tabUrl = encodeURIComponent(tabs[0].url);
      chrome.storage.local.get([tabUrl], function(items){
        $("#txtImagePath").val(items[tabUrl].imagePath);
        $("#txtImageParentTag").val(items[tabUrl].imageParentTag);
        $("#txtImagePositionX").val(items[tabUrl].imagePositionX);
        $("#txtImagePositionY").val(items[tabUrl].imagePositionY);
        $("#txtImageOpacity").val(items[tabUrl].imageOpacity);
      });
    });

    $('#btnImage').click(function(e){
      console.log("Clicked #btnImage.");
      var imagePath = $("#txtImagePath").val();
      var imageParentTag = $("#txtImageParentTag").val();
      var imagePositionX = $("#txtImagePositionX").val();
      var imagePositionY = $("#txtImagePositionY").val();
      var imageOpacity = $("#txtImageOpacity").val();

      var imageInformations = {};
      imageInformations[tabUrl] = {
        'imagePath':imagePath,
        'imageParentTag':imageParentTag,
        'imagePositionX':imagePositionX,
        'imagePositionY':imagePositionY,
        'imageOpacity':imageOpacity
      };

      chrome.storage.local.set(imageInformations, function(){});

      chrome.runtime.sendMessage({
        type:'setImage',
        imagePath:imagePath,
        imageParentTag:imageParentTag,
        imagePositionX:imagePositionX,
        imagePositionY:imagePositionY,
        imageOpacity:imageOpacity,
      });
    });

    $('#btnImageRemove').click(function(e){
      chrome.runtime.sendMessage({
        type:'removeImage',
      });
    });

    $('#txtImagePositionX').bind('keyup mouseup', function(e){
      console.log("keyup #txtImagePositionX.");
      var imagePositionX = $("#txtImagePositionX").val();
      chrome.storage.local.get([tabUrl], function(items){
        items[tabUrl].imagePositionX = imagePositionX;
        chrome.storage.local.set(items, function(){});
      });
      chrome.runtime.sendMessage({
        type:'updateImagePositionX',
        imagePositionX:imagePositionX,
      });
    });

    $('#txtImagePositionY').bind('keyup mouseup', function(e){
      console.log("Changed #txtImagePositionY.");
      var imagePositionY = $("#txtImagePositionY").val();
      chrome.storage.local.get([tabUrl], function(items){
        items[tabUrl].imagePositionY = imagePositionY;
        chrome.storage.local.set(items, function(){});
      });
      chrome.runtime.sendMessage({
        type:'updateImagePositionY',
        imagePositionY:imagePositionY,
      });
    });

    $('#txtImageOpacity').bind('keyup mouseup', function(e){
      console.log("Changed #txtImageOpacity.");
      var imageOpacity = $("#txtImageOpacity").val();
      chrome.storage.local.get([tabUrl], function(items){
        items[tabUrl].imageOpacity = imageOpacity;
        chrome.storage.local.set(items, function(){});
      });
      chrome.runtime.sendMessage({
        type:'updateImageOpacity',
        imageOpacity:imageOpacity,
      });
    });
  };

  main();
}).call(this);

function isNum(val){
  var pattern = /^[-]?([1-9]\d*|0)$/;
  return pattern.test(val);
}
