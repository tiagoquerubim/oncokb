/**
 * @ngdoc service
 * @name oncokbApp.firebaseConnector
 * @author Jing Su on 2019/01/23
 * @description
 * # FirebaseConnector
 * This service is used for encapsulating all manipulations related to firebase.
 */

'use strict';

angular.module('oncokbApp')
    .service('firebaseConnector', function firebaseConnector($q) {
        function on(path) {
            var defer = $q.defer();
            firebase.database().ref(path).on('value', function(doc) {
                console.log(doc.val());
                defer.resolve(doc.val());
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        function once(path) {
            var defer = $q.defer();
            firebase.database().ref(path).once('value', function(doc) {
                console.log(doc.val());
                defer.resolve(doc.val());
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        function ref(path) {
            return firebase.database().ref(path);
        }
        function set(path, data) {
            var defer = $q.defer();
            firebase.database().ref(path).set(data).then(function (result) {
                defer.resolve(result);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        function off(path) {
            firebase.database().ref(path).off();
        }
        function remove(path) {
            firebase.database().ref(path).remove();
        }
        function update(path, data) {
            var defer = $q.defer();
            firebase.database().ref(path).update(data).then(function() {
                defer.resolve();
            }, function(error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        function addDrug(uuid, drug) {
            return set('Drug/' + uuid, drug);
        }

        return {
            on: on,
            ref: ref,
            set: set,
            off: off,
            once: once,
            remove: remove,
            update: update,
            addDrug: addDrug
        };
    });
