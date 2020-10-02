var app = angular.module('app', []);

/**
 * Base URL
 */
app.factory('baseUrl', ['$window', function ($window) {
    return $window['baseUrl'];
}]);

app.factory('lang', ['$window', function ($window) {
    return {
        getText: function (name) {
            if (name in $window['lang'])
                return $window['lang'][name];

            return name;
        }
    };
}]);

/**
 * MessageBox
 */
app.service('messageBox', ['$sce', function ($sce) {
    var _show = false;
    var _title = 'message.alert';
    var _text = '';
    var _buttons = [];
    var _callback = null;

    var _buttonsDefault = [
        {label: 'OK', value: 'ok'}
    ];

    this.open = function (title, text, buttons, callback) {
        _title = title;
        _text = text;
        _buttons = [];
        _callback = callback;

        if (buttons) {
            _buttons = buttons;
        } else {
            _buttons = _buttonsDefault;
        }

        _show = true;
    };

    this.close = function () {
        _show = false;
    };

    this.isShown = function () {
        return _show;
    };

    this.getTitle = function () {
        return _title;
    };

    this.getText = function () {
        return _text;
    };

    this.getHtmlText = function () {
        return $sce.trustAsHtml(_text);
    };

    this.getButtons = function () {
        return _buttons;
    };

    this.click = function (button) {
        this.close();

        if (_callback && button)
            _callback(button.value);
    };

    this.getButtonClass = function (button) {
        switch (button.type) {
            case 'danger':
                return 'btn-danger';
            default:
                return 'btn-success';
        }
    };
}]);

/**
 * Account exist modal
 */
app.service('accountExist', [function () {
    var _show = false;
    var _step = 0;

    this.open = function () {
        _show = true;
        _step = 0;
    };

    this.close = function () {
        _show = false;
    };

    this.isShown = function () {
        return _show;
    };

    this.click = function () {
        this.close();
    };

    this.switchStep = function (step) {
        _step = step;
    };

    this.getStep = function () {
        return _step;
    }

    this.getProduct = function () {
        return _productUrl;
    }
}]);

/**
 * Loading
 */
app.service('loading', [function () {
    var _loading = false;

    this.show = function () {
        _loading = true;
    };
    this.hide = function () {
        _loading = false;
    };
    this.isShown = function () {
        return _loading;
    };
}]);

/**
 * Main App
 */
app.controller('AppController', ['$scope', 'messageBox', 'lang', function ($scope, messageBox, lang) {

    $scope.chatStatus = 'offline';

    $scope.error = function (message) {
        messageBox.open(lang.getText('message.error'), message);
    };

    $scope.notice = function (message) {
        messageBox.open(lang.getText('message.information'), message);
    };

    $scope.openSupport = function () {
        window.zE.activate();
    };

}]);

/**
 * MessageBox
 */
app.controller('MessageBoxController', ['$scope', 'messageBox', function ($scope, messageBox) {
    $scope.messageBox = messageBox;
}]);

/**
 * Chargement
 */
app.controller('LoadingController', ['$scope', 'loading', function ($scope, loading) {
    $scope.loading = loading;
}]);

/**
 * Inscription
 */
app.controller('RegisterController', ['$scope', '$http', '$window', 'baseUrl', 'loading', 'lang', 'accountExist', function ($scope, $http, $window, baseUrl, loading, lang, accountExist) {

    $scope.ages = [];
    for (let i = 18; i <= 120; i++) {
        $scope.ages.push({
            id: i,
            label: i + ' ' + lang.getText('form.age')
        });
    }

    $scope.days = [];
    for (let i = 1; i <= 31; i++) {
        $scope.days.push({
            id: i,
            label: i
        });
    }

    $scope.years = [];
    for (let i = 1900; i <= (new Date()).getFullYear(); i++) {
        $scope.years.push({
            id: i,
            label: i
        });
    }

    $scope.months = [];
    for (let i = 1; i <= 12; i++) {
        $scope.months.push({
            id: i,
            label: i
        });
    }

    $scope.genders = [
        {id: 'M', label: lang.getText('form.gender.man')},
        {id: 'F', label: lang.getText('form.gender.woman')}
    ];
    $scope.searchs = [
        {id: 'F', label: lang.getText('form.search.woman')},
        {id: 'M', label: lang.getText('form.search.man')}
    ];
    $scope.genders2 = [
        {id: 'M', label: lang.getText('form.gender.man2')},
        {id: 'F', label: lang.getText('form.gender.woman2')}
    ];
    $scope.searchs2 = [
        {id: 'F', label: lang.getText('form.search.woman2')},
        {id: 'M', label: lang.getText('form.search.man2')}
    ];
    $scope.shortGenders = [
        {id: 'M', label: lang.getText('form.gender.man_short')},
        {id: 'F', label: lang.getText('form.gender.woman_short')}
    ];
    $scope.shortSearchs = [
        {id: 'F', label: lang.getText('form.search.woman_short')},
        {id: 'M', label: lang.getText('form.search.man_short')}
    ];
    $scope.gender = 'M';
    $scope.search = 'F';
    $scope.age = null;
    $scope.birthdate = null;
    $scope.city = null;

    $scope.submit = function () {
        if ($scope.form.username) {
            if ($scope.form.username.$invalid) {
                $scope.error(lang.getText('form.error.username'));
                return;
            }
        }

        if ($scope.form.age) {
            if ($scope.form.age.$invalid) {
                $scope.error(lang.getText('form.error.age'));
                return;
            }
        }

        if ($scope.form.birthdate_day) {
            if ($scope.form.birthdate_day.$invalid) {
                $scope.error(lang.getText('form.error.birthdate_day'));
                return;
            }
        }

        if ($scope.form.birthdate_month) {
            if ($scope.form.birthdate_month.$invalid) {
                $scope.error(lang.getText('form.error.birthdate_month'));
                return;
            }
        }

        if ($scope.form.birthdate_year) {
            if ($scope.form.birthdate_year.$invalid) {
                $scope.error(lang.getText('form.error.birthdate_year'));
                return;
            }
        }

        if ($scope.form.password) {
            if ($scope.form.password.$invalid) {
                $scope.error(lang.getText('form.error.password'));
                return;
            }
        }

        if ($scope.form.email.$invalid) {
            $scope.error(lang.getText('form.error.valid.email'));
            return;
        }

        if ($scope.form.city) {
            if ($scope.form.city.$invalid) {
                $scope.error(lang.getText('form.error.city'));
                return;
            }
        }

        if ($scope.form.terms.$invalid) {
            $scope.error(lang.getText('form.error.terms'));
            return;
        }

        loading.show();

        $http({
            url: baseUrl + '/ajax/register/',
            method: 'POST',
            data: {
                username: $scope.username,
                gender: $scope.gender,
                search: $scope.search,
                email: $scope.email,
                age: $scope.age,
                birthdate: $scope.birthdate,
                city: $scope.city
            }
        }).then(function (response) {
            loading.hide();

            if (response.data.status === 'error') {
                if (response.data.fm) {
                    accountExist.open();
                } else {
                    $scope.error(response.data.message);
                    return;
                }
            } else if (response.data.fm) {
                accountExist.open();
            } else {
                $window.location = baseUrl + '/offers/';
            }
        });
    };
}]);

/**
 * Connexion
 */
app.controller('LoginController', ['$scope', '$http', '$window', 'baseUrl', 'loading', 'lang', function ($scope, $http, $window, baseUrl, loading, lang) {

    $scope.submit = function () {
        if ($scope.form.email.$invalid) {
            $scope.error(lang.getText('form.error.email'));
            return;
        }

        if ($scope.form.password.$invalid) {
            $scope.error(lang.getText('form.error.password'));
            return;
        }

        loading.show();

        $http({
            url: baseUrl + '/login/check/',
            method: 'POST',
            data: {
                email: $scope.email,
                password: $scope.password
            }
        }).then(function (response) {

            loading.hide();

            if (response.data.status === 'error') {
                $scope.error(response.data.message);
                return;
            } else {
                $window.location = response.data.url;
            }
        });
    };
}]);

/**
 * Messenger Connexion
 */
app.controller('MessengerLoginController', ['$scope', '$http', '$window', 'baseUrl', 'loading', 'lang', function ($scope, $http, $window, baseUrl, loading, lang) {

    $scope.submit = function () {
        if ($scope.form.email.$invalid) {
            $scope.error(lang.getText('form.error.email'));
            return;
        }

        if ($scope.form.password.$invalid) {
            $scope.error(lang.getText('form.error.password'));
            return;
        }

        loading.show();

        $http({
            url: baseUrl + '/messenger/login/check/',
            method: 'POST',
            data: {
                email: $scope.email,
                password: $scope.password
            }
        }).then(function (response) {

            loading.hide();

            if (response.data.status === 'error') {
                $scope.error(response.data.message);
                return;
            } else {
                $window.location = response.data.url;
            }
        });
    };
}]);

/**
 * Mot de passe perdu
 */
app.controller('PasswordLostController', ['$scope', '$http', '$window', 'baseUrl', 'loading', 'lang', function ($scope, $http, $window, baseUrl, loading, lang) {

    $scope.submit = function () {
        if ($scope.form.email.$invalid) {
            $scope.error(lang.getText('form.error.email'));
            return;
        }

        loading.show();

        $http({
            url: baseUrl + '/password/check/',
            method: 'POST',
            data: {
                email: $scope.email
            }
        }).then(function (response) {

            loading.hide();

            if (response.data.status === 'error') {
                $scope.error(response.data.message);
                return;
            } else {
                $scope.notice(lang.getText('message.notice.password'));
            }
        });
    };
}]);

/**
 * Messenger Mot de passe perdu
 */
app.controller('MessengerPasswordLostController', ['$scope', '$http', '$window', 'baseUrl', 'loading', 'lang', function ($scope, $http, $window, baseUrl, loading, lang) {

    $scope.submit = function () {
        if ($scope.form.email.$invalid) {
            $scope.error(lang.getText('form.error.email'));
            return;
        }

        loading.show();

        $http({
            url: baseUrl + '/messenger/password/check/',
            method: 'POST',
            data: {
                email: $scope.email
            }
        }).then(function (response) {

            loading.hide();

            if (response.data.status === 'error') {
                $scope.error(response.data.message);
                return;
            } else {
                $scope.notice(lang.getText('message.notice.password'));
            }
        });
    };
}]);

/**
 * Contact
 */
app.controller('ContactController', ['$scope', '$http', '$window', 'baseUrl', 'loading', 'lang', function ($scope, $http, $window, baseUrl, loading, lang) {

    $scope.subjects = [
        lang.getText('contact.subject.info'),
        lang.getText('contact.subject.stop'),
        lang.getText('contact.subject.identify'),
        lang.getText('contact.subject.challenge'),
        lang.getText('contact.subject.other')
    ];

    $scope.reset = function () {
        $scope.firstname = '';
        $scope.lastname = '';
        $scope.email = '';
        $scope.phone = '';
        $scope.subject = '';
        $scope.message = '';
        $scope.copy = false;
    };

    $scope.submit = function () {
        if ($scope.form.firstname.$invalid) {
            $scope.error(lang.getText('form.error.firstname'));
            return;
        }

        if ($scope.form.lastname.$invalid) {
            $scope.error(lang.getText('form.error.lastname'));
            return;
        }

        if ($scope.form.email.$invalid) {
            $scope.error(lang.getText('form.error.valid.email'));
            return;
        }

        if ($scope.form.phone.$invalid) {
            $scope.error(lang.getText('form.error.phone'));
            return;
        }

        if ($scope.form.subject.$invalid) {
            $scope.error(lang.getText('form.error.subject'));
            return;
        }

        if ($scope.form.message.$invalid) {
            $scope.error(lang.getText('form.error.message'));
            return;
        }

        loading.show();

        $http({
            url: baseUrl + '/contact/',
            method: 'POST',
            data: {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email,
                phone: $scope.phone,
                subject: $scope.subject,
                message: $scope.message,
                copy: $scope.copy
            }
        }).then(function (response) {
            loading.hide();

            if (response.data.status === 'error') {
                $scope.error(response.data.message);
                return;
            } else {
                $scope.reset();
                $scope.notice(lang.getText('message.notice.send'));
            }
        });
    };
}]);

/**
 * SubscriptionController
 */
app.controller('SubscriptionController', ['$scope', '$http', 'baseUrl', 'loading', 'lang', 'messageBox', function ($scope, $http, baseUrl, loading, lang, messageBox) {

    $scope.subscription = null;

    $scope.reset = function () {
        $scope.subscription = null;
        $scope.email = '';
        $scope.password = '';
    };

    $scope.find = function () {

        loading.show();

        $http({
            url: baseUrl + '/subscription/find/',
            method: 'POST',
            data: {
                email: $scope.email,
                password: $scope.password
            }
        }).then(function (response) {
            loading.hide();

            if (response.data.status === 'error') {
                $scope.error(response.data.message);
                return;
            } else {
                switch (response.data.subscription) {
                    case 'FOUND_INACTIVE':
                        messageBox.open(lang.getText('support.form.message.unsubscribe'), lang.getText('support.form.message.inactive') + "<br><br>" + lang.getText('support.form.message.help'));
                        break;
                    case 'FOUND_ACTIVE_UNSUBSCRIBED':
                        messageBox.open(lang.getText('support.form.message.unsubscribe'), lang.getText('support.form.message.unsubscribed') + "<br><br>" + lang.getText('support.form.message.help'));
                        break;
                    case 'NOT_FOUND':
                        messageBox.open(lang.getText('support.form.message.unsubscribe'), lang.getText('support.form.message.nothing') + "<br><br>" + lang.getText('support.form.message.help'));
                        break;
                    case 'FOUND_ACTIVE':
                        messageBox.open(
                            lang.getText('support.form.message.unsubscribe'),
                            lang.getText('support.form.message.active') + "<br><br>" + lang.getText('support.form.message.choice'),
                            [{value: 'yes', label: lang.getText('yes'), type: 'danger'}, {
                                value: 'no',
                                label: lang.getText('no')
                            }],
                            function (button) {
                                if (button === 'yes') {
                                    unsubscribe();
                                }
                            });
                        break;
                }
            }
        });
    };

    var unsubscribe = function () {
        $http({
            url: baseUrl + '/subscription/unsubscribe/',
            method: 'POST',
            data: {
                email: $scope.email,
                password: $scope.password
            }
        }).then(function (response) {
            loading.hide();

            if (response.data.status === 'error') {
                $scope.error(response.data.message);
                return;
            } else {
                $scope.reset();
                if (response.data.unsubscribed)
                    $scope.notice(lang.getText('message.notice.unsubscribed'));
                else
                    $scope.notice(lang.getText('message.notice.unsubscribed_failed'));
            }
        });
    }
}]);

/**
 * AccountExist
 */
app.controller('AccountExistController', ['$scope', 'accountExist', '$http', '$window', 'loading', 'lang', 'messageBox', function ($scope, accountExist, $http, $window, loading, lang, messageBox) {
    $scope.accountExist = accountExist;
    $scope.success = '';
    $scope.error = '';

    $scope.switchStep = function (value) {
        $scope.accountExist.switchStep(value);
        $scope.error = '';
    };

    /**
     * Login
     */
    $scope.submitLogin = function () {
        if ($scope.formLogin.email.$invalid) {
            $scope.error = lang.getText('form.error.email');
            return;
        }

        if ($scope.formLogin.password.$invalid) {
            $scope.error = lang.getText('form.error.password');
            return;
        }

        loading.show();

        $http({
            url: baseUrl + '/login/check/',
            method: 'POST',
            data: {
                email: $scope.email,
                password: $scope.password
            }
        }).then(function (response) {

            loading.hide();

            if (response.data.status === 'error') {
                $scope.error = response.data.message;
                return;
            } else {
                $window.location = response.data.url;
            }
        });
    };

    $scope.submitPasswordLost = function () {
        if ($scope.formPasswordLost.email.$invalid) {
            $scope.error = lang.getText('form.error.email');
            return;
        }

        loading.show();

        $http({
            url: baseUrl + '/password/check/',
            method: 'POST',
            data: {
                email: $scope.email
            }
        }).then(function (response) {

            loading.hide();

            if (response.data.status === 'error') {
                $scope.error = response.data.message;
                return;
            } else {
                $scope.switchStep(3)
                $scope.success = lang.getText('message.notice.password');
            }
        });
    };
}]);

/**
 * Messenger Mot de passe perdu
 */
app.controller('BackController', ['$scope', '$http', '$window', 'baseUrl', 'loading', 'lang', 'messageBox', function ($scope, $http, $window, baseUrl, loading, lang, messageBox) {

    $scope.sendPassword = function () {

        loading.show();

        $http({
            url: baseUrl + '/password/check/',
            method: 'POST',
            data: {
                email: $scope.email
            }
        }).then(function (response) {

            loading.hide();

            if (response.data.status === 'error') {
                console.log(response);
                messageBox.open(lang.getText('message.error'), response.data.message);
                return;
            } else {
                messageBox.open(lang.getText('message.information'), lang.getText('message.notice.password'));
            }
        });
    };

}]);
