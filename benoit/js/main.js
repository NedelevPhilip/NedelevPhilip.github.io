
var validForm = false;


//next step click
$('.js-step .js-next-step').on('click', function () {
    var $curStep = $(this).closest('.js-step'),
        $nextStep = $curStep.next('.js-step');

    var validation = $(this).attr("data-validation");
    //validation
    if (validation) {
        //name validation
        if (validation === 'name') {
            var input = $('#username');
            var is_name = input.val();
            if (is_name) {
                input.removeClass("invalid").addClass("valid");
                $(".name-error").removeClass("error_show").addClass("error");
                validForm = false;
                goToStep($nextStep, $curStep);
            } else {
                input.removeClass("valid").addClass("invalid");
                $(".name-error").removeClass("error").addClass("error_show");
                validForm = true;
            }
        }
    } else {
        goToStep($nextStep, $curStep);
    }
});


function phoneValidation() {
    var input = $(this);
    var value = $('#contact_phone').val();

    var regex = new RegExp('^((06)|(07))[0-9]{0,20}$', 'i');
    if (value.match(regex)) {
        input.removeClass("invalid").addClass("valid");
        $(".tel-error").removeClass("error_show").addClass("error");
        validForm = true;
    } else {
        validForm = false;
        input.removeClass("valid").addClass("invalid");
        $(".tel-error").removeClass("error").addClass("error_show");
        $(".tel-error").html("Merci de renseigner votre numéro de portable commençant par 06 ou 07");

    }
};


$("#regform").submit(function( event ) {
    event.preventDefault();

    if(validForm){
        var f = $("[name=name]").val(),
            e = $("[name=age]").val(),
            a = $("[name=phone]").val();
        $.ajax({
            type: "POST",
            url: "/x/mail.php",
            data: {age: e, phone: a, firstname: f},
            success: function (f) {
                console.log("OK");
                f.status, $(location).attr("href", f.data), console.log(f);
            },
            error: function () {
            },
        });
    }
});















function goToStep($eleShown, $eleHidden) {
    //before go to next step
    if (typeof handleBeforeGoNextStep == 'function') {
        handleBeforeGoNextStep($eleShown, $eleHidden);
    }

    /* class 'step-hidden' use for hide step and make autofill form work */
    var hiddenClass = 'hidden';
    if ($eleShown.hasClass('step-hidden')) {
        hiddenClass = 'step-hidden';
    }
    $eleShown.removeClass('hidden step-hidden');
    $eleHidden.addClass(hiddenClass);
    //focus to the first input or select
    //$eleShown.find('input').eq(0).focus();

    //unfocus input that entering
    $eleHidden.find('input').blur();

    //active progress bar
    activeProgressBar($eleShown);

    //auto go to next step
    countdownToNextStep($eleShown);

    //after go to next step
    if (typeof handleAfterGoNextStep == 'function') {
        handleAfterGoNextStep($eleShown, $eleHidden);
    }
}

function countdownToNextStep($curStep) {
    var timeout = $curStep.attr('data-timeout');

    if ($curStep.hasClass('js-animation-step') && typeof timeout != 'undefined') {
        //count down to next step
        setTimeout(function () {
            var $nextStep = $curStep.next('.js-step');
            goToStep($nextStep, $curStep);
        }, timeout);
    }
}

function activeProgressBar($eleShown) {
    var $progressBar = $eleShown.closest('.registration-form-builder').find('.js-progress-bar');

    if ($progressBar.length > 0) {
        var indexCurStep = $eleShown.parent().find('.js-step').index($eleShown);
        $progressBar.find('li').removeClass('active').eq(indexCurStep).addClass('active visited');
    }
}


function handleAfterGoNextStep($eleShow, $eleHide) {
    var $progressBar = $('.js-progress-bar'),
        indexCurStep = $eleShow.parent().find('.js-step').index($eleShow);
    // change number step on headline
    if ($numStep.length > 0) {
        changeNumStep(totalStep - indexCurStep);
    }
    $progressBar.find('li').removeClass('active').eq(indexCurStep).addClass('active visited');
}

function changeNumStep(num) {
    $numStep.html(num);
}
