$(function() {


	//scroll UP
	$("body").append('<div class="top"><i class="fa fa-angle-double-up">');

	$(".top").click(function() {
		$("html, body").animate({scrollTop: 0}, "slow");
	});


	$('.carousel-brands').owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		responsive:{
			0:{
				items:1,
			},
			520:{
				items:1,
			},
			560:{
				items:2,
			},
			768:{
				items:2,
			},
			992:{
				items:3,
			},
			1200:{
				items:4,
			}
		}
	})

	$('.owl-carousel').owlCarousel({
		loop:true,
		margin:30,
		responsive:{
			0:{
				items:1,
			},
			520:{
				items:1,
			},
			560:{
				items:2,
			},
			768:{
				items:2,
			},
			992:{
				items:3,
			},
			1200:{
				items:4,
			}
		}
	})

	//function heightses(){
		$(".s-direct .item-vertical p").height('auto').equalHeights();
		$(".carousel-text h3").height('auto').equalHeights();
		$(".carousel-text p").height('auto').equalHeights();
		$(".testimonials-head").height('auto').equalHeights();
		$(".testimonials-desk").height('auto').equalHeights();
	/*};

	$(window).resize(function(){
		heightses();
	});*/





	/*
 * Replace all SVG images with inline SVG
 */
 jQuery('img.img-svg').each(function(){
 	var $img = jQuery(this);
 	var imgID = $img.attr('id');
 	var imgClass = $img.attr('class');
 	var imgURL = $img.attr('src');

 	jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
        	$svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
        	$svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        	$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

 });


 	//portfolio popup
 	$(".portfolio-item").each(function(e) {

 		var th = $(this);

 		th.attr("href", "#portfolio-img-" + e)
 		.find(".portfolio-popup")
 		.attr("id", "portfolio-img-" + e);
 	});
 	$(".portfolio-item").magnificPopup({
 		type: 'inline',
 		removalDelay: 300,
 		mainClass: 'my-mfp-zoom-in'

 	});



	//Magnific Popup
	$('.mfp-gallery').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false
		},
		gallery: {
			enabled: true
		} 
	});
	$('.mfp-certificate').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false
		},
		gallery: {
			enabled: true
		} 
	});

	//popup forms
	$('a[href="#callback"]').magnificPopup({
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
		type: 'inline',
	});

	$('a[href="#callback"]').click(function() {
		var dataForm = $(this).data("form");
		var dataText = $(this).data("text");
		$(".form-callback h4").text(dataText);
		$(".form-callback [name=admin-data]").val(dataForm);
	});



	$(".mouse-icon").click(function(){
		$("html, body").animate({
			scrollTop : $(".s-adv").offset().top
		}, 800);
	});



	$(".s-adv").waypoint(function(direction) {

		$({blurRadius: 5}).animate({blurRadius: 0}, {
			duration: 1000,
			easing: 'swing',
			step: function() {
				$(".s-adv-item h3 span").css({
					"-webkit-filter": "blur("+this.blurRadius+"px)",
					"filter": "blur("+this.blurRadius+"px)"
				});
			}
		});
		var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
		$(".s-adv-item h3 span").each(function() {
			var tcount = $(this).data("count");
			$(this).animateNumber({ number: tcount,
				easing: 'easeInQuad',
				"font-size": "40px",
				numberStep: comma_separator_number_step},
				1000);
		});

		this.destroy()

	}, {
		offset: "80%"
	});



	//Toggle menu
	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(this).parent().next().next().find(".main-mnu").slideToggle();
		return false;
	});

	$(".main-foot .toggle-mnu").click(function() {
		$("html, body").animate({scrollTop: $(document).height() + 200}, "slow");
		return false;
	});

















	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });



	$(window).scroll(function() {
		if($(this).scrollTop() > $(this).height()){
			$(".top").addClass("active");
		} else {
			$(".top").removeClass("active");
		}
	});





});



