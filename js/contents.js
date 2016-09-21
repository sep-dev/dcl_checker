(function() {
  chrome.runtime.onMessage.addListener(function(message){
    console.log('contents.js:'+message.type);
    var imageTagClass = "dclchecker_img";

    var messageFunctions = {};

    messageFunctions['setImage'] = function(){
      var imagePath = message.imagePath;
      var imageParentTag = message.imageParentTag;
      var imagePositionX = message.imagePositionX;
      var imagePositionY = message.imagePositionY;
      var imageOpacity = message.imageOpacity;

      $('img[class="'+imageTagClass+'"]').remove();

      $(imageParentTag).each(function(){
        console.log('contents.js:'+imagePositionX);
        $(this).prepend('<img src="'+imagePath+'" class="'+imageTagClass+'"/>');
        $('img[class="'+imageTagClass+'"]').css({'left':imagePositionX+'px', 'top':imagePositionY+'px', 'opacity':imageOpacity});

        $('img[class="'+imageTagClass+'"]').click(function(e){
          opacity = $('img[class="'+imageTagClass+'"]').css('opacity');
          opacity = (0 < opacity) ? 0 : imageOpacity;
          $('img[class="'+imageTagClass+'"]').css({'opacity':opacity});
        });

        return false;
      });
    };
    messageFunctions['removeImage'] = function(){
      console.log('contents.js: removeImage : ');
      $('img[class="'+imageTagClass+'"]').remove();
    };
    messageFunctions['updateImagePositionX'] = function(){
      var imagePositionX = message.imagePositionX;
      console.log('contents.js: updateImagePositionX :'+imagePositionX);
      $('img[class="'+imageTagClass+'"]').css({'left':imagePositionX+'px'});
    };
    messageFunctions['updateImagePositionY'] = function(){
      var imagePositionY = message.imagePositionY;
      console.log('contents.js: updateImagePositionY :'+imagePositionY);
      $('img[class="'+imageTagClass+'"]').css({'top':imagePositionY+'px'});
    };
    messageFunctions['updateImageOpacity'] = function(){
      var imageOpacity = message.imageOpacity;
      console.log('contents.js: updateImageOpacity :'+imageOpacity);
      $('img[class="'+imageTagClass+'"]').css({'opacity':imageOpacity});
    };

    messageFunctions[message.type]();
  });

}).call(this);
