var Parser = {
  input: '',
  oldInput: '',

  start: function () {
    if ($.browser.ios) {
      return;
    }
    $("#commandline").show();
    $(document).bind('keydown', Parser.onKeyDown);
    $(document).bind('keypress', Parser.onKeyPress);
    $("#speech").bind('webkitspeechchange', Parser.receiveSpeech);
    setTimeout(Parser.updateCommandLine, 500);
  },

  receiveSpeech: function (e) {
    var value = $('#speech').val();
    Parser.setInput(value);
    setTimeout(Parser.parseCurrentValue, 500);
  },

  onKeyDown: function (e) {
    switch (e.keyCode) {
      case 8: // backspace
        e.preventDefault();
        if (story) return false;
        if (Parser.input.length > 0) {
          Parser.input = Parser.input.substr(0, Parser.input.length - 1);
          Parser.updateCommandLine();
        }
        return false;
        break;
      case 13: // enter
        if (dialog) return;
        if (story) return;

        // if nothing is entered, load the previous text
        if (Parser.getInput() == '') {
          if (Parser.oldInput != '')
            Parser.setInput(Parser.oldInput);
        }
        else
          Parser.parseCurrentValue();
        eatEvent(e);
        // prevent keyup enter handling here
        window.handledEnter = true;
        setTimeout(function () { window.handledEnter = false; }, 150);
        return false;
        break;
      case 27: // esc
        if (story) return; s
        if (!dialog) {
          Parser.clear();
          return false;
        }
        break;
    }
  },

  parseCurrentValue: function () {
    if (Parser.getInput().length > 0) {
      var command = Parser.getInput();
      Parser.oldInput = command;
      Parser.clear();
      Parser.doCommand(command);
    }
  },

  onKeyPress: function (e) {
    if (story) return;
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

  setInput: function (val) {
    Parser.input = val;
    $('#command').text(val);
    Parser.updateCommandLine();
  },
  getInput: function () {
    return $("#command").text();
  },

  clear: function () {
    Parser.setInput('');
  },

  doCommand: function (command, secondPass) {
    // get the verb, the first noun, and optionally a second
    var text = Parser.parseVerbs(command);
    if (text.length > 0) {
      var verb = text.split(' ')[0], noun, noun2;
      var textWithoutVerb = trim(text.substr(verb.length + 1));

      // when 'look' is entered, make it look at the current area
      if (verb == 'look' && textWithoutVerb.length == 0)
        textWithoutVerb = 'around';
      if (textWithoutVerb.length > 0) {
        noun = Parser.parseNoun(textWithoutVerb);
        if (noun.textWithoutNoun.length > 0) {
          noun2 = Parser.parseNoun(noun.textWithoutNoun);
        }
      }

      if (window.Debugger || window.showParsedAs) {
        console.log('input:', command);
        console.log('verb:', verb);
        console.log('noun detected 1:', noun);
        console.log('noun detected 2:', noun2);
      }

      // OK here comes a series of simple conversions and detection - need to rewrite this completely but it'll do for now
      var simpleReplaceableText = trim(text);

      function doResponse(response) {
        if (response.constructor == Array)
          return doActions(response);
        else
          return showDialog(response);
      }

      var simpleReplacedAction = SimpleParserActions[simpleReplaceableText];
      if (simpleReplacedAction && !secondPass) {
        if (simpleReplacedAction.parseAs)
          return Parser.doCommand(simpleReplacedAction.parseAs, true);
        else if (simpleReplacedAction.response)
          return doResponse(simpleReplacedAction.response);
      }

      if (noun && !secondPass) {
        // check if a simple noun (from the dictionary.nouns set) was matched
        if (noun.simpleNoun) {
          simpleReplaceableText = trim(verb + ' ' + noun.simpleNoun);
          simpleReplacedAction = SimpleParserActions[simpleReplaceableText];
          if (simpleReplacedAction && simpleReplacedAction.parseAs)
            return Parser.doCommand(simpleReplacedAction.parseAs, true);
          else if (simpleReplacedAction && simpleReplacedAction.response)
            return doResponse(simpleReplacedAction.response);
        }

        // check if a region noun was matched
        if (noun.region) {
          simpleReplaceableText = trim(verb + ' ' + noun.region);
          simpleReplacedAction = SimpleParserActions[simpleReplaceableText];
          if (simpleReplacedAction && simpleReplacedAction.parseAs)
            return Parser.doCommand(simpleReplacedAction.parseAs, true);
          else if (simpleReplacedAction && simpleReplacedAction.response)
            return doResponse(simpleReplacedAction.response);
        }

        // check if an inventory item was matched
        if (noun.inventoryItem) {
          simpleReplaceableText = trim(verb + ' ' + noun.inventoryItem);
          simpleReplacedAction = SimpleParserActions[simpleReplaceableText];
          if (simpleReplacedAction && simpleReplacedAction.parseAs)
            return Parser.doCommand(simpleReplacedAction.parseAs, true);
          else if (simpleReplacedAction && simpleReplacedAction.response)
            return doResponse(simpleReplacedAction.response);
        }

        // check if an inventory item was matched in combination with a region
        if (noun.inventoryItem && noun.region) {
          simpleReplaceableText = trim(verb + ' ' + noun.inventoryItem + ' ' + noun.region);
          simpleReplacedAction = SimpleParserActions[simpleReplaceableText];
          if (simpleReplacedAction && simpleReplacedAction.parseAs)
            return Parser.doCommand(simpleReplacedAction.parseAs, true);
          else if (simpleReplacedAction && simpleReplacedAction.response)
            return doResponse(simpleReplacedAction.response);
        }

        // check if an inventory item was matched in combination with a region but found in the second noun
        if (noun.inventoryItem && noun2 && noun2.region) {
          simpleReplaceableText = trim(verb + ' ' + noun.inventoryItem + ' ' + noun2.region);
          simpleReplacedAction = SimpleParserActions[simpleReplaceableText];
          if (simpleReplacedAction && simpleReplacedAction.parseAs)
            return Parser.doCommand(simpleReplacedAction.parseAs, true);
          else if (simpleReplacedAction && simpleReplacedAction.response)
            return doResponse(simpleReplacedAction.response);
        }
      }

      var useDefaultResponse = true;

      // if we've got a verb and a region
      if (verb && noun && noun.region) {
        useDefaultResponse = false;
        var regionName = noun.region;
        var regionName2 = noun2 ? noun2.region : null;
        var region = screens["1"].regions[regionName];
        var hotspot = getHotspot(region);
        var closeEnough = true;
        if (region.distance) {
          var curDistance = Math.sqrt(Math.pow(Math.abs(avatar.x - hotspot[0]), 2) + Math.pow(Math.abs(avatar.y - hotspot[1]), 2));
          closeEnough = curDistance <= region.distance;
        }
        if (verb == "use") {
          var canUse = region.use;
          var regionToTouch = regionName;
          if (!canUse && regionName2) {
            canUse = screens["1"].regions[regionName2].use;
            regionToTouch = regionName2;
          }
          if (canUse) {
            if (canUse.constructor == String) {
              setTimeout(function () { showDialog(dialogs.misc.dontneed) }, 100);
              return;
            } else {
              // check if the right inventory item was typed
              for (var i = 0; i < canUse.length; i++) {
                var inventoryItemAllowed = canUse[i];
                if (noun.inventoryItem == inventoryItemAllowed || (noun2 && noun2.inventoryItem == inventoryItemAllowed)) {
                  verb = 'touch';
                  regionName = regionToTouch;
                }
                else
                  useDefaultResponse = true;
              }
            }
          }
          else
            useDefaultResponse = true;
        }
        if (verb == "move") {
          setTimeout(function () { avatar.walkto(hotspot[0], hotspot[1]); }, 100);
          return;
        }
        if (verb == "look") {
          setTimeout(function () { doCursorActionOrWalkToHotspot(regionName, CursorStates.eye); }, 100);
          return;
        }
        if (verb == "take") {
          // if this region is takeable, handle it by touch
          if (region.take)
            verb = "touch";
          else {
            setTimeout(function () { showDialog(dialogs.misc.dontneed) }, 100);
            return;
          }
        }
        if (verb == "touch") {
          setTimeout(function () { doCursorActionOrWalkToHotspot(regionName, CursorStates.hand); }, 100);
          return;
        }
      }
      // otherwise we didn't understand it
      if (useDefaultResponse) {
        var answer = dialogs.defaultverbanswers.fallback;
        if (dialogs.defaultverbanswers[verb])
          answer = dialogs.defaultverbanswers[verb];
        setTimeout(function () { showDialog(answer); }, 100);
      }

    }
  },

  parseVerbs: function (text) {
    text = text.toLowerCase().replace(/'s\s/gi, ' is ').replace(/\s+/g, ' ').replace(/[^A-Za-z' ]/gi, '');
    for (var verb in Dictionary.verbs) {
      var verbs = (verb + '|' + Dictionary.verbs[verb].sort(Parser.sortByLength).join('|')).replace(/\|$/, '');
      text = text.replace(new RegExp('\\b(' + verbs + ')\\b(\\s?)', 'gi'), verb + '$2');
    }
    text = text.replace(new RegExp('\\b(' + Dictionary.clutter.sort(Parser.sortByLength).join('|') + ')\\b\\s?', 'gi'), '');
    text = text.replace(/^\s|\s$|/, '');
    return text;
  },
  parseNoun: function (text) {
    var result = {
      'noun': null,
      'region': null,
      'position': -1,
      'inventoryItem': null,
      'textWithoutNoun': ''
    };
    var longestMatch = 0, matches = [];

    // check regions
    for (var regionName in screens["1"].regions) {
      var region = screens["1"].regions[regionName];
      var nouns = region.nouns;
      if (!nouns) continue;
      nouns = (nouns.sort(Parser.sortByLength).join('|')).replace(/\|$/, '');
      text.replace(new RegExp('\\b(' + nouns + ')\\b', 'gi'), function () {
        var matchedNoun = arguments[0];
        if (matchedNoun.length > longestMatch) {
          longestMatch = matchedNoun.length;
          matches = [regionName];
        }
        else if (matchedNoun.length == longestMatch) {
          matches.push(regionName);
        }
      });
    }

    // check inventory items
    var longestInventoryMatch = 0;
    for (var itemName in Inventory.items) {
      var item = Inventory.items[itemName];
      var nouns = item.nouns;
      if (!nouns) continue;
      nouns = (nouns.sort(Parser.sortByLength).join('|')).replace(/\|$/, '');
      text.replace(new RegExp('\\b(' + nouns + ')\\b', 'gi'), function () {
        var matchedNoun = arguments[0];
        if (matchedNoun.length > longestInventoryMatch) {
          longestInventoryMatch = matchedNoun.length;
          result.inventoryItem = itemName;
        }
      });
    }

    // check simple nouns
    var longestSimpleNounMatch = 0;
    for (var nounName in Dictionary.nouns) {
      var nouns = Dictionary.nouns[nounName];
      if (!nouns) continue;

      nouns = (nounName + '|' + nouns.sort(Parser.sortByLength).join('|')).replace(/\|$/, '');
      text.replace(new RegExp('\\b(' + nouns + ')\\b', 'gi'), function () {
        var matchedNoun = arguments[0];
        if (matchedNoun.length > longestSimpleNounMatch) {
          longestSimpleNounMatch = matchedNoun.length;
          result.simpleNoun = nounName;
        }
      });
    }

    // if more regions match, use the closest match
    if (matches.length > 0) {
      var actionRegion = matches[0];
      if (matches.length > 1) {
        var closestDistance = Infinity;
        for (var i = 0; i < matches.length; i++) {
          var regionName = matches[i];
          var region = screens["1"].regions[regionName];
          var hotspot = getHotspot(region);
          var distanceToRegion = Math.sqrt(Math.pow(Math.abs(avatar.x - hotspot[0]), 2) + Math.pow(Math.abs(avatar.y - hotspot[1]), 2));
          if (distanceToRegion < closestDistance) {
            closestDistance = distanceToRegion;
            actionRegion = regionName;
          }
        }
      }
      var region = screens["1"].regions[actionRegion];
      nouns = (region.nouns.sort(Parser.sortByLength).join('|')).replace(/\|$/, '');
      var textWithoutNoun = text.replace(new RegExp('\\b(' + nouns + ')\\b(\\s?)', 'i'), function () {
        result.position = arguments[3];
        result.noun = trim(arguments[0]);
        return '';
      });
      result.region = actionRegion;
      result.textWithoutNoun = trim(textWithoutNoun);
    }
    return result;
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