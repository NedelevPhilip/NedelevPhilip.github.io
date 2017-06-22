if ($(window).width() > 768) {
	$(".content-wrap h3").height('auto').equalHeights();
	$(".content-wrap").height('auto').equalHeights();
}
$(".progress-info").height('auto').equalHeights();


$('a[href=#top]').click(function(){
    $('html, body').animate({scrollTop:0}, 1000);
    document.getElementById("mce-EMAIL").focus();
});


window.onresize = function(){
	var w = $(".youtube").width();
	$(".youtube").height(w * 0.56);
}


