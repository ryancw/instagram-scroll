instagram-scroll
================

Simple JavaScript file to load Instagram pictures of a certain tag or user and infinite scroll through them.

<h2><b>Use</b></h2>

Link to the instagram-scroll.js source file in your webpage.
JQuery is required.

```
<script>
InstgramScroll({tag: "cats", clientID: "token", imageContainer: "#pics"})
</script>
```

This will add a `ul` to any object on the page with an ID of 'pics' filled with 20 of the most recent Instagram images tagged with 'cats'.

<h2><b>Parameters</b></h2>

The three necessary parameters for using the function are:
* `tag`/`user  - search term or user name for the images
* `clientID` - given through the Instagram Developer API
* `imageContainer` - the DOM element where the `ul` containing the images will be inserted

Optional parameters include:
* `includeCaption` - add the caption in text after the picture. Default is `false`.
* `includeUsername` - add the username in text after the picture. Default is `false`.
* `scrollDistance` - distance in pixels from bottom of page scroll bar needs to be for new images to be loaded. Default is `350`.
* `imageSize` - size in pixels of the <img> loaded. Default is `200`.
* `imageQuality` - size of image loaded, can either be 'thumbnail', 'low_resolution', or 'standard_resolution'. Default is `standard_resolution`.

<h2><b>Demo</b></h2>
A sample of the script in action can be seen [here](http://www.ryancw.com/scroll-test.html).
