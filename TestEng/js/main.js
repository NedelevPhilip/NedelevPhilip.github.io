var logo = $('.header__logo');
var headerProgressBar = $('.header__progress-bar');

var testPart = $('.test__part');
var resultsPart = $('.results-part');
var paymentPart = $('.payment-part');

var emailBlock = $('.email-block');
var emailInput = $('.email-input');
var emailButton = $('.email-button');

var testTime = $('.test-part__time');
var infoButton = $('.header__info-button');

var questionsInfo = $('.test-part__questions-info');
var questionNumber = $('.test-part__question-number');
var questionsAmount = $('.test-part__questions-amount');
var possibleAnswersWrap = $('.test-part__possible-answers-wrap');
var questionText = $('.test-part__question');

var prevQuestionButton = $('.test-part__prev-button');
var nextQuestionButton = $('.test-part__next-button');

var readingTextWrap = $('.test-part__reading-test-wrap');
var readingText = $('.test-part__reading-test');
var listeningWrap = $('.test-part__listening-test-wrap');
var speakingRecordWrap = $('.test-part__speaking-wrap');
var textTast = $('.text-task');
var writingWrap = $('.test-part__writing-wrap');
var writingTextarea = $('.writing-textarea');
var writingWordsCounter = $('.writing-wrap__words-counter');

var sendButton = $('.test-part__send-button');

var resultBlock = $('.results-block');
var resultReadingAnswers = $('.results-block__reading-answers');
var resultReadingScore = $('.results-block__reading-score');
var resultListeningAnswers = $('.results-block__listening-answers');
var resultListeningScore = $('.results-block__listening-score');
var widgetWrap = $('.payment-widget-wrap');

var currentPart = 0;
var currentQuestion = 0;
var interval = null;


$(document).ready(function () {
    // Amplitude
    // amplitude.getInstance().logEvent('Start');
});

$.map(dataTexts, function (testItem, i) {
    var activeItem = i == 0 ? "progress-bar__item_active" : "";
    headerProgressBar.append('<span class="progress-bar__item ' + activeItem + '">' + testItem.title + '</span>');
});


logo.click(function () {
    var c = confirm("Вы точно хотите выйти из теста? \n Результат не будет сохранен.");
    if (c) {
        window.location.href = "https://testeng.online/";
    }
});




// if (confirm("Do you really want to leave?")) {
//     window.location.reload();
// }

// window.onbeforeunload = function (e) {
//     var message = 'Are you sure you want to leave?';
//     e.returnValue = message;
//     return message;
// };



sendButton.click(function () {
    clearInterval(interval);
    nextPart();
});

$('.to-payment-button').click(function () {
   nextPart();
});

function nextPart() {
    currentPart++;

    headerProgressBar.find('.progress-bar__item:nth-child(' + currentPart + ')').addClass('progress-bar__item_done').removeClass('progress-bar__item_active');
    headerProgressBar.find('.progress-bar__item:nth-child(' + (currentPart + 1) + ')').addClass('progress-bar__item_active');


    //Monitoring and debug block
    if (currentPart <= 4) {
        if (currentPart == 1) {

            // Amplitude
            // amplitude.getInstance().logEvent('Reading Complete');
            console.log('Reading complite');
        } else if (currentPart == 2) {

            // Amplitude
            // amplitude.getInstance().logEvent('Listening Complete');
            console.log('Listening complite');
        } else if (currentPart == 3) {
            if (resultBlob != null) {

                // Amplitude
                // amplitude.getInstance().logEvent('Speaking Complete', {'done': true});
            } else {

                // Amplitude
                // amplitude.getInstance().logEvent('Speaking Complete', {'done': false});
            }
            console.log('Speaking complite');
        } else if (currentPart == 4) {
            if (writingTextarea.val() != 'null') {

                // Amplitude
                // amplitude.getInstance().logEvent('Writing Complete', {'done': true});
            } else {

                // Amplitude
                // amplitude.getInstance().logEvent('Writing Complete', {'done': false});
            }
            console.log('Writing complite');
        }
    }

    if(currentPart < 4) {
        $('.test-info').text(dataTexts[currentPart].text);
        createTest();
    }

    if (currentPart == 4) {
        data.test.parts[3].text = writingTextarea.val(); //add writing value

        testTime.hide();
        infoButton.hide();
        testPart.hide();
        sendButton.hide();

        emailBlock.show();
    }

    if (currentPart == 5) {
        resultsPart.hide();
        if ($(window).width() > 0 && $(window).width() < 768) {
            paymentPart.css('display', 'block');
        } else {
            paymentPart.css('display', 'flex');
        }
        widgetWrap.show();
        createPaymentWidget();

        // Amplitude
        // amplitude.getInstance().logEvent('Open Payment');
    }
}


function createTest() {
    //FIX
    if ($(window).width() > 0 && $(window).width() < 768) {
        testPart.css('display', 'block');
    } else {
        testPart.css('display', 'flex');
    }


    if (currentPart == 0 || currentPart == 1) {
        //Reading
        if (currentPart == 0) {
            readingText.text(data.test.parts[currentPart].text);
        }

        //Listening
        if (currentPart == 1) {
            readingTextWrap.hide();
            currentQuestion = 0;
            printListeningElements();
            listeningWrap.show();
        }

        questionsAmount.text(data.test.parts[currentPart].questions.length);
        printPossibleAnswers();
    }

    //Speaking
    if (currentPart == 2) {
        $('.test-part__audio-player').remove();
        listeningWrap.hide();
        questionsInfo.hide();
        possibleAnswersWrap.hide();
        questionText.hide();
        prevQuestionButton.hide();
        nextQuestionButton.hide();
        textTast.show();
        speakingRecordWrap.prepend(
            '<img class="test-part__listening-image" src="https://testeng.online/resources/speaking/img/' + data.test.id + '.jpg">'
        );
        textTast.text(data.test.parts[currentPart].task);
        speakingRecordWrap.css('display', 'flex');
    }

    //Writing
    if (currentPart == 3) {
        if (isRecording) {
            mediaRecorder.stop();
            sendReady = true;
        }

        speakingRecordWrap.hide();
        textTast.text(data.test.parts[currentPart].task);
        writingWrap.show();
    }

    startTimer(data.test.parts[currentPart].time);
}

$('.test-info').text(dataTexts[currentPart].text);
createTest();


function printPossibleAnswers() {
    var question = data.test.parts[currentPart].questions[currentQuestion];
    var answers = question.answers;

    questionNumber.text(currentQuestion + 1);
    questionText.text(question.text);

    possibleAnswersWrap.empty();
    $.map(answers, function (answer, i) {
        possibleAnswersWrap.append(getPossibleAnswer(answer));
    });
}

function getPossibleAnswer(answer) {
    var checkedClass = answer.checked ? 'custom-checkbox_checked' : '';
    var text = answer.text;
    var id = answer.id;

    return '<div data-id="' + id + '" onclick="possibleAnswerClick(' + id + ')" class="test-part__possible-answer"> ' +
        '<div class="custom-checkbox ' + checkedClass + '">' +
        '<img class="custom-checkbox__icon" src="./img/icons/done.svg">' +
        '</div>' +
        '<span class="possible-answer__text">' + text + '</span>' +
        '</div>';
}

function possibleAnswerClick(id) {
    var clickedAnswer = $('[data-id="' + id + '"]');
    $.map(data.test.parts[currentPart].questions[currentQuestion].answers, function (answer, i) {
        if (answer.id == id) {
            if (answer.checked) {
                answer.checked = false;
                clickedAnswer.find('.custom-checkbox').removeClass('custom-checkbox_checked');
            } else {
                answer.checked = true;
                clickedAnswer.find('.custom-checkbox').addClass('custom-checkbox_checked');
            }
        } else {
            if (answer.checked) {
                answer.checked = false;
                var checkedAnswer = $('[data-id="' + answer.id + '"]');
                checkedAnswer.find('.custom-checkbox').removeClass('custom-checkbox_checked');
            }
        }
    });
}

prevQuestionButton.click(function () {
    if (currentQuestion == 0) {
        currentQuestion = data.test.parts[currentPart].questions.length - 1;
    } else {
        currentQuestion--;
    }
    printPossibleAnswers();
});

nextQuestionButton.click(function () {
    if (currentQuestion == data.test.parts[currentPart].questions.length - 1) {
        currentQuestion = 0;
    } else {
        currentQuestion++;
    }
    printPossibleAnswers();
});

function startTimer(time) {
    var min = time;
    var sec = 0;

    interval = setInterval(function () {
        if (min == 0 && sec == 0) {
            clearInterval(interval);
            nextPart();
        } else {
            if (sec > 0) {
                sec--;
            } else {
                sec = 59;
                min--;
            }
            printTimer(min, sec);
        }
    }, 1000);
}

function printTimer(min, sec) {
    var minStr = (min < 10) ? '0' + min : min;
    var secStr = (sec < 10) ? '0' + sec : sec;
    testTime.text('Время ' + minStr + ':' + secStr);
}


function printListeningElements() {
    var testId = data.test.id;
    listeningWrap.prepend('<img class="test-part__listening-image" src="https://testeng.online/resources/listening/img/' + testId + '.jpg">' +
        '<audio class="test-part__audio-player" controls>' +
        '<source src="https://testeng.online/resources/listening/audio/' + testId + '.ogg" type="audio/ogg">' +
        '<source src="https://testeng.online/resources/listening/audio/' + testId + '.mp3" type="audio/mpeg">' +
        '</audio>');
}

writingTextarea.on('input', function () {
    writingWordsCounter.text("Words: " + wordCounter($(this).val()));
});


emailButton.click(function () {
    var email = emailInput.val();

    if (validateEmail(email)) {
        data.email = email;

        emailBlock.hide();

        showResults();

        sendResultsToDB(false);
        sendToStorage(resultBlob, email);

        // Amplitude
        // amplitude.getInstance().setUserId(data.id);
        // amplitude.getInstance().logEvent('Enter Email', {'email': email});
    } else {
        emailInput.addClass('input_error');
    }
});


function showResults() {
    if ($(window).width() > 0 && $(window).width() < 768) {
        resultsPart.css('display', 'block');
    } else {
        resultsPart.css('display', 'flex');
    }
    resultBlock.show();
    printResultsItem();

    var scoreSum = data.test.parts[0].score + data.test.parts[1].score;

    if (scoreSum >= 44) {
        $('.results__super').css('display', 'flex');
    } else if (scoreSum < 44 && scoreSum > 30) {
        $('.results__ok').css('display', 'flex');
    }
}


function printResultsItem() {
    $.map(data.test.parts, function (part, i) {
        if (i == 0 || i == 1) {

            var questionsElement, scoreElement;
            if (i == 0) {
                questionsElement = resultReadingAnswers;
                scoreElement = resultReadingScore;
            } else if (i == 1) {
                questionsElement = resultListeningAnswers;
                scoreElement = resultListeningScore;
            }

            var questions = data.test.parts[i].questions;
            var correctAnswersNumber = 0;
            var correctAnswerValue = 30 / questions.length;

            $.map(questions, function (question, x) {
                var answers = question.answers;
                var answersWasNotChecked = true;

                $.map(answers, function (answer, z) {
                    var answerIsCorrect = false;

                    if (answer.checked) {
                        if (answer.correct) {
                            answerIsCorrect = true;
                            correctAnswersNumber++;
                        }
                        printResultItem(questionsElement, question.text, answer.text, answerIsCorrect);
                        answersWasNotChecked = false;
                        return false;
                    }
                });

                if (answersWasNotChecked) {
                    printResultItem(questionsElement, question.text, 'Ни один вариант не был  выбран', false);
                }
            });

            var score = correctAnswersNumber * correctAnswerValue;
            data.test.parts[i].score = score;

            scoreElement.text("Score: " + score);
        }
    });
}

function printResultItem(p, q, a, c) {
    var correctClass = c ? "results-block__answer_correct" : "results-block__answer_uncorrect";
    p.append('<li class="results-block__item">' +
        '<span class="results-block__question ">' + q + '</span>' +
        '<div class="results-block__answer results-block__answer_correct ' + correctClass + '">' + a + '</div>' +
        '</li>');
};


