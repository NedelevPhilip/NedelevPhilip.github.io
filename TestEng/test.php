<!doctype html>
<html lang="ru">
<head>

    <?php
    include_once("anal.php")
    ?>

    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Testeng-Test</title>


    <link rel="stylesheet" href="./css/main.min.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>


<header class="header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 col-lg-2 ">
                <img class="header__logo" src="./img/logo.png" alt="testeng logo">
            </div>
            <div class="col-7 d-none d-lg-block">
                <div class="header__progress-bar"></div>
            </div>
            <div class="col-8 col-lg-3">
                <div class="header__buttons-wrap">
                    <span class="test-part__time"></span>
                    <div class="drop-down-wrap">
                        <button class="header__info-button button button_round drop-down-trigger">?</button>
                        <div class="drop-down__container">
                            <div class="drop-down__content">
                                <p class="test-info"></p>
                            </div>
                        </div>
                    </div>
                    <button class="test-part__send-button button button_positive">
                        Далее
                    </button>
                    <a class="button home-button" href="https://testeng.online/">На главную</a>
                </div>
            </div>
        </div>
    </div>
</header>

<section class="test">
    <div class="container">

        <div class="error error_topline">
            <div class="row">
                <div class="error__block">
                    <span class="error__text"></span>
                </div>
            </div>
        </div>
        <div class="test__part">
            <div class="col-12 col-md-6">
                <div class="test-part__reading-test-wrap">
                    <p class="test-part__reading-test"></p>
                </div>
                <div class="test-part__listening-test-wrap"></div>
                <div class="test-part__speaking-wrap">
                    <div class="test-part__speaking-controls">
                        <button class="record-button button button_positive button_radius button_icon">
                            <img src="img/icons/mic.svg">
                            <span>Записать</span>
                        </button>
                        <audio id="recordedAudioPlayer" controls></audio>
                    </div>
                </div>
                <div class="test-part__writing-wrap">
                    <textarea class="writing-textarea input"></textarea>
                    <span class="writing-wrap__words-counter">Words: 0</span>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="test-part__questions-wrap">
                    <div class="test-part__info">
                            <span class="test-part__questions-info">
                                Question
                                <span class="test-part__question-number"></span>
                                of
                                <span class="test-part__questions-amount"></span>
                            </span>
                    </div>
                    <p class="test-part__question"></p>
                    <div class="test-part__possible-answers-wrap"></div>
                    <span class="text-task"></span>
                </div>
                <div class="test-part__questions-control-buttons">
                    <button class="test-part__prev-button button button_radius button_icon">
                        <img src="img/icons/arrow_back.svg">
                        Предыдущий
                    </button>
                    <button class="test-part__next-button button button_radius button_icon">
                        Следующий
                        <img src="img/icons/arrow_forward.svg">
                    </button>
                </div>
            </div>
        </div>

        <div class="email-block">
            <div class="col-12 col-md-6">
                <div class="email-wrap">
                        <span class="text-h5">
                            Чтобы получить результаты частей Reading и Listening введите свой email
                        </span>
                    <input class="email-input input" type="email" autocomplete="on" placeholder="Ваш email">
                    <button class="email-button button button_positive">Узнать результаты</button>
                </div>
            </div>
        </div>

        <div class="results-part">
            <div class="col-12 col-md-6">
                <div class="results-part__text-wrap">
                         <span class="text-h5">
                        <span class="results__super">
                            Супер! Отличный результат 👍
                        </span>
                        <span class="results__ok">
                            Хороший результат, но ты можешь и лучше 👌
                        </span>
                             </br>
                             Ты можешь оплатить проверку навыков Speaking и Writing и наши менторы дадут тебе фидбек с оценкой и рекомендациями.
                        </span>
                    <button style="margin-top: 15px" class="to-payment-button button button_positive">
                        Перейти к оплате
                    </button>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="results-block">
                    <div>
                        <span class="results-block__part-title text-h6">Reading part</span>
                        <ol class="results-block__reading-answers"></ol>
                        <div class="results-block__reading-score text-subtitle2"></div>
                    </div>
                    <div>
                        <span class="results-block__part-title text-h6">Listening part</span>
                        <ol class="results-block__listening-answers"></ol>
                        <div class="results-block__listening-score text-subtitle2"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="payment-part">
            <div class="col-12 col-md-6">
                <div class="payment-description">

                </div>
                <div class="payment-success-block">
                        <span class="text-h5 payment-text">
                            После оплаты теста, в течении <b>2</b> дней наш ментор проверит ваше эссе и сделанную вами аудиозапись.
                            В случае, если вы допустили какие то ошибки, наш специалист укажет на них и даст материалы и рекомендации для
                            их проработки. Вы получите рекомендации для усовершенствования своих навыков 💪
                        </span>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="payment-widget-wrap">
                    <div id="liqpay_checkout"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<script type="text/javascript" src="js/jquery.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-storage.js"></script>
<script type="text/javascript" src="./js/utils.js"></script>
<script type="text/javascript" src="./js/services.js"></script>
<script type="text/javascript" src="./js/data.js"></script>
<script type="text/javascript" src="./js/drop-down.js"></script>
<script type="text/javascript" src="./js/main.js"></script>
</body>
</html>