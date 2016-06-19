# Welcome

Readme is WIP

---

# How positioning works

MagicParallax is a light weight parallax engine created with the purpose of building full screen web pages with simple parallax effects. Rather than positioning elements at a fixed coorinate, MagicParallax uses relative positioning to containers to position themselves. 

The position of elements are relative to the window's current scroll position, and the top and bottom of the element's parent. MagicParallax will set the position of the element to the *start* coordinate when the window matches the element's parent top, and position the element at the *end* coordinate when the window is at the bottom of the element's parent. 

![How it works](http://i.imgur.com/51F0SSH.png)

# Known Issues

* Performance is really poor currently
* Only works for translations
* Doesn't account for existing transforms on elementsm

# Initialize
```javascript
<script type="text/javascript">
	document.addEventListener('readystatechange', function() {
		if (document.readyState === "complete") {
			// Initiate parallax
			var p = new Parallax();
			p.init();
		}
	});
</script>
```

# Properties
Currently, MagicParallax supports the following properties
```
start-x
end-x
start-y
end-y
limit
mid-x
mid-y
```

# Start and Stop positioning
Setting the value to `"0.5"` will set the element to the center of it's container. `"0"` will position it on the absolute left and `"1"` will set it to the absolute right. 
```html
<div
    data-parallax         = "true"
    data-parallax-start-x = "0.5"
    data-parallax-start-y = "0.5"></div>
```

# Movement
To set a movement to an element, you must specify a `start` and `end` property to either coordinate
```html
<div
    data-parallax			= "true"
    data-parallax-start-x	= "0"
    data-parallax-start-y	= "0"
    data-parallax-end-x		="1"
    data-parallax-end-y		= "1"></div>
```
The above element will move from the top-left corner `(0,0)` to the bottom-right `(1,1)`