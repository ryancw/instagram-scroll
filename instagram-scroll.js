/*
 * @author Ryan Williams / http://ryancw.com
 */

function InstagramScroll(opts){

  this.opts = opts;
  if (!(this.opts.tagName || this.opts.clientID || this.opts.imageContainer)) {
    throw "Error: tagName, clientID, and imageContainer must be passed to InstagramScroll.";
  }
  var tagName = this.opts.tagName;
  var clientID = this.opts.clientID;
  var imageContainer = this.opts.imageContainer;
  var includeCaption = this.opts.includeCaption;
  var includeUsername = this.opts.includeUsername;
  var imageQuality = this.opts.imageQuality || 'standard_resolution';
  var imageSize = this.opts.imageSize || 200;
   // options: low_resolution (300 x 300)
   // standard_resolution (600 x 600)
   // thumbnail (150 x 150)
  var scrollDistance = this.opts.scrollDistance || 350;


  var url = 'https://api.instagram.com/v1/tags/'
            + tagName
            + '/media/recent?client_id='
            + clientID;

  function _loadResults(){
    $.ajax({
      dataType: 'jsonp',
      url: url,
      success: function(response){
        return _processData(response);
      }
    });
  };

  function _processData(response){
    if(response != null){
      var ul = $('<ul/>');
      ul.attr({'class': tagName});

      $(response.data).each(function(index,obj){
        if(index == 20)
          return response.pagination.next_url;

        var link = $('<a/>'), image = $('<img/>'), li = $('<li/>');
        var imgSrc = obj.images[imageQuality];
        imgSrc = imgSrc.url;
        image.attr({'src': imgSrc,
                    'width': imageSize,
                    'height': imageSize});
        link.attr('href',obj.link);
        image.appendTo(link);
        link.appendTo(li);
        if(includeUsername){
          $('<div class="username">'+obj.caption.from.username+'</div>').appendTo(li);
        }
        if(includeCaption){
          $('<div class="caption">'+obj.caption.text+'</div>').appendTo(li);
        }
        ul.append(li);
      });

      $(imageContainer).append(ul);
      url = response.pagination.next_url;
    }
  };

  var nextLink = false;
  var loadingImages = false;

  function _loadNext() {
    if (loadingImages || nextLink == url) {
      return false;
    }else{
      loadingImages = true;
      _loadResults();
      nextLink = url;
      loadingImages = false;
    }
  }

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >
       $(document).height() - scrollDistance) {
      _loadNext();
    }
  });

  _loadResults();
 }

