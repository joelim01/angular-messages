function MessageService($rootScope, $http, Auth) {
  var MS = this;

  this.newMessage = {
    to: [{text: "tester1"}],
    self: false,
    private: false,
    send_as_group: false,
    subject: "",
    content: ""
  };

  MS.messages = [];

  this.submit = function(message, user) {
    var path = "/api/user/" + user.id + "/messages"
    $http.post(path, message).then(function() {

    }, function () {

    }
  )};


  this.getUsers = function(query) {
    return $http.get('/api/user/autocomplete?query=' + query)
  }

  this.getMessages = function() {
    return Auth.currentUser().then(function(user) {
      var path = '/api/user/' + user.id + '/messages'
      return $http.get(path).then(function(response){
        angular.copy(response.data, MS.messages);
      })
    })
  }
}

MessageService.$inject = ['$rootScope', '$http', 'Auth'];

angular
  .module("myApp")
  .service("MessageService", MessageService)
