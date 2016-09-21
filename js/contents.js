(function() {
  chrome.runtime.onMessage.addListener(function(message){
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
      $('img[class="'+imageTagClass+'"]').remove();
    };
    messageFunctions['updateImagePositionX'] = function(){
      var imagePositionX = message.imagePositionX;
      $('img[class="'+imageTagClass+'"]').css({'left':imagePositionX+'px'});
    };
    messageFunctions['updateImagePositionY'] = function(){
      var imagePositionY = message.imagePositionY;
      $('img[class="'+imageTagClass+'"]').css({'top':imagePositionY+'px'});
    };
    messageFunctions['updateImageOpacity'] = function(){
      var imageOpacity = message.imageOpacity;
      $('img[class="'+imageTagClass+'"]').css({'opacity':imageOpacity});
    };

    messageFunctions[message.type]();
  });

}).call(this);
