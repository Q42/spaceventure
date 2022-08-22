/// <reference path="utils.js" />
var avatar = {
  x: 100,
  y: 100,
  destX: 0,
  destY: 0,
  stepX: 6,
  stepY: 3,
  maxStepY: 3,
  offsetX: 0,
  offsetY: 0,
  skin: 'roger',
  direction: 'down',
  frames: {
    'right': 8,
    'left': 8,
    'down': 4,
    'up': 4
  },
  frame: 0,
  obj: null,
  walking: false,
  init: function (x, y) {
    this.obj = $('#avatar');
    this.x = this.destX = x, this.y = this.destY = y;
    this.offsetX = -this.obj.width() / 2;
    this.offsetY = -this.obj.height();
    this.obj.addClass(this.skin);
    this.obj.addClass(this.direction + this.frame);
    this.redraw();
    return this;
  },
  show: function () {
    this.obj.removeClass('hidden');
    return this;
  },
  hide: function () {
    this.obj.addClass('hidden');
    return this;
  },
  position: function (x, y) {
    this.x = x; this.y = y;
    this.redraw();
  },
  setFrame: function (direction, frameNr) {
    this.obj.removeClass(this.direction + this.frame);
    this.direction = direction;
    this.frame = frameNr;
    this.obj.addClass(this.direction + this.frame);
    this.redraw();
  },
  redraw: function () {
    this.obj.css({ 'left': this.x + this.offsetX, 'top': this.y + this.offsetY, 'z-index': Math.round(this.y) });
    this.obj.toggleClass('touch');
    return this;
  },
  stop: function () {
    this.setFrame(this.direction, 0)
    this.destX = this.x, this.destY = this.y;
    this.walking = false;
  },
  walkto: function (x, y) {
    this.stepY = 3;
    var distX = Math.abs(this.x - x), distY = Math.abs(this.y - y);
    if (distX > distY) {
      this.stepY = Math.min(Math.abs(distY / (distX / this.stepX)), this.maxStepY);
    }
    this.destX = x, this.destY = y;
    this.walking = true;
  },
  walkRight: function () {
    if (this.walking && this.destX > this.x && this.destY == this.y)
      this.stop();
    else
      this.walkto(9999, this.y);
  },
  walkLeft: function () {
    if (this.walking && this.destX < this.x && this.destY == this.y)
      this.stop();
    else
      this.walkto(0, this.y);
  },
  walkUp: function () {
    if (this.walking && this.destX == this.x && this.destY < this.y)
      this.stop();
    else
      this.walkto(this.x, 0);
  },
  walkDown: function () {
    if (this.walking && this.destX == this.x && this.destY > this.y)
      this.stop();
    else
      this.walkto(this.x, 9999);
  },
  cycle: function () {
    if (!this.walking) return;

    this.obj.removeClass(this.direction + this.frame);
    var curX = this.x, curY = this.y;

    if (this.y < this.destY) {
      this.y = Math.min(this.y + this.stepY, this.destY);
      this.direction = 'down';
    }

    if (this.y > this.destY) {
      this.y = Math.max(this.y - this.stepY, this.destY);
      this.direction = 'up';
    }
    var allowY = allowPosition(this.x, this.y);
    if (!allowY) this.y = curY;

    if (this.x < this.destX) {
      this.x = Math.min(this.x + this.stepX, this.destX);
      this.direction = 'right';
    }
    if (this.x > this.destX) {
      this.x = Math.max(this.x - this.stepX, this.destX);
      this.direction = 'left';
    }
    var allowX = allowPosition(this.x, this.y);
    if (!allowX) this.x = curX;

    // not moved? set direction to current position
    if (this.x == curX && this.y == curY) {
      this.destX = this.x;
      this.destY = this.y;
      this.walking = false;
      avatar.finishedWalking();
      finishedWalking();
    }

    this.frame = ++this.frame % this.frames[this.direction];

    this.obj.addClass(this.direction + this.frame);

    this.redraw();
  },

  playAfterFinishedWalking: false,

  finishedWalking: function () {
    if (avatar.playAfterFinishedWalking) {
      avatar.playAfterFinishedWalking = false;
      story = false;
    }
  }
}

function generateAvatar() {
  var w = 610, h = 3760;
  var cw = 122, ch = 235;
  var frame = 0, frameNum = 0;

  // each row
  for (var j = 0; j > -h; j -= ch) {

    // each col
    for (var i = 0; i > -w; i -= cw) {
      if (frame < 19) dir = "up";
      else if (frame < 19 * 2) dir = "down";
      else if (frame < 19 * 3) dir = "left";
      else if (frame < 19 * 4) dir = "right";

      console.log(".roger." + dir + frameNum + " { background-position: " + i + "px " + j + "px; }");

      frame++;
      if (frameNum >= 18) frameNum = 0;
      else frameNum++;
    }    
  }
}