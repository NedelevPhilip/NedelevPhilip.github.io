$('.drop-down-wrap').mouseover(function () {
    $(this).find('.drop-down__container').css({'opacity' : '1', 'pointer-events' : 'all'});
});
$('.drop-down-wrap').mouseout(function () {
    $(this).find('.drop-down__container').css({'opacity' : '0', 'pointer-events' : 'none'});
});