/// <reference path="settings.js" />
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getXY(event) {
  var xyInfo = event;
  var touches = event.originalEvent.touches;
  if (touches) xyInfo = touches[0];

  if (Settings.EnableGpuScroll)
    rawX = x = xyInfo.pageX - screenOffsetLeft + gameScrollLeft, rawY = y = xyInfo.pageY - screenOffsetTop + gameScrollTop;
  else
    rawX = x = xyInfo.pageX - screenOffsetLeft, rawY = y = xyInfo.pageY - screenOffsetTop;
  x += $('#canvas').scrollLeft() - canvasMarginLeft; // margin defined in css
  y += $('#canvas').scrollTop() - canvasMarginTop; // margin defined in css
  gameX = Math.round(x), gameY = Math.round(y);
}

function padLeft(nr, n, str) {
  return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

function colorToRgb(color) {
  if (!isNaN(color))
    color = PALETTE[color];
  return hexToRgb(color);
}

function colorsMatch(c1, c2) {
  if (c1.r != c2.r) return false;
  if (c1.g != c2.g) return false;
  if (c1.b != c2.b) return false;
  return true;
}

$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
$.browser.android = /android/.test(navigator.userAgent.toLowerCase());
$.browser.safari = /safari/.test(navigator.userAgent.toLowerCase());
$.browser.ipad = /ipad/.test(navigator.userAgent.toLowerCase());
$.browser.iphone = /iphone|ipod/.test(navigator.userAgent.toLowerCase());
$.browser.ios = /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase());

if ($.browser.ios) $('html').addClass('ios');
if ($.browser.iphone) $('html').addClass('iphone');
if ($.browser.chrome) $('html').addClass('chrome');
if ($.browser.safari && !$.browser.ios) $('html').addClass('mac');
if ($.browser.android) $('html').addClass('android');

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.oRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function (callback, element) {
		  window.setTimeout(function () {
		    callback(+new Date);
		  }, 10);
		};
})();

var Drawing = {
  crossingsForLine: function (x, y, x1, y1, x2, y2) {
    if (y1 > y2) return 0 - this.crossingsForLine(x, y, x2, y2, x1, y1);
    if (y1 == y2) return 0;
    if (y < y1 || y >= y2) return 0;
    if (x >= x1 && x >= x2) return 0;
    var t = (y - y1) / (y2 - y1);
    return ((x < x1 + t * (x2 - x1)) ? 1 : 0);
  },
  inPolygon: function (x, y, polygon) {
    // auto close the polygon by detecting if the last point is the same as the first. If not, add it   
    var firstPoint = { 'x': polygon[0], 'y': polygon[1] };
    var lastPoint = { 'x': polygon[polygon.length - 2], 'y': polygon[polygon.length - 1] };
    if (firstPoint.x != lastPoint.x || firstPoint.y != lastPoint.y)
      polygon.push(firstPoint.x, firstPoint.y);
    var result = 0;
    for (var p = 0; p < polygon.length; p += 2) {
      var x1 = polygon[p + 0];
      var y1 = polygon[p + 1];
      var x2 = polygon[p + 2];
      var y2 = polygon[p + 3];
      result += this.crossingsForLine(x, y, x1, y1, x2, y2);
    }
    return ((result & 1) == 1);
  },
  inAnyPolygon: function (x, y) {
    for (var i = 0; i < this.polygons.length; i++) {
      var polygon = this.polygons[i];
      try {
        if (polygon.inactive) {
          if (eval(polygon.inactive)) continue;
        }
      } catch (e) { }
      if (this.inPolygon(x, y, polygon.coords)) return polygon;
    }
    return false;
  },
  calculateSurface: function(polygon) {
    var n = polygon.length;
    var surface = 0;
    for (var i = 0; i < n; i +=2 ) {
      var j = (i+2) % n;
      var x1 = polygon[i];
      var y1 = polygon[i+1];
      var x2 = polygon[j];
      var y2 = polygon[j+1];
      surface += x1 * y2;
      surface -= y1 * x2;
    }
    surface = surface / 2; 
    return Math.abs(surface);
  },
  movePolygon: function(dx, dy, polygon) {
    var n = polygon.length;
    for (var i = 0; i < n; i += 2) {
      polygon[i] += dx;
      polygon[i+1] += dy;
    }
    return polygon;
  }
};

var Loop = function (selector) {
  var loopObj = function () {
    this.el = $(selector);
    this.frame = 0;
    this.delayMs = 0;
  }
  loopObj.prototype = {
    play: function (start, end, ms, endHandler) {
      var self = this;
      this.step = start < end ? 1 : -1;
      this.start = start;
      this.end = end;
      this.ms = ms;
      this.endHandler = endHandler;
      this.frame = start - this.step;
      setTimeout(function () { self.next() }, self.delayMs);
      return this;
    },
    delay: function (ms) {
      this.delayMs = ms;
      return this;
    },
    next: function () {
      var self = this;
      var nextFrame = this.frame + this.step;
      if ((this.step > 0 && nextFrame <= this.end) || (this.step < 0 && nextFrame >= this.end)) {
        var curFrame = this.el.attr('data-frame') * 1;
        if (!isNaN(curFrame))
          this.el.removeClass('frame' + curFrame);
        this.el.addClass('frame' + nextFrame);
        this.el.attr('data-frame', nextFrame);
        this.frame = nextFrame;
        setTimeout(function () { self.next() }, this.ms);
      } else {
        if (this.endHandler)
          this.endHandler();
      }
    }
  }
  return new loopObj(selector);
}

function eatTouch(e) {
  e.preventDefault();
  return false;
}