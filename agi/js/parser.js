$(function() {
  $(document).bind('keydown', Parser.onKeyDown);
  $(document).bind('keypress', Parser.onKeyPress);
});

function submitform() {
  var command = $('#command').attr('value');
  $('#command').attr('value', '');
  Parser.parse(command);  
  return false;
}

var Parser = {
  input: '',

  onKeyDown: function (e) {
    switch (e.keyCode) {
      case 8:
        e.preventDefault();
        if (Parser.input.length > 0) {
          Parser.input = Parser.input.substr(0, Parser.input.length - 1);
          Parser.updateCommandLine();
        }
        return false;
        break;
      case 13:
        if (dialog) return;
        if (Parser.input.length > 0) {
          var command = Parser.input;
          Parser.input = '';
          Parser.updateCommandLine();
          Parser.doCommand(command);
        }
        return false;
        break;
    }
  },
  onKeyPress: function (e) {
    var chr = e.charCode;
    var key = String.fromCharCode(chr) + "";
    if (chr == 13) {
      return;
    }
    if (key.match(/[\w\s.,!'"@$*?\-\+\=\_\:\;\(\)]/)) {
      Parser.input += key;
      e.preventDefault();
    }
    Parser.updateCommandLine();
    return false;
  },

  updateCommandLine: function () {
    $('#command').text(Parser.input);
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

    // subject = 'elevator|elevator button'

    
    console.log(verb, subject, target);

    // check global POI
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

    // check regions {
    for (var regionName in screenObj.regions) {
      var region = screenObj.regions[regionName];
      if (region.subjects) {
        if (subject.match(new RegExp('(' + region.subjects.join('|') + ')'))) {
          for (var regionVerb in region.verbs) {
            if (verb == regionVerb) {
              var response = region.verbs[regionVerb];
              setTimeout(function () { showDialog(response); }, 100);
              return;
            }
          }
        }
      }
    }
    setTimeout(function () { showDialog('- no result -'); }, 100);
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
}

// basic dictionary with verbs and alternatives. Clutter is removed after checking
var Dictionary = {
  clutter: ['a', 'all', 'an', 'another', 'at', 'every', 'first', 'for', 'from', 'guess', 'i', 'in', 'inside', 'into', 'is', 'it', 'little', 'now', 'of', 'off', 'old', 'on', 'out', 'over', 'please', 'second', 'sir', 'some', 'that', 'the', 'these', 'third', 'this', 'those', 'through', 'to', 'under', 'up', 'will', 'with', 'you'],
  verbs: {
    'look': ['check out', 'examine', 'inspect', 'view'],
    'climb in': ['climb into', 'enter', 'get in', 'get inside', 'get into', 'go'],
    'get': ['acquire', 'grab', 'pick', 'pick up', 'rob', 'swipe', 'take'],
    'talk': ['speak'],
    'press': ['push', 'touch'],
    'insert': ['slide', 'put']
  }
};

// points of interest that aren't scene1 regions
var POI = {
  'dome': {
    'alternatives': ['world', 'around'],
    'verbs': {
      'look': "That's a nice dome!",
      'get': "You can't take it."
    }
  }
};