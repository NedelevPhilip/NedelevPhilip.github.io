function changeThumb(index) {
    const step5 = jQuery("#step5");
    if (index < +step5.attr('thumbs-size') + 1) {
        jQuery("#thumb" + (index - 1)).hide();
        jQuery("#thumb" + index).show();
        setTimeout(() => {
            changeThumb(index + 1);
        }, 200);
    } else {
        jQuery('#step5WaitingText').hide();
        jQuery('#step5FoundText').show();
    }
}

function nextStep(step) {
    jQuery('#step' + (step - 1)).addClass("hidden");
    jQuery('#step' + step).removeClass("hidden");
    jQuery('#step' + step).addClass("visible");
    switch (step) {
        case 1:
            break;
        case 2:

            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            jQuery("#thumb0").show();
            changeThumb(1);
            break;
        case 6:

            break;
        case 7:
            break;
    }
}


var submitBtn = $('#registerButton');

var nameValid = false;
var ageValid = false;
var phoneValid = false;


$("#firstname").on("change paste keyup", function () {
    var e = $(this),
        a = e.val();

    if (a) {
        $('#firstnameBadge').removeClass('form_badge_wrong');
        $('#firstnameCheck').removeClass('form_badge_wrong');

        $('#firstnameBadge').addClass('form_badge_valid');
        $('#firstnameCheck').addClass('form_badge_valid');

        $('#firstnameCheck').find('i').addClass('fa-check');
        $('#firstnameCheck').find('i').removeClass('fa-times');

        $('#firstnameMessage').show();
        $('#firstnameMessageWrong').hide();

        nameValid = true;
    } else {
        $('#firstnameBadge').removeClass('form_badge_valid');
        $('#firstnameCheck').removeClass('form_badge_valid');

        $('#firstnameBadge').addClass('form_badge_wrong');
        $('#firstnameCheck').addClass('form_badge_wrong');

        $('#firstnameCheck').find('i').addClass('fa-times');
        $('#firstnameCheck').find('i').removeClass('fa-check');

        $('#firstnameMessage').hide();
        $('#firstnameMessageWrong').show();

        nameValid = false;
    }

    checkValid();
});

$('#age').change(function() {
    $('#ageBadge').addClass('form_badge_valid');
    $('#ageCheck').addClass('form_badge_valid');

    ageValid = true;
    checkValid();
});


$("#phone").on("change paste keyup", function () {
    var e = $(this),
        a = e.val(),
        t = new RegExp('^((06)|(07))', 'i');

    if(a.length >= 2){
        if (!a.match(t)) {
            $('#phoneBadge').removeClass('form_badge_valid');
            $('#phoneCheck').removeClass('form_badge_valid');

            $('#phoneBadge').addClass('form_badge_wrong');
            $('#phoneCheck').addClass('form_badge_wrong');

            $('#phoneCheck').find('i').addClass('fa-times');
            $('#phoneCheck').find('i').removeClass('fa-check');

            var errorEl = $('#phoneWrong');
            $('#phoneMessage').hide();
            errorEl.show();

            if (a === "") {
                errorEl.html("Merci d’indiquer votre téléphone");
            } else {
                errorEl.html("Merci de renseigner votre numéro de portable commençant par 06 ou 07");
            }

            phoneValid = false;
        } else {
            $('#phoneBadge').removeClass('form_badge_wrong');
            $('#phoneCheck').removeClass('form_badge_wrong');

            $('#phoneCheck').find('i').addClass('fa-check');
            $('#phoneCheck').find('i').removeClass('fa-times');

            $('#phoneMessage').show();
            $('#phoneWrong').hide();

            phoneValid = true;
        }

        checkValid();
    }

});


$("#phone").on("change", function () {
    var e = $(this),
        a = e.val(),
        t = new RegExp('^[0-9]{10}$', 'i');

    if (!a.match(t)) {
        //Error

        $('#phoneBadge').removeClass('form_badge_valid');
        $('#phoneCheck').removeClass('form_badge_valid');

        $('#phoneBadge').addClass('form_badge_wrong');
        $('#phoneCheck').addClass('form_badge_wrong');

        $('#phoneCheck').find('i').addClass('fa-times');
        $('#phoneCheck').find('i').removeClass('fa-check');

        var errorEl = $('#phoneWrong');
        $('#phoneMessage').hide();
        errorEl.show();

        if (a === "") {
            errorEl.html("Merci d’indiquer votre téléphone");
        } else {
            errorEl.html("Merci, votre numéro de téléphone doit être composé de 10 chiffres");
        }

        phoneValid = false;
    } else {
        $('#phoneBadge').removeClass('form_badge_wrong');
        $('#phoneCheck').removeClass('form_badge_wrong');

        $('#phoneBadge').addClass('form_badge_valid');
        $('#phoneCheck').addClass('form_badge_valid');

        $('#phoneCheck').find('i').addClass('fa-check');
        $('#phoneCheck').find('i').removeClass('fa-times');

        $('#phoneMessage').show();
        $('#phoneWrong').hide();

        phoneValid = true;
    }

    checkValid();
});

function checkValid(){
    if(nameValid && ageValid && phoneValid) {
        submitBtn.prop('disabled', false);
    } else {
        submitBtn.prop('disabled', true);
    }
}


$('#registrationForm').submit(function( event ) {
    event.preventDefault();
    submit_form();
});
