(function() {
  chrome.runtime.onMessage.addListener(function(message) {
console.log('contents.js:'+message.type);
    //var len;
    if (message.type === 'setImage') {
      var imageTagClass = "dclchecker_img";
      var imagePath = message.imagePath;
      var imageParentTag = message.imageParentTag;
      $('img[class="'+imageTagClass+'"]').remove();
      $(imageParentTag).each(function(){
        $(this).prepend('<img src="'+imagePath+'" class="'+imageTagClass+'"/>');
        $('img[class="'+imageTagClass+'"]').click(function(e){
          opacity = $('img[class="'+imageTagClass+'"]').css('opacity');
          opacity = (0 < opacity) ? 0 : 0.5;
          $('img[class="'+imageTagClass+'"]').css({'opacity': opacity});
          //$('img[class="'+imageTagClass+'"]').toggle();
        });
        /*$('#btnImage').mouseenter(function(e){
          $('img[class="'+imageTagClass+'"]').css({'opacity':'0'});
        });
        $('#btnImage').mouseleave(function(e){
          $('img[class="'+imageTagClass+'"]').css({'opacity':'0.5'});
        });*/
        return false;
      });
      //$(imageParentTag).prepend('<img src="'+imagePath+'" class="'+imageTagClass+'"/>');
    /*
      len = document.querySelectorAll('.lc-broken-link').length;
      len = len || '';
      return chrome.runtime.sendMessage({
        type: 'setBadgeText',
        value: len.toString()
      });
      */
    }
  });

}).call(this);
