"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}(),_sample=require("./sample"),_sample2=_interopRequireDefault(_sample);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var CLASENAME="timestamp_image",Index=function(){function t(e){_classCallCheck(this,t),this.imageDom=e,this.src=this.imageDom.src,this.setEvent()}return _createClass(t,[{key:"setEvent",value:function(){this.src="http://sp.black.local.qw.to//img/uplcmn/2018/0320/my_ex_20180323_top.jpg?1213214133241"}},{key:"isExist",value:function(e){var t=!1,n=new Image;return n.src=e,(0<=n.fileSize||0<=n.width&&0<=n.height)&&(t=!0),t}},{key:"assetTimestamp",value:function(e){var t=this.getLastModified(e);if(t)return new Date(t).getTime()}},{key:"getLastModified",value:function(e){var t=new XMLHttpRequest;t.open("head",e,!0),t.send(),t.onreadystatechange=function(){if(4===t.readyState)return t.getResponseHeader("Last-Modified")}}}]),t}();exports.default=Index,Object.defineProperty(exports,"__esModule",{value:!0});_createClass=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Sample=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"print",value:function(){console.log("hello")}}]),e}();exports.default=Sample;
//# sourceMappingURL=sourceMap/js/all.js.map