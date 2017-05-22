(function() {
	var container = document.querySelector( 'div.bodyContainer' ),
	triggerBttn1 = document.getElementById( 'trigger-overlay1' ),
	triggerBttn2 = document.getElementById( 'trigger-overlay2' ),
	triggerBttn3 = document.getElementById( 'trigger-overlay3' ),
	overlay1 = document.querySelector( 'div.overlay1' ),
	overlay2 = document.querySelector( 'div.overlay2' ),
	overlay3 = document.querySelector( 'div.overlay3' ),
	closeBttn1 = overlay1.querySelector( 'button.overlay-close' ),
	closeBttn2 = overlay2.querySelector( 'button.overlay-close' ),
	closeBttn3 = overlay3.querySelector( 'button.overlay-close' );
	transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'msTransition': 'MSTransitionEnd',
		'transition': 'transitionend'
	},
	transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
	support = { transitions : Modernizr.csstransitions };

	var overlay1Open = false;
	var overlay2Open = false;
	var overlay3Open = false;


	function toggleOverlayClose() {
		
		if(overlay1Open){
			classie.remove( overlay1, 'open' );
			classie.remove( container, 'overlay-open' );
			classie.add( overlay1, 'close' );
			overlay1Open = false;
		} else if(overlay2Open){
			classie.remove( overlay2, 'open' );
			classie.remove( container, 'overlay-open' );
			classie.add( overlay2, 'close' );
			overlay2Open = false;
		} else if(overlay3Open){
			classie.remove( overlay3, 'open' );
			classie.remove( container, 'overlay-open' );
			classie.add( overlay3, 'close' );
			overlay3Open = false;
		}
		
	}


	function toggleOverlayOpen() {
		
		if(overlay1Open){
			classie.add( overlay1, 'open' );
		} else if(overlay2Open){
			classie.add( overlay2, 'open' );
		} else if(overlay3Open){
			classie.add( overlay3, 'open' );
		}
		classie.add( container, 'overlay-open' );
		
	}

	
	triggerBttn1.onclick = function(event) {
		overlay1Open = true;
		toggleOverlayOpen();
	}
	triggerBttn2.onclick = function(event) {
		overlay2Open = true;
		toggleOverlayOpen();
	}
	triggerBttn3.onclick = function(event) {
		overlay3Open = true;
		toggleOverlayOpen();
	}
	
	closeBttn1.addEventListener( 'click', toggleOverlayClose );
	closeBttn2.addEventListener( 'click', toggleOverlayClose );
	closeBttn3.addEventListener( 'click', toggleOverlayClose );
	
})();