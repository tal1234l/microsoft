'use strict';

// create the controller and inject Angular's $scope
mainApp.controller('homeController',['$scope', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    $scope.pageClass = 'page-home';
}]);
mainApp.controller('aboutController',['$scope', function($scope) {
    $scope.message = 'Look! I am an about page.';
    $scope.pageClass = 'page-about';
}]);
mainApp.controller('temperatureController',['$scope','dbservice','API_URL','$http', function($scope, dbservice, API_URL,$http) {
    // Get the context of the canvas element we want to select
    dbservice.gettempdata();

    $scope.pageClass = 'page-contact';
    $scope.getTempData = function(){
        dbservice.gettempdata();
    }
    setInterval(function () {
        $http.get(API_URL + '/get-current-temp')
            .success(function(res){
                $scope.currTemp = res;
            })
    }, 3000);

}]);
mainApp.controller('loginController',['$rootScope','$scope','auth', function($rootScope, $scope,auth) {
    $scope.submit = function(){
        auth.login($scope.email,$scope.password)
            .success(function(res){
                toastr.success('Account ' +res.user.name+' , successfully logged in');
                $rootScope.isAuthenticated = true;
            })
            .error(function(err){
                toastr.error(err);
            });
    };
}]);
mainApp.controller('registerController',['$rootScope','$scope','auth', function($rootScope, $scope, auth) {
    $scope.submit = function(){
        auth.register($scope.email,$scope.password)
            .success(function(res){
                toastr.success('Account ' +res.user.name+' , successfully created');
                $rootScope.isAuthenticated = true;
            })
            .error(function(err){
                toastr.error(err);
            });
    };
}]);
mainApp.controller('headerController', ['$rootScope','$scope', 'authToken','$state', function($rootScope, $scope, authToken, $state){
    $rootScope.isAuthenticated = authToken.isAuthenticated();
    $scope.logout = function(){
        authToken.removeToken();
        $rootScope.isAuthenticated = false;
        $state.go('home');
    };
}]);

