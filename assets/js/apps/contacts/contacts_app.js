define(['app'], function(ContactManager){
    ContactManager.module('ContactsApp.List', function(ContactsApp, ContactManager, Backbone, Marionette, $, _){
        ContactsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'contacts': 'listContacts'
            }
        });
        var API = {
            listContacts: function(criterion){
                require(['apps/contacts/list/list_controller'], function(ListController){
                    ListController.listContacts(criterion);
                });
            }
        }

        ContactManager.on('contact:list', function(){
            ContactManager.navigate("contacts");
            API.listContacts();
        });

        ContactManager.addInitializer(function(){
            new ContactsApp.Router({
                controller: API
            });
        });
    });

    return ContactManager.ContactsApp;
});