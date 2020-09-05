////////////////////////////////EMAIL VALIDATION//////////////////////////////
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

////////////////////////////////WORD COUNTER//////////////////////////////
function wordCounter(text) {
    var wom = text.match(/\S+/g);
    // return {
    //     charactersNoSpaces : text.replace(/\s+/g, '').length,
    //     characters : text.length,
    //     words : wom ? wom.length : 0,
    //     lines : text.split(/\r*\n/).length
    // };
    return wom ? wom.length : 0;
}

////////////////////////////////RANDOM NUMBER//////////////////////////////
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

////////////////////////////////ENCODE BASE64//////////////////////////////
function utoa(data) {
    return btoa(unescape(encodeURIComponent(data)));
}

////////////////////////////////RECORD AUDIO//////////////////////////////
var recordButton = $('.record-button');
var isRecording = false;
// var mediaRecorder = null;
var resultBlob = null;
var sendReady = false;

var mediaRecorder;

// var recordedPlayer = $('.recorded-audio-player');

var handleSuccess = function (stream) {
    var options = {mimeType: 'audio/webm'};
    var recordedChunks = [];

    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function (e) {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }
    });

    mediaRecorder.addEventListener('stop', function () {
        resultBlob = new Blob(recordedChunks, {'type': 'audio/mpeg'});

        //в случае если перешли к след. части с включенным плеером, останавливаем его и посылаем данные
        if (sendReady) {
            sendToStorage(resultBlob, data.id);
        }

        if (resultBlob != null) {
            recordedAudioPlayer.src = window.URL.createObjectURL(resultBlob);
        }
    });

    mediaRecorder.onerror = function (event) {
        var error = event.error;

        switch (error.name) {
            case InvalidStateError:
                showNotification("You can't record the audio right " +
                    "now. Try again later.");
                break;
            case SecurityError:
                showNotification("Recording the specified source " +
                    "is not allowed due to security " +
                    "restrictions.");
                break;
            default:
                showNotification("A problem occurred while trying " +
                    "to record the audio.");
                break;
        }
    };

    recordButton.click(function () {
        if (isRecording) {
            recordButton.removeClass('recording');
            recordButton.find('span').text('Записать');
            mediaRecorder.stop();
            isRecording = false;
        } else {
            if(recordedChunks.length > 0) {
                recordedChunks = [];
            }
            recordButton.addClass('recording');
            recordButton.find('span').text('Закончить');
            mediaRecorder.start();
            isRecording = true;
        }
    });
};

if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {

        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
        });
    }
}


var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
if (isSafari) {
    var errorText = 'На данный момент наш сервис не поддерживает запись голоса в браузере Safari. ' +
        'Пожалуйста, воспользуйтесь другим браузером, например Chrome.';
    showToplineError(errorText);
} else {
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
        .then(handleSuccess)
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
            var errorText = 'Произошла ошибка при инициализации звукозаписывающей программы. Скорее всего всего ваш браузер' +
                ' не поддерживает эту функцию. Пожалуйста, воспользуйтесь другим браузером, например Chrome. ' +
                'Если это не помогло, напишите нам.';
            showToplineError(errorText);
        });
}

////////////////////////////////NOW TIME//////////////////////////////
function tegNowTimeStr() {
    var date = new Date();
    var dateStr = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + " " + date.getHours() + ':' + date.getMinutes();
    return dateStr;
}

////////////////////////////////SHOW ERROR//////////////////////////////
function showToplineError(text) {
    var errorBlock = $('.error_topline');
    errorBlock.find('.error__text').text(text);
    errorBlock.show();
}









