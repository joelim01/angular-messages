(function() {
    function PaginationService() {

        var pages = {
            inboxPage: 1,
            outboxPage: 1,
            sentPage: 1
        }

        var pageSize = 15;

        return {
            pages,
            pageSize,
        }
    }

    angular
        .module('myApp')
        .factory('PaginationService', PaginationService)
}());
