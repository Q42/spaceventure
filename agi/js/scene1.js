var splash = false;

/// <reference path="dialog.js" />
var screens = { '1': {
  'boundaries': {
    'all': { 'enabled': false, 'polygon': [0, 0, 9999, 0, 9999, 9999, 0, 9999] },
    'corrior': { polygon: [306, 292, 505, 325, 506, 353, 608, 376, 714, 354, 715, 310, 633, 293, 517, 303, 461, 289, 340, 277, 301, 280] }
  },
  'regions': {
    'corridor-panel': {
      'hotspot': [662, 303],
      'subjects': ['panel', 'elevator button', 'button'],
      'verbs': {
        'look': dialogs.screen1.elevatorbuttonlook,
        'press': 'OK!'
      }
  }
}
}
}

function showSplashScreen() {
  splash = true;
  $('#splash').show();
  showScreen1();
}

function showScreen1() {
  splash = false;
  story = false;
  $('#splash').hide();
  $('#screen1').show();
  avatar.init(345, 295).show();
  doActions(1000,
    dialogs.screen1.shipdock,
    function () {
      avatar.walkto(605, 330);
      setTimeout(function () { $('#screen1 .corridor-front').hide(); }, 1300);
    }
  );
  

}
