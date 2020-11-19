var validForm = !1;
var submitBtn = $('#submit-button');

$("#contact_phone").on("change paste keyup", function () {
    var e = $(this),
        a = e.val(),
        t = new RegExp('^((06)|(07))[0-9]{8}$','i');

    a.match(t) ?
        (submitBtn.prop('disabled',false),e.removeClass("invalid").addClass("valid"), $(".tel-error").removeClass("error_show").addClass("error"), validForm = !0) :
        (submitBtn.prop('disabled',true),validForm = !1, e.removeClass("valid").addClass("invalid"), $(".tel-error").removeClass("error").addClass("error_show"), $(".tel-error").html("Merci de renseigner votre numéro de portable commençant par 06 ou 07"))
});

function goToStep(e, a) {
    "function" == typeof handleBeforeGoNextStep && handleBeforeGoNextStep(e, a);
    var t = "hidden";
    e.hasClass("step-hidden") && (t = "step-hidden"), e.removeClass("hidden step-hidden"), a.addClass(t), a.find("input").blur(), activeProgressBar(e), countdownToNextStep(e), "function" == typeof handleAfterGoNextStep && handleAfterGoNextStep(e, a)
}

function countdownToNextStep(e) {
    var a = e.attr("data-timeout");
    e.hasClass("js-animation-step") && void 0 !== a && setTimeout(function() {
        goToStep(e.next(".js-step"), e)
    }, a)
}

function activeProgressBar(e) {
    var a = e.closest(".registration-form-builder").find(".js-progress-bar");
    if (a.length > 0) {
        var t = e.parent().find(".js-step").index(e);
        a.find("li").removeClass("active").eq(t).addClass("active visited")
    }
}

function handleAfterGoNextStep(e, a) {
    var t = $(".js-progress-bar"),
        r = e.parent().find(".js-step").index(e);
    $numStep.length > 0 && changeNumStep(totalStep - r), t.find("li").removeClass("active").eq(r).addClass("active visited")
}

function changeNumStep(e) {
    $numStep.html(e)
}
$(".js-step .js-next-step").on("click", function() {
	event.preventDefault();
    var e = $(this).closest(".js-step"),
        a = e.next(".js-step"),
        t = $(this).attr("data-validation");
    if (t) {
        if ("name" === t) {
            var r = $("#username");
            r.val() ? (r.removeClass("invalid").addClass("valid"), $(".name-error").removeClass("error_show").addClass("error"), validForm = !1, goToStep(a, e)) : (r.removeClass("valid").addClass("invalid"), $(".name-error").removeClass("error").addClass("error_show"), validForm = !0)
        }
    } else goToStep(a, e)
}), $("#regform").submit(function(e) {
	event.preventDefault()
	if(validForm)submit_form();
});
