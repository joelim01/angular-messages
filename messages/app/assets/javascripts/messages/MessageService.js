function MessageService($rootScope, $http, Auth, Flash) {
  var MS = this;

  this.newMessage = {
      to: [],
      self: false,
      private: false,
      send_as_group: false,
      subject: "",
      content: ""
  };

  MS.messages = [];

  MS.submit = function(message, user) {
    var path = "/api/user/" + user.id + "/messages"
     return $http.post(path, message)
            .then(submitMessageComplete)
            .catch(submitMessageFailed);

      function submitMessageComplete(response) {
          return response;
      }
      function submitMessageFailed(error) {
          Flash.create('alert', 'XHR Failed for submit.' + error.data);
      }
  }

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

MessageService.$inject = ['$rootScope', '$http', 'Auth', 'Flash'];

angular
  .module("myApp")
  .service("MessageService", MessageService)
