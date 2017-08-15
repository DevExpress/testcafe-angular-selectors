var ng1App = angular.module('ng1', []);

ng1App.controller('MainController', function MainController ($scope) {
    $scope.person = {
        name:               'John Smith',
        email:              'johnsmith@company.com',
        phone:              '1234567890',
        salary:             1234.56789,
        pets:               [
            { name: 'cat', age: 3 },
            { name: 'dog', age: 6 }
        ],
        locations:          [
            { id: 1, name: 'London' },
            { id: 2, name: 'Paris' }
        ]
    };

    $scope.info = {
        angularVersion: window.angular.version.full
    };
});
