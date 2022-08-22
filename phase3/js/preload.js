// http://stackoverflow.com/questions/476679/preloading-images-with-jquery

var preloads = [
'img/Cluck_Arcade.png',
'img/Foreground_wall.png',
'img/POP_0000_Q42.png',
'img/POP_0001_Tape-Top.png',
'img/POP_0002_eraser.png',
'img/POP_0003_Eraser-crumbs.png',
'img/POP_0005_Bluelines.png',
'img/POP_0008_Avatar_sketch.png',
'img/POP_0009_Pencil.png',
'img/POP_0010_Tape.png',
'img/POP_0011_Layer-12.png',
'img/POP_0013_Layer-8.png',
'img/Shark_start_cover.png',
'img/backlayer.png',
'img/character_sprite_large.png',
'img/cursor-eye-small.png',
'img/cursor-hand-small.png',
'img/cursor-pointer-small.png',
'img/cursor-wait-small.png',
'img/cursor-walk-small.png',
'img/dockingbaycutout.png',
'img/dockingbayfront.png',
'img/elevator-door_anim.png',
'img/elevator-pad.png',
'img/fronds-bottom.png',
'img/fronds-column-base.png',
'img/fronds-water.png',
'img/front-rocks.png',
'img/frontlayer.png',
'img/guy-arm.png',
'img/intro-bg.png',
'img/keycard.png',
'img/liftcover.png',
'img/mark-wave.png',
'img/plant.png',
'img/prototype-title-phase3.png',
'img/rock-panel-door.png',
'img/scott-wave.png',
'img/spaceback.png',
'img/spacefront.png',
'img/stepping-stone.png',
'img/titlelogo.png',
'img/waterfall.png',

'img/tiles/cover-001.png',
'img/tiles/cover-002.png',
'img/tiles/cover-003.png',
'img/tiles/cover-004.png',
'img/tiles/cover-005.png',
'img/tiles/cover-006.png',
'img/tiles/cover-007.png',
'img/tiles/cover-008.png',
'img/tiles/cover-009.png',
'img/tiles/cover-010.png',
'img/tiles/cover-011.png',
'img/tiles/cover-012.png',
'img/tiles/cover-013.png',
'img/tiles/cover-014.png',
'img/tiles/cover-015.png',
'img/tiles/cover-016.png',
'img/tiles/cover-017.png',
'img/tiles/cover-018.png',
'img/tiles/cover-019.png',
'img/tiles/cover-020.png',
'img/tiles/cover-021.png',
'img/tiles/cover-022.png',
'img/tiles/cover-023.png',
'img/tiles/cover-024.png',
'img/tiles/cover-025.png',
'img/tiles/cover-026.png',
'img/tiles/cover-027.png',
'img/tiles/cover-028.png',
'img/tiles/cover-029.png',
'img/tiles/cover-030.png',
'img/tiles/cover-031.png',
'img/tiles/cover-032.png',
'img/tiles/dome-001.png',
'img/tiles/dome-002.png',
'img/tiles/dome-003.png',
'img/tiles/dome-004.png',
'img/tiles/dome-005.png',
'img/tiles/dome-006.png',
'img/tiles/dome-007.png',
'img/tiles/dome-008.png',
'img/tiles/dome-009.png',
'img/tiles/dome-010.png',
'img/tiles/dome-011.png',
'img/tiles/dome-012.png',
'img/tiles/dome-013.png',
'img/tiles/dome-014.png',
'img/tiles/dome-015.png',
'img/tiles/dome-016.png',
'img/tiles/dome-017.png',
'img/tiles/dome-018.png',
'img/tiles/dome-019.png',
'img/tiles/dome-020.png',
'img/tiles/dome-021.png',
'img/tiles/dome-022.png',
'img/tiles/dome-023.png',
'img/tiles/dome-024.png',
'img/tiles/dome-025.png',
'img/tiles/dome-026.png',
'img/tiles/dome-027.png',
'img/tiles/dome-028.png',
'img/tiles/dome-029.png',
'img/tiles/dome-030.png',
'img/tiles/dome-031.png',
'img/tiles/dome-032.png',
'img/tiles/dome-033.png',
'img/tiles/dome-034.png',
'img/tiles/dome-035.png',
'img/tiles/dome-036.png',
'img/tiles/dome-037.png',
'img/tiles/dome-038.png',
'img/tiles/dome-039.png',
'img/tiles/dome-040.png',
'img/tiles/dome-041.png',
'img/tiles/dome-042.png',
'img/tiles/dome-043.png',
'img/tiles/dome-044.png',
'img/tiles/dome-045.png',
'img/tiles/dome-046.png',
'img/tiles/dome-047.png',
'img/tiles/dome-048.png',
'img/tiles/dome-049.png',
'img/tiles/dome-050.png'
];

// Usage: $(['img1.jpg','img2.jpg']).preloadImages(function(){ ... });
// Callback function gets called after all images are preloaded
$.fn.preloadImages = function(callback) {
  var checklist = this.toArray();
  var loadCount = 0;
  var set1 = $(this.splice(0, Math.floor(this.length / 2)));
  var set2 = $(this);
  function doImages() {
    $('<img>').attr({ src: this }).load(function() {
      loadCount++;
      $('#preloader .progress').css('width', (loadCount / checklist.length) * 400);
      if (checklist.length == loadCount) {
        //setTimeout(function () { callback() }, 5000);
        callback();
      }
      if (loadCount == set1.length) {
        if ($.browser.msie) {
          $("#bsod-container").show();
          pause();
          return false;
        } else {
          $("#insert-disk2-container").show();
          $("#insert-disk2-container").click(function() {
            $(this).hide();
            set2.each(doImages);
          });
          var hideContainer = function(e) {
            if (e.which == 13) { // enter
              $("#insert-disk2-container").hide();
              set2.each(doImages);
              $("body").unbind("keyup", hideContainer);
              e.preventDefault();
              return false;
            }
          }
          $("body").keyup(hideContainer);
        }
      }
    });
  }
  set1.each(doImages);
};

