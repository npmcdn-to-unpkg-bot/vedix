var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'jquery', 'knockout', './../../_common/js/knockout_ext', './../../_common/js/utils', './../../_common/js/notifications', './../../_common/js/hash-state-controls', './../site', './../_components/voting/voting', './../../_components/comments/comments'], function (require, exports, $, ko, KnockoutExt, Utils, Notifications, HashStateControls, SitePage, Voting, Comments) {
    /**
     * News page
     */
    var NewsPage = (function (_super) {
        __extends(NewsPage, _super);
        function NewsPage(config) {
            var _this = this;
            _super.call(this, config);
            KnockoutExt.initSourceData();
            if (config.is_list) {
                this.news = ko.observableArray([]);
            }
            else if (config.is_record) {
                this.voting = new Voting(config);
                this.comments = new Comments(config);
                this.hits = ko.observable(config.detail ? config.detail.hits : 0);
                this.hitsPrint = ko.computed(function () {
                    return _this.hits() < 10 ? 'менее 10' : String(_this.hits());
                });
            }
            $(document).ready(function () {
                ko.applyBindings(_this);
                HashStateControls.hashChange();
            });
            if ((config.is_record) && (!config.detail.viewed)) {
                $.post('', {
                    jx: 'visit'
                }, function (response) {
                    var data = Utils.getJSONbyText(response);
                    _this.hits(data.hits);
                }, 'text').fail(function (data) {
                    Notifications.show('Error: ajax failed!', Notifications.Types.ntError);
                });
            }
        }
        return NewsPage;
    })(SitePage);
    return NewsPage;
});
