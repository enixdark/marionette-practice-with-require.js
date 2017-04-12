define(['marionette','apps/config/marionette/regions/dialog'], function(Marionette){
    var ContactManager = new Marionette.Application();

    ContactManager.on("start", function(){
        console.log("contact Manager has start");
        var fetchingContacts = ContactManager.request("contact.entities");
        $.when(fetchingContacts).done(function(contacts){
            console.log(contacts);
        });
        if(Backbone.history){
            Backbone.history.start();
            if(this.getCurrentRoute() === ""){
                ContactManager.trigger("contact list");
            }
        }
    });
    ContactManager.addRegions({
        headerRegion: "#header-region",
        mainRegion: '#main-region',
        dialogRegion: Marionette.Region.Dialog.extend({
            el: '#dialog-region'
        })
    });

    ContactManager.navigate = function(route, options){
        options || (options = {})
        Backbone.history.navigate(route, options);
    };
    
    ContactManager.getCurrentRoute = function(){
        return Backbone.history.fragment;
    };

    return ContactManager;
});


