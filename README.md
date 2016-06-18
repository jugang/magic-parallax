# Welcome

Readme coming soon

---

# How it works
MagicParallax is a light weight parallax engine created with the purpose of building full screen web pages with simple parallax effects. Rather than positioning elements at a fixed coorinate, MagicParallax uses relative positioning to containers to position themselves. 

# Initialize
```
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

# Positioning
Setting the value to `"0.5"` will set the element to the center of it's container. `"0"` will position it on the absolute left and `"1"` will set it to the absolute right. 
```
<div
    data-parallax         = "true"
    data-parallax-start-x = "0.5"
    data-parallax-start-y = "0.5"
></div>
```

# Movement
To set a movement to an element, you must specify a `start` and `end` property to either coordinate
```
<div
    data-parallax         = "true"
    data-parallax-start-x = "0"
    data-parallax-start-y = "0"
    data-parallax-end-x  ="1"
    data-parallax-end-y = "1"
></div>
```
The above element will move from the top-left corner `(0,0)` to the bottom-right `(1,1)`