$(function () {
  if ($.browser.ios) {
    return;
  }
  $('#commandline').show();
  $(document).bind('keydown', Parser.onKeyDown);
  $('#command').click(function (e) {
    e.stopPropagation();
  });
  $("#command").bind('webkitspeechchange', function () {
    var command = Parser.getInput();
    setTimeout(function () {
      Parser.setInput('');
      Parser.doCommand(command);
    }, 1000);
    //chrome.tts.speak(command);
  });
});

var Parser = {
  input: '',

  onKeyDown: function (e) {
    switch (e.keyCode) {
      case 13:
        if (dialog) return;
        if (Parser.getInput().length > 0) {
          var command = Parser.getInput();
          Parser.setInput('');
          Parser.doCommand(command);
        }
        return false;
        break;
    }
  },

  setInput: function (val) {
    $('#command').val(val);
  },
  getInput: function() {
    return $("#command").val();
  },

  doCommand: function (command) {
    var text = Parser.parse(command);
    for (var pointName in POI) {
      var poi = POI[pointName];
      var points = (pointName + '|' + poi.alternatives.sort(Parser.sortByLength).join('|')).replace(/\|$/, '');
      text = text.replace(new RegExp('\\b(' + points + ')\\b(\\s?)', 'gi'), pointName + '$2');
    }
    var pairs = text.split(' ');
    var verb = pairs[0], subject = pairs[1], target = pairs[2];

    // find a region with a noun matching what we entered
    for (var regionName in screens["1"].regions) {
      var region = screens["1"].regions[regionName];
      var nouns = region.nouns;
      if (!nouns) continue;
      for (var i = 0; i < nouns.length; i++) {
        if (subject != nouns[i]) continue;
        var closeEnough = true;
        if (region.distance) {
          var curDistance = Math.sqrt(Math.pow(Math.abs(avatar.x - region.hotspot[0]), 2) + Math.pow(Math.abs(avatar.y - region.hotspot[1]), 2));
          closeEnough = curDistance <= region.distance; 
        }
        if (verb == "move") {
          setTimeout(function() { avatar.walkto(region.hotspot[0], region.hotspot[1]); }, 100);
          return;
        }
        if (verb == "look") {
          if (closeEnough) setTimeout(function () { showDialog(region.look); }, 100);
          else setTimeout(function () { showDialog("Get closer."); }, 100);
          return;
        }
        if (verb == "touch") {
          if (closeEnough) setTimeout(function () { showDialog(region.hand); }, 100);
          else setTimeout(function () { showDialog("Get closer."); }, 100);
          return;
        }
      }
    }

    // no regions found, try POIs
    for (var pointName in POI) {
      var poi = POI[pointName];
      if (subject == pointName) {
        for (var poiVerb in poi.verbs) {
          if (verb == poiVerb) {
            var response = poi.verbs[poiVerb];
            setTimeout(function () { showDialog(response); }, 100);
            return;
          }
        }
      }
    }

    // no matches
    setTimeout(function () { showDialog('That does not compute.'); }, 100);
  },

  parse: function (text) {
    text = text.toLowerCase().replace(/'s\s/gi, ' is ').replace(/\s+/g, ' ').replace(/[^A-Za-z' ]/gi, '');
    for (var verb in Dictionary.verbs) {
      var verbs = (verb + '|' + Dictionary.verbs[verb].sort(Parser.sortByLength).join('|')).replace(/\|$/, '');
      text = text.replace(new RegExp('\\b(' + verbs + ')\\b(\\s?)', 'gi'), verb + '$2');
    }
    text = text.replace(new RegExp('\\b(' + Dictionary.clutter.sort(Parser.sortByLength).join('|') + ')\\b\\s?', 'gi'), '');
    text = text.replace(/^\s|\s$|/, '');
    return text;
  },
  sortByLength: function (a, b) {
    return a.length < b.length ? 1 : a.length > b.length ? -1 : 0;
  },
  // returns true if s matches any regular expression pattern
  matches: function (s, patterns) {
    for (var i = 0; i < patterns.length; i++) {
      var reg = new RegExp(patterns[i], "gi");
      if (s.match(reg))
        return true;
    }
    return false;
  }
};

// basic dictionary with verbs and alternatives. Clutter is removed after checking
var Dictionary = {
  clutter: ['a', 'all', 'an', 'another', 'at', 'every', 'first', 'for', 'from', 'guess', 'i', 'in', 'inside', 'into', 'is', 'it', 'little', 'now', 'of', 'off', 'old', 'on', 'out', 'over', 'please', 'second', 'sir', 'some', 'that', 'the', 'these', 'third', 'this', 'those', 'through', 'to', 'under', 'up', 'will', 'with', 'you'],
  verbs: {
    look: ['check out', 'examine', 'inspect', 'view'],
    enter: ['climb into', 'climb in', 'get in', 'get inside', 'get into'],
    get: ['acquire', 'grab', 'pick', 'pick up', 'rob', 'swipe', 'take'],
    touch: ['stroke', 'feel', 'rub'],
    talk: ['speak', 'say'],
    use: ['slide', 'put', 'place', 'insert'],
    move: ['walk', 'go']
  }
};

// points of interest that aren't scene1 regions
var POI = {
  around: {
    alternatives: [],
    verbs: {
      look: "You are in a giant space station with a glass dome on top. Judging by the speed at which all those stars out there are speeding by, this thing must be traveling at at least warp 8.6!"
    }
  }
};