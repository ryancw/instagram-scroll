/*
 * @author Ryan Williams / http://ryancw.com
 */

function InstagramScroll(opts){

  this.opts = opts;
  if (!(this.opts.tagName || this.opts.clientID || this.opts.imageContainer)) {
    throw "Error: tagName, clientID, and imageContainer must be passed to InstagramScroll.";
  }
  this.tagName = this.opts.tagName;
  this.clientID = this.opts.clientID;
  this.imageContainer = this.opts.imageContainer;
  this.includeCaption = this.opts.includeCaption;
  this.includeUsername = this.opts.includeUsername;
  this.imageQuality = this.opts.imageQuality || 'standard_resolution';
  this.imageSize = this.opts.imageSize || 200;
   // options: low_resolution (300 x 300)
   // standard_resolution (600 x 600)
   // thumbnail (150 x 150)
  this.scrollDistance = this.opts.scrollDistance || 350;


  var url = 'https://api.instagram.com/v1/tags/'
            + this.tagName
            + '/media/recent?client_id='
            + this.clientID;

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
      ul.attr({'class': this.tagName});

      $(response.data).each(function(index,obj){
        if(index == 20)
          return response.pagination.next_url;

        var link = $('<a/>'), image = $('<img/>'), li = $('<li/>');
        image.attr({'src': obj.images[this.imageQuality].url,
          'width': this.imageSize, 'height': this.imageSize});
        link.attr('href',obj.link);
        image.appendTo(link);
        link.appendTo(li);
        if(this.includeUsername){
          $('<div class="username">'+obj.caption.from.username+'</div>').appendTo(li);
        }
        if(this.includeCaption){
          $('<div class="caption">'+obj.caption.text+'</div>').appendTo(li);
        }
        ul.append(li);
      });

      $(this.imageContainer).append(ul);
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
       $(document).height() - this.scrollDistance) {
      _loadNext();
    }
  });

  _loadResults();
 }

