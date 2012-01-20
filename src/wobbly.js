/*
function lerp( pta, ptb, t) {
    return {x:pta.x*(1-t)+ptb.x*t, y:pta.y*(1-t)+ptb.y*t};
}
*/


(function($) {
	
	$.fn.wobbly = function() {
		var customOptions = {},
			action = "start";

		//Determine what action we should be taking
		if(typeof arguments[0] === "string") {
			action = arguments[0];
			customOptions = arguments[1];
		} else {
			action = "start";
			customOptions = arguments[0];
		}

		var options = $.extend({}, $.fn.wobbly.defaultOptions, customOptions);

		return this.each(function() {
			
			var $element = $(this);

			//Start the wobble.
			if(action === "start") {
				start_wobble($element, options);
			
			//End the wobble.
			} else {
				stop_wobble($element);
			}

		});

	};

	//Default options for the plugin
	$.fn.wobbly.defaultOptions = {
		borderColor : "black",
		backgroundColor : "red",
		textColor : "white",
		size : 1,
		callback : function() {}
	};

	/* Private Functions */

	function add_anchor($element, options) {
		var $span = $("<span>X</span>");
		var $a = $("<a></a>");
		
		//Add css the new anchor element.
		$a.css({
			'border-color' : options.borderColor,
			'background-color' : options.backgroundColor,
			'color' : options.textColor,
			'height' : (options.size * 25) + 'px',
			'-moz-border-radius' : (options.size * 12) + 'px',
			'-webkit-border-radius' : (options.size * 12) + 'px',
			'width' : (options.size * 25) + 'px',
			'display' : "block"
		});

		//Add css to span element
		$span.css({
			'font-size' : (options.size * 14)
		});

		//Add attribute to identify this element
		$a.addClass("isAnchor");

		//Add the delete trigger to the element.
		$a.click(function() {
			$(this).parent().trigger("wobbly:delete");
		});

		$span.appendTo($a);
		$a.appendTo($element);

		return $element;
	}

	function add_touch_and_hold($element) {
		 var t;

		var repeat = function () {
		    action();
		    t = setTimeout(repeat, start);
		    start = start / speedup;
		}

		btn.mousedown = function() {
		    repeat();
		}

		btn.mouseup = function () {
		    clearTimeout(t);
		}
	}

	function remove_anchor($element) {
		$element.children().each(function() {
			if($(this).hasClass("isAnchor")) {
				$(this).remove();
			}
		});
		return $element;
	}

	function start_wobble($element, options) {
		$element = add_anchor($element, options);
		$element = add_touch_and_hold($element);
		$element.bind("wobbly:delete", function() {
			$(this).fadeOut("slow", function() {
				$(this).wobbly("stop");
				$(this).hide();
				options.callback();
			});
		});

		//start the rumble
		$element.jrumble({
			speed: 58,
			x : 2,
			y : 3,
			rotation : 1
		});
		$element.trigger('startRumble');
	}

	function stop_wobble($element) {
		remove_anchor($element);
		$element.trigger('stopRumble');
	}




})(jQuery);