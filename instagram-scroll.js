/* Instagram tag grabber/infinite scroller
*   Just add "return LoadResults();" in a JS function on the 
*      webpage to get working
*	Written by Ryan Williams
*	Scroll thanks to Ali Ukani 
*	October 2012
* Last update: Oct 31, 2012
*/

/**********
*  Setup  *
***********/

// Tag to display
var tag_name = 'TAG_NAME';
// Your client id (given by instagram api)
var client_id = 'CLIENT_ID';
var thumb_dimension = 220;
var div_to_add_pics = '#img';
// Include Instagram caption with image?
var include_caption = false;
// Include Instagram username with image?
var include_username = false;

var url = 'https://api.instagram.com/v1/tags/'+tag_name+'/media/recent?client_id='+client_id;

/************************
*   Load and Process    *
*************************/

// Grab JSON data from Instagram
function LoadResults(){
		$.ajax({
			dataType:'jsonp',
			url:url,
			success:function(response){
				// Send data to be processed
				return ProcessData(response);
			}
		});
	};

// Process JSON data by creating a <ul> and adding each image
// as a <li>
function ProcessData(response){
	if(response != null){
		var ul = $('<ul/>');
		ul.attr({'class': tag_name});

		$(response.data).each(function(index,obj){
			if(index == 20)
				return response.pagination.next_url;
			var link = $('<a/>'), image = $('<img/>'), li = $('<li/>');
			image.attr({'src': obj.images.low_resolution.url, // options: low_resolution (300 x 300)
                                                        // standard_resolution (600 x 600)
                                                        // thumbnail (150 x 150)
        'width':thumb_dimension,'height': thumb_dimension});
			link.attr('href',obj.link);
			image.appendTo(link);
			link.appendTo(li);
			if(include_username){
				$('<div class="username">'+obj.caption.from.username+'</div>').appendTo(li);
			}
			if(include_caption){
				$('<div class="caption">'+obj.caption.text+'</div>').appendTo(li);
			}
			// Append the image (and text) to the list
			ul.append(li);
		});
		// Append the list to the given div
		$(div_to_add_pics).append(ul);
		// make url correlate to the next set of data
		url = response.pagination.next_url;

	}
};

/*********
 * Setup *
 *********/

var nextLink = false;
var loadingImages = false;

/******************
 *     Scroll	 *
 ******************/

/* Loads the next set of images and appends them to #div_to_add_pics */
function loadNext() {
  	// Prevent (redundantly) loading images if we're already loading them,
  	// and prevent us from entering an infinite loop
  	if (loadingImages || nextLink == url) {
  	  return false;
  	}else{
	// We are now loading images!
	loadingImages = true;

	LoadResults();
	nextLink = url;

    // Aaaaaand we're done loading.
    loadingImages = false;
}
  
}

/* When the user scrolls to the bottom of the page, load the next set
 * of images */
$(window).scroll(function() {
  var offset = 350; // Change for distance to load
  if($(window).scrollTop() + $(window).height() > $(document).height() - offset) {
    loadNext();
  }
});
