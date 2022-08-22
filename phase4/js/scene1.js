/// <reference path="dialog.js" />
var screens = { '1': {
  'boundaries': {
    'all': { 'enabled': function () { return godmode == true; }, 'polygon': [0, 0, 9999, 0, 9999, 9999, 0, 9999] },
    'death-by-airlock': { polygon: [186,990,234,1027,328,1050,346,984,225,972,186,990], enter: deathByAirlock },
    'corridor': { polygon: [297,1041,501,1067,548,1033,319,1008,297,1041] },
    'exit-corridor': { polygon: [522,1031,583,1026,681,1059,681,1080,596,1108,513,1106,479,1095] },
    'stairs-scroll-trigger': {
      enabled: function () { return !rockPath && cabinetOpened; },
      enter: scrollWaterfallIntoView,
      polygon: [871,504,934,521,965,537,993,555,994,524,986,507,1007,492,958,476,938,478,910,495]
    },
    'platform-scroll-trigger': {
      enter: scrollPlatformIntoView,
      polygon: [839,504,896,503,943,528,985,564,1002,587,1010,639,903,583,826,538,819,535,818,534,787,512,817,506]
    },
    'stairs': { 'polygon': [438,692,425,607,453,563,518,521,553,533,619,518,681,522,739,523,787,513,836,501,891,494,996,500,1019,627,1021,704,1001,755,986,807,980,871,709,828,551,774,438,692] },
    'plant': { 'polygon': [1366,439,1389,443,1477,457,1529,436,1538,428,1471,422,1452,413,1398,423,1368,429] },
    'behind-waterfall': {
      enabled: function() {
        return cabinetOpened;
      },
      polygon: [874,511,1005,565,989,516,1014,497,1102,470,1153,461,1272,484,1291,464,1482,450,1494,428,1465,415,1345,398,1281,401,1210,394,1149,394,1069,423,1010,441,963,449,958,458,950,473,922,498]
    },
    'fallunderwaterfall': { 
      polygon: [1223,478,1306,475,1318,509,1239,520], 
      enabled: function() { return !rockPath; }, 
      enter: function() {
        story = true;
        avatar.walkto(1290,520);
        doActions(
          800,
          dialogs.gameover.drownwaterfall1,
          function() {
            avatar.stop();
            avatar.position(1290,520);
            $('#avatar').addClass('drown');
            doActions(
              1000,
              dialogs.gameover.drownwaterfall2,
              function() {
                pause();
                showDialog(dialogs.gameover.general1 + dialogs.gameover.buttons);
              }
            );
          }
        );
      }
     },
    'end-game': { 'enter': endscene, 'polygon': [1558,533,1600,574,1644,630,1652,691,1733,660,1686,579,1635,513,1591,493] },
    'island-scroll-trigger': { 'enabled': function () { return rockPath; }, 'enter': toggleWaterfallIslandSection, 'polygon': [1558,520,1474,516,1488,571,1594,701,1668,686,1643,587] },
    'rocks': { 'enabled': function () { return rockPath; }, 'polygon': [1242,474,1229,494,1218,519,1227,539,1248,559,1277,579,1305,593,1346,612,1395,630,1438,636,1502,636,1532,629,1521,572,1448,572,1426,561,1374,545,1334,534,1326,517,1305,492,1284,473] },

    water: {
      enter: fallInTheWater,
      polygon: [1225,493,1177,505,1181,531,1162,562,1186,573,1204,613,1205,639,1214,646,1230,691,1208,734,1267,734,1351,727,1443,722,1509,713,1570,698,1586,686,1580,676,1563,668,1563,664,1548,650,1538,638,1521,621,1519,604,1470,616,1423,613,1372,607,1328,597,1286,583,1259,568,1232,545,1219,531]
    }
    
    //,'island': { 'polygon': [1769, 627, 1912, 774, 1943, 768, 1974, 750, 2023, 767, 2039, 804, 2031, 865, 2140, 861, 2256, 818, 2344, 767, 2388, 679, 2350, 602, 2272, 534, 2196, 492, 2108, 471, 2079, 506, 1969, 476, 1897, 490, 1813, 481, 1803, 507, 1828, 556, 1825, 591, 1771, 631]}

  },
  'regions': {  
    spacebottomleft: {
      nouns: ["space", "outside", "void", "galaxy", "stars", "star", "hyperspace"],
      look: dialogs.screen1.spacebottomleftlook,
      hand: dialogs.screen1.spacebottomlefthand,
      polygon: [0,1237,752,1237,711,1196,709,993,695,991,690,1103,581,1164,512,1153,462,1113,441,1083,444,1066,291,1050,251,1009,237,1012,178,996,166,935,195,853,264,858,315,826,399,833,342,749,343,626,0,628]
    },
    corridor: {
      nouns: ["corridor", "tunnel", "wall", "window"],
      look: dialogs.screen1.corridorlook,
      hand: dialogs.screen1.corridortouch,
      polygon: [188,996,254,1013,295,1051,449,1064,471,973,448,846,313,829,261,866,200,854,170,916]
    },
    elevatorlobby: {
      nouns: ["lobby", "hallway", "hall"],
      look: dialogs.screen1.elevatorlobbylook,
      hand: dialogs.screen1.elevatorlobbyhand,      
      polygon: [478,878,684,968,687,1087,607,1143,535,1142,491,1120,464,1096]
    },
    elevatorpad: {
      nouns: ["pad", "elevator", "lift"],
      look: dialogs.screen1.elevatorpadlook,
      hand: dialogs.screen1.elevatorpadhand,
      polygon: [502,1058,542,1044,602,1042,643,1064,633,1081,590,1091,533,1088,503,1074]
    },
    'death-by-airlock': {
      polygon: [254,1015,0,991,-2,781,261,856],
      hotspot: [314,1027],
      distance: 100,
      hand: deathByAirlock,
      look: deathByAirlock
    },
    'corridor-panel': {
      nouns: ["panel", "button"],
      'hand': elevatorGoesUp,
      'look': dialogs.screen1.elevatorbuttonlook,
      'hotspot': [627,1037], 'distance': 60,
      'polygon': [613,999,666,1004,669,943,611,938]
    },
    upperlevel: {
      nouns: ["platform", "area"],
      look: dialogs.screen1.emergeonplatform,
      hand: dialogs.screen1.upperlevelhand,
      polygon: [438,635,442,610,496,540,608,519,760,513,816,495,916,481,944,455,979,448,1028,445,1009,479,977,548,1014,622,1038,683,1040,721,1011,758,990,788,982,820,950,818,889,807,814,795,679,763,579,726,492,686,459,665,450,662,441,654,438,646,440,665]
    },
    spaceupleft: {
      nouns: ["space", "outside", "void", "galaxy", "stars", "star", "hyperspace"],
      look: dialogs.screen1.spaceuplook,
      hand: dialogs.screen1.spaceuphand,
      polygon: [331,638,413,480,526,311,762,123,329,122]
    },
    spaceupright: {
      nouns: ["space", "outside", "void", "galaxy", "stars", "star", "hyperspace"],
      look: dialogs.screen1.spaceuplook,
      hand: dialogs.screen1.spaceuphand,
      polygon: [1705,3,2389,6,2390,532,2211,300,1977,115]
    },
    elevatorpadup: {
      nouns: ["pad", "elevator", "lift"],
      look: dialogs.screen1.elevatorpaduplook,
      hand: dialogs.screen1.elevatorpaduphand,
      polygon: [591,583,644,603,652,622,624,642,580,650,545,646,500,626,499,607,521,591]
    },
    steps: {
      nouns: ["steps", "stairs"],
      look: dialogs.screen1.stepslook,
      hand: dialogs.screen1.stepshand,
      polygon: [447,569,467,546,522,515,538,525,566,525,637,497,675,510,739,510,779,507,805,499,816,487,881,500,936,524,988,551,1020,590,1030,632,1020,675,986,709,929,748,873,768,803,784,769,790,672,767,595,737,688,722,753,697,780,664,783,637,766,608,739,593,707,578,665,566,624,559,574,555,525,558,486,562]
    },
    buckazoid: {
      nouns: ["buckazoid", "coin", "money"],
      look: dialogs.screen1.buckazoidlook,
      hand: function() {
        if (!Inventory.has('buckazoid')) {
          Inventory.take('buckazoid');
          $('.buckazoid').hide();
          doActions(
            dialogs.screen1.buckazoidhand,
            dialogs.screen1.buckazoidhand2
          ); 
        }
        else {
          doActions(dialogs.screen1.buckazoidhand);
        }
      },
      hotspot: [907,728], distance: 40,
      polygon: [882,712,936,708,941,740,910,757,878,745]
    },
    leftsidefronds: {
      nouns: ["plant", "fronds", "plants"],
      look: dialogs.screen1.leftsidefrondslook,
      hand: dialogs.screen1.leftsidefrondshand,
      polygon: [968,708,1078,763,1101,734,1153,709,1149,727,1143,739,1089,804,1136,751,1197,742,1211,742,1199,758,1141,777,1132,786,1179,790,1208,806,1182,809,1117,815,1106,838,975,827,937,807,969,793,1010,793,1010,774,945,748,961,745,1011,753,956,717]
    },
    foregroundrocks: {
      nouns: ["rocks", "stones", "rock", "stone"],
      look: dialogs.screen1.foregroundrockslook,
      hand: dialogs.screen1.foregroundrockshand,
      polygon: [1036,737,1052,721,1034,620,1055,528,1080,503,1121,541,1130,567,1173,566,1186,574,1205,639,1228,688,1209,739,1209,815,1225,846,1042,833,1016,818,1011,778]
    },
    fauxbgrocks: {
      nouns: ["rocks", "stones", "rock", "stone"],
      look: dialogs.screen1.fauxbgrockslook,
      hand: dialogs.screen1.fauxbgrockshand,
      polygon: [523,511,538,470,592,409,664,356,675,359,678,394,728,338,762,312,794,309,808,320,872,314,891,289,902,260,1015,265,1060,317,1070,392,1047,421,943,443,918,467,817,483,802,493,761,506,680,503,638,493,587,515,549,524]
    },
    arcade: {
      nouns: ["arcade", "cabinet", "machine", "game", "computer"],
      look: dialogs.screen1.arcadelook,
      hand: dialogs.screen1.arcadehand,
      hotspot: [955,419], distance: 100,
      polygon: [911,491,900,459,893,417,897,378,905,346,919,313,945,287,964,284,991,288,1015,308,1033,349,1042,380,1039,411,1034,445,1025,473,1007,498,974,506,932,507]
    },
    arcadejoystick: {
      nouns: ["joystick", "stick"],
      look: dialogs.screen1.arcadejoysticklook,
      hand: dialogs.screen1.arcadejoystickhand,
      hotspot: [972,412], distance: 200,
      polygon: [960,400,959,419,984,418,988,399]
    },
    arcadepad: {
      nouns: ["controls", "buttons", "button"],
      look: dialogs.screen1.arcadepadlook,
      hand: dialogs.screen1.arcadepadhand,
      hotspot: [943,412], distance: 200,
      polygon: [932,399,929,418,959,418,957,398]
    },
    arcadescreen: {
      nouns: ["screen", "display", "monitor"],
      look: dialogs.screen1.arcadescreenlook,
      hand: dialogs.screen1.arcadescreenhand,
      hotspot: [958,388], distance: 200,
      polygon: [934,329,926,350,922,374,927,394,930,397,963,397,986,396,994,388,998,371,993,336,962,327]
    },
    arcadeslot: {
      nouns: ["slot", "coin slot"],
      look: dialogs.screen1.arcadeslotlook,
      hand: function() {
        if (Inventory.has('buckazoid') && !cabinetOpened) {
          playCluck();
        }
        else {
          showDialog(dialogs.screen1.arcadeslothand); 
        }
      },
      hotspot: [955,438], distance: 80,
      polygon: [923,456,926,421,993,419,985,457]
    },
    upperleftdome: {
      nouns: ["dome", "glass", "window"],
      look: dialogs.screen1.upperleftdomelook,
      hand: dialogs.screen1.upperleftdomehand,
      polygon: [425,459,474,372,522,307,574,255,645,195,727,139,815,89,931,41,1043,4,1063,1,1194,1,1248,105,1195,107,1163,93,1130,87,1094,69,1043,99,999,105,951,132,931,154,896,171,873,206,882,235,896,263,886,298,806,315,790,308,758,314,733,333,648,355,591,372,532,399,478,426]
    },
    waterfall: {
      nouns: ["waterfall", "stream"],
      look: dialogs.screen1.waterfalllook,
      hand: dialogs.screen1.waterfallhand,
      polygon: [1110,117,1196,109,1258,110,1305,119,1345,131,1372,159,1381,238,1390,354,1391,508,1298,521,1301,170,1285,145,1243,150,1233,223,1226,364,1229,523,1178,532,1173,367,1175,250,1174,166,1175,144,1148,130]
    },
    plantstamen: {
      nouns: ["stamen", "rod"],
      look: dialogs.screen1.plantstamenlook,
      hand: function() {
        story = true;
        avatar.walkto(1482,376);
        setTimeout(function() {
          doActions(
            function() {
              $("#avatar").hide();
              $(".keycard").hide();
              Loop('.plant').delay(300).play(1,4,70);
              doActions(
                dialogs.screen1.plantstamenhand1,
                dialogs.screen1.plantstamenhand2,
                dialogs.screen1.plantstamenhand3,
                300,
                dialogs.gameover.general1 + dialogs.gameover.buttons
              );
              if (!$.browser.mozilla) pause();
            }
          );
        }, 1500);
      },
      polygon: [1474,362,1451,277,1496,245,1538,268,1530,356],
      hotspot: [1497,412], distance: 100
    },
    hugeplant: {
      nouns: ["plant", "monster", "triffid", "flower"],
      look: dialogs.screen1.hugeplantlook,
      hand: dialogs.screen1.hugeplanthand,
      hotspot: [1378,428], distance: 100,
      polygon: [1306,425,1340,410,1381,389,1400,373,1359,375,1362,356,1390,334,1412,304,1450,292,1474,304,1491,318,1486,289,1494,280,1508,299,1536,283,1571,279,1606,286,1635,298,1657,322,1686,356,1666,354,1639,332,1612,323,1585,336,1577,361,1610,387,1631,413,1647,426,1673,438,1649,447,1614,441,1584,428,1564,415,1528,422,1500,427,1468,420,1459,406,1405,417,1358,427,1325,428]
    },
    fernstrees: {
      nouns: ["ferns", "trees", "palmtree", "palm", "tree", "fern"],
      look: dialogs.screen1.fernstreeslook,
      hand: dialogs.screen1.fernstreeshand,
      polygon: [1354,355,1393,391,1501,404,1628,402,1695,409,1711,437,1805,434,1874,403,1885,372,1893,314,1960,320,1969,320,2024,238,2043,193,1992,143,1839,67,1791,50,1628,5,1562,25,1559,84,1539,160,1474,185,1392,288]
    },
    pool: {
      nouns: ["water", "pool", "lake", "river", "pond"],
      look: dialogs.screen1.poollook,
      hand: dialogs.screen1.poolhand,
      polygon: [1183,525,1161,560,1182,567,1208,633,1227,689,1207,744,1207,816,1229,847,1364,853,1537,847,1663,837,1792,825,1835,814,1832,722,1745,722,1656,693,1635,703,1597,702,1578,687,1576,673,1553,651,1533,632,1513,581,1485,567,1472,536,1478,510,1419,494,1344,485,1227,503,1183,510]
    },
    'waterfall-panel': {
      nouns: ["panel", "button", "slot"],
      'hand': function () {
        if (!cabinetOpened) {
          showDialog(dialogs.screen1.arcadescreenhand);
          return;
        }

        if (Inventory.has('keycard')) {
          sound.play('keycardslot', false, .5)
          doActions(dialogs.screen1.keycardslide, pressWaterfallPanel);
        }
        else showDialog(dialogs.screen1.keycardrequired);
      },
      'look': function() {
        if (!cabinetOpened) {
          showDialog(dialogs.screen1.arcadescreenlook);
          return;
        }

        showDialog(dialogs.screen1.keycardslotlook);
      },
      'hotspot': [984,443], 'distance': 150,
      'polygon': [933,304,998,303,998,373,943,381,933,321]
    },
    'control-panel': {
      nouns: ["panel", "controls", "control panel", "dashboard", "gauges", "dials"],
      look: dialogs.screen1.controlpanellook,
      hand: dialogs.screen1.controlpanelhand,
      'hotspot': [500, 704], 'distance': 100,
      'polygon': [407,508,447,556,426,594,430,649,400,611,384,582,386,538,397,509]
    },
    'keycard': {
      nouns: ["keycard", "card", "key", "ipad", "device", "tablet"],
      'look': dialogs.screen1.keycardlook,
      'hand': function () {
        Inventory.take('keycard');
        $('.keycard').hide();
        doActions(dialogs.screen1.keycardhand);
      },
      'enabled': function () {
        return !Inventory.has('keycard')
      },
      'hotspot': [1514,376], 'distance': 100,
      'polygon': [1474,366,1478,409,1555,402,1548,355,1491,358]
    },
    'mark': {
      nouns: ["mark", "andromedan", "guy", "alien", "man"],
      'look': dialogs.screen1.marklook,
      'hand': dialogs.screen1.markhand,
      'polygon': [1706,464,1762,678,1864,639,1779,455]
    },
    'scott': {
      nouns: ["scott", "andromedan", "guy", "alien", "man"],
      'look': dialogs.screen1.scottlook,
      'hand': dialogs.screen1.scotthand,
      'polygon': [1852,441,1904,633,2001,604,1930,442]
    }
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

function showSplashScreen() {
  if (document.location.hash.toLowerCase() == '#restart') {
    story = true;
    gotoScreen1();
    $('#splash').hide();
    $('#screen1')[0].style['opacity'] = 1;
    return;
  }
  story = true;
  showScreen(1);
  scrollGameTo(531, gameScrollLeft, 0);
  
  sound.play('bg_james', true, 0.1);

  setTimeout(function () {
    $('#logo').addClass('animate');
    $('#dome').addClass('animate');
    $('#current-phase').addClass('animate');
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
  showScreen(1);
  section = screens[screenNr].sections.corridor;
  scrollGameTo(531, gameScrollLeft, 0);  

  sound.play('airlock', true, 1);

  doActions(
    function () {
      setTimeout(function () {
        showDialog(dialogs.screen1.shipdock);
      }, 1000);
    },
    function () {
      $('#splash').hide(); 
      avatar.init(348,1001).show();
      scrollGameTo(531, gameScrollLeft, 0);
      avatar.playAfterFinishedWalking = true;
      avatar.walkto(568,1070);
      setTimeout(function () {
        $(".lift-exterior").addClass("invisible");
        $(".platform-bottom").addClass("visible")        
        setCursorState(CursorStates.walk);
      }, 1000);
    }
  );
}

function elevatorGoesUp() {
  story = true;
  setTimeout(function () {
    avatar.walkto(570,1066);
    setTimeout(function () {
      doActions(
        //dialogs.screen1.presselevatorbutton, 
        function () {
          setTimeout(elevatorGoesUp2, 500);
        }
      );
    });
  }, 200);
}

function elevatorGoesUp2() {
  avatar.position(570,1066);
  avatar.setFrame('down', 0);
  story = true;
  setTimeout(function () {
    scrollGameTo(123, 330, 4000);
  }, 500);

  // debug info for sketch version: goes up 247 pixels first. platform starts at 1221,573 -> platform is 79 px lower than avatar, 122 px left
  $('#avatar').delay(800).animate({ 'top': 866 - $('#avatar').height() }, { 'duration': 1600 });
  $('.platform-bottom').delay(800).animate({ 'top': 842 }, { 'duration': 1600 });

  sound.play('liftmoving', false, .4);

  setTimeout(function () {
    Loop('.platform').delay(300).play(1,5,70);
    avatar.position(570, 825);
    $('.platform-bottom').css({ 'left': 505, 'top': 791 });

  }, 800 + 800);
  setTimeout(function () {
    $('#avatar').animate({ 'top': 625 - $('#avatar').height() }, { 'duration': 1600 });
    $('.platform-bottom').animate({ 'top': 591 }, { 'duration': 1600 });
  }, 800 + 800 + 300);
  setTimeout(elevatorGoesUp3, 800 + 800 + 300 + 2400);
}

function elevatorGoesUp3() {
  section = screens[screenNr].sections.platform;
  avatar.init(570, 625).show();
  $('.platform, .platform-overlay, .dome-bottom').hide()
  $('.platform-bottom').css({ 'left': 505, 'top': 591 });
  
  sound.play('waterfall', true, 0.2);
  //sound.setVolume('enginehum', 0.1);
  sound.play('dome_interior', true, 0.1);

  scrollGameTo(123, 330, 0);
  setTimeout(function () {
    doActions(dialogs.screen1.emergeonplatform,
    function () {
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
  scrollGameTo(18, 656, ms, true);
  setTimeout(function() {
    sound.setVolume('waterfall', .4, 2);
  }, 1000);
}

function scrollPlatformIntoView(ms) {
  if (isNaN(ms)) ms = 4500;
  section = screens[screenNr].sections.platform;
  scrollGameTo(123, 330, ms, true);
  sound.setVolume('waterfall', .2, 2);
}

function pressWaterfallPanel() {
  story = true;
  avatar.walkto(1264,444);
  scrollGameTo(100, 900, 3500, true);
  setTimeout(showRocks, 1200);
  rockPath = true;
}

function showRocks() {
  doActions(
    dialogs.screen1.stonesappear1,
    function() {
      setTimeout(function () { sound.play('rock_splash', false, 0.5); $(".rock1").addClass("animating"); }, 1000);
      setTimeout(function () { $(".rock2").addClass("animating"); }, 1800);
      setTimeout(function () { $(".rock3").addClass("animating"); }, 2200);
      setTimeout(function () { $(".rock4").addClass("animating"); }, 2500);
      setTimeout(function () { $(".rock5").addClass("animating"); }, 2700);
      setTimeout(function () {
        doActions(
          dialogs.screen1.stonesappear2,
          function () {
            story = false;
            setTimeout(function () {
              $('.guy1').addClass('wave');
              setTimeout(function () {
                doActions(dialogs.screen1.wave);
              }, 1000);
            }, 1000);
          }
        );
      }, 4700);
    }
  );
}

function toggleWaterfallIslandSection() {
  if (section != screens[screenNr].sections.island)
    scrollGuysIntoView();
}

function scrollGuysIntoView(ms) {
  if (isNaN(ms)) ms = 3500;
  section = screens[screenNr].sections.island;
  scrollGameTo(100, 1450, ms, true);
}

function endscene() {
  if (endscenePlayed) return;
  endscenePlayed = true;
  avatar.stop();
  scrollGameTo(100, 1450, 2500, true);
  $('.guy1').removeClass('wave');
  story = true;
  doActions(
    dialogs.screen1.end1,
    dialogs.screen1.end2,
    dialogs.screen1.end3,
    dialogs.screen1.end4,
    dialogs.screen1.end5,
    dialogs.screen1.end6,
    dialogs.screen1.end7,
    dialogs.screen1.end8,
    function () {
      if (window.endUrl && window.endUrl != '')
        document.location.href = window.endUrl;
    });
  story = false;
}

function fallInTheWater() {
  avatar.stop();
  $("#avatar").addClass('drown');
  doActions(
    dialogs.screen1.stepintowater,
    function () {
      $(".shark").addClass("appear");
      $(".blood").css({top: avatar.y, left: avatar.x});
      setTimeout(function () {
        $(".shark").removeClass("appear").addClass("disappear");
        $(".blood").addClass("appear");
        doActions(
          dialogs.gameover.shark1,
          300,
          dialogs.gameover.shark2 + dialogs.gameover.buttons
        )
      }, 3000)
      pause();
    }
  )
}

function deathByAirlock() {
  if (window.currentlyDyingByAirlock) return;
  window.currentlyDyingByAirlock = true;
  story = true;
  $('#avatar').addClass('floating');
  doActions(
    6000,
    dialogs.gameover.airlock1,
    2000,
    dialogs.gameover.airlock2,
    1000,
    function() {
      pause();
      showDialog(dialogs.gameover.general1 + dialogs.gameover.buttons);
    }
  );
}

function openCabinet() {
  doActions(
    function() {
      avatar.walkto(930,570);
      $('.arcade').addClass('opening');
      sound.play('arcade_moving', false, 0.5);
      setTimeout(function() {
        doActions(
          dialogs.screen1.arcadeopened,
          dialogs.screen1.arcadeopened2,
          function() {
            cabinetOpened = true;
            var r = screens['1'].regions;
            var dx = -96;
            var dy = -6;
            r.arcade.polygon = Drawing.movePolygon(dx, dy, r.arcade.polygon);
            r.arcade.hotspot = Drawing.movePolygon(dx, dy, r.arcade.hotspot);
            r.arcadejoystick.polygon = Drawing.movePolygon(dx, dy, r.arcadejoystick.polygon);
            r.arcadejoystick.hotspot = Drawing.movePolygon(dx, dy, r.arcadejoystick.hotspot);
            r.arcadepad.polygon = Drawing.movePolygon(dx, dy, r.arcadepad.polygon);
            r.arcadepad.hotspot = Drawing.movePolygon(dx, dy, r.arcadepad.hotspot);
            r.arcadescreen.polygon = Drawing.movePolygon(dx, dy, r.arcadescreen.polygon);
            r.arcadescreen.hotspot = Drawing.movePolygon(dx, dy, r.arcadescreen.hotspot);
            r.arcadeslot.polygon = Drawing.movePolygon(dx, dy, r.arcadeslot.polygon);
            r.arcadeslot.hotspot = Drawing.movePolygon(dx, dy, r.arcadeslot.hotspot);
          }
        );
      }, 3000);
    }
  );
}

function playCluck() {
  paused = true;
  $('#cluck').addClass('preshow');
  sound.play("insert_coin", false, 0.2);
  doActions(
    dialogs.screen1.arcadeopen,
    300,
    cluckStart
  );
  paused = false;
}

function cluckStart() {
  $('#cluck')[0].contentWindow.cluck.load();
  $('#cluck').addClass('show');
  sound.play('cluck', false, 0.2);
  setTimeout(function() {
    $('#cluck')[0].contentWindow.cluck.start();
    $('#cluck')[0].contentWindow.focus();
    sound.play('guile', false, 0.2);
  }, 8000);
}

function cluckEnd() {
  $("#command").focus();
  $('#cluck').remove();
  doActions(1000, dialogs.screen1.cluckend1, dialogs.screen1.cluckend2, openCabinet);   
}