Parallax = function(){}

Parallax.prototype = {
	parallaxElements: [],
	//
	//	Initiate
	//
	init: function() {
		var p = this
		parallaxElements = [] // reset
		this.sceneSetup()
		//
		//	Get all the parallax enabled objects
		//
		var allElements = document.getElementsByTagName("*");
		for (var i=0; i < allElements.length; i++) {
			var obj = allElements[i]
			if (obj.dataset.parallax) {
				p.parallaxElements.push(obj)
				p.magic(obj)
			}
		}
		//
		//	Set the scroll listener
		//
		window.addEventListener("scroll", function() {
			var length = p.parallaxElements.length
			for (var i=0; i < length; i++) {
				var obj = p.parallaxElements[i]
				p.magic(obj)
			}
		});
	},

	//
	//	Set the scene
	//
	sceneSetup: function() {
		console.log("Set the scene");
		var allScenes = document.getElementsByClassName("scene");
		for (var i=0; i < allScenes.length; i++) {
			var scene = allScenes[i]
			scene.style.height = "100vh"
			scene.style.width = "100vw"
		}
	},

	//
	//	Get the magic started
	//
	magic: function(obj) {
		var p = this;
		obj.style.transform = "translateZ(0) " // Attempt at enabling hardware accelleration 

		var parent = obj.parentElement
		var relativeLocation = -parent.getBoundingClientRect().top
		
		var tx = 0
		var ty = 0
		var tz = 0

		//
		// X path calculation
		//
		if (obj.dataset.parallaxStartX && obj.dataset.parallaxEndX) {
			var startX = obj.dataset.parallaxStartX
			var endX   = obj.dataset.parallaxEndX
			var value = p.modulate(relativeLocation, [0, parent.clientHeight], [p.convertPosition(startX, parent.clientWidth), p.convertPosition(endX, parent.clientWidth)], p.getLimiter(obj))

			if (obj.dataset.parallaxMidX) {
				value -= p.convertMidpoint(obj.dataset.parallaxMidX, obj.clientWidth)
			}

			tx = value
		} else {
			console.log("Must set a start and stop X path")
		}

		//
		// Y path calculation
		//
		if (obj.dataset.parallaxStartY && obj.dataset.parallaxEndY) {
			var startY = obj.dataset.parallaxStartY
			var endY   = obj.dataset.parallaxEndY
			var value = p.modulate(relativeLocation, [0, parent.clientHeight], [p.convertPosition(startY, parent.clientHeight), p.convertPosition(endY, parent.clientHeight)], p.getLimiter(obj))

			if (obj.dataset.parallaxMidY) {
				value -= p.convertMidpoint(obj.dataset.parallaxMidY, obj.clientHeight)
			}

			ty = value
		} else {
			console.log("Must set a start and stop Y path")
		}

		//
		//	Scale calculation
		//	TODO: This doesn't work currently :\
		//
		if (obj.dataset.parallaxScaleStart && obj.dataset.parallaxScaleEnd) {
			var startS = obj.dataset.parallaxScaleStart
			var endS   = obj.dataset.parallaxScaleEnd
			var value = p.modulate(relativeLocation, [0, parent.clientHeight], [startS, endS], true) // TODO: Fix this because for some reason it's broken...
			obj.style.transform += "scale("+value+") "
		}

		//
		// TODO: Rotation calculation
		//  

		//
		//	Put it all together
		//
		obj.style.transform = p.configureTransforms(tx, ty, tz)
	},
	//
	//	Utilities
	//
	modulate: function(value, rangeA, rangeB, limit) {
		var fromLow = rangeA[0]
		var fromHigh = rangeA[1]
		var toLow = rangeB[0]
		var toHigh = rangeB[1]
		var result = toLow + (((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow))
		if (limit == true) {
			if (toLow < toHigh) {
				if (result < toLow) { return toLow; }
				if (result > toHigh) { return toHigh; }
			} else {
				if (result > toLow) { return toLow; }
				if (result < toHigh) { return toHigh; }
			}
		}
		return result
	},
	convertPosition: function(input, max) {
		return (input*max)
	},
	convertMidpoint: function(midpoint, size) {
		return midpoint*size
	},
	getLimiter: function (obj) {
		return obj.dataset.parallaxLimit == "true" ? true : false
	},
	configureTransforms: function(tx, ty, tz) {
		var translate3d = "translate3d("+tx+"px, "+ty+"px, "+tz+"px)"
		return translate3d
	},
}

Element.prototype.parallax = function(properties) {

	d = this.dataset;

	d.parallax			= "true";
	d.parallaxStartX	= properties.startX 	|| d.parallaxStartX 	|| 0;
	d.parallaxEndX 		= properties.endX 		|| d.parallaxEndX   	|| 0;
	d.parallaxStartY	= properties.startY 	|| d.parallaxStartY		|| 0;
	d.parallaxEndY 		= properties.endY 		|| d.parallaxEndY		|| 0;
	d.parallaxLimit		= properties.limit  	|| d.parallaxLimit		|| false;
	d.parallaxMidX		= properties.midX		|| d.parallaxMidX		|| 0;
	d.parallaxMidY		= properties.midY		|| d.parallaxMidY		|| 0;
	d.parallaxRotation  = properties.rotation   || d.parallaxRotation	|| 0;
}