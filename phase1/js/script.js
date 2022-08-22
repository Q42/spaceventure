/// <reference path="utils.js" />
var endscenePlayed = false;
var godmode = false;
var section = 0, rockPath = false, hoveringOverRegion = false;
var x, y, screenOffsetLeft, screenOffsetTop, cycleMs = 40, shape = [], lastCycle = 0, destinationRegion = null, dialog = false, story = true, enteredPolygon = null;
var gameScrollTop = 0, gameScrollLeft = 0;
var screens = { '1': {
  'boundaries': {
    'all': { 'enabled': function () { return godmode == true; }, 'polygon': [0, 0, 9999, 0, 9999, 9999, 0, 9999] },
    'end-game': { 'enter': endscene, 'polygon': [1778, 650, 1853, 739, 1940, 717, 1855, 566] },
    'corridor': { 'polygon': [313, 1157, 536, 1190, 509, 1208, 324, 1200] },
    'exit-corridor': {enter: function() { $(".lift-interior").addClass("visible"); $(".platform-bottom").addClass("visible"); }, polygon: [493, 1210, 510, 1215, 517, 1234, 622, 1262, 708, 1256, 776, 1232, 778, 1216, 708, 1195, 616, 1190, 583, 1191, 550, 1199, 532, 1195, 508, 1189]},
    
    'stairs-scroll-trigger': { 'enabled': function () { return !rockPath; }, 'enter': togglePlatformWaterfallSection, 'polygon': [847, 589, 1161, 730, 1164, 602, 978, 548] },
    'stairs': { 'polygon': [494, 697, 490, 769, 502, 836, 645, 910, 811, 943, 953, 954, 1062, 967, 1169, 969, 1189, 823, 1171, 768, 1163, 731, 1155, 681, 1162, 633, 1137, 614, 1145, 591, 1180, 540, 1192, 513, 1192, 477, 1075, 491, 951, 563, 915, 571, 875, 580, 795, 587, 745, 574, 677, 573, 666, 576, 662, 581, 530, 645, 500, 671] },
    
    'behind-waterfall': { 'polygon': [1048, 520, 1223, 475, 1374, 442, 1469, 461, 1560, 455, 1596, 449, 1574, 521, 1477, 517, 1333, 532, 1225, 533, 1163, 554, 1145, 602, 1014, 549] },
    
    'island-scroll-trigger': { 'enabled': function () { return rockPath; }, 'enter': toggleWaterfallIslandSection, 'polygon': [1535, 682, 1525, 762, 1608, 788, 1684, 790, 1687, 720, 1609, 722, 1551, 683] },
    'rocks': { 'enabled': function () { return rockPath; }, 'polygon': [1398, 524, 1463, 620, 1493, 629, 1549, 684, 1594, 716, 1649, 699, 1682, 699, 1708, 734, 1774, 734, 1885, 730, 1770, 628, 1735, 669, 1701, 678, 1663, 663, 1590, 649, 1562, 610, 1562, 527, 1539, 503, 1408, 501] }

    //,'island': { 'polygon': [1769, 627, 1912, 774, 1943, 768, 1974, 750, 2023, 767, 2039, 804, 2031, 865, 2140, 861, 2256, 818, 2344, 767, 2388, 679, 2350, 602, 2272, 534, 2196, 492, 2108, 471, 2079, 506, 1969, 476, 1897, 490, 1813, 481, 1803, 507, 1828, 556, 1825, 591, 1771, 631]}
    
  },
  'regions': {
    'corridor-panel': { 'hotspot': [707, 1156], 'distance': 5, 'polygon': [699, 1161, 699, 1142, 717, 1147, 717, 1167] },
    'waterfall-panel': { 'enabled': function () { return !rockPath; }, 'hotspot': [1092, 389], 'distance': 4, 'polygon': [1074, 353, 1072, 419, 1107, 422, 1109, 354] }
  },
  'sections': {
    'corridor': 0,
    'platform': 1,
    'waterfall': 2,
    'rockpath': 3,
    'island': 4
  }
}
}
var screenNr = 1, debug = false;
var screen = screens[screenNr + ''];

$(function load() {
  //gotoScreen1();
  //showScreen(1);
  showSplashScreen();  

  //elevatorGoesUp3(); 
  //scrollGuysIntoView(0); avatar.position(1816, 674);

  resize();
  $(window).bind('resize', resize);
  $('#game').bind($.browser.ios ? 'touchstart' : 'click', clickScreen)
  $('#game').bind('mousemove', mouseMoveScreen)
  $('#game').bind('mouseleave', mouseLeaveScreen)
  $('body').bind('keyup', keyupBody)
  $('#dialog').bind('click', clickDialog)
  cycle();
});

function showScreen(nr) {
  $('.screen').hide();
  $('#screen' + nr).show();
  screenNr = nr;
  screen = screens[screenNr + ''];
}

function clickDialog() {
  hideDialog();
  return false;
}

function keyupBody(event) {  
  if (event.keyCode == 13 || event.keyCode == 27) {
    if (dialog)
      return hideDialog();
    if (screenNr == 0)
      gotoScreen1();
  }
  if (!story || godmode) {
    if (event.keyCode == 37) avatar.walkLeft();
    if (event.keyCode == 38) avatar.walkUp();
    if (event.keyCode == 39) avatar.walkRight();
    if (event.keyCode == 40) avatar.walkDown();
  }
  if (event.keyCode == 81 && event.ctrlKey && event.shiftKey) {
    godmode = !godmode;
    return false;
  }
  //console.log(event.keyCode);
}

function resize() {
  var top = Math.round(Math.max(0, $(window).height() / 2 - (768 / 2)));
  $('#game').css('top', top);
  var offset = $('#game').offset();
  screenOffsetLeft = offset.left, screenOffsetTop = offset.top;
}

function cycle() {
  if (!dialog) {
    if (new Date() * 1 - lastCycle > cycleMs) {
      avatar.cycle();
      lastCycle = new Date() * 1;
    }
  }
  //$('#cursor').css({ 'left': x, 'top': y });
  requestAnimFrame(cycle);
}

function mouseMoveScreen(event) {
  getXY(event);
  hoveringOverRegion = false;
  for (var regionName in screen.regions) {
    if (Drawing.inPolygon(x, y, screen.regions[regionName].polygon)) {
      hoveringOverRegion = true;
      break;    
    }
  }
  if (hoveringOverRegion)
    $('body').addClass('over-region');
  else
    $('body').removeClass('over-region');
}

function mouseLeaveScreen(event) {
  x = -999;
}

function clickScreen(event) {
  if (dialog) {
    hideDialog();
    return false;
  }
  if (story) {
    if (screenNr == 0)
      gotoScreen1();
    return false;
  }
  getXY(event);
  for (var regionName in screen.regions) {
    if (Drawing.inPolygon(x, y, screen.regions[regionName].polygon)) {
      var handled = clickedRegion(regionName, event.ctrlKey);
      if (handled) return;
    }
  }
  destinationRegion = null;
  if (event.ctrlKey || event.shiftKey) {
    shape.push(x, y);
  }
  else {
    avatar.walkto(x, y);
  }
}

function clickedRegion(name, ignoreDistance) {
  if (story && !godmode) return false;
  var region = screen.regions[name];
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
    checkDistance(name);
  else
    doAction(name);
  return true;
}

function checkDistance(name) {
  var region = screen.regions[name];
  var curDistance = Math.sqrt(Math.pow(Math.abs(avatar.x - region.hotspot[0]), 2) + Math.pow(Math.abs(avatar.y - region.hotspot[1]), 2));
  if (curDistance > region.distance) {
    destinationRegion = name;
    avatar.walkto(region.hotspot[0], region.hotspot[1]);
  } 
  else
    doAction(name);
}

var actions = [];
function doActions(arr) {
  for (var i = 0; i < arguments.length; i++)
    actions.push(arguments[i]);
  doAction();
}

function doAction(name) {
  if (!name) {
    if (actions.length > 0) {
      actions = actions.reverse();
      var action = actions.pop();
      actions = actions.reverse();
      if (action.constructor == Function) {
        action();
        return;
      }
      else 
        name = action;
    }
  }
  switch (name) {
    case 'corridor-panel':
      elevatorGoesUp();
      break;
    case 'waterfall-panel':
      pressWaterfallPanel();
  }
}

function finishedWalking() {
  if (destinationRegion)
    doAction(destinationRegion);
  destinationRegion = null;
}

function allowPosition(x, y) {
  if (story) return true;
  for (var name in screen.boundaries) {
    var boundary = screen.boundaries[name];
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
        var exitBoundary = screen.boundaries[enteredPolygon];
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
  //$('#dialog-text').html('');
  dialog = false;
  if (actions.length > 0)
    doAction();
}

function showSplashScreen() {
  story = true;
  showScreen(1);
  scrollGameTo(1000, gameScrollLeft, 0);
  
//  $('#splash').hide();
//  $('#screen1').css('opacity', 1);
//  gotoScreen1();
//  return;
//  
  setTimeout(function () {
    $('#logo').addClass('animate');
    $('#dome').addClass('animate');
    $('#phase1').addClass('animate');
    $('#q42').addClass('animate');
    $('#blue-paper').addClass('animate');
    $('#avatarsketch').addClass('animate');
    setTimeout(function () {
      $('#dome').addClass('animate2');
      $('#screen1').addClass('animate');
      setTimeout(gotoScreen1, 3000);
    }, 8000);
  }, 5000);
}

function gotoScreen1() {  
  story = true;
  avatar.init(357, 1200).show();
  showScreen(1);
  section = screens[screenNr].sections.corridor;

  doActions(function () {
    setTimeout(function () {
      showDialog(dialogs.screen1.shipdock);
    }, 1000);
  },

    function () {
      avatar.init(350, 1200).show();
      scrollGameTo(1000, gameScrollLeft, 0);
      story = false;
      avatar.walkto(552, 1202);
      setTimeout(function() {
        $("#avatar").css("-webkit-transform", "scale(0.7)");
      }, 1500);
    }
  );
}

function elevatorGoesUp() {
  story = true;
  setTimeout(function () {
    avatar.walkto(643, 1222);
    setTimeout(function () {
      doActions(function () {
        showDialog(dialogs.screen1.presselevatorbutton);
      }, function () {
        setTimeout(elevatorGoesUp2, 500);
      });
    });
  }, 200);
}

function elevatorGoesUp2() {
  avatar.setFrame('down', 0);
  story = true;
  setTimeout(function () {
    scrollGameTo(300, 300, 4000);    
  }, 500);

  // debug info for sketch version: goes up 247 pixels first. platform starts at 1221,573 -> platform is 79 px lower than avatar, 122 px left
  $('#avatar').delay(800).animate({ 'top': 1094 - $('#avatar').height() }, { 'duration': 800 });
  $('.platform-bottom').delay(800).animate({ 'top': 1073 }, { 'duration': 800 });

  setTimeout(function () {
    $('.platform').addClass('open');
    avatar.position(685, 835);
    $('.platform-bottom').css({ 'z-index': 501, 'left': 611, 'top': 815 });

  }, 800 + 800);
  setTimeout(function () {
    $('#avatar').animate({ 'top': 716 - $('#avatar').height() }, { 'duration': 1600 });
    $('.platform-bottom').animate({ 'top': 689 }, { 'duration': 1600 });
  }, 800 + 800 + 300);
  setTimeout(elevatorGoesUp3, 800 + 800 + 300 + 1600);
}

function elevatorGoesUp3() {
  section = screens[screenNr].sections.platform;
  avatar.position(685, 716);
  $('.platform, .platform-overlay, .dome-bottom').hide()
  $('.platform-bottom').css({ 'z-index': 501, 'left': 611, 'top': 689 });
  scrollGameTo(300, 300, 0);  
  setTimeout(function () {
    doActions(function () {
        showDialog(dialogs.screen1.emergeonplatform);
      }, function () {
        story = false;
      });
  }, 1000);
}

function togglePlatformWaterfallSection() {
  if (section == screens[screenNr].sections.platform)
    scrollWaterfallIntoView();
  else
    scrollPlatformIntoView();
}

function scrollWaterfallIntoView(ms) {
  if (isNaN(ms)) ms = 4500;
  section = screens[screenNr].sections.waterfall;
  scrollGameTo(220, 700, ms, true);  
}

function scrollPlatformIntoView(ms) {
  if (isNaN(ms)) ms = 4500;
  section = screens[screenNr].sections.platform;
  scrollGameTo(300, 300, ms, true);  
}

function pressWaterfallPanel() {  
  story = true;
  //avatar.position(1135, 515);
  //avatar.setFrame('right', 0);
  avatar.walkto(1500, 510);
  scrollGameTo(220, 1350, 3500, true);    
  setTimeout(showRocks, 1200);
  rockPath = true;
  setTimeout(function () {
    story = false;
  }, 2500);
  setTimeout(function () {
    $('.guy1').addClass('wave');
    setTimeout(function () {
      showDialog(dialogs.screen1.wave);
    }, 1000);
  }, 6000);
}

function showRocks() {
  setTimeout(function () { $(".rock1").addClass("animating"); }, 1000);
  setTimeout(function () { $(".rock2").addClass("animating"); }, 1800);
  setTimeout(function () { $(".rock3").addClass("animating"); }, 2200);
  setTimeout(function () { $(".rock4").addClass("animating"); }, 2500);
}

function toggleWaterfallIslandSection() {
  if (section != screens[screenNr].sections.island)
    scrollGuysIntoView();
}

function scrollGuysIntoView(ms) {
  if (isNaN(ms)) ms = 3500;
  section = screens[screenNr].sections.island;
  scrollGameTo(220, 1450, ms, true);  
}

function endscene() {
  if (endscenePlayed) return;
  endscenePlayed = true;
  avatar.stop();
  //avatar.setFrame('right', 0);
  scrollGameTo(220, 1450, 2500, true);  
  $('.guy1').removeClass('wave');
  story = true;
  doActions(
  function () {
    showDialog(dialogs.screen1.end1);
  },
  function () {
    showDialog(dialogs.screen1.end2);
  },
  function () {
    showDialog(dialogs.screen1.end3);
  },
  function () {
    showDialog(dialogs.screen1.end4);
  },
  function () {
    showDialog(dialogs.screen1.end5);
  },
  function () {
    showDialog(dialogs.screen1.end6);
  },
  function () {
    if (window.endUrl && window.endUrl != '')
      document.location.href = window.endUrl;
  });
  story = false;
}

function scrollGameTo(top, left, ms, noQueue) {
  gameScrollTop = top;
  gameScrollLeft = left;
  $('#canvas').animate({ 'scrollTop': gameScrollTop, 'scrollLeft': gameScrollLeft }, { 'queue': (noQueue != true), 'duration': ms });
}