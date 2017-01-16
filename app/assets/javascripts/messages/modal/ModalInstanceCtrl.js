angular.module('myApp').controller('ModalInstanceCtrl', function($uibModalInstance, message, MessageService, PaginationService) {
    var $ctrl = this;

    $ctrl.getUsers = MessageService.getUsers
    $ctrl.createOrUpdateMessage = createOrUpdateMessage
    $ctrl.message = MessageService.message;

    function createOrUpdateMessage(message) {
      MessageService.createOrUpdateMessage(message)
      $ctrl.ok();
    }

    $ctrl.ok = function() {
      MessageService.getMessages(PaginationService.pages.outboxPage, "outbox")
      $uibModalInstance.close($ctrl.message);
    };

    $ctrl.cancel = function() {

    };
});
