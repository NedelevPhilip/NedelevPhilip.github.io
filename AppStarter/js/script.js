var bord1 = $(".border1");
bord1.show();
var bord2 = $(".border2");
var bord3 = $(".border3");
var borders = [bord1, bord2, bord3];
var tid = setTimeout( moveBorders, 300);
function moveBorders() {
  	if (bord1.css('display') == 'block') {
	  	bord1.hide(300);
	  	bord2.show(100);
	  } else if (bord2.css('display') == 'block') {
	  	bord3.show(100);
	  	bord2.hide(200);
	  } else {
	  	bord1.show(100);
	  	bord3.hide(100);
	  }
  tid = setTimeout(moveBorders, 300);
}



var equalHeightContainers = $(".equal-height");
equalHeightContainers.each(function() {
	var maxHeight = 0;
	var elements = $( this ).find('.equal-item');
	elements.each(function() {
		if ($(this).height() > maxHeight) {
			maxHeight = $(this).height();
		}
	});
	elements.height(maxHeight);
});
