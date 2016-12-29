function MessageService($rootScope, $http, Auth, Flash) {
  var MS = this;

  MS.newMessage = {
      to: [],
      self: false,
      private: false,
      send_as_group: false,
      subject: "",
      content: ""
  };

  MS.messages = [];

  var submitRequest = function(message, user, path, action) {
    var jsonMessage = { "message": message }
    if (action == 'post'){
        return $http.post(path, jsonMessage)
           .then(submitRequestComplete)
           .catch(submitRequestFailed);
    } else if (action == 'patch') {
        return $http.patch(path, jsonMessage)
           .then(submitRequestComplete)
           .catch(submitRequestFailed);
    } else if (action == 'destroy') {
        return $http.delete(path)
         .then(submitRequestComplete)
         .catch(submitRequestFailed);
    }
      function submitRequestComplete(response) {
        return response;
    }
      function submitRequestFailed(error) {
        Flash.create('alert', 'XHR Failed for submit.' + error.data);
        return error;
    }
  }

  MS.create = function(message, user) {
    var path = "/api/user/" + user.id + "/messages"
    return submitRequest(message, user, path, "post")
  }

  MS.update = function(message, user) {
    var path = "/api/user/" + user.id + "/messages/" + message.id
    return submitRequest(message, user, path, "patch")
  }

  MS.destroy = function(message, user, location) {
    if (location === "inbox") {
      var path = "/api/message_recipients/" + message.message_recipients[0].id
    } else if (location === "outbox") {
      var path = "/api/user/" + user.id + "/messages/" + message.id
    }
    return submitRequest(message, user, path, "destroy")
  }

  MS.read = function(message) {
    if (!message.message_recipients[0].read) {
      message.message_recipients[0].read = true
      MS.update(message, $rootScope.currentUser);
    }
  }

  MS.getUsers = function(query) {
    return $http.get('/api/user/autocomplete?query=' + query)
  }

  MS.getMessages = function() {
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
