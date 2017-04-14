require.config({
    baseUrl: 'assets/js',
    paths: {
        jquery: 'vendor/jquery.min',
        json2: 'vendor/json2',
        backbone: 'vendor/backbone-min',
        marionette: 'vendor/backbone.marionette.min',
        "jquery-ui": "vendor/jqueryui.min",
        localstorage: 'vendor/backbone.localStorage',
        lodash: 'vendor/lodash.min',
        lodash_underscore: 'vendor/lodash.underscore',
        text: 'vendor/text',
        tpl: "vendor/underscore-tpl",
        underscore: 'vendor/underscore-min',
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
        localstorage: ["backbone"],
        tpl: ["text"],
    },
    
});

require(["app"], function(ContactManager){
    ContactManager.start();
});