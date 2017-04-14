define(['app',
        'text!apps/contacts/list/templates/layout.tpl',
        'text!apps/contacts/list/templates/panel.tpl',
        'text!apps/contacts/list/templates/none.tpl',
        'text!apps/contacts/list/templates/list.tpl',
        'text!apps/contacts/list/templates/list_item.tpl'], function(ContactManager,layoutTpl, panelTpl, noneTpl, listTpl, listItemTpl){
    ContactManager.module('ContactsApp.List.View', function(View, ContactManager, Backbone, Marionette, $, _){
        var self = View;
        View.Layout = Marionette.LayoutView.extend({
            template: layoutTpl,
            regions: {
                panelRegion: '#panel-region',
                contactsRegion: '#contacts-region'
            }
        });

        View.Panel = Marionette.ItemView.extend({
            template: panelTpl,
            triggers: {
                'click button.js-new': 'contact:new'
            },
            events: {
                'click button.js-filter': 'filterClicked'
            },
            ui: {
                criterion: 'input.js-filter-criterion'
            },
            filterClicked: function(){
                var criterion =this.$('.js-filter-critetion').val();
                this.trigger("contacts:filter", criterion);
            },
            onSetFilterCriterion: function(criterion){
                $(this.ui.criterion).val(criterion);
            }
        });

        View.Contact = Backbone.Marionette.ItemView.extend({
            tagName: 'tr',
            template: listItemTpl,
            triggers: {
                'click td a.js-show': 'contact:show',
                'click td a.js-edit': 'contact:edit',
                'click button.js-delete': 'contact:delete'
            },
            events:{
                'click': 'highlightName'
            },
            flash: function(cssClass){
                var $view = this.$el;
                $view.hide().toggleClass(cssClass).fadeIn(800, function(){
                    setTimeout(function(){
                        $view.toggleClass(cssClass);
                    },500);
                });
            },
            highlightName: function(e){
                this.$el.toggleClass("warning");
            },
            remove: function(){
                this.$el.fadeOut(function(){
                    $(this).remove();
                });
            }
        });
        var noContactsView = Backbone.Marionette.ItemView.extend({
            template: noneTpl,
            tagName: 'tr',
            className: 'alert'
        });

        View.Contacts = Backbone.Marionette.CompositeView.extend({
            tagName: 'table',
            className: 'table table-hover',
            template: listTpl,
            emptyView: noContactsView,
            itemView: View.Contact,
            itemViewContainer: 'tbody',
            initialize: function(){
                this.listenTo(this.collection, 'reset', function(){
                    this.appendHtml = function(collectionView, itemView, index){
                        collectionView.$el.append(itemView.el);
                    }
                });
                // this.render();
            },
            onCompositeCollectionRendered: function(){
                this.appendHtml = function(collectionView,itemView, index){
                    collectionView.$el.prepend(itemView.el);
                }
            }
        });
    });

    return ContactManager.ContactsApp.List.View;
})