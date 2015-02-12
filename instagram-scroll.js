/*
 * @author Ryan Williams / http://ryancw.com
 */

function InstagramScroll(opts) {

  this.opts = opts;
  if (!(this.opts.tag || this.opts.user || this.opts.clientID || this.opts.imageContainer)) {
    throw "Error: tag/user, clientID, and imageContainer must be passed to InstagramScroll.";
  }
  var tag = this.opts.tag;
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
  var user = this.opts.user;

  var url;
  var userID;

  function _createRequests() {
    if (user === undefined) {
        url = 'https://api.instagram.com/v1/tags/'
                + tag
                + '/media/recent?client_id='
                + clientID;

        _loadResults();
    } else {
      // need to look up user id using username in order to gather user posts
      $.ajax({
        dataType: 'jsonp',
        url: "https://api.instagram.com/v1/users/search?q="
              + user
              + "&client_id="
              + clientID,
        success: function(response){
          userID = response.data[0].id;
          url = 'https://api.instagram.com/v1/users/'
              + userID
              + '/media/recent/?client_id='
              + clientID;
        _loadResults();
        }
      });
    }
  }

  function _loadResults() {
    $.ajax({
      dataType: 'jsonp',
      url: url,
      success: function(response){
        return _processData(response);
      }
    });
  };

  function _getUserId(name) {
    $.ajax({
      dataType: 'jsonp',
      url: "https://api.instagram.com/v1/users/search?q="
            + name
            + "&client_id="
            + clientID,
      success: function(response){
        return response.data[0].id;
      }
    });
  }

  function _processData(response) {
    if(response != null){
      var ul = $('<ul/>');
      ul.attr({'class': tag});

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
          try {
            $('<div class="caption">'+obj.caption.text+'</div>').appendTo(li);
          } catch(e) {

          }
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

  _createRequests();
 }

