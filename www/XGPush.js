var exec = require('cordova/exec');
var channel = require('cordova/channel');
function XGPush(){
}
XGPush.prototype.channels = {
    'xgpush.click': channel.create('click'),//通知被点击	
    'xgpush.message': channel.create('message'),//接收到新消息时解法	
    'xgpush.register': channel.create('register'),//注册账号事件	
    'xgpush.unRegister': channel.create('unRegister'),//反注册事件	
    'xgpush.show': channel.create('show'),//通知成功显示
    'xgpush.deleteTag': channel.create('deleteTag'),//删除标签事件	
    'xgpush.setTag': channel.create('setTag')//设计标签事件
};

//注册监听
//注册监听
XGPush.prototype.init =function (){
    exec((event)=>{
        if (event && ("xgpush."+event.type in this.channels)) {
            this.channels["xgpush."+event.type].fire(event);
        }
    },null, "XGPush", "addListener", []);
}
XGPush.prototype.on=function (type, func) {
    if (type in this.channels) {
        this.channels[type].subscribe(func);
    }
};
XGPush.prototype.un = function (type, func) {
    if (type in this.channels) {
        this.channels[type].unsubscribe(func);
    }
};

//绑定账号注册
XGPush.prototype.registerPush=function (account, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "registerPush", [account]);
};

//反注册
XGPush.prototype.unRegisterPush=function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "unRegisterPush", []);
};
//设置标签
XGPush.prototype.setTag=function (tagName, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "setTag", [tagName]);
};
//删除标签
XGPush.prototype.deleteTag=function (tagName, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "deleteTag", [tagName]);
};
//添加本地通知
XGPush.prototype.addLocalNotification=function (type, title, content, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "addLocalNotification", [type, title, content]);
};
//开启调试模式
XGPush.prototype.enableDebug=function (debugMode, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "enableDebug", [debugMode]);
};
XGPush.prototype.getLaunchInfo=function (successCallback) {
    exec(successCallback, null, "XGPush", "getLaunchInfo", []);
};
//获取设备Token
XGPush.prototype.getToken=function (successCallback) {
    exec(successCallback, null, "XGPush", "getToken", []);
};
//设置访问ID，KEY
XGPush.prototype.setAccessInfo=function (accessId, accessKey, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "XGPush", "setAccessInfo", [accessId, accessKey]);
};
module.exports = new XGPush();