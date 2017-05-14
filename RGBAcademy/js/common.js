if ($(window).width() > 768) {
	$(".content-wrap").height('auto').equalHeights();
}
$(".progress-info").height('auto').equalHeights();








var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;


window.onresize = function(event){
	windowHeight = window.innerHeight;
	windowWidth = window.innerWidth;
}


var roundItem1 = document.getElementById('round-item-1');
var roundItem2 = document.getElementById('round-item-2');
var roundItem3 = document.getElementById('round-item-3');
var textItem1 = document.getElementById('item1');
var textItem2 = document.getElementById('item2');
var textItem3 = document.getElementById('item3');

roundItem1.onclick = function(event) {
	aninate(roundItem1, textItem1);
}
roundItem2.onclick = function(event) {
	aninate(roundItem2, textItem2);
}
roundItem3.onclick = function(event) {
	aninate(roundItem3, textItem3);
}
textItem1.onclick = function(event) {
	aninate(roundItem1, textItem1);
}
textItem2.onclick = function(event) {
	aninate(roundItem2, textItem2);
}
textItem3.onclick = function(event) {
	aninate(roundItem3, textItem3);
}


var opened = false;

function aninate(elem, text){
	var elemElements = elem.getElementsByTagName('*');
	
	if(opened){
		scale(text, 0);
		setTimeout(function() { decreaseItem(elem) }, 700);
		setTimeout(function() { scale(elemElements[0], 1) }, 1000);
		opened = false;
	} else {
		scale(elemElements[0], 0);
		setTimeout(function() { increaseItem(elem) }, 350);
		setTimeout(function() { showText(elem, text) }, 350);
		opened = true;
	}
}


function increaseItem(elem){
	var coords = elem.getBoundingClientRect();
	elem.style.zIndex = "50";
	elem.style.position = "fixed";
	elem.style.left = coords.left + "px";
	elem.style.top = coords.top + "px";
	scale(elem, 20);
}

function showText(elem, text){
	var textStyle = getComputedStyle(text, null)
	var textWidth = parseInt(textStyle.width.substr(0, textStyle.width.length - 2));
	var textHeight = parseInt(textStyle.height.substr(0, textStyle.height.length - 2));
	text.style.left = windowWidth / 2 - textWidth / 2 + "px";
	text.style.top = windowHeight / 2 - textHeight / 2 + "px";
	scale(text, 1);
}

function decreaseItem(elem){
	var elemElements = elem.getElementsByTagName('*');
	scale(elem, 1);
	elem.style.position = "relative";
	elem.style.left = "";
	elem.style.top = "";
	elem.style.zIndex = "30";
}


function scale(elem, s){
	elem.style.MsTransform = "scale(" + s + ", " + s + ")";
	elem.style.WebkitTransform = "scale(" + s + ", " + s + ")";
	elem.style.transform = "scale(" + s + ", " + s + ")";
}