define(['app','localstorage'], function(ContactManager){
    ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _){
        var self = Entities;
        var findStorageKey = function(entity){
            if(entity.urlRoot){
                return _.result(entity, "urlRoot");
            }
            if(entity.url){
                return _.result(entity, "url");
            }

            throw new Error("Unable to determine storage key");
        }

        var storageCache = {};
        var getStorage = function(key){
            var storage = storageCache[key];
            if(storage){
                return storage;
            }
            var newStorage = new Backbone.LocalStorage(key);
            storageCache[key] = newStorage;
            return newStorage;
        }

        var StorageMixin = function(entityPrototype){
            var storageKey = findStorageKey(entityPrototype);
            return { localStorage: getStorage(storageKey)};
        }

        var getEntity = function(constructorString){
            var sections = constructorString.split("."), entity = window;
            _.each(sections, function(section){
                entity = self[section];
            });
            return entity;
        }

        self.configureStorage = function(constructorString){
            var OldConstructor = getEntity(constructorString);
            var NewConstructor = function(){
                var obj = new OldConstructor(arguments[0], arguments[1]);
                _.extend(obj, new StorageMixin(OldConstructor.prototype));
                return obj;
            }
            NewConstructor.prototype = OldConstructor.prototype;

            eval(constructorString + " = NewConstructor;");
        };

    });

    // return;
    return ContactManager.Entities;
    // return ContactManager.Entities.configureStorage;
});