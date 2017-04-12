define(['app','localstorage'], function(ContactManager){
    ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _){
        var findStorageKey = function(entity){
            if(entity.urlRoot){
                return _.result(entity, "urlRoot")''
            }
            if(entity.url){
                return _.result(entiry, "url");
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
            _.each(section, function(section){
                entity = entity[section];
            });
            return entity;
        }

        Entities.configureStorage = function(constructorString){
            var OldContructor = getEntity(constructorString);
            var newContructor = function(){
                var obj = new OldContructor(arguments[0], arguments[1]);
                _.extend(obj, new StorageMixin(OldContructor.prototype));
                return obj;
            }

            newContructor.prototype = OldContructor.prototype;
            eval(constructorString + " = newContructor;");
        }
    });

    return ContactManager.Entities.configureStorage;
});