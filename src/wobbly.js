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

	$.fn.wobbly.defaultOptions = {
		borderColor : "red",
		backgroundColor : "black",
		textColor : "green",
		callback : function() {},
		wobbleTime : 100	//Time in milliseconds inbetween wobble starts.
	};

	/* Private Functions */

	function add_anchor($element, options) {
		var $a = $("<a>X</a>");
		
		//Add css the new element.
		$a.css({
			'border' : options.borderColor,
			'backgroundColor' : options.backgroundColor,
			'color' : options.textColor
		});

		//Add the delete trigger to the element.
		$a.click(function() {
			$(this).parent().trigger("wobbly:delete");
		});

		$a.appendTo($element);

		return $element;
	}

	function start_wobble($element, options) {
		$element = add_anchor($element, options);
		$element.bind("wobbly:delete", function() {
			$(this).fadeOut("slow", function() {
				console.log(options);
				$(this).wobbly("stop");
				$(this).hide();
			});
		});

		//start the rumble
		$element.jrumble({
			speed: 65
		});
		$element.trigger('startRumble');
	}

	function stop_wobble($element) {
		//Remove x from screen.
		//unset callback?
		//end the rumble
		$element.trigger('stopRumble');
	}




})(jQuery);