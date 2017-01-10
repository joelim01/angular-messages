function MessageService($rootScope, $http, Auth, Flash) {
  var MS = this;

  MS.newMessage = {
      subject: "",
      content: "",
      dt: "",
      dt2: "",
      private: false,
      self: false,
      recipients: []
  }

  MS.messages = {};
  MS.publicMessages = [];
  MS.inboxMessages = {};


  var submitRequest = function(message, path, action) {
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

  MS.createMessage = function(message) {
    var path = "/api/messages"
    return submitRequest(message, path, "post")
  }

  MS.updateMessage = function(message) {
    var path = "/api/messages/" + message.id
    message.recipients_attributes = message.recipients
    message.message_recipients_attributes = message.message_recipients
    return submitRequest(message, path, "patch")
  }

  MS.destroyMessage = function(message, location) {
    if (location === "inbox") {
      var path = "/api/message_recipients/" + message.message_recipients[0].id
    } else if (location === "outbox") {
      var path = "/api/messages/" + message.id
    }
    return submitRequest(message, path, "destroy")
  }

  MS.read = function(message) {
    if (!message.message_recipients[0].read) {
      message.message_recipients[0].read = true
      MS.updateMessage(message);
    }
  }

  MS.getUsers = function(query) {
    return $http.get('/api/user/autocomplete?query=' + query)
  }

  MS.getMessages = function(page, loc) {
    return Auth.currentUser().then(function() {
      var path = '/api/messages?page=' + page + "&location=" + loc
      return $http.get(path).then(function(response) {
        if (loc == "inbox") {
            MS.messages.inboxMessages = response.data
        } else if (loc == "outbox") {
            MS.messages.outboxMessages = response.data
        } else if (loc == "sent") {
            MS.messages.sentMessages = response.data
        }
        return response;
      })
    })
  }

  MS.getPublicMessages = function() {
    var path = '/api/messages/public'
    return $http.get(path).then(function(response){
      angular.copy(response.data, MS.publicMessages);
      return response;
    })
  }

}

MessageService.$inject = ['$rootScope', '$http', 'Auth', 'Flash'];

angular
  .module("myApp")
  .service("MessageService", MessageService)
