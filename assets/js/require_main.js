require.config({
    baseUrl: 'assets/js',
    paths: {
        jquery: 'vendor/jquery.min',
        underscore: 'vendor/underscore-min',
        json2: 'vendor/json2',
        backbone: 'vendor/backbone-min',
        marionette: 'vendor/backbone.marionette.min',
        "jquery-ui": "vendor/jqueryui.min",
        localstorage: 'vendor/backbone.localStorage'
    },
    shim:{
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore", "json2"],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        "jquery-ui": ["jquery"],
        localstorage: ["backbone"]
    },
    
});

require(["app"], function(ContactManager){
    ContactManager.start();
});