instagram-scroll
================

Simple JavaScript file to load Instagram pictures of a certain tag and infinite scroll through them.

<h2><b>Use</b></h2>

Link to the instagram-scroll.js source file in your webpage.
JQuery is required.

Add the following code to webpage:
```
<script>
InstgramScroll({tag: "cats", clientID: "token", imageContainer: "#pics"})
</script>
```

This will add a `ul` to any object on the page with an ID of 'pics' filled with 20 of the most recent Instagram images tagged with 'cats'.

<h2><b>Parameters</b></h2>

The three necessary parameters for using the function are:
* `tag` - search term for the images loaded
* `clientID` - given through the Instagram Developer API
* `imageContainer` - the DOM element where the `ul` containing the images will be inserted

Optional parameters include:
* `includeCaption` - add the caption in text after the picture
* `includeUsername` - add the username in text after the picture
