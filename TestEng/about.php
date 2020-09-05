<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TestEng - О компании</title>

    <link rel="stylesheet" href="./css/main.min.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>

<header class="header header_large" style="background-image: url(./img/about-header.jpg)">
    <div class="container">
        <div class="row">
            <div class="col-6">
                <a href="https://testeng.online/">
                    <img class="header__logo" src="./img/logo.png" alt="testeng logo">
                </a>
            </div>
            <div class="col-6 d-none d-sm-block">
                <div class="block_right">
                    <a class=" header__button 8button button_dark button_radius button_large" href="/test.php">
                        Пройти тест
                    </a>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="header__title text-h1">
                <span>О КОМПАНИИ</span>
            </div>
        </div>
    </div>
</header>
<section class="about-section">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <span class="text-h5">
                Что такое TestEng?
            </span>
                <p class="text-h6">
                    Testeng.online это онлайн сервис для оценки знаний и навыков английского языка.
                </p>

                <span class="text-h5">
                Наша миссия
            </span>
                <p class="text-h6">
                    Ежегодно во всем мире сотни тысяч людей сдают экзамены TOEFL и IELTS. К сожалению не все студенты
                    могут
                    набрать нужный бал с первого раза, в таких случаях приходится пересдавать экзамены. Цена экзамена
                    отличается в зависимости от страны, в среднем составляет 150-200$. Нашей миссией является проверить
                    уровень знаний пользователя и дать ему рекомендации перед сдачей экзамена.
                </p>

                <span class="text-h5">
                Как это работает
            </span>
                <p class="text-h6">
                    Наш тест максимально приближен к реальным тестам TOEFL и IELTS. С помощью него мы проверим ваши
                    навыми Reading, Listenig, Speaking и Writing.
                    После прохождения теста вы сразу получите результаты тестов Reading и Listening и балы за них.
                    После оплаты теста вашу запись голоса и эссе проверят наши менторы. Вы получите письмо с общей
                    оценкой теста и рекомендациями от ментора.
                </p>
            </div>
        </div>
    </div>
</section>


<?php
include_once("footer.php")
?>
</body>
</html>