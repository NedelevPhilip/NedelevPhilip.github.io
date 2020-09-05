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
    <title>TestEng</title>

    <link rel="stylesheet" href="./css/main.min.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">


    <!-- Load Facebook SDK for JavaScript -->
    <div id="fb-root"></div>
    <script>
        window.fbAsyncInit = function () {
            FB.init({
                appId: '761415330921777',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.2'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/ru_RU/sdk/xfbml.customerchat.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>


    <!-- Your customer chat code -->
    <div class="fb-customerchat"
         attribution=setup_tool
         page_id="444976296054319"
         logged_in_greeting="Привет! Чем мы можем вам помочь?"
         logged_out_greeting="Привет! Чем мы можем вам помочь?">
    </div>
</head>
<body>
<section class="header-block section_center">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-10">
                <div class="header-block__content-wrap">
                        <span class="header-block__title text-h1 text_color_white">
                            Проверьте свой уровень английского языка
                        </span>
                    <span class="text-h5 text_color_white">
                            Будьте уверены в себе перед сдачей TOEFL или IELTS
                        </span>
                    <a class="header-block__button button button_radius button_large button_light" href="test.php">
                        Пройти тест
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="section_padding_large section_color_accent section_center">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-10">
                <span class="text-body2">
                    Мы создали сервис, который позволит вам полноценно проверить свой уровень английского языка.
                    Наши менторы оценят ваши разговорный навык и навык письма, а также дадут вам подробные рекомендации.
                </span>
            </div>
        </div>
    </div>
</section>
<section class="section_padding_large section_center">
    <div class="container">
            <div class="col-12 col-lg-10">
                <div class="section-title text-h1">
                    Что даст вам тест?
                </div>
                <span class="text-body2">
                    Вы будете уверены в своих силах перед прохождением важного экзамена. Наши менторы укажут вам на
                    ваши сильные и слабые стороны. Предварительная оценка своих сил поможет вам сэкономить деньги
                    и время при сдаче реального экзамена.
                </span>
            </div>
        </div>
    </div>
</section>
<section class="section_padding_large section_center section_color_brand">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="section-title text-h1 text_color_white">
                    Приемущества нашего теста
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="custom-card custom-card_1">
                    <div class="custom-card__icon-wrap custom-card_1__icon-wrap">
                        <img class="custom-card__icon" src="./img/icons/microphone.svg">
                    </div>
                    <div class="custom-card__title text-h4 text_color_white">
                        Проверка устной </br> речи
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="custom-card custom-card_1">
                    <div class="custom-card__icon-wrap custom-card_1__icon-wrap">
                        <img class="custom-card__icon" src="./img/icons/email-open.svg">
                    </div>
                    <div class="custom-card__title text-h4 text_color_white">
                        Фидбек от </br> профессионала
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="custom-card custom-card_1">
                    <div class="custom-card__icon-wrap custom-card_1__icon-wrap">
                        <img class="custom-card__icon" src="./img/icons/money-box.svg">
                    </div>
                    <div class="custom-card__title text-h4 text_color_white">
                        Низкая цена
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="section_padding_large">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="section-title text-h1 text-center">
                    Как пройти тест
                </div>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div class="col-12 col-lg-10">
                <div class="list-1">
                    <div class="list-1__item">
                        <div class="list-1-item__icon-line-wrap">
                            <div class="list-1-item__icon-wrap">
                                <img class="list-1-item__icon" src="./img/icons/reading-unicorn.svg">
                            </div>
                            <div class="list-1-item__icon-line"></div>
                        </div>
                        <div class="list-1-item__content-wrap">
                            <div class="list-1-item__title text-h5">
                                Reading
                            </div>
                            <div class="list-1-item__text text-body1">
                                Тест начитается с проверки навыка чтения. Вам предстоит прочитать текст и
                                ответить на тестовые вопросы.
                            </div>
                        </div>
                    </div>
                    <div class="list-1__item">
                        <div class="list-1-item__icon-line-wrap">
                            <div class="list-1-item__icon-wrap">
                                <img class="list-1-item__icon" src="./img/icons/hearing.svg">
                            </div>
                            <div class="list-1-item__icon-line"></div>
                        </div>
                        <div class="list-1-item__content-wrap">
                            <div class="list-1-item__title text-h5">
                                Listening
                            </div>
                            <div class="list-1-item__text text-body1">
                                В части Listening вы проверите свой навык восприятия устной речи. Вам необходимо будет
                                прослушать аудиозапись и ответить на тестовые вопросы.
                            </div>
                        </div>
                    </div>
                    <div class="list-1__item">
                        <div class="list-1-item__icon-line-wrap">
                            <div class="list-1-item__icon-wrap">
                                <img class="list-1-item__icon" src="./img/icons/microphone.svg">
                            </div>
                            <div class="list-1-item__icon-line"></div>
                        </div>
                        <div class="list-1-item__content-wrap">
                            <div class="list-1-item__title text-h5">
                                Speaking
                            </div>
                            <div class="list-1-item__text text-body1">
                                Для проверки разговорного навыка вам будет необходимо записать свой спич на заданную
                                тему.
                                После чего запись отправится на проверку к нашему ментору. Для записи вам понадобится
                                микрофон.
                            </div>
                        </div>
                    </div>
                    <div class="list-1__item">
                        <div class="list-1-item__icon-line-wrap">
                            <div class="list-1-item__icon-wrap">
                                <img class="list-1-item__icon" src="./img/icons/keyboard.svg">
                            </div>
                            <div class="list-1-item__icon-line"></div>
                        </div>
                        <div class="list-1-item__content-wrap">
                            <div class="list-1-item__title text-h5">
                                Writing
                            </div>
                            <div class="list-1-item__text text-body1">
                                В разделе Writing мы првоерим ваш навык письма. Вам нужно будет написать эссе на
                                заданную тему.
                                После завершения теста эссе проверит наш ментор.
                            </div>
                        </div>
                    </div>
                    <div class="list-1__item">
                        <div class="list-1-item__icon-line-wrap">
                            <div class="list-1-item__icon-wrap">
                                <img class="list-1-item__icon" src="./img/icons/pass.svg">
                            </div>
                            <div class="list-1-item__icon-line"></div>
                        </div>
                        <div class="list-1-item__content-wrap">
                            <div class="list-1-item__title text-h5">
                                Результаты тестов
                            </div>
                            <div class="list-1-item__text text-body1">
                                После завершения теста вам будут доступны результаты разделов Reading и Listening.
                            </div>
                        </div>
                    </div>
                    <div class="list-1__item">
                        <div class="list-1-item__icon-line-wrap">
                            <div class="list-1-item__icon-wrap">
                                <img class="list-1-item__icon" src="./img/icons/credit-card.svg">
                            </div>
                            <div class="list-1-item__icon-line"></div>
                        </div>
                        <div class="list-1-item__content-wrap">
                            <div class="list-1-item__title text-h5">
                                Оплата
                            </div>
                            <div class="list-1-item__text text-body1">
                                После окончания теста вы можете оплатить проверку нашими менторами частей Speaking и
                                Writing.
                            </div>
                        </div>
                    </div>
                    <div class="list-1__item">
                        <div class="list-1-item__icon-line-wrap">
                            <div class="list-1-item__icon-wrap">
                                <img class="list-1-item__icon" src="./img/icons/email-open.svg">
                            </div>
                            <div class="list-1-item__icon-line"></div>
                        </div>
                        <div class="list-1-item__content-wrap">
                            <div class="list-1-item__title text-h5">
                                Фидбек от ментора
                            </div>
                            <div class="list-1-item__text text-body1">
                                После оплаты наш менторы в течении 2 дней проверят ваши материалы частей Speaking и
                                Writing.
                                После чего, вы получите письмо с фидбеком ментора и рекомендациями для улучшения ваших
                                результатов.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="section_padding_large section_color_accent section_center">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="section-title text-h1 text-center">
                    Цена
                </div>
            </div>
        </div>
        <div class="row justify-content-md-center">

            <div class="col-md-6 col-lg-5">
                <div class="custom-card custom-card-2">
                    <div class="custom-card-2__content-wrap">
                        <div class="prise text-h3">
                            Free
                        </div>
                        <hr class="custom-card-2__line">
                        <div class="custom-card-2__items-wrap">
                            <div class="custom-card-2__item">
                                <img class="custom-card-2__item-icon" src="./img/icons/check-solid.svg">
                                <div class="custom-card-2__item-text">
                                    Опыт прохождения теста, максимально приближенного к TOEFL и IELTS
                                </div>
                            </div>
                            <div class="custom-card-2__item">
                                <img class="custom-card-2__item-icon" src="./img/icons/check-solid.svg">
                                <div class="custom-card-2__item-text">
                                    Оценка за Reading
                                </div>
                            </div>
                            <div class="custom-card-2__item">
                                <img class="custom-card-2__item-icon" src="./img/icons/check-solid.svg">
                                <div class="custom-card-2__item-text">
                                    Оценка за Listening
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="button button_radius button_large button_dark" href="test.php">
                        Пройти тест
                    </a>
                </div>
            </div>

            <div class="col-md-6 col-lg-5">
                <div class="custom-card custom-card-2">
                    <div class="custom-card-2__content-wrap">
                        <div class="prise text-h3">
                            12$
                        </div>
                        <hr class="custom-card-2__line">
                        <div class="custom-card-2__items-wrap">
                            <div class="custom-card-2__item">
                                <img class="custom-card-2__item-icon" src="./img/icons/check-solid.svg">
                                <div class="custom-card-2__item-text">
                                    Опыт прохождения теста, максимально приближенного к TOEFL и IELTS
                                </div>
                            </div>
                            <div class="custom-card-2__item">
                                <img class="custom-card-2__item-icon" src="./img/icons/check-solid.svg">
                                <div class="custom-card-2__item-text">
                                    Оценка за Reading
                                </div>
                            </div>
                            <div class="custom-card-2__item">
                                <img class="custom-card-2__item-icon" src="./img/icons/check-solid.svg">
                                <div class="custom-card-2__item-text">
                                    Оценка за Listening
                                </div>
                            </div>
                            <div class="custom-card-2__item">
                                <img class="custom-card-2__item-icon" src="./img/icons/check-solid.svg">
                                <div class="custom-card-2__item-text">
                                    Оценка и фидбек от ментора за Speaking
                                </div>
                            </div>
                            <div class="custom-card-2__item">
                                <img class="custom-card-2__item-icon" src="./img/icons/check-solid.svg">
                                <div class="custom-card-2__item-text">
                                    Оценка и фидбек от ментора за Writing
                                </div>
                            </div>
                            <div class="custom-card-2__item">
                                <img class="custom-card-2__item-icon" src="./img/icons/check-solid.svg">
                                <div class="custom-card-2__item-text">
                                    Анализ своих навыков и рекомендации для их улучшения
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="button button_radius button_large button_dark" href="test.php">
                        Пройти тест
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>


<?php
include_once("footer.php")
?>

</body>
</html>