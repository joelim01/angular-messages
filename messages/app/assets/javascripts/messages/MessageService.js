function MessageService($http, Auth) {
  this.submit = function(message, user) {
    var path = "/api/user/" + user.id + "/messages"
    $http.post(path, message).then(function() {

    },
    function(){

    });

  }
}

MessageService.$inject = ['$http', 'Auth'];

angular
  .module("myApp")
  .service("MessageService", MessageService)
