var app = angular.module('landing', []);

/**
 * Paramètres
 */
app.factory('parameters', ['$window', function ($window) {
    return $window['parameters'];
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
app.service('messageBox', [function () {
    var _show = false;
    var _title = 'message.alert';
    var _text = '';
    var _buttons = [
        {label: 'OK', value: 'ok'}
    ];

    this.open = function (title, text) {
        _title = title;
        _text = text;
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

    this.getButtons = function () {
        return _buttons;
    };

    this.click = function (button) {
        this.close();
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
    };

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
 * Popup
 */
app.service('popup', ['$http', '$sce', '$window', 'loading', function ($http, $sce, $window, loading) {
    var _this = this;
    var _show = false;
    var _content = '';

    this.openUrl = function (url) {

        $window.scrollTo(0, 0);
        loading.show();

        $http({
            method: 'GET',
            url: url
        }).then(function (response) {
            loading.hide();
            _this.open($sce.trustAsHtml(response.data));
        }, function (response) {
            loading.hide();
        });
    };

    this.open = function (content) {
        angular.element('body').addClass('body-popup');
        _content = content;
        _show = true;
    };

    this.close = function () {
        angular.element('body').removeClass('body-popup');
        _show = false;
    };

    this.isShown = function () {
        return _show;
    };

    this.setContent = function (content) {
        _content = content;
    };

    this.getContent = function () {
        return _content;
    };
}]);

app.directive('popupHref', ['popup', function (popup) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                popup.openUrl(attrs.popupHref);
            });
        }
    };
}
]);

/**
 * Popup
 */
app.controller('PopupController', ['$scope', 'popup', function ($scope, popup) {
    $scope.popup = popup;
}]);

/**
 * MessageBox
 */
app.controller('MessageBoxController', ['$scope', 'messageBox', function ($scope, messageBox) {
    $scope.messageBox = messageBox;
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
 * Chargement
 */
app.controller('LoadingController', ['$scope', 'loading', function ($scope, loading) {
    $scope.loading = loading;
}]);

/**
 * Inscription
 */
app.controller('RegisterController', ['$scope', '$http', '$window', 'loading', 'parameters', 'messageBox', 'accountExist', 'lang', function ($scope, $http, $window, loading, parameters, messageBox, accountExist, lang) {

    $scope.genders = [
        {id: 'M', label: lang.getText('form.gender.man')},
        {id: 'F', label: lang.getText('form.gender.woman')}
    ];
    $scope.searchs = [
        {id: 'F', label: lang.getText('form.search.woman')},
        {id: 'M', label: lang.getText('form.search.man')}
    ];
    $scope.shortGenders = [
        {id: 'M', label: lang.getText('form.gender.man_short')},
        {id: 'F', label: lang.getText('form.gender.woman_short')}
    ];
    $scope.shortSearchs = [
        {id: 'F', label: lang.getText('form.search.woman_short')},
        {id: 'M', label: lang.getText('form.search.man_short')}
    ];

    $scope.ages = [];

    $scope.gender = 'M';
    $scope.search = 'F';
    $scope.age = null;
    $scope.city = null;
    $scope.errorMessage = null;
    $scope.email = parameters.email;

    for (var i = 18; i < 120; i++) {
        $scope.ages.push({
            id: i,
            label: i + ' ' + lang.getText('form.age')
        });
    }

    $scope.error = function (msg) {
        messageBox.open(lang.getText('message.error.incorrect'), msg);
    };

    $scope.$watch(function () {
        return $scope.search;
    }, function () {
        if ($scope.search === 'M')
            $scope.optinSearch = lang.getText('form.men');
        else
            $scope.optinSearch = lang.getText('form.women');
    });


    /**
     * Vérification de l'utilisateur (obligatoire)
     * @returns {Boolean}
     */
    $scope.checkUsername = function () {
        if ($scope.form.username && $scope.form.username.$invalid) {
            if ($scope.form.username.$error.minlength)
                $scope.error(lang.getText('form.error.character'));
            else
                $scope.error(lang.getText('form.error.valid.login'));
            return false;
        }

        if ($scope.username && !$scope.username.match(/^[0-9a-zA-Z]+$/)) {
            $scope.error(lang.getText('form.error.letters'));
            return false;
        }

        return true;
    };

    /**
     * Vérification de l'âge (facultatif)
     * @returns {Boolean}
     */
    $scope.checkAge = function () {
        if ($scope.form.age && $scope.form.age.$invalid) {
            $scope.error(lang.getText('form.error.age'));
            return false;
        }

        return true;
    };

    /**
     * Vérification de l'email (obligatoire)
     * @returns {Boolean}
     */
    $scope.checkEmail = function () {
        if (!$scope.form.email || $scope.form.email.$invalid) {
            $scope.error(lang.getText('form.error.valid.email'));
            return false;
        }

        return true;
    };

    /**
     * Vérification de la ville (facultatif)
     * @returns {undefined}
     */
    $scope.checkCity = function () {
        if ($scope.form.city && $scope.form.city.$invalid) {
            $scope.error(lang.getText('form.error.city'));
            return false;
        }

        return true;
    };

    /**
     * Vérification des CGV (obligatoire)
     * @returns {Boolean}
     */
    $scope.checkTerms = function () {
        if ($scope.form.terms && $scope.form.terms.$invalid) {
            $scope.error(lang.getText('form.error.terms'));
            return false;
        }

        return true;
    };

    /**
     * Vérification de l'optin (facultatif)
     * @returns {Boolean}
     */
    $scope.checkOptin = function () {
        if ($scope.form.optin && $scope.form.optin.$invalid) {
            $scope.error(lang.getText('form.error.contact'));
            return false;
        }

        return true;
    };

    /**
     * Gestion de la recherche en cas de champs optionnels
     * @returns {undefined}
     */
    $scope.updateSearch = function () {
        if (!$scope.form.gender && $scope.form.search) {
            // Recherche spécifiée et sexe non spécifié => on force le sexe opposé
            $scope.gender = $scope.search === 'F' ? 'M' : 'F';
        } else if ($scope.form.gender && !$scope.form.search) {
            // Recherche non-spécifiée et sexe spécifié => on force la recherche opposée
            $scope.search = $scope.gender === 'F' ? 'M' : 'F';
        }
    };

    $scope.submit = function () {

        $scope.errorMessage = null;

        $scope.updateSearch();

        if (!$scope.checkUsername())
            return;

        if (!$scope.checkAge())
            return;

        if (!$scope.checkEmail())
            return;

        if (!$scope.checkCity())
            return;

        if (!$scope.checkTerms())
            return;

        if (!$scope.checkOptin())
            return;

        loading.show();

        $http({
            url: parameters.register_url,
            method: 'POST',
            data: {
                username: $scope.username,
                email: $scope.email,
                gender: $scope.gender,
                search: $scope.search,
                age: $scope.age,
                city: $scope.city
            }
        }).then(function (response) {
            loading.hide();

            if (response.data.status === 'ok') {
                $window.location = response.data.url;
            } else if (response.data.fm) {
                accountExist.open();
            } else {
                $scope.error(response.data.message);
                return;
            }
        });

    };
}]);
