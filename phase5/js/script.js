/// <reference path="utils.js" />
/// <reference path="settings.js" />
var endscenePlayed = false;
var godmode = false;
var section = 0, rockPath = false, cabinetOpened = false, hoveringOverRegion = false;
var x, y, rawX, rawY, gameX, gameY, screenOffsetLeft, screenOffsetTop, cycleMs = 40, shape = [], lastCycle = 0, destinationRegion = null, destinationAction = null, dialog = false, story = true, enteredPolygon = null;
var gameScrollTop = 0, gameScrollLeft = 0;
var currentLook = 0, currentHand = 0;
var currentSubLook = 0, currentSubHand = 0;
var paused = false;
var canvasMarginLeft = 0;
var canvasMarginTop = 0;
var longPressTimeout = 0, longPressed = false, iconBoxes = {}, selectedIcon = null;
var staticDome = false;

var CursorStates = {
  'none': -1,
  'wait': 0,
  'walk': 1,
  'eye': 2,
  'hand': 3
};
var cursorState = 0;

var screenNr = 1, debug = false;
var screenObj = screens[screenNr + ''];

$(function load() {
  Story.enable();
  if ($.browser.ios) {
    staticDome = true;
    $('html').addClass('static-dome');
  }
  //startGame(); return;

  if ($.browser.ios && !navigator.standalone && document.location.href.indexOf('localhost') == -1) {
    $('html').addClass('ipad-not-fullscreen');
    $('#splash').show();
    document.title = 'SpaceVenture';
  } else
    startGame();
});

function startGame() {
  $('#preloader').show();
  $('#splash').show();
  
  $('body').append('<div id="fontpreloader" style="position:absolute;right:0;bottom:0;opacity:0.01;font-family:\'Maven Pro\'">Loading...</div>');
  setTimeout(function () { $('#fontpreloader').remove(); }, 4000);
  var loadDesktop = !$.browser.ios;
  if (loadDesktop) $('html').addClass('desktop');

  resize();

  setCursorState(CursorStates.wait);

  $(window).bind('resize', resize);
  $('*').bind('dragstart', function (event) { event.preventDefault(); });

  setRestore(restore);

  $(document).on('touchstart click', '#button-restart', restart);
  $(document).on('touchstart click', '#button-quit', quit);
  $(document).on('touchstart click', '#button-tweet', tweet);

  $('body').bind('contextmenu', function (e) { e.preventDefault(); return false; });
  $('body').bind('mousedown', mouseDownScreen);
  $('body').bind('keyup', keyupBody)

  if ($.browser.ios) {
    $(document).on('touchstart', '#game', touchStartScreen);
    $(document).on('touchend', '#game', touchEndScreen);
    $(document).on('touchmove', '#game', touchMoveScreen);
    $('#preloader').bind('touchmove', eatEvent);
    $(".waterfall-effect").remove();
    $(".waterfall-steam").remove();
  }
  else
    $('#game').bind('click', clickScreen)

  $('#game').bind('mouseleave', mouseLeaveScreen)

  $('#dialog').bind('click', clickDialog)
  //$("#avatar").click(avatarClick)

  document.addEventListener('webkitvisibilitychange', visibilityChanged);

  $("body").click(function (e) {
    if (e.target == document.body) {
      if (cursorState == CursorStates.eye) showDialog(dialogs.desktop.look);
      if (cursorState == CursorStates.hand) showDialog(dialogs.desktop.hand);
      return false;
    }
  });
  $("#eraser,#eraser-crumbs").click(function () {
    if (cursorState == CursorStates.eye) showDialog(dialogs.desktop.eraserlook);
    if (cursorState == CursorStates.hand) showDialog(dialogs.desktop.eraserhand);
    return false;
  });
  $("#tape-top,#tape-bottom-right").click(function () {
    if (cursorState == CursorStates.eye) showDialog(dialogs.desktop.tapelook);
    if (cursorState == CursorStates.hand) showDialog(dialogs.desktop.tapehand);
    return false;
  });
  $("#pen").click(function () {
    if (cursorState == CursorStates.eye) showDialog(dialogs.desktop.pencillook);
    if (cursorState == CursorStates.hand) showDialog(dialogs.desktop.pencilhand);
    return false;
  });

  function loadWhenReady() {
    if (sound.enabled) {
      sound.init(function () {
        // init game once sound is loaded to prevent errors
        $('#preloader').hide();
        setTimeout(function () { showSplashScreen() }, 0);
        cycle();
      });
    } else {
      $('#preloader').hide();
      setTimeout(function () { showSplashScreen() }, 0);
      cycle();
    }

    Parser.start();
  };

  loadTiles();
  $(preloads).preloadImages(loadWhenReady);
  //loadWhenReady();
}

function loadTiles() {
  if (staticDome) {
    var html = '';
    for (var i = 1; i <= 50; i++) {
      var nr = padLeft(i, 3);
      var url = "img/tiles/static-backdrop-" + nr + '.png';
      html += '<img src="' + url + '"/>';
    }
    $('#screen1 .dome').html(html);
    return;
  }

  // dome
  var html = '';
  for (var i = 1; i <= 50; i++) {
    var nr = padLeft(i, 3);
    var url = "img/tiles/dome-" + nr + '.png';
    html += '<img src="' + url + '"/>';
  }
  $('#screen1 .dome').html(html);
  var html = '';
  for (var i = 1; i <= 32; i++) {
    var nr = padLeft(i, 3);
    var url = "img/tiles/cover-" + nr + '.png';
    html += '<img src="' + url + '"/>';
  }
  $('#screen1 .dome-cover').html(html);
}

function showScreen(nr) {
  $('.screen').hide();
  $('#screen' + nr).show();
  screenNr = nr;
  screenObj = screens[screenNr + ''];
}

function clickDialog() {
  var hasButtons = ($('#dialog button').length > 0);
  if (!hasButtons) {
    hideDialog();
    return false;
  }
  else return true;
}

function keyupBody(event) {
  if (event.keyCode == 13 || event.keyCode == 27) {
    if (window.handledEnter) return false;
    if (dialog) {
      if ($('#dialog button').length > 0) 
        return;
      return hideDialog();
    }
    if (screenNr == 0)
      gotoScreen1();
  }
  if (event.ctrlKey && event.shiftKey && event.which == 70) { // F
    document.documentElement.webkitRequestFullScreen();
    return false;
  }
  if ((!story && !paused) || godmode) {
    if (event.keyCode == 37) avatar.walkLeft();
    if (event.keyCode == 38) avatar.walkUp();
    if (event.keyCode == 39) avatar.walkRight();
    if (event.keyCode == 40) avatar.walkDown();
  }
  if (event.keyCode == 81 && event.ctrlKey && event.shiftKey) {
    godmode = !godmode;
    return false;
  }
}

function resize() {
  if ($('#game').length == 0) return;
  var top = Math.round(Math.max(0, $(window).height() / 2 - (768 / 2)));
  $('#game').css('top', top);
  var offset = $('#game').offset();
  screenOffsetLeft = offset.left, screenOffsetTop = offset.top;

  // TODO: full screen needs pointer re-offsetting due to scaling factor (from origin center center)
  /*
  if (Settings.EnableFullScreen) {
    var fullscreen = ($('#resolution').width() == window.outerWidth && $('#resolution').height() == window.outerHeight);
    if (fullscreen) {
      var scaleX = window.outerWidth / 1024;
      var scaleY = window.outerHeight / 768;
      var scale = Math.min(scaleX, scaleY);
      $('#temp').remove();
      $('<style id="temp">.fullscreen #game {-webkit-transform:scale(' + scale.toFixed(2) + ')}</style>').appendTo('head');
      $('body').addClass('fullscreen');
    }
    else {
      $('body').removeClass('fullscreen');
    }
  }
  */
  canvasMarginLeft = $('#canvas').css('margin-left').replace(/px/, '') * 1;
  canvasMarginTop = $('#canvas').css('margin-top').replace(/px/, '') * 1;
}

var lastFootsteps = new Date();
function cycle() {
  if (paused) return false;
  if (!dialog) {
    if (new Date() * 1 - lastCycle > cycleMs) {
      avatar.cycle();
      lastCycle = new Date() * 1;
    }
  }
  
  /*
  if (Math.random() < 0.000042 && !dialog && !story) {
    doActions(
      "You think you hear footsteps. ",
      300,
      "Nope. Just you."
    )
  }
  */
  requestAnimFrame(cycle);
}

function mouseMoveScreen(event) {
  if (paused) return false;

  getXY(event);  
  hoveringOverRegion = false;
  for (var regionName in screenObj.regions) {
    if (Drawing.inPolygon(x, y, screenObj.regions[regionName].polygon)) {
      hoveringOverRegion = true;
      break;
    }
  }
  if (hoveringOverRegion)
    $('body').addClass('over-region');
  else
    $('body').removeClass('over-region');

  // if player moves mouse, reset look/hand dialogs
  currentSubLook = currentSubHand = 0;
}

function mouseLeaveScreen(event) {
  x = -999;
}

function touchStartScreen(event) {
  event.preventDefault();
  if (paused) return false;
  if (story) return false;

  var el = event.srcElement || event.target;  
  if (el && $(el).hasClass('icon') && $('#icons').hasClass('show hold') && $('#icons .icon.chosen').length == 0) {
    return false;
  }
  clearTimeout(longPressTimeout);
  longPressed = false;

  $('#icons .icon').removeClass('chosen');
  $('#icons').removeClass().addClass('quickhide');
  setTimeout(function () {
    $('#icons').removeClass('show hold');
    setTimeout(function () {
      $('#icons').removeClass('quickhide');
    }, 0);
  }, 0);
  longPressTimeout = setTimeout(longPress, 180);
  getXY(event);
  return false;
}

function longPress() {
  longPressed = true;
  $('#icons').css({ 'left': x, 'top': y }).removeClass('quickhide').addClass('show hold');
  iconBoxes = {
    eye: { left: x - 80 - 27, top: y - 60 - 35, right: x - 80 + 27, bottom: y - 60 + 35 },
    walk: { left: x - 27 - 27, top: y - 60 - 35, right: x - 27 + 27, bottom: y - 60 + 35 },
    hand: { left: x + 25 - 27, top: y - 60 - 35, right: x + 25 + 27, bottom: y - 60 + 35 }
  }
}

function touchEndScreen(event) {
  clearTimeout(longPressTimeout);
  if (dialog) {
    var hasButtons = ($('#dialog button').length > 0);
    if (!hasButtons) {
      hideDialog();
      return false;
    }
  }
  if (paused) return false;
  if (story) return false;

  var el = event.srcElement || event.target;
  if (el && $(el).hasClass('icon') && $('#icons').hasClass('show hold') && $('#icons .icon.chosen').length == 0) {
    var action = $(el).attr('data-icon');
    invokeIcon(action);
    $('#icons .icon').not(el).removeClass('chosen');
    $(el).addClass('chosen');
    $('#icons').addClass('release');
    longPressed = true;
    event.preventDefault();
    longPressTimeout = setTimeout(function () {
      longPressed = false;
      $('#icons').addClass('quickhide')
      setTimeout(function() {
        $('#icons').removeClass();
        $('#icons .icon').removeClass('chosen');
      },0);
    }, 500);
    return false;
  }


  if (longPressed) {
    longPressTimeout = setTimeout(function () {
      $('#icons').removeClass();
    }, 4000);
  } else {
    $('#icons').css({ 'left': x, 'top': y }).removeClass();
    setTimeout(function () {
      $('#icons').addClass('show');
    }, 0);
    invokeIcon('walk');
    setTimeout(function () {
      $('#icons').removeClass();
    }, 200);
  }
  longPressed = false;
}

function touchMoveScreen(event) {
  if (!longPressed) {
    clearTimeout(longPressTimeout);
    return true;
  }
  if (event.originalEvent.touches.length <= 3) {
    event.preventDefault();
    /*
    if (longPressed) {

      var xyInfo = event;
      var touches = event.originalEvent.touches;
      if (touches) xyInfo = touches[0];
      var x, y, rawX, rawY, gameX, gameY; // make local

      if (Settings.EnableGpuScroll)
        rawX = x = xyInfo.pageX - screenOffsetLeft + gameScrollLeft, rawY = y = xyInfo.pageY - screenOffsetTop + gameScrollTop;
      else
        rawX = x = xyInfo.pageX - screenOffsetLeft, rawY = y = xyInfo.pageY - screenOffsetTop;
      x += $('#canvas').scrollLeft() - canvasMarginLeft; // margin defined in css
      y += $('#canvas').scrollTop() - canvasMarginTop; // margin defined in css
      gameX = Math.round(x), gameY = Math.round(y);

      x -= 27; // I was wrong :P

      selectedIcon = null;
      for (var icon in iconBoxes) {
        var box = iconBoxes[icon];
        if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) 
          selectedIcon = icon;
      }
      $('#icons div').removeClass('hover');
      if (selectedIcon)
        $('#icons #icon-' + selectedIcon).addClass('hover');
    }
    */
    return false;
  }
}

function clickScreen(event) {
  var el = $(event.target);
  if (el.attr('id') == 'speech') return true;
  if (dialog) {
    var hasButtons = ($('#dialog button').length > 0);
    if (!hasButtons) {
      hideDialog();
      return false;
    }
    else return true;
  }
  if (paused) return false;
  if (story) {
    if (screenNr == 0)
      gotoScreen1();
    return false;
  }
  getXY(event);
  var ctrlKey = event.ctrlKey;
  invokePointerAction(ctrlKey);
}

function invokeIcon(iconName) {
  if (iconName == 'walk') cursorState = CursorStates.walk;
  if (iconName == 'eye') cursorState = CursorStates.eye;
  if (iconName == 'hand') cursorState = CursorStates.hand;
  invokePointerAction();
  selectedIcon = null;
}

// this is separated from the click event to allow usage after touch / longpress interface
function invokePointerAction(ctrlKey) {
  if (window.Debugger && (Debugger.ctrlDown || Debugger.shiftDown)) return false;

  var xToUse = x;
  var yToUse = y;

  if ($.browser.ios) yToUse -= 10;

  switch (cursorState) {
    case CursorStates.walk:
      xToUse += 10;
      yToUse += 30;
      break;
    case CursorStates.eye:
      xToUse += 10;
      yToUse += 15;
      break;
    case CursorStates.hand:
      xToUse += 10;
      yToUse += 15;
      break;
  }

  if (cursorState != CursorStates.walk) {
    // if the x,y we clicked matches multiple regions, pick the smallest
    var regions = [];
    var smallestSurface = Infinity;
    // todo: store surface value per polygon
    for (var regionName in screenObj.regions) {
      var polygon = screenObj.regions[regionName].polygon;
      var surface = screenObj.regions[regionName].surface;
      
      if (!surface) surface = Drawing.calculateSurface(polygon);
      screenObj.regions[regionName].surface = surface;

      if (Drawing.inPolygon(xToUse, yToUse, polygon)) {
        regions.push({surface: surface, regionName: regionName});
        if (surface < smallestSurface) smallestSurface = surface;
      }
    }
    if (regions.length > 1) {
      for (var i = 0; i < regions.length; i++) {
        if (regions[i].surface <= smallestSurface) {
          var handled = clickedRegion(regions[i].regionName, ctrlKey);
          if (handled) return;
        }
      }
    } else if (regions.length == 1) {
      var handled = clickedRegion(regions[0].regionName, ctrlKey);
      if (handled) return;
    }
  }

  destinationRegion = null;
  destinationAction = null;
  doCursorActionXY(xToUse, yToUse);
}

function mouseDownScreen(event) {
  // don't cancel a button press when paused
  if (event.srcElement && event.srcElement.nodeName == 'BUTTON') return;
  if (paused) return false;

  if (event.which == 3) {
    return rightClickScreen(event);
  }
}

function rightClickScreen(event) {
  if (paused) return false;

  event.preventDefault();
  cycleCursorState();
  return false;
}

function clickedRegion(name, ignoreDistance, actionOverride) {
  if (paused) return false;
  if (story && !godmode) return false;
  var region = screenObj.regions[name];
  // first make sure this region is enabled
  var isEnabled = false;
  if (region.enabled == undefined)
    isEnabled = true;
  else if (region.enabled.constructor == Boolean)
    isEnabled = region.enabled;
  else if (region.enabled.constructor == Function)
    isEnabled = region.enabled();
  // if not enabled, leave
  if (!isEnabled)
    return false;
  // otherwise check distance
  if (region.distance && !ignoreDistance)
    doCursorActionOrWalkToHotspot(name, actionOverride);
  else
    doCursorAction(name);
  return true;
}

function doCursorActionOrWalkToHotspot(name, actionOverride) {
  var region = screenObj.regions[name];
  var hotspot = getHotspot(region);
  var curDistance = Math.sqrt(Math.pow(Math.abs(avatar.x - hotspot[0]), 2) + Math.pow(Math.abs(avatar.y - hotspot[1]), 2));
  if (curDistance > region.distance) {
    destinationRegion = name;
    destinationAction = actionOverride;
    avatar.walkto(hotspot[0], hotspot[1]);
    if (window.Debugger)
      console.log('distance to ' + name + ' is ' + curDistance + ' (required: ' + region.distance + '). Walking to ', hotspot[0], hotspot[1]);
  } 
  else
    doCursorAction(name, actionOverride);
}

function doCursorAction(name, actionOverride) {
  if (paused) return false;
  var region = screenObj.regions[name];
  var action = actionOverride ? actionOverride : cursorState;
  switch (action) {
    case CursorStates.walk:
      if (region.hotspot)
        avatar.walkto(region.hotspot[0], region.hotspot[1]);
      else
        avatar.walkto(x, y);
      break;
    case CursorStates.eye:
      if (region.look) {
        if (region.look.constructor == Function)
          region.look();
        else if (region.look.constructor == String)
          showDialog(region.look);
      }
      else {
        defaultLook();
      }
      break;
    case CursorStates.hand:
      if (region.hand) {
        if (region.hand.constructor == Function)
          region.hand();
        else if (region.hand.constructor == String)
          showDialog(region.hand);
      }
      else {
        defaultHand();
      }
      //doAction(name);
      break;
  }
}

function doCursorActionXY(x, y) {
  if (paused) return false;
  switch (cursorState) {
    case CursorStates.eye:
      defaultLook();
      break;
    case CursorStates.hand:
      defaultHand();
      break;
    default:
      avatar.walkto(x, y);
      break;
  }
}

var actions = [];
function doActions(arr) {
  if (arr.constructor == Array) {
    for (var i = 0; i < arr.length; i++)
      actions.push(arr[i]);
  }
  else {
    for (var i = 0; i < arguments.length; i++)
      actions.push(arguments[i]);
  }
  doAction();
}

function doAction() {
  if (actions.length > 0) {
    actions = actions.reverse();
    var action = actions.pop();
    actions = actions.reverse();
    if (action.constructor == Function) {
      action();
      return;
    }
    else if (action.constructor == String) {
      showDialog(action);
      return;
    }
    else if (action.constructor == Number) {
      setTimeout(doAction, action);
    }
  }
}

function finishedWalking() {
  console.log('finishedWalking', destinationRegion, destinationAction);
  if (destinationRegion)
    clickedRegion(destinationRegion, false, destinationAction);
  destinationRegion = null;
  destinationAction = null;
}

function allowPosition(x, y) {
  if (story) return true;
  for (var name in screenObj.boundaries) {
    var boundary = screenObj.boundaries[name];
    var checkBoundary = false;
    if (boundary.enabled == undefined)
      checkBoundary = true;
    else if (boundary.enabled.constructor == Boolean)
      checkBoundary = boundary.enabled;
    else if (boundary.enabled.constructor == Function)
      checkBoundary = boundary.enabled();
    if (checkBoundary && Drawing.inPolygon(x, y, boundary.polygon)) {
      if (boundary.enter) {
        if (enteredPolygon != name) {
          enteredPolygon = name;
          boundary.enter();
        }
      }

      if (enteredPolygon && name != enteredPolygon) {
        var exitBoundary = screenObj.boundaries[enteredPolygon];
        if (exitBoundary.leave)
          exitBoundary.leave();
        // leave entered polygon
        enteredPolygon = null;
      }
      return true;
    }
  }
  return false;
}

function showAction(x, y, text) {
  $('#actions').css({ 'left': x, 'top': y });
  $('#itemname').html(text).css({ 'margin-left': -$('#itemname').width() / 2 - 10});
  $('#actions').removeClass('hidden');
}

function showDialog(text) {
  dialog = true;
  $('#dialog-text').html(text.replace(/\|/g, '<br/>'));
  $('#dialog').removeClass('hidden').addClass('shown');
}

function hideDialog() {
  $('#dialog').addClass('hidden').removeClass('shown');
  dialog = false;
  if (actions.length > 0)
    doAction();
}

function scrollGameTo(top, left, ms, noQueue) {
  gameScrollTop = top;
  gameScrollLeft = left;
  if (Settings.EnableGpuScroll) {
    $('#innercanvas').removeClass('scrollTo');
    $('<style id="temp">#innercanvas.scrollTo{-webkit-transition-duration: ' + (ms / 1000).toFixed(2) + 's; -webkit-transform:translate(' + (-gameScrollLeft) + 'px,' + (-gameScrollTop) + 'px)}</style>').appendTo('head');
    $('#innercanvas').addClass('scrollTo');
  } else {
    $('#canvas').animate({ 'scrollTop': gameScrollTop, 'scrollLeft': gameScrollLeft }, { 'queue': (noQueue != true), 'duration': ms });
  }
}

function setCursorState(state) {
  var cursorStateName = state;
  for (var o in CursorStates) {
    if (CursorStates[o] === state) {
      cursorStateName = o;
    }
    $('body').removeClass('cursor-state-' + o);
  }
  $('body').addClass('cursor-state-' + cursorStateName);
  cursorState = state;
}

function cycleCursorState() {
  cursorState++;
  if (cursorState > 3) cursorState = 1;
  setCursorState(cursorState);
}

function visibilityChanged() {
  if (document.webkitHidden)
    sound.mute();
  else
    sound.unmute();
}

function getRegion(name) {
  return screens[screenNr].regions[name];
}

function getBoundary(name) {
  return screens[screenNr].boundaries[name];
}

function restore() {
  unpause();
  Parser.clear();
  doActions(
    10,
    "Nothing to restore. Next time, try saving your game!\n\nPS. You can't save your game. This prototype doesn't offer that feature yet.",
    function () {
      pause();
      showDialog(dialogs.gameover.general1 + dialogs.gameover.buttons);
    });
  return false;
}
function restart() {
  window.location.reload();
  return false;
}
function quit() {
  pause();
  sound.mute();
  setCursorState(CursorStates.none);
  $("#dos").show();
  $("#dos").focus();
  $("#dos").bind('click touchstart', function(){
    window.location.reload();
  })
  return false;
}
function tweet() {  
 window.location.href = "http://twitter.com/intent/tweet?text="+
 encodeURIComponent("I just died horribly while playing living concept art 5 by @AndromedaGuys! ")+
 encodeURIComponent("Check it out at http://guysfromandromeda.com #SpaceVenture");
}

function defaultLook() {
  if (currentSubLook == 0) currentLook++;
  if (currentLook >= dialogs.defaultLook.length) currentLook = 0;
  if (currentSubLook >= dialogs.defaultLook[currentLook].length) currentSubLook = 0;
  showDialog(dialogs.defaultLook[currentLook][currentSubLook]);
  currentSubLook++;
}

function defaultHand() {
  if (currentSubHand == 0) currentHand++;
  if (currentHand >= dialogs.defaultHand.length) currentHand = 0;
  if (currentSubHand >= dialogs.defaultHand[currentHand].length) currentSubHand = 0;
  showDialog(dialogs.defaultHand[currentHand][currentSubHand]);
  currentSubHand++;
}

function avatarClick() {
  if (cursorState == CursorStates.eye) showDialog(dialogs.avatar.look);
  if (cursorState == CursorStates.hand) showDialog(dialogs.avatar.touch);
  return false;
}

function pause() {
  paused = true;
}

function unpause() {
  paused = false;
}

var Story = {
  enable: function () {
    story = true;
    $('body').addClass('story');
  },
  disable: function () {
    story = false;
    $('body').removeClass('story');
  }
}

function setRestore(fn) {
  $(document).off('touchstart click', '#button-restore');
  $(document).on('touchstart click', '#button-restore', fn);
}

function getHotspot(region) {
  if (region.constructor == String)
    region = getRegion(region);
  if (region.hotspot)
    return region.hotspot;
  var c = Drawing.getCentroid(region.polygon);
  return [c.x, c.y];
}