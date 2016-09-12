(function() {
  main = function() {
    var bgWindow = chrome.extension.getBackgroundPage();
    var tabUrl = encodeURIComponent( bgWindow.getUrl());
console.log(tabUrl);
    chrome.storage.local.get([tabUrl], function(items) {
console.log(items);
      $("#txtImagePath").val(items[tabUrl].imagePath);
      $("#txtImageParentTag").val(items[tabUrl].imageParentTag);
    });
  /*chrome.storage.local.get('options', function(data) {
      return $('#form input').each(function() {
        this.checked = data.options[this.name];
        return null;
      });
    });*/
    $('#btnImage').click(function(e){
console.log("Clicked #btnImage.");
      chrome.runtime.sendMessage({
        type: 'getConfig',
      });
      var imagePath = $("#txtImagePath").val();
      var imageParentTag = $("#txtImageParentTag").val();
console.log(imagePath);

      //var tabUrl = encodeURIComponent(tab.url);
      var imageInformations = {};
      imageInformations[tabUrl] = {
        'imagePath':imagePath,
        'imageParentTag':imageParentTag
      };
      chrome.storage.local.set(imageInformations, function(){});

      chrome.runtime.sendMessage({
        type: 'setImage',
        imagePath : imagePath,
        imageParentTag : imageParentTag
      });
    });
  };

  main();
}).call(this);
