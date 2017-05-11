if ($(window).width() > 768) {
	$(".content-wrap").height('auto').equalHeights();
}

$(".progress-info").height('auto').equalHeights();



var windowHeight;
var windowWidth;

//обновлять разрешение екрана и ребилдить скрипт
window.onresize = function(event) {
	windowHeight = window.innerHeight;
	windowWidth = window.innerWidth;
};

	

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
			text.style.transform = "scale(0, 0)";
			setTimeout(function() { decreaseItem(elem, text) }, 300);
			opened = false;
		} else {
			increaseItem(elem, text);
			setTimeout(function() { showText(elem, text) }, 300);
			opened = true;
		}
	}

//-ms-transform: scale(2, 3); /* IE 9 */
//-webkit-transform: scale(2, 3); /* Safari */
//transform: scale(2, 3);

function increaseItem(elem, text){
	var elemElements = elem.getElementsByTagName('*');

	elemElements[0].style.display = "none";
	elemElements[0].style.transform = "scale(0, 0)";

	var coords = elem.getBoundingClientRect();
	elem.style.zIndex = "50";
	elem.style.position = "fixed";
	elem.style.left = coords.left + "px";
	elem.style.top = coords.top + "px";
	elem.style.transform = "scale(20, 20)";
}

function showText(elem, text){
	var textStyle = getComputedStyle(text, null)
	var textWidth = parseInt(textStyle.width.substr(0, textStyle.width.length - 2));
	var textHeight = parseInt(textStyle.height.substr(0, textStyle.height.length - 2));
	text.style.left = windowWidth / 2 - textWidth / 2 + "px";
	text.style.top = windowHeight / 2 - textHeight / 2 + "px";
	text.style.transform = "scale(1, 1)";
}

function decreaseItem(elem, text){
	var elemElements = elem.getElementsByTagName('*');

	elem.style.transform = "scale(1, 1)";
	elem.style.position = "";
	elem.style.zIndex = "";
	elemElements[0].style.display = "";
	elemElements[0].style.transform = "scale(1, 1)";
}

