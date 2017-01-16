(function() {
    'use strict';

    angular.module('myApp')
        .controller('ModalCtrl', ['$uibModal', '$document', '$log', 'MessageService', function($uibModal, $document, $log, MessageService) {
            var $ctrl = this;

            $ctrl.getMessage = MessageService.getMessage
            $ctrl.message = MessageService.message
            $ctrl.resetMessage = MessageService.resetMessage
            $ctrl.updateMessage = MessageService.updateMessage
           

            $ctrl.animationsEnabled = true;

            $ctrl.open = function(id) {

                $ctrl.getMessage(id)

                var modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'assets/messages/modal/_editModal.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: 'MC',
                    resolve: {
                        message: function() {
                            return $ctrl.message;
                        }
                    }
                });
                modalInstance.result.then(function() {

                      $ctrl.updateMessage($ctrl.message).then(function() {
                        $ctrl.resetMessage();
                      })
                }, function() {

                    $ctrl.resetMessage();
                });
            }
        }]);
}());
