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
			
			//Start the wobble.
			if(action === "start") {
				
			} else {
				`
			//End the wobble.
			}

		});

	};

	$.fn.wobbly.defaultOptions = {
		borderColor : "white",
		backgroundColor : "black",
		textColor : "green",
		callback : function() {},
		wobbleTime : 100	//Time in milliseconds inbetween wobble starts.
	};

	/* Private Functions */

	function start_wobble($element) {
		//Add x to screen.
		//Add callback to item.
		//start the rumble
		$element.trigger('startRumble');
	}

	function stop_wobble($element) {
		//Remove x from screen.
		//unset callback?
		//end the rumble
		$element.trigger('stopRumble');
	}




})(jQuery);