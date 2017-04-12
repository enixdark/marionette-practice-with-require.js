define(['marionette'], function(Marionette){
    var ContactManager = new Marionette.Application();

    ContactManager.on("initialize:after", function(){
        console.log("contact Manager has start");
        if(Backbone.history){
            Backbone.history.start();
            if(this.getCurrentRoute() === ""){
                ContactManager.trigger("contact list");
            }
        }
    });
    debugger
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

