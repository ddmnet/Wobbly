# Wobbly - A jQuery plugin for iOS styly wobbly element deletion.

The Wobbly jQuery plugin makes it easy to have iOS stile wobbly (jiggly) icons for your delete actions.  To use Wobbly, all you need is a Webkit browser (Chrome, Safari).

### How to use Wobbly

### Include Wobbly in the header (or footer).

```html
<script type='text/javascript' src='wobbly.js'></script>
```

### Attach to elements.
```js
$("div").wobbly();  //Uses the default options.

$("div").wobbly("start", {	//With overidden options
	size : .50,
	position: "left",
	callback : function() {
		alert("In callback after item is removed from the DOM.");
	}
});

$("div").wobbly("stop");  //Removes stops the wobble.
```

### Available Options and their defaults
```js
borderColor : "black"
backgroundColor : "-webkit-linear-gradient(top, #e20000 0%,#b70000 100%)"
textColor : "white"
size : 1
position : "left"  #or "right".
callback : function() {}
```