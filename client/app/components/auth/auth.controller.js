(function(){
  var app = angular.module('FlyptoX.auth', []);
  app.controller('AuthController', ['$scope', '$window', '$state', 'Auth',
    function ($scope, $window, $state, Auth) {
      $scope.user = {};
      $scope.visible = false;

      $scope.signin = function () {
        Auth.signin($scope.user)
          .then(function (token) {
            $window.localStorage.setItem('com.flyptox', token);

            $scope.error = ''; // Clear any previous error messages.

            //redirect user after successful login
            $state.go('orderbook');
          })
          .catch(function (error) {
            // error is an HTTP response with a 'data' property. Within 'data',
            // the 'message' property describes the reason for the error.
            $scope.error = error.data.message;
          });
      };

      $scope.signup = function () {
        Auth.signup($scope.user)
          .then(function (token) {
            $window.localStorage.setItem('com.flyptox', token);
            $scope.error = ''; // Clear any previous error messages.
            //redirect user after successful login
            $state.go('orderbook');
          })
          .catch(function (error) {
            // error is an HTTP response with a 'data' property. Within 'data',
            // the 'message' property describes the reason for the error.
            $scope.error = error.data.message;
          });
      };

      $scope.signout = function() {
        Auth.signout();
        //redirect after logout
        $state.go('login');
      };

      $scope.toggle = function() {
        console.log('Test!');
        $scope.visible = !$scope.visible;
      };

  }]);
})();
