//! TrackJS JavaScript error monitoring agent.
//! COPYRIGHT (c) 2017 ALL RIGHTS RESERVED
//! See License at https://trackjs.com/terms/
(function(k,n,m){"use awesome";if(k.trackJs)k.console&&k.console.warn&&k.console.warn("TrackJS global conflict");else{var p=function(a,b,c,d,e){this.util=a;this.onError=b;this.onFault=c;this.options=e;e.enabled&&this.initialize(d)};p.prototype={initialize:function(a){f.forEach(["EventTarget","Node","XMLHttpRequest"],function(b){f.has(a,b+".prototype.addEventListener")&&(b=a[b].prototype,b.hasOwnProperty("addEventListener")&&(this.wrapAndCatch(b,"addEventListener",1),this.wrapRemoveEventListener(b)))},
this);this.wrapAndCatch(a,"setTimeout",0);this.wrapAndCatch(a,"setInterval",0)},wrapAndCatch:function(a,b,c){var d=this,e=a[b];f.isWrappableFunction(e)&&(a[b]=function(){try{var g=Array.prototype.slice.call(arguments),l=g[c],h,y;if(d.options.bindStack)try{throw Error();}catch(k){y=k.stack,h=d.util.isoNow()}var F=function(){try{if(f.isObject(l))return l.handleEvent.apply(l,arguments);if(f.isFunction(l))return l.apply(this,arguments)}catch(a){throw d.onError("catch",a,{bindTime:h,bindStack:y}),f.wrapError(a);
}};if("addEventListener"===b&&(this._trackJsEvt||(this._trackJsEvt=new q),this._trackJsEvt.get(g[0],l,g[2])))return;try{l&&(f.isWrappableFunction(l)||f.isWrappableFunction(l.handleEvent))&&(g[c]=F,"addEventListener"===b&&this._trackJsEvt.add(g[0],l,g[2],g[c]))}catch(k){return e.apply(this,arguments)}return e.apply(this,g)}catch(k){a[b]=e,d.onFault(k)}})},wrapRemoveEventListener:function(a){if(a&&a.removeEventListener&&this.util.hasFunction(a.removeEventListener,"call")){var b=a.removeEventListener;
a.removeEventListener=function(a,d,e){if(this._trackJsEvt){var g=this._trackJsEvt.get(a,d,e);if(g)return this._trackJsEvt.remove(a,d,e),b.call(this,a,g,e)}return b.call(this,a,d,e)}}}};var q=function(){this.events=[]};q.prototype={add:function(a,b,c,d){-1>=this.indexOf(a,b,c)&&(c=this.getEventOptions(c),this.events.push([a,b,c.capture,c.once,c.passive,d]))},get:function(a,b,c){a=this.indexOf(a,b,c);return 0<=a?this.events[a][5]:m},getEventOptions:function(a){var b={capture:!1,once:!1,passive:!1};
return f.isBoolean(a)?f.defaults({},{capture:a},b):f.defaults({},a,b)},indexOf:function(a,b,c){c=this.getEventOptions(c);for(var d=0;d<this.events.length;d++){var e=this.events[d];if(e[0]===a&&e[1]===b&&e[2]===c.capture&&e[3]===c.once&&e[4]===c.passive)return d}return-1},remove:function(a,b,c){a=this.indexOf(a,b,c);0<=a&&this.events.splice(a,1)}};var t=function(a){this.initCurrent(a)};t.prototype={current:{},initOnly:{cookie:!0,enabled:!0,token:!0,callback:{enabled:!0},console:{enabled:!0},navigation:{enabled:!0},
network:{enabled:!0,fetch:!0},visitor:{enabled:!0},window:{enabled:!0,promise:!0}},defaults:{application:"",cookie:!1,dedupe:!0,enabled:!0,errorURL:"https://capture.trackjs.com/capture",errorNoSSLURL:"http://capture.trackjs.com/capture",faultURL:"https://usage.trackjs.com/fault.gif",onError:function(){return!0},serialize:function(a){function b(a){var c="<"+a.tagName.toLowerCase();a=a.attributes||[];for(var b=0;b<a.length;b++)c+=" "+a[b].name+'="'+a[b].value+'"';return c+">"}if(""===a)return"Empty String";
if(a===m)return"undefined";if(f.isString(a)||f.isNumber(a)||f.isBoolean(a)||f.isFunction(a))return""+a;if(f.isElement(a))return b(a);var c;try{c=JSON.stringify(a,function(a,c){return c===m?"undefined":f.isNumber(c)&&isNaN(c)?"NaN":f.isError(c)?{name:c.name,message:c.message,stack:c.stack}:f.isElement(c)?b(c):c})}catch(e){c="";for(var d in a)a.hasOwnProperty(d)&&(c+=',"'+d+'":"'+a[d]+'"');c=c?"{"+c.replace(",","")+"}":"Unserializable Object"}return c.replace(/"undefined"/g,"undefined").replace(/"NaN"/g,
"NaN")},sessionId:"",token:"",userId:"",version:"",callback:{enabled:!0,bindStack:!1},console:{enabled:!0,display:!0,error:!0,warn:!1,watch:["log","debug","info","warn","error"]},navigation:{enabled:!0},network:{enabled:!0,error:!0,fetch:!0},visitor:{enabled:!0},usageURL:"https://usage.trackjs.com/usage.gif",window:{enabled:!0,promise:!0}},initCurrent:function(a){if(this.validate(a,this.defaults,"config",{}))return this.current=f.defaultsDeep({},a,this.defaults),!0;this.current=f.defaultsDeep({},
this.defaults);console.log("init current config",this.current);return!1},setCurrent:function(a){return this.validate(a,this.defaults,"config",this.initOnly)?(this.current=f.defaultsDeep({},a,this.current),!0):!1},validate:function(a,b,c,d){var e=!0;c=c||"";d=d||{};for(var g in a)if(a.hasOwnProperty(g))if(b.hasOwnProperty(g)){var f=typeof b[g];f!==typeof a[g]?(console.warn(c+"."+g+": property must be type "+f+"."),e=!1):"[object Array]"!==Object.prototype.toString.call(a[g])||this.validateArray(a[g],
b[g],c+"."+g)?"[object Object]"===Object.prototype.toString.call(a[g])?e=this.validate(a[g],b[g],c+"."+g,d[g]):d.hasOwnProperty(g)&&(console.warn(c+"."+g+": property cannot be set after load."),e=!1):e=!1}else console.warn(c+"."+g+": property not supported."),e=!1;return e},validateArray:function(a,b,c){var d=!0;c=c||"";for(var e=0;e<a.length;e++)f.contains(b,a[e])||(console.warn(c+"["+e+"]: invalid value: "+a[e]+"."),d=!1);return d}};var u=function(a,b,c,d,e,g,f){this.util=a;this.log=b;this.onError=
c;this.onFault=d;this.serialize=e;f.enabled&&(g.console=this.wrapConsoleObject(g.console,f))};u.prototype={wrapConsoleObject:function(a,b){a=a||{};var c=a.log||function(){},d=this,e;for(e=0;e<b.watch.length;e++)(function(e){var l=a[e]||c;a[e]=function(){try{var a=Array.prototype.slice.call(arguments);d.log.add("c",{timestamp:d.util.isoNow(),severity:e,message:d.serialize(1===a.length?a[0]:a)});if(b[e])if(f.isError(a[0])&&1===a.length)d.onError("console",a[0]);else try{throw Error(d.serialize(1===
a.length?a[0]:a));}catch(c){d.onError("console",c)}b.display&&(d.util.hasFunction(l,"apply")?l.apply(this,a):l(a[0]))}catch(c){d.onFault(c)}}})(b.watch[e]);return a},report:function(){return this.log.all("c")}};var v=function(a,b,c,d,e){this.config=a;this.util=b;this.log=c;this.window=d;this.document=e;this.correlationId=this.token=null;this.initialize()};v.prototype={initialize:function(){this.token=this.getCustomerToken();this.correlationId=this.getCorrelationId()},getCustomerToken:function(){if(this.config.current.token)return this.config.current.token;
var a=this.document.getElementsByTagName("script");return a[a.length-1].getAttribute("data-token")},getCorrelationId:function(){var a;if(!this.config.current.cookie)return this.util.uuid();try{a=this.document.cookie.replace(/(?:(?:^|.*;\s*)TrackJS\s*\=\s*([^;]*).*$)|^.*$/,"$1"),a||(a=this.util.uuid(),this.document.cookie="TrackJS="+a+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/")}catch(b){a=this.util.uuid()}return a},report:function(){return{application:this.config.current.application,correlationId:this.correlationId,
sessionId:this.config.current.sessionId,token:this.token,userId:this.config.current.userId,version:this.config.current.version}}};var w=function(a){this.loadedOn=(new Date).getTime();this.window=a};w.prototype={discoverDependencies:function(){var a,b={};this.window.jQuery&&this.window.jQuery.fn&&this.window.jQuery.fn.jquery&&(b.jQuery=this.window.jQuery.fn.jquery);this.window.jQuery&&this.window.jQuery.ui&&this.window.jQuery.ui.version&&(b.jQueryUI=this.window.jQuery.ui.version);this.window.angular&&
this.window.angular.version&&this.window.angular.version.full&&(b.angular=this.window.angular.version.full);for(a in this.window)if("_trackJs"!==a&&"_trackJS"!==a&&"_trackjs"!==a&&"webkitStorageInfo"!==a&&"webkitIndexedDB"!==a&&"top"!==a&&"parent"!==a&&"frameElement"!==a)try{if(this.window[a]){var c=this.window[a].version||this.window[a].Version||this.window[a].VERSION;"string"===typeof c&&(b[a]=c)}}catch(d){}return b},report:function(){return{age:(new Date).getTime()-this.loadedOn,dependencies:this.discoverDependencies(),
userAgent:this.window.navigator.userAgent,viewportHeight:this.window.document.documentElement.clientHeight,viewportWidth:this.window.document.documentElement.clientWidth}}};var z=function(a){this.util=a;this.appender=[];this.maxLength=30};z.prototype={all:function(a){var b=[],c,d;for(d=0;d<this.appender.length;d++)(c=this.appender[d])&&c.category===a&&b.push(c.value);return b},clear:function(){this.appender.length=0},truncate:function(){this.appender.length>this.maxLength&&(this.appender=this.appender.slice(Math.max(this.appender.length-
this.maxLength,0)))},add:function(a,b){var c=this.util.uuid();this.appender.push({key:c,category:a,value:b});this.truncate();return c},get:function(a,b){var c,d;for(d=0;d<this.appender.length;d++)if(c=this.appender[d],c.category===a&&c.key===b)return c.value;return!1}};var A=function(a,b){this.log=a;this.options=b;b.enabled&&this.watch()};A.prototype={isCompatible:function(a){a=a||k;return!f.has(a,"chrome.app.runtime")&&f.has(a,"addEventListener")&&f.has(a,"history.pushState")},record:function(a,
b,c){this.log.add("h",{type:a,from:f.truncate(b,250),to:f.truncate(c,250),on:f.isoNow()})},report:function(){return this.log.all("h")},watch:function(){if(this.isCompatible()){var a=this,b=f.getLocationURL().relative;k.addEventListener("popstate",function(){var c=f.getLocationURL().relative;a.record("popState",b,c);b=c},!0);f.forEach(["pushState","replaceState"],function(c){f.patch(history,c,function(d){return function(){b=f.getLocationURL().relative;var e=d.apply(this,arguments),g=f.getLocationURL().relative;
a.record(c,b,g);b=g;return e}})})}}};var B=function(a,b,c,d,e,g){this.util=a;this.log=b;this.onError=c;this.onFault=d;this.window=e;this.options=g;g.enabled&&this.initialize(e)};B.prototype={initialize:function(a){a.XMLHttpRequest&&this.util.hasFunction(a.XMLHttpRequest.prototype.open,"apply")&&this.watchNetworkObject(a.XMLHttpRequest);a.XDomainRequest&&this.util.hasFunction(a.XDomainRequest.prototype.open,"apply")&&this.watchNetworkObject(a.XDomainRequest);this.options.fetch&&f.isWrappableFunction(a.fetch)&&
this.watchFetch()},watchFetch:function(){var a=this.log,b=this.options,c=this.onError;f.patch(k,"fetch",function(d){return function(e,g){var l=e instanceof Request?e:new Request(e,g),h=d.apply(k,arguments);h._tjsId=a.add("n",{type:"fetch",startedOn:f.isoNow(),method:l.method,url:l.url});return h.then(function(d){var e=a.get("n",h._tjsId);e&&(f.defaults(e,{completedOn:f.isoNow(),statusCode:d.status,statusText:d.statusText}),b.error&&400<=d.status&&c("ajax",e.statusCode+" "+e.statusText+": "+e.method+
" "+e.url));return d})["catch"](function(d){var e=a.get("n",h._tjsId);e&&(f.defaults(e,{completedOn:f.isoNow(),statusCode:0,statusText:(d||"").toString()}),b.error&&c("ajax",d));throw d;})}})},watchNetworkObject:function(a){var b=this,c=a.prototype.open,d=a.prototype.send;a.prototype.open=function(a,b){var d=(b||"").toString();0>d.indexOf("localhost:0")&&(this._trackJs={method:a,url:d});return c.apply(this,arguments)};a.prototype.send=function(){try{if(!this._trackJs)return d.apply(this,arguments);
this._trackJs.logId=b.log.add("n",{type:"xhr",startedOn:b.util.isoNow(),method:this._trackJs.method,url:this._trackJs.url});b.listenForNetworkComplete(this)}catch(a){b.onFault(a)}return d.apply(this,arguments)};return a},listenForNetworkComplete:function(a){var b=this;b.window.ProgressEvent&&a.addEventListener&&a.addEventListener("readystatechange",function(){4===a.readyState&&b.finalizeNetworkEvent(a)},!0);a.addEventListener?a.addEventListener("load",function(){b.finalizeNetworkEvent(a);b.checkNetworkFault(a)},
!0):setTimeout(function(){try{var c=a.onload;a.onload=function(){b.finalizeNetworkEvent(a);b.checkNetworkFault(a);"function"===typeof c&&b.util.hasFunction(c,"apply")&&c.apply(a,arguments)};var d=a.onerror;a.onerror=function(){b.finalizeNetworkEvent(a);b.checkNetworkFault(a);"function"===typeof oldOnError&&d.apply(a,arguments)}}catch(e){b.onFault(e)}},0)},finalizeNetworkEvent:function(a){if(a._trackJs){var b=this.log.get("n",a._trackJs.logId);b&&(b.completedOn=this.util.isoNow(),b.statusCode=1223==
a.status?204:a.status,b.statusText=1223==a.status?"No Content":a.statusText)}},checkNetworkFault:function(a){if(this.options.error&&400<=a.status&&1223!=a.status){var b=a._trackJs||{};this.onError("ajax",a.status+" "+a.statusText+": "+b.method+" "+b.url)}},report:function(){return this.log.all("n")}};var x=function(a,b){this.util=a;this.config=b;this.disabled=!1;this.throttleStats={attemptCount:0,throttledCount:0,lastAttempt:(new Date).getTime()};k.JSON&&k.JSON.stringify||(this.disabled=!0)};x.prototype=
{errorEndpoint:function(a){var b=this.config.current.errorURL;this.util.testCrossdomainXhr()||-1!==k.location.protocol.indexOf("https")||(b=this.config.current.errorNoSSLURL);return b+"?token="+a},usageEndpoint:function(a){return this.appendObjectAsQuery(a,this.config.current.usageURL)},trackerFaultEndpoint:function(a){return this.appendObjectAsQuery(a,this.config.current.faultURL)},appendObjectAsQuery:function(a,b){b+="?";for(var c in a)a.hasOwnProperty(c)&&(b+=encodeURIComponent(c)+"="+encodeURIComponent(a[c])+
"&");return b},getCORSRequest:function(a,b){var c;this.util.testCrossdomainXhr()?(c=new k.XMLHttpRequest,c.open(a,b),c.setRequestHeader("Content-Type","text/plain")):"undefined"!==typeof k.XDomainRequest?(c=new k.XDomainRequest,c.open(a,b)):c=null;return c},sendTrackerFault:function(a){this.throttle(a)||((new Image).src=this.trackerFaultEndpoint(a))},sendUsage:function(a){(new Image).src=this.usageEndpoint(a)},sendError:function(a,b){var c=this;if(!this.disabled&&!this.throttle(a))try{var d=this.getCORSRequest("POST",
this.errorEndpoint(b));d.onreadystatechange=function(){4===d.readyState&&200!==d.status&&(c.disabled=!0)};d._trackJs=m;d.send(k.JSON.stringify(a))}catch(e){throw this.disabled=!0,e;}},throttle:function(a){var b=(new Date).getTime();this.throttleStats.attemptCount++;if(this.throttleStats.lastAttempt+1E3>=b){if(this.throttleStats.lastAttempt=b,10<this.throttleStats.attemptCount)return this.throttleStats.throttledCount++,!0}else a.throttled=this.throttleStats.throttledCount,this.throttleStats.attemptCount=
0,this.throttleStats.lastAttempt=b,this.throttleStats.throttledCount=0;return!1}};var f=function(){function a(c,d,e,g){e=e||!1;g=g||0;f.forEach(d,function(d){f.forEach(f.keys(d),function(f){null===d[f]||d[f]===m?c[f]=d[f]:e&&10>g&&"[object Object]"===b(d[f])?(c[f]=c[f]||{},a(c[f],[d[f]],e,g+1)):c.hasOwnProperty(f)||(c[f]=d[f])})});return c}function b(a){return Object.prototype.toString.call(a)}return{addEventListenerSafe:function(a,b,e,f){a.addEventListener?a.addEventListener(b,e,f):a.attachEvent&&
a.attachEvent("on"+b,e)},afterDocumentLoad:function(a){var b=!1;"complete"===n.readyState?f.defer(a):(f.addEventListenerSafe(n,"readystatechange",function(){"complete"!==n.readyState||b||(f.defer(a),b=!0)}),setTimeout(function(){b||(f.defer(a),b=!0)},1E4))},bind:function(a,b){return function(){return a.apply(b,Array.prototype.slice.call(arguments))}},contains:function(a,b){var e;for(e=0;e<a.length;e++)if(a[e]===b)return!0;return!1},defaults:function(c){return a(c,Array.prototype.slice.call(arguments,
1),!1)},defaultsDeep:function(c){return a(c,Array.prototype.slice.call(arguments,1),!0)},defer:function(a,b){setTimeout(function(){a.apply(b)})},forEach:function(a,b,e){if(a.forEach)return a.forEach(b,e);for(var f=0;f<a.length;)b.call(e,a[f],f,a),f++},getLocation:function(){return k.location.toString().replace(/ /g,"%20")},getLocationURL:function(){return f.parseURL(f.getLocation())},has:function(a,b){for(var e=b.split("."),f=a,l=0;l<e.length;l++)if(f[e[l]])f=f[e[l]];else return!1;return!0},hasFunction:function(a,
b){try{return!!a[b]}catch(e){return!1}},isArray:function(a){return"[object Array]"===b(a)},isBoolean:function(a){return"boolean"===typeof a||f.isObject(a)&&"[object Boolean]"===b(a)},isBrowserIE:function(a){a=a||k.navigator.userAgent;var b=a.match(/Trident\/([\d.]+)/);return b&&"7.0"===b[1]?11:(a=a.match(/MSIE ([\d.]+)/))?parseInt(a[1],10):!1},isBrowserSupported:function(){var a=this.isBrowserIE();return!a||8<=a},isError:function(a){if(!f.isObject(a))return!1;var d=b(a);return"[object Error]"===d||
"[object DOMException]"===d||f.isString(a.name)&&f.isString(a.message)},isElement:function(a){return f.isObject(a)&&1===a.nodeType},isFunction:function(a){return!(!a||"function"!==typeof a)},isNumber:function(a){return"number"===typeof a||f.isObject(a)&&"[object Number]"===b(a)},isObject:function(a){return!(!a||"object"!==typeof a)},isString:function(a){return"string"===typeof a||!f.isArray(a)&&f.isObject(a)&&"[object String]"===b(a)},isWrappableFunction:function(a){return this.isFunction(a)&&this.hasFunction(a,
"apply")},isoNow:function(){var a=new Date;return a.toISOString?a.toISOString():a.getUTCFullYear()+"-"+this.pad(a.getUTCMonth()+1)+"-"+this.pad(a.getUTCDate())+"T"+this.pad(a.getUTCHours())+":"+this.pad(a.getUTCMinutes())+":"+this.pad(a.getUTCSeconds())+"."+String((a.getUTCMilliseconds()/1E3).toFixed(3)).slice(2,5)+"Z"},keys:function(a){if(!f.isObject(a))return[];var b=[],e;for(e in a)a.hasOwnProperty(e)&&b.push(e);return b},noop:function(){},pad:function(a){a=String(a);1===a.length&&(a="0"+a);return a},
parseURL:function(a){var b=a.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!b)return{};b={protocol:b[2],host:b[4],path:b[5],query:b[6],hash:b[8]};b.origin=(b.protocol||"")+"://"+(b.host||"");b.relative=(b.path||"")+(b.query||"")+(b.hash||"");b.href=a;return b},patch:function(a,b,e){a[b]=e(a[b]||f.noop)},testCrossdomainXhr:function(){return"withCredentials"in new XMLHttpRequest},truncate:function(a,b){if(a.length<=b)return a;var e=a.length-b;return a.substr(0,b)+"...{"+
e+"}"},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})},wrapError:function(a){if(a.innerError)return a;var b=Error("TrackJS Caught: "+(a.message||a));b.description="TrackJS Caught: "+a.description;b.file=a.file;b.line=a.line||a.lineNumber;b.column=a.column||a.columnNumber;b.stack=a.stack;b.innerError=a;return b}}}(),C=function(a,b,c,d,e,f){this.util=a;this.log=b;this.onError=c;this.onFault=d;this.options=
f;this.document=e;f.enabled&&this.initialize(e)};C.prototype={initialize:function(a){var b=this.util.bind(this.onDocumentClicked,this),c=this.util.bind(this.onInputChanged,this);a.addEventListener?(a.addEventListener("click",b,!0),a.addEventListener("blur",c,!0)):a.attachEvent&&(a.attachEvent("onclick",b),a.attachEvent("onfocusout",c))},onDocumentClicked:function(a){try{var b=this.getElementFromEvent(a);b&&b.tagName&&(this.isDescribedElement(b,"a")||this.isDescribedElement(b,"button")||this.isDescribedElement(b,
"input",["button","submit"])?this.writeVisitorEvent(b,"click"):this.isDescribedElement(b,"input",["checkbox","radio"])&&this.writeVisitorEvent(b,"input",b.value,b.checked))}catch(c){this.onFault(c)}},onInputChanged:function(a){try{var b=this.getElementFromEvent(a);if(b&&b.tagName)if(this.isDescribedElement(b,"textarea"))this.writeVisitorEvent(b,"input",b.value);else if(this.isDescribedElement(b,"select")&&b.options&&b.options.length)this.onSelectInputChanged(b);else this.isDescribedElement(b,"input")&&
!this.isDescribedElement(b,"input",["button","submit","hidden","checkbox","radio"])&&this.writeVisitorEvent(b,"input",b.value)}catch(c){this.onFault(c)}},onSelectInputChanged:function(a){if(a.multiple)for(var b=0;b<a.options.length;b++)a.options[b].selected&&this.writeVisitorEvent(a,"input",a.options[b].value);else 0<=a.selectedIndex&&a.options[a.selectedIndex]&&this.writeVisitorEvent(a,"input",a.options[a.selectedIndex].value)},writeVisitorEvent:function(a,b,c,d){"password"===this.getElementType(a)&&
(c=m);this.log.add("v",{timestamp:this.util.isoNow(),action:b,element:{tag:a.tagName.toLowerCase(),attributes:this.getElementAttributes(a),value:this.getMetaValue(c,d)}})},getElementFromEvent:function(a){return a.target||n.elementFromPoint(a.clientX,a.clientY)},isDescribedElement:function(a,b,c){if(a.tagName.toLowerCase()!==b.toLowerCase())return!1;if(!c)return!0;a=this.getElementType(a);for(b=0;b<c.length;b++)if(c[b]===a)return!0;return!1},getElementType:function(a){return(a.getAttribute("type")||
"").toLowerCase()},getElementAttributes:function(a){for(var b={},c=0;c<a.attributes.length;c++)"value"!==a.attributes[c].name.toLowerCase()&&(b[a.attributes[c].name]=a.attributes[c].value);return b},getMetaValue:function(a,b){return a===m?m:{length:a.length,pattern:this.matchInputPattern(a),checked:b}},matchInputPattern:function(a){return""===a?"empty":/^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(a)?"email":
/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(a)||/^(\d{4}[\/\-](0?[1-9]|1[012])[\/\-]0?[1-9]|[12][0-9]|3[01])$/.test(a)?"date":/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(a)?"usphone":/^\s*$/.test(a)?"whitespace":/^\d*$/.test(a)?"numeric":/^[a-zA-Z]*$/.test(a)?
"alpha":/^[a-zA-Z0-9]*$/.test(a)?"alphanumeric":"characters"},report:function(){return this.log.all("v")}};var D=function(a,b,c,d,e){this.onError=a;this.onFault=b;this.serialize=c;e.enabled&&this.watchWindowErrors(d);e.promise&&this.watchPromiseErrors(d)};D.prototype={watchPromiseErrors:function(a){var b=this;a.addEventListener?a.addEventListener("unhandledrejection",function(a){a=a||{};a=a.detail?a.detail.reason:a.reason;if(a!==m){if(!f.isError(a))try{throw Error(b.serialize(a));}catch(d){a=d}b.onError("promise",
a)}}):a.onunhandledrejection=function(a){b.onError("promise",a)}},watchWindowErrors:function(a){var b=this;f.patch(a,"onerror",function(a){return function(d,e,f,l,h){try{h=h||{},h.message=h.message||b.serialize(d),h.name=h.name||"Error",h.line=h.line||parseInt(f,10)||null,h.column=h.column||parseInt(l,10)||null,"[object Event]"!==Object.prototype.toString.call(d)||e?h.file=h.file||b.serialize(e):h.file=(d.target||{}).src,b.onError("window",h)}catch(k){b.onFault(k)}a.apply(this,arguments)}})}};var E=
function(a,b,c,d,e,g,l,h,k,m,n,p,q,x,t,u,v){try{if(this.window=t,this.document=u,this.util=f,this.onError=this.util.bind(this.onError,this),this.onFault=this.util.bind(this.onFault,this),this.serialize=this.util.bind(this.serialize,this),this.config=new d(a),this.transmitter=new n(this.util,this.config),this.log=new h(this.util),this.api=new b(this.config,this.util,this.onError,this.serialize),this.metadata=new k(this.serialize),this.environment=new l(this.window),this.customer=new g(this.config,
this.util,this.log,this.window,this.document),this.customer.token&&(this.apiConsoleWatcher=new e(this.util,this.log,this.onError,this.onFault,this.serialize,this.api,this.config.defaults.console),this.config.current.enabled&&(this.windowConsoleWatcher=new e(this.util,this.log,this.onError,this.onFault,this.serialize,this.window,this.config.current.console),this.util.isBrowserSupported()))){this.callbackWatcher=new c(this.util,this.onError,this.onFault,this.window,this.config.current.callback);this.visitorWatcher=
new p(this.util,this.log,this.onError,this.onFault,this.document,this.config.current.visitor);this.navigationWatcher=new v(this.log,this.config.current.navigation);this.networkWatcher=new m(this.util,this.log,this.onError,this.onFault,this.window,this.config.current.network);this.windowWatcher=new q(this.onError,this.onFault,this.serialize,this.window,this.config.current.window);var r=this;f.afterDocumentLoad(function(){r.transmitter.sendUsage({token:r.customer.token,correlationId:r.customer.correlationId,
application:r.config.current.application,x:r.util.uuid()})})}}catch(w){this.onFault(w)}};E.prototype={reveal:function(){if(this.customer.token)return this.api.addMetadata=this.metadata.addMetadata,this.api.removeMetadata=this.metadata.removeMetadata,this.api;this.config.current.enabled&&this.window.console&&this.window.console.warn&&this.window.console.warn("TrackJS could not find a token");return m},onError:function(){var a,b=!1;return function(c,d,e){if(f.isBrowserSupported()&&this.config.current.enabled)try{if(e=
e||{bindStack:null,bindTime:null,force:!1},d&&f.isError(d)||(d={name:"Error",message:this.serialize(d,e.force)}),-1===d.message.indexOf("TrackJS Caught"))if(b&&-1!==d.message.indexOf("Script error"))b=!1;else{var g=f.defaultsDeep({},{bindStack:e.bindStack,bindTime:e.bindTime,column:d.column||d.columnNumber,console:this.windowConsoleWatcher.report(),customer:this.customer.report(),entry:c,environment:this.environment.report(),file:d.file||d.fileName,line:d.line||d.lineNumber,message:d.message,metadata:this.metadata.report(),
nav:this.navigationWatcher.report(),network:this.networkWatcher.report(),url:(k.location||"").toString(),stack:d.stack,timestamp:this.util.isoNow(),visitor:this.visitorWatcher.report(),version:"2.8.5"});if(!e.force)try{if(!this.config.current.onError(g,d))return}catch(m){g.console.push({timestamp:this.util.isoNow(),severity:"error",message:m.message});var l=this;setTimeout(function(){l.onError("catch",m,{force:!0})},0)}if(this.config.current.dedupe){var h=(g.message+g.stack).substr(0,1E4);if(h===
a)return;a=h}this.log.clear();setTimeout(function(){b=!1});b=!0;this.transmitter.sendError(g,this.customer.token)}}catch(m){this.onFault(m)}}}(),onFault:function(a){var b=this.transmitter||new x;a=a||{};a={token:this.customer.token,file:a.file||a.fileName,msg:a.message||"unknown",stack:(a.stack||"unknown").substr(0,500),url:this.window.location,v:"2.8.5",h:"6d337e9db22126de34c9035a3cd0b11c81d3a48f",x:this.util.uuid()};b.sendTrackerFault(a)},serialize:function(a,b){if(this.config.current.serialize&&
!b)try{return this.config.current.serialize(a)}catch(c){this.onError("catch",c,{force:!0})}return this.config.defaults.serialize(a)}};p=new E(k._trackJs||k._trackJS||k._trackjs||{},function(a,b,c,d){return{attempt:function(a,d){try{var f=Array.prototype.slice.call(arguments,2);return a.apply(d||this,f)}catch(h){throw c("catch",h),b.wrapError(h);}},configure:function(b){return a.setCurrent(b)},track:function(a){var b=d(a);a=a||{};if(!a.stack)try{throw Error(b);}catch(f){a=f}c("direct",a)},watch:function(a,
d){return function(){try{var f=Array.prototype.slice.call(arguments,0);return a.apply(d||this,f)}catch(h){throw c("catch",h),b.wrapError(h);}}},watchAll:function(a){var d=Array.prototype.slice.call(arguments,1),f;for(f in a)"function"===typeof a[f]&&(b.contains(d,f)||function(){var d=a[f];a[f]=function(){try{var a=Array.prototype.slice.call(arguments,0);return d.apply(this,a)}catch(e){throw c("catch",e),b.wrapError(e);}}}());return a},hash:"6d337e9db22126de34c9035a3cd0b11c81d3a48f",version:"2.8.5"}},
p,t,u,v,w,z,function(a){var b={};return{addMetadata:function(a,d){b[a]=d},removeMetadata:function(a){delete b[a]},report:function(){var c=[],d;for(d in b)b.hasOwnProperty(d)&&c.push({key:d,value:a(b[d])});return c},store:b}},B,x,C,D,q,k,n,A);k.trackJs=p.reveal()}})(window,document);
