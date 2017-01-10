var PaginationCtrl = function($scope, PaginationService, MessageService) {
    var PC = this;

    PC.pageSize = PaginationService.pageSize;

    $scope.pageChanged = function(newPage, loc) {
        (function(loc) {
            MessageService.getMessages(newPage, loc).then(function(response) {
                if (loc == "inbox") {
                    PaginationService.pages.inboxPage = newPage
                    console.log(PaginationService.pages.inboxPage)
                } else if (loc == "outbox") {
                    PaginationService.pages.outboxPage = newPage
                } else if (loc == "sent") {
                    PaginationService.pages.sentPage = newPage
                }
            })
        })(loc);
    }
}

PaginationCtrl.$inject = ['$scope', 'PaginationService', 'MessageService'];

angular.module('myApp')
    .controller('PaginationCtrl', PaginationCtrl)
