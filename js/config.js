var tabUrl = "";

(function(){
  main = function(){
    chrome.tabs.query({active: true}, function(tabs){
      tabUrl = encodeURIComponent(tabs[0].url);
      chrome.storage.local.get([tabUrl], function(items){
        $("#txtImagePath").val(items[tabUrl].imagePath);
        $("#txtImageParentTag").val(items[tabUrl].imageParentTag);
      });
    });

  /*chrome.storage.local.get('options', function(data){
      return $('#form input').each(function(){
        this.checked = data.options[this.name];
        return null;
      });
    });*/
    $('#btnImage').click(function(e){
console.log("Clicked #btnImage.");
      var imagePath = $("#txtImagePath").val();
      var imageParentTag = $("#txtImageParentTag").val();

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
