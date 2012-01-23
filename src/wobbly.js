/**
* Wobbly - A jQuery plugin for iOS style wobblin' deletes.
*
* You've wanted wobbling delete icons just like iOS for awhile. 
* Wobbly makes it easy.
*
* $("div").wobbly();  //Start wobbly with no callbacks and using default options.
* $("div").wobbly("start", { //Start wobbly, with the corner "X" at twice the size
*	size : 2,				 //and a callback.
*	callback : function() { alert('done'); }
* });
* $("div").wobbly("stop");  //Stop the wobble.
*
* The two requirements for Wobbly are the jRumble plugin, and a webkit browser.
*
* @author Jack Slingerland (jacks@teamddm.com)
* @author David Elliot (davide@teamddm.com)
* @link http://www.teamddm.com
* @version 1.0.0
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

		$element.bind("wobbly:delete", function() {
			$(this).fadeOut("slow", function() {
				$(this).wobbly("stop");
				$(this).hide();
				$(this).remove();
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