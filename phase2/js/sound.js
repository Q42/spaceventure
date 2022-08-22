var sound = {
  enabled: (document.location.protocol != 'file:' && !$.browser.ios),
  context: null,
  bufferLoader: null,
  onload: null,
  currentGain: 0,
  effects: [
    {fxname: "waterfall", type: "effect", url: 'audio/sfx/waterfall3.ogg', buffer: null, source: null},
    {fxname: "liftmoving", type: "ambience", url: 'audio/sfx/liftmoving.mp3', buffer: null, source: null},
    {fxname: "keycardslot", type: "effect", url: 'audio/sfx/keycardslot.mp3', buffer: null, source: null},
    //{fxname: "enginehum", type: "ambience", url: 'audio/sfx/enginehum.mp3', buffer: null, source: null},
    {fxname: "airlock", type: "ambience", url: 'audio/sfx/airlock.mp3', buffer: null, source: null},
    {fxname: "dome_interior", type: "ambience", url: 'audio/sfx/dome_interior.mp3', buffer: null, source: null},
    {fxname: "bg_james", type: "bgm", url: 'audio/music/bg_james.mp3', buffer: null, source: null}
  ],
  init: function (loadComplete) {
    if (!sound.enabled) return;
    this.context = new webkitAudioContext();
    
    this.onload = loadComplete;

    this.nodes = {
      destination: this.context.destination,
      masterGain: this.context.createGainNode(),
      backgroundMusicGain: this.context.createGainNode(),
      ambienceGain: this.context.createGainNode(),
      effectsGain: this.context.createGainNode()
    };

    this.nodes.masterGain.connect(this.nodes.destination);
    this.nodes.backgroundMusicGain.connect(this.nodes.masterGain);
    this.nodes.ambienceGain.connect(this.nodes.masterGain);
    this.nodes.effectsGain.connect(this.nodes.masterGain);

    this.bufferLoader = new BufferLoader(
      sound.context,
      sound.effects,
      sound.loadComplete
    );

    this.bufferLoader.load();
  },
  loadComplete: function (bufferList) {
    this.effects = bufferList;
    sound.onload();
  },
  getSound: function (name) {
    for (var i = 0; i < this.effects.length; i++) {
      if (this.effects[i].fxname == name) return this.effects[i];
    }
  },
  play: function (name, loop, volume) {
    if (!this.enabled) return;

    var effect = this.getSound(name);
    var type = effect.type;
    var source = effect.source;
    if (!source) {
      source = sound.context.createBufferSource();
      effect.source = source;
      source.buffer = effect.buffer;
      source.connect(this.getGain(type));
    }

    source.loop = loop;
    if (volume) sound.setVolume(name, volume, 0);

    source.noteOn(0);
  },
  mute: function () {
    if (!sound.enabled) return;
    var gain = this.nodes.masterGain.gain;
    this.currentGain = gain.value;
    this.setVolume("", 0);
  },
  unmute: function () {
    if (!sound.enabled) return;
    this.setVolume("", this.currentGain);
  },
  getGain: function (type) {
    if (!sound.enabled) return;
    var gain = this.nodes.masterGain;
    if (type == "effect") gain = this.nodes.effectsGain;
    else if (type == "ambience") gain = this.nodes.ambienceGain;
    else if (type == "bgm") gain = this.nodes.backgroundMusicGain;
    return gain;
  },
  setVolume: function (name, volume, dur) {
    if (!sound.enabled) return;
    var effect = this.getSound(name);
    var type = effect ? effect.type : "";
    var gain = this.getGain(type).gain;

    //if (dur && dur > 0)gain.linearRampToValueAtTime(volume,dur);
    gain.value = volume;
  }
};