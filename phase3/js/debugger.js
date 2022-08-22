var Debugger = {
  panning: false,
  shiftDown: false,
  ctrlDown: false,
  selectedRegion: '-',
  selectedBoundary: '-',
  reshapingIndex: -1,
  shape: [],
  enabled: true,
  init: function () {
    $('body').addClass('debugging').append('<div id="debugger"><input id="debug" type="checkbox" checked="checked"/><label for="debug">Enable Debugger</label>&nbsp;<button onclick="Debugger.help()">?</button><br/><span>Triggers</span><br/><select id="regions"></select><br/><span>Boundaries</span><br/><select id="boundaries"></select><br/><span>Info</span><br/><textarea id="polygon"></textarea><br/><span>Start positions</span><br/><select id="starts"></select></div>');
    $('head').append('<link href="css/debugger.css" type="text/css" rel="stylesheet" />');
    $('#debugger option').live('click', Debugger.handleOption);
    $('body').bind('mousedown', Debugger.mouseDown);
    $('body').live('mousemove', Debugger.mouseMove);
    $('body').bind('mouseup', Debugger.mouseUp);
    $('body').bind('keydown', Debugger.keyDown);
    $('body').bind('keyup', Debugger.keyUp);
    $('#debug').bind('click', Debugger.toggleEnable);
    window.addEventListener('hashchange', function () { document.location.reload(); });
    Debugger.showSplashScreen = showSplashScreen;
    showSplashScreen = Debugger.startHere;
    Debugger.loadScene(1);
    $('#starts').append('<option data-type="start" value="">Splash screen</option>');
    for (var o in Debugger) {
      if (o.indexOf('__start') == 0) {
        var name = o.substr(7);
        $('#starts').append('<option data-type="start" value="' + name + '">' + name + '</option>');
      }
    }
    $('#starts').attr('size', $('#starts option').length);
    //Debugger.toggleEnable();

  },
  startHere: function () {
    var hash = document.location.hash.substr(1) + '';
    if (hash.length > 0) {
      var name = '__start' + hash;
      if (Debugger[name])
        return Debugger[name]();
      name = '__start' + hash.substr(0, 1).toUpperCase() + hash.substr(1);
      if (Debugger[name])
        return Debugger[name]();
    }
    return Debugger.showSplashScreen(); // default action 
  },

  // corridor
  __startCorridor: function () {
    story = true;
    gotoScreen1();
    $('#splash').hide();
    $('#screen1').addClass('animate');
    //$('#screen1').css('opacity', .99);
  },
  // platform
  __startPlatform: function () {
    story = true;
    showScreen(1);
    avatar.init(570, 625).show();
    $('#splash').hide();
    $('#screen1').css('opacity', 1);
    $('.platform-bottom').css({ 'left': 505, 'top': 591, 'opacity': 1 });
    elevatorGoesUp3();
    setCursorState(CursorStates.walk);
  },
  __startWaterfall: function () {
    story = false;
    showScreen(1);
    $('#splash').hide();
    $('#screen1').css('opacity', 1);
    setCursorState(CursorStates.walk);
    avatar.init(1215, 413).show();
    openCabinet();
    avatar.init(1215, 413).show();
    scrollWaterfallIntoView(0);
  },
  // platform
  __startRocks: function () {
    story = true;
    showScreen(1);
    $('#splash').hide();
    $('#screen1').css('opacity', 1);
    //$("#avatar").css("-webkit-transform", "scale(0.7)");
    setCursorState(CursorStates.walk);
    avatar.init(1100, 400).show();
    scrollWaterfallIntoView(0);
    pressWaterfallPanel();
  },


  help: function () {
    alert('Disable debugger for performance.\nRight-click & drag to view more of the scene.\nClick a trigger region or a boundary (or all) to see them.\nWhen only 1 is shown, hold Ctrl+Shift and mousedown nearby a single polygon coordinate to move it.\n\nHold Ctrl and click to create a new polygon.\nUse the Ctrl+Shift trick there too to move polygon points.');
  },
  toggleEnable: function (e) {
    Debugger.enabled = !Debugger.enabled;
    $('#debug').checked = Debugger.enabled;
    if (Debugger.enabled) {
      $('body').addClass('debugging').removeClass('notdebugging');
      Debugger.loadScene(screenNr);
    }
    if (!Debugger.enabled) {
      $('body').removeClass('debugging').addClass('notdebugging');
      $('#debugcanvas').remove();
    }
  },
  loadScene: function (scene) {
    $('#debugcanvas').remove();
    $('#innercanvas').append('<canvas id="debugcanvas" width="' + 3000 + '" height="' + 1500 + '"></canvas>');
    this.canvas = $('#debugcanvas')[0];

    var screen = screens[screenNr], regions = screenObj.regions, boundaries = screenObj.boundaries;

    // load regions
    $('#regions').html('<option data-type="region" value="-">- none -</option>');
    $('#regions').append('<option data-type="region" value="*">- all -</option>');
    for (var name in regions) {
      $('#regions').append('<option data-type="region" value="' + name + '">' + name + '</option>');
    }
    $('#regions').attr('size', Math.min(6, $('#regions option').length));

    // load boundaries
    $('#boundaries').html('<option data-type="boundary" value="-">- none -</option>');
    $('#boundaries').append('<option data-type="boundary" value="*">- all -</option>');
    for (var name in boundaries) {
      if (name == 'all') continue;
      $('#boundaries').append('<option data-type="boundary" value="' + name + '">' + name + '</option>');
    }
    $('#boundaries').attr('size', Math.min(20, $('#boundaries option').length));
  },
  handleOption: function (e) {
    if (!Debugger.enabled) return;
    var el = $(event.target);
    var type = el.attr('data-type');
    var value = el.attr('value');
    if (type == 'start') {
      document.location.href = '#' + value;
    }
    if (type == 'region') {
      Debugger.showRegion(value);
      Debugger.selectedRegion = value;
      if (value.length > 1)
        $('#polygon').text(getRegion(value).polygon)
    }
    if (type == 'boundary') {
      Debugger.showBoundary(value);
      Debugger.selectedBoundary = value;
      if (value.length > 1)
        $('#polygon').text(getBoundary(value).polygon)
    }
  },
  showRegion: function (name, noClear) {
    if (!noClear)
      this.clear();
    if (name == '-') return;
    if (name == '*') {
      var screen = screens[screenNr], regions = screenObj.regions, boundaries = screenObj.boundaries;
      for (var name in regions)
        this.showRegion(name, true);
      return;
    }
    var polygon = screens[screenNr].regions[name].polygon;
    this.drawPolygon(polygon);
  },
  showBoundary: function (name, noClear) {
    if (!noClear)
      this.clear();
    if (name == '-') return;
    if (name == '*') {
      var screen = screens[screenNr], regions = screenObj.regions, boundaries = screenObj.boundaries;
      for (var name in boundaries)
        if (name != 'all')
          this.showBoundary(name, true);
      return;
    }
    var polygon = screens[screenNr].boundaries[name].polygon;
    this.drawPolygon(polygon, 'rgba(0,255,0,.5)');
  },
  clear: function () {
    var ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, 9999, 9999);
  },
  drawPolygon: function (polygon, fillStyle) {
    if (!fillStyle)
      fillStyle = 'rgba(255,0,0,.5)';
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = 'rgba(0,0,0,.5)';
    ctx.beginPath();
    for (var i = 0; i < polygon.length; i += 2) {
      var x = polygon[i], y = polygon[i + 1];
      if (i == 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.lineTo(polygon[0], polygon[1]);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  },
  mouseDown: function (e) {
    if (!Debugger.enabled) return;
    if (Debugger.ctrlDown && !Debugger.shiftDown) {
      getXY(e);
      Debugger.shape.push(gameX, gameY);
      Debugger.clear();
      Debugger.drawPolygon(Debugger.shape, 'rgba(0,0,255,.5)');
      $('#polygon').text(Debugger.shape);
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  },
  mouseMove: function (e) {
    if (!Debugger.enabled) return;
    getXY(e);
    //document.title = gameX + ', ' + gameY;
    // when CTRL + left mouse button is down, reshape coordinates
    if (Debugger.ctrlDown && Debugger.shiftDown && e.which == 1) {
      if (Debugger.shape.length > 0) {
        var poly = Debugger.shape;
        // calculate which coordinate we're reshaping
        if (Debugger.reshapingIndex == -1) {
          var smallestDist = Infinity;
          for (var i = 0; i < poly.length; i += 2) {
            var polyX = poly[i], polyY = poly[i + 1];
            var dist = Math.sqrt(Math.pow(Math.abs(gameX - polyX), 2) + Math.pow(Math.abs(gameY - polyY), 2));
            if (dist < smallestDist) {
              smallestDist = dist;
              Debugger.reshapingIndex = i;
            }
          }
        }
        if (Debugger.reshapingIndex >= 0) {
          var newPoly = poly.slice();
          newPoly[Debugger.reshapingIndex] = gameX;
          newPoly[Debugger.reshapingIndex + 1] = gameY;
          Debugger.clear();
          Debugger.drawPolygon(newPoly, 'rgba(0,0,255,.5)');
          Debugger.shape = newPoly;
          $('#polygon').text(newPoly);
        }
      }
      else if (Debugger.selectedBoundary.length > 1 && Debugger.selectedRegion.length == 1) {
        // get poly
        var poly = getBoundary(Debugger.selectedBoundary).polygon;
        // calculate which coordinate we're reshaping
        if (Debugger.reshapingIndex == -1) {
          var smallestDist = Infinity;
          for (var i = 0; i < poly.length; i += 2) {
            var polyX = poly[i], polyY = poly[i + 1];
            var dist = Math.sqrt(Math.pow(Math.abs(gameX - polyX), 2) + Math.pow(Math.abs(gameY - polyY), 2));
            if (dist < smallestDist) {
              smallestDist = dist;
              Debugger.reshapingIndex = i;
            }
          }
        }
        if (Debugger.reshapingIndex >= 0) {
          var newPoly = poly.slice();
          newPoly[Debugger.reshapingIndex] = gameX;
          newPoly[Debugger.reshapingIndex + 1] = gameY;
          Debugger.clear();
          Debugger.drawPolygon(newPoly, 'rgba(0,255,0,.5)');
          screens[screenNr].boundaries[Debugger.selectedBoundary].polygon = newPoly;
          $('#polygon').text(newPoly);
        }
      }
      else if (Debugger.selectedBoundary.length == 1 && Debugger.selectedRegion.length > 1) {
        // get poly
        var poly = getRegion(Debugger.selectedRegion).polygon;
        // calculate which coordinate we're reshaping
        if (Debugger.reshapingIndex == -1) {
          var smallestDist = Infinity;
          for (var i = 0; i < poly.length; i += 2) {
            var polyX = poly[i], polyY = poly[i + 1];
            var dist = Math.sqrt(Math.pow(Math.abs(gameX - polyX), 2) + Math.pow(Math.abs(gameY - polyY), 2));
            if (dist < smallestDist) {
              smallestDist = dist;
              Debugger.reshapingIndex = i;
            }
          }
        }
        if (Debugger.reshapingIndex >= 0) {
          var newPoly = poly.slice();
          newPoly[Debugger.reshapingIndex] = gameX;
          newPoly[Debugger.reshapingIndex + 1] = gameY;
          Debugger.clear();
          Debugger.drawPolygon(newPoly, 'rgba(255,0,0,.5)');
          screens[screenNr].regions[Debugger.selectedRegion].polygon = newPoly;
          $('#polygon').text(newPoly);
        }
      }
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    if (e.which == 3) {
      var x = e.clientX, y = e.clientY;
      if (!Debugger.panning) {
        Debugger.startX = x;
        Debugger.startY = y;
        Debugger.panning = true;
        Debugger.oriGameScrollLeft = gameScrollLeft;
        Debugger.oriGameScrollTop = gameScrollTop;
      }
      else {
        var deltaX = x - Debugger.startX;
        var deltaY = y - Debugger.startY;
        gameScrollTop = Debugger.oriGameScrollTop - deltaY;
        gameScrollLeft = Debugger.oriGameScrollLeft - deltaX;
        if (gameScrollTop == Debugger.oriGameScrollTop) Debugger.startY = y;
        if (gameScrollLeft == Debugger.oriGameScrollLeft) Debugger.startX = x;
        scrollGameTo(gameScrollTop, gameScrollLeft, 0, true);
      }
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  },
  mouseUp: function (e) {
    if (!Debugger.enabled) return;
    Debugger.panning = false;
    Debugger.reshapingIndex = -1;
  },
  keyDown: function (e) {
    if (!Debugger.enabled) return;
    if (e.keyCode == 16) Debugger.shiftDown = true;
    if (e.keyCode == 17) Debugger.ctrlDown = true;
    if (!Debugger.shiftDown) $('body').removeClass('shiftDown'); else $('body').addClass('shiftDown');
    if (!Debugger.ctrlDown) $('body').removeClass('ctrlDown'); else $('body').addClass('ctrlDown');
  },
  keyUp: function (e) {
    if (!Debugger.enabled) return;
    var shiftWasDown = Debugger.shiftDown;
    var ctrlWasDown = Debugger.ctrlDown;
    if (e.keyCode == 16) Debugger.shiftDown = false;
    if (e.keyCode == 17) Debugger.ctrlDown = false;
    if (!Debugger.shiftDown) $('body').removeClass('shiftDown'); else $('body').addClass('shiftDown');
    if (!Debugger.ctrlDown) $('body').removeClass('ctrlDown'); else $('body').addClass('ctrlDown');
    if (ctrlWasDown && !Debugger.ctrlDown) {
      Debugger.shape = [];
      //Debugger.clear();
    }
  }
}
$(function () { Debugger.init(); });