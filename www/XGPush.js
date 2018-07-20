var exec = require('cordova/exec'),
    cordova = require('cordova'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils');
channel.createSticky('onCordovaXGPushReady');
channel.waitForInitialization('onCordovaXGPushReady');
var XGPush=function(){
    channel.onCordovaReady.subscribe(function () {
        exec(
            function (event) {
                console.log("[XGPush] Event = " + event.type + ": ", event);
                if (event && (event.type in me.channels)) {
                    me.channels[event.type].fire(event);
                }
            },
            null, "XGPush", "addListener", []
            );

        me.registerPush(null, function (info) {
            console.log("[XGPush] RegisterPush: ", info);
            channel.onCordovaXGPushReady.fire();
        }, function (e) {
            utils.alert("[ERROR] RegisterPush: ", e);
        });
    });
};

XGPush.prototype.channels={
    'click': channel.create('click'),
    'message': channel.create('message'),
    'register': channel.create('register'),
    'unRegister': channel.create('unRegister'),
    'show': channel.create('show'),
    'deleteTag': channel.create('deleteTag'),
    'setTag': channel.create('setTag')
};
XGPush.prototype.on = function (type, func) {
    if (type in me.channels) {
        me.channels[type].subscribe(func);
    }
};

XGPush.prototype.un = function (type, func) {
    if (type in this.channels) {
        me.channels[type].unsubscribe(func);
    }
};

XGPush.prototype.registerPush = function (account, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "registerPush", [account]);
};

XGPush.prototype.unRegisterPush = function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "unRegisterPush", []);
};

XGPush.prototype.setTag = function (tagName, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "setTag", [tagName]);
};

XGPush.prototype.deleteTag = function (tagName, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "deleteTag", [tagName]);
};

XGPush.prototype.addLocalNotification = function (type, title, content, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "addLocalNotification", [type, title, content]);
};

XGPush.prototype.enableDebug = function (debugMode, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "enableDebug", [debugMode]);
};

XGPush.prototype.getLaunchInfo = function (successCallback) {
    exec(successCallback, null, "XGPush", "getLaunchInfo", []);
};

XGPush.prototype.getToken = function (successCallback) {
    exec(successCallback, null, "XGPush", "getToken", []);
};

XGPush.prototype.setAccessInfo = function (accessId, accessKey, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "setAccessInfo", [accessId, accessKey]);
};


module.exports=new XGPush();
