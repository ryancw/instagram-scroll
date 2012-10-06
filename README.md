instagram-scroll
================

Simple JavaScript file to load Instagram pictures of a certain tag and infinite scroll through them.

<h2><b>Setup</b></h2>

To use, download into website directory. Link to instagram-scroll.js in webpage source.
Make sure to link to jQuery too.

Edit the parameters at the top of the file:

* `tag_name` is the tag to load
* `client_id` is the client id given through the Instagram Developer API
* `div_to_add_pics` is the div id to add pictures to

Optional parameters:
* Set `include_caption` to `true` to add the caption in text after the picture
* Set `include_username` to `true` to add the username in text after the picture

Add the following code to webpage:
```
<script>
$(function(){
  return LoadResults();
})
</script>
```



