var dialogs = {
  defaultLook: [
        ["Nah, nothing to see here.",
        "You look again just in case, but nothing has changed.",
        "If only there were something interesting about this. Unfortunately, there isn't.",
        "Give it up. There's just nothing worth saying about that particular object. Move on, .",
        "I give up. You're fun-free."],

        ["No, nothing there.",
        "Try as you might, you aren't able to discern any relevant detail.",
        "Staring intently at the object, you strain your eyes enough that you begin to see spots. Sweet!",
        "Did I ever tell you about that one time a player stared at the same thing so long she fainted? No? Good.",
        "OK, look, there are plenty of other things to look at here. Seriously, just get on with it already!"],

        ["I don't see anything of interest.",
        "Nope. Nothing of substance that grabs your interest.",
        "Is that G-23 Paxilon Hydrochlorate? No, in fact, you don't even know what that is. (Don't argue with me!)",
        "Maybe having x-ray vision would help here, but no, not happening for you.",
        "Congratulations! You have OCD."
        ]
    ],
  defaultHand: [
        ["Interestingly ineffective.",
        "Feels pretty uninteresting.",
        "Maybe you're left handed. Nah, just kidding. Not effective either way.",
        "There is nothing your silver toungue can say or do to make this respond to your touch.",
        "Okay, give it up."],

        ["That's a negative, big guy.",
        "There's a time and place for that. This, however is neither.",
        "Holy Orat jerky, Batman! Really? Nnnnoo!",
        "It's too bad you can't absorb materials by osmosis, although it appears you absorbed quite a bit in some manner but that happening here.",
        "I wish I could help you. We just didn't program anything here. Sorry. Long night and all. You understand."],

        ["That does not compute.",
        "Error 404: command not found. (Yeah, tells you a lot, right?)",
        "Hey, I'm not ready for that kind of intimacy yet.",
        "Try jiggling it a little more. No, not your stomach!",
        "Even Buttson of the family Freem wouldn't try that."
        ]
    ],
  'screen1': {
    shipdock: "Your invisible ship docks. In fact, it’s so smooth it's like it’s not even there. ",

    spacebottomleftlook: "There it is, space, just as you remember, vast, starry and... spacey. It does seem to be moving though. I’ll bet you wonder how. Sorry, we aren’t going to tell you. YOU should have paid more attention in school.",
    spacebottomlefthand: "You're not out there.",

    corridorlook: "You’re in a shiny new automatic airlock tube. After some of your ‘accidents’ in the past, the designers felt it was safer to make this one user-friendly. (They grew weary of mopping up your entrails.) Little ports allow a view. Wave ‘Hi’!",
    corridortouch: "It feels as smooth as it looks shiny. You could spend hours in here! (But we won’t let you.)",

    elevatorlobbylook: "You’re in an elevator lobby. It’s bigger than the airlock tube, but not quite as shiny.",
    elevatorlobbyhand: "It’s an elevator lobby. Do you just want to wave your hand and around like an orchestra conductor? (The answer is, No. No, you don’t.)",

    elevatorpadlook: "It looks like a fine location to place one’s feet for an elevator ride.",
    elevatorpadhand: "It feels like an excellent non-skid surface for one to stand on without fear of losing purchase.",

    elevatorbuttonlook: "As you can see, there’s a large square button with a green arrow pointing up – at least relative to how you’re standing given this being space and all.",

    //'presselevatorbutton': "You press the elevator button, something you’ve done a mere thirty or so times in previous games.",
    emergeonplatform: "Hmm, it’s oddly warm up here. In fact, the air bears the faint essence of…, what IS that? Oh, yeah, locker room. YUCK! Fortunately, a waterfall nearby seems to be combating the semi-offensive aroma. Actually, it smells like money to you!",
    upperlevelhand: "It feels like – air. How unusual.",

    stepslook: "The floor here has steps which seem to allow you to rise a little more as you proceed to each one. Very clever.",
    stepshand: "They feel remarkably like floor even though they’re steps.",

    buckazoidlook: "Wow, now that's a nice pile o' buckazoids! Some people must have been really generous to pledge all of that and then leave it just lying around - or the Buckazoid's been devalued greatly.",
    buckazoidhand: "You lean down and procure a buckazoid from the floor. Oh, boy! A real, genuine, authentic buckazoid!",
    buckazoidhand2: "You already have one buckazoid. Don't get greedy, pal.",
    buckazoidhandagain: "You lean over your extensive gut and pick up another buckazoid.",

    leftsidefrondslook: "They look... unhealthy.",
    leftsidefrondshand: "Really? PolySty™ fern fronds? Someone here's too lazy to water a few plants? That’s just sad.",

    foregroundrockslook: "They feel rocky, just like your sister’s complexion.",
    foregroundrockshand: "Surprisingly, they feel remarkably like tall boulders.",

    fauxbgrockslook: "The rock formation here looks to be synthetic.",
    fauxbgrockshand: "Touching it verifies that this rock formation is actually molded from CruddTex™ rock emulsion, a synthetic material that’s not necessarily the best buckazoids can buy but apparently the owners think it will do.",

    arcadelook: "The egg-shaped structure is labeled, \"Cluck Y’Egger.\" A smaller label reads, \"Designed by Two Guys From Andromeda. No Andromedans or poultry were harmed in the making of this game.",
    arcadehand: "It\'s pleasantly smooth. I’ll bet it would slide smoothly from a chicken’s butt, albeit a VERY large chicken. (Those bumpy parts may be a problem though.)",
    arcadeopen: "You slide the buckazoid into the slot marked \"insert coin\". As you hear the coin tumble down the cabinet\'s innards, the screen suddenly springs to life.",
    arcadeopened: "It appears not everything here is at it seems, which isn’t a surprise given everything in here appears to be pre-fab. Somebody’s really cheap!",
    arcadeopened2: "You briefly wonder if domes like these can be purchased though the mail before recounting a bad experience once had with a mail order company.",

    cluckstart: "It\'s Cluck Y\'Egger, your favorite game from you were a just little space ranger! (Yes, you were lillte once.) You\'ve failed at this game a thousand plus times, but you always came back for more. Here\'s one for old times sake...",
    cluckend1: "The GAME OVER screen rudely slaps you with the reality of your utter inability to succeed at this game. Or any game for that matter.",
    cluckend2: "As you ponder the deeper meaning of a somewhat mediocre life, the arcade cabinet starts to rumble and smoothly moves out of the way, revealing a large cave.",
    cluckstartagain: "Must. Play. Cluck.",
    cluckendagain: "Ah crap! Better luck next time.", 

    arcadejoysticklook: "There’s an exciting looking screen, control panel and coin slot. Could this be an omen of a sweet game to come? Hmmm… Probably not. That would be actual fun.",
    arcadejoystickhand: "You jiggle the stick, but nothing happens.",

    arcadepadlook: "There’s an exciting looking screen, control panel and coin slot. Could this be an omen of a sweet game to come? Hmmm… Probably not. That would be actual fun.",
    arcadepadhand: "That\'s some pretty effective glue. Try as you might, you can't pry those buttons off!",

    arcadescreenlook: "It appears to be an image of a chicken wearing goggles. What will they come up with next?",
    arcadescreenhand: "Using your advanced deduction abilities, you note that the screen is a modern AXO-LED with a bioluminescent matrix and cold induction dynamo-nucloid generation activator. All this from touch! Hah! Who are we kidding. You have no idea what that means.",

    arcadeslotlook: "There’s an exciting looking screen, control panel and coin slot. Could this be an omen of a sweet game to come? Hmmm… Probably not. That would be actual fun.",
    arcadeslotnocoin: "Having no buckazoids never got you far. Nothing ever did, actually. But you intend to change that, right?",

    upperleftdomelook: "What a huge dome this has. And it’s clear! You can see right through it.",
    upperleftdomehand: "You can only imagine what it feels like. And do you know why that is? It’s because YOU AREN’T CLOSE ENOUGH! Could you not tell? (And you’re no Bender either.)",

    elevatorpaduplook: "Oddly, the elevator pad you rode up here on looks very much like the one you used on the lower level.",
    elevatorpaduphand: "You are still very reassured that it has that comfortingly safe non-skid feel.",
    
    waterfalllook: "The waterfalls are a very pleasant sight and sound. Based on the aroma in here, maybe someone should step under them and take a shower - please!",
    waterfallhand: "As is often the case, the water feels wet.",

    hugeplantlook: "What a soothing pink hue.",
    hugeplanthand: "The green petals feel furry! They tickle. Heehee!",

    spaceuplook: "Look at all that space. There’s literally almost nothing there except for those cool shiny things floating by.",
    spaceuphand: "You can’t do that. You’re sealed inside, and knowing you, that’s a good thing.",

    plantstamenlook: "Wow, that is impressive, but it’s hard to truly appreciate its beauty from here.",
    plantstamenhand1: '"Oh, no! Really? Is this what I think it is? Am I dying already?"',
    plantstamenhand2: '"Okay, now that’s starting to huurrrrrtt!!!"',
    plantstamenhand3: "Well, well, Feels like old times, doesn’t it? Since this is the first time you’ve done something this stupid I guess we’ll let you off easily and give you a hint: You’re now dead. Dying didn’t feel good, did it? If you get another chance, TRY NOT TO DIE! That’s a good portly space ranger.",

    fernstreeslook: "There’s a pleasant looking patch of what appear to be ferns and palm trees. I don’t know how we know what they’re called since we never see them in space. Regardless, they look as phony as the rock walls. Cheapskates. There’s probably a velvet Elvis painting around here somewhere, too!",
    fernstreeshand: "You can’t get close enough to be able to feel them, but since they look to be made from CruddTex™ plant emulsion it’s just as well.",

    poollook: "The water looks refreshing. You can’t really see anything below it since the falling water ripples the surface.",
    poolhand: "The water feels remarkably like the water falling from the rock formation. How odd.",

    'keycardslide': "The keycard conveniently slides into the slot in the panel.",
    'keycardrequired': "It is definitely a metal panel but touching it does nothing but make your hand feel cool.",
    'keycardslotlook': "It’s a slightly recessed metal panel.  There’s a very narrow slit in the center about one finger tall.",
    'keycardlook': "Hmm, it appears to be a narrow synthetic rectangular card with an arrow on it. In fact, it looks like a keycard. Oh, like that’s a big surprise. These guys almost never made a game without a keycard in it someplace. Why stop now?",
    'keycardhand': "You are now the proud owner of a keycard. It’s been a while, hasn’t it?",

    controlpanellook: "Cool. Dials and gauges. You like dials and gauges, don’t you? Yeah, you do!",
    controlpanelhand: "Oddly, they do nothing, at least now. Maybe when the designers are less lazy these will perform some fairly sweet function.",

    stepintowater: "Nice footwork. Michael Jackson would be jealous - not. EVEN with a point-and-click interface you’ve managed to miss the steps. We really tried to help, but noooo... Oh, well.",

    'marklook': "That guy looks very familiar, but then, you don’t easily forget someone with…, uh, THAT for a nose. Otherwise, he has dimples and smooth facial skin – like a baby’s butt!",
    'markhand': "Oh no, you don’t want to touch him! You HAVE noticed the aroma in this place, right?",
    'scottlook': "Hmmm, he looks kind of familiar. His beard makes him look wise and intriguing!",
    'scotthand': "You aren’t close enough. And even if you were, I believe he would object.",

    'stonesappear1': "You hear a quiet sound from the pool below the waterfall.",
    'stonesappear2': 'One by one, stones have appeared from beneath the pool’s surface. They lead to a sandy area.',

    'wave': "You see what appears to be an… Andromedan? Yes, an Andromedan. Actually, two, lying on hover chairs. One of them is trying hard to get your attention and he seems happy to see you. What an honor!",
    'end1': "Yes! Now you recognize them. It's Mark Crowe and Scott Murphy, the legendary (as well as charismatic, funny, brilliant and stunningly handsome) game designer duo!",
    'end2': "You vaguely remember a piece in Gamasutra about them TRYING to get filthy rich through some Kickstarter campaign. So far, so good, it would appear. (Well, except for the heavy use of CruddTex™ around here.)",
    'end3': "\"Hi guys, Ace Hardway. Did one of you call for a Life Support Systems Specialist?  By the smell of this place I’d way overdue. Hey... wait a minute I know who you two are. Your...\"",
    'end4': "\" Yeah, whatever... the only thing needing a Life Support is us by way of these glasses, as in supporting them from empty to full. It’s been, like, three minutes since we ordered those drinks....\" says Scott, rudely, interrupting you.",
    'end5': "\"And while you're at it, my hoverchair could use some squeegee action,\" adds Mark. \"So? Let's get a move on round man. We didn't order any statues. Make yourself useful.\"",
    'end6': "Mark turns to Scott. \"Where’s Roger when you need him?\"",
    'end7': "Sorry Space Dorks... not in my job description. I got a call that some moron got their Thermoweaves caught in the pool drain. I don’t even want to know what that's about.",
    'end7': "\"Uh... never mind that now. Quit standing around and get yourself to TGAKick.com and help us hit those stretch goals then!\"",
    'end8': "Scott says, \"Mark, have you seen my snoutblock? I don’t want to look weird in the spread we’re doing for Galacto-rhia.\""
  },
  avatar: {
    look: "Interesting, uh, build. Obviously, you're ready for business. What kind of business we're not sure we want to know.",
    touch: "Sure, I understand the temptation, but let's save that for more private time, okay?"
  },
  desktop: {
    look: "Is that real wood grain? Good start! Very classy.",
    hand: "It feels…, woody! Smooth and woody.",

    eraserlook: "That’s very pink. I’ll bet you wonder how it feels.",
    eraserhand: "It’s rubbery. It squishes under your firm touch. And, no, you can’t pick it up. Geez, we’re not even in the game yet.",

    pencillook: "You’ve seen one of these before. It’s a stylus of some sort.",
    pencilhand: "It’s stiff and cool. The artist clearly hasn’t been using it in a while. (Slacker. He’s probably in town having another 'lunch meeting' beer.)",

    tapelook: "This seems to be some kind of miracle film with an adhesive backing. How clever.",
    tapehand: "This thin film is stuck firmly in place. No, you aren’t going to acquire it. Give it up."
  },
  defaultverbanswers: {
    fallback: "Whut?",
    look: "You see nothing special.",
    enter: "No.",
    take: "You don't need it.",
    touch: "It feels... normal?",
    talk: "As you start talking, the squeaky voice in your head mumbles a swift but irrelevant response.",
    use: "It didn't work. You thought you were being clever, didn't you? Well you can't fool us. It's you, Ace.",
  },
  gameover: {
    drownwaterfall1: "Uh oh!",
    drownwaterfall2: "In space, no one… teaches you to swim. After a couple of lungs full of water you start seeing things… that prom you never went to… because of the girlfriend you never had… because of what a geek you were… and how you wish someone would have taught you the advantages of changing your socks more than once a week, and the occasional use of antiperspirant. (Seems girls liked that.) How GREAT some air would feel right about now… BUT, it’s too late. You know the drill. You’re dead.",
    general1: "Wow, it’s been a long time since we’ve been able to kill someone – at least that anyone knows about! Well, this has been nostalgic. Thanks. We know we can always count on you for entertainment! Have a happy non-life.",
    airlock1: "Unbelievable! You’re going to die already. Now your friends are all going to point and laugh. The only word that comes to mind now is, MOMMY! Please note that we put in an automatic airlock system just to keep this from happening but, noooo, you managed to defeat it. Well, time for your death description.",
    airlock2: "With non-existent pressure outside your body your blood, along with every other contained fluid begins to boil as gasses struggle to gain freedom from their liquid confines. Man, this is a headache you’d never forget if you were going to live long enough to remember it. You’re fortunate that this death is such a quick one. You’re now meteor meat. Enjoy eternity.",
    plant: "Thanks for playing! It's been 20 years, but you can rest happy knowing that you still stink at adventure games.",
    shark1: "OWW! You weren’t prepared for this! There’s really no sensation quite like having cubic foot sections of your body efficiently ripped from you, skin, muscle, tendons, ligaments, love handles and all along with the free seepage of your blood into the once soothing pool water. Oh, what’s that, spinal fluid? That's just GREAT!This guy’s getting EVERYTHING! I’ll bet you’re really welcoming sweet, sweet death right about now.",
    shark2: "Ahh, haa haa! It’s been a LONG time since we’ve gotten to kill someone off - at least that anyone knows about!!! *Too bad you weren’t able to save your game. Soon, maybe. Keep your fingers crossed.*",
    buttons: "<br><br><div class='buttons'><button id='button-restore' class='restore'>Restore</button><button id='button-restart' class='restart'>Restart</button><button id='button-quit' class='quit'>Quit</button><button id='button-tweet' class='tweet'>Tweet</button></div>"
  }
}

// basic dictionary with verbs and alternatives. Clutter is removed after checking
var Dictionary = {
  // clutter is removed from sentences
  clutter: ['a', 'all', 'an', 'another', 'my', 'at', 'every', 'first', 'one', 'two', 'three','for', 'from', 'guess', 'i', 'in', 'inside', 'into', 'is', 'it', 'little', 'now', 'of', 'off', 'old', 'on', 'out', 'over', 'please', 'second', 'sir', 'some', 'that', 'the', 'these', 'third', 'this', 'those', 'through', 'to', 'under', 'up', 'will', 'with', 'you'],
  
  // these verb alternative are replaced by their single shorthand version (so "check out" will be replaced with "look")
  verbs: {
    look: ['check out', 'examine', 'inspect', 'view'],
    enter: ['climb into', 'climb in', 'get in', 'get inside', 'get into'],
    take: ['get', 'acquire', 'grab', 'pick', 'pick up', 'rob', 'swipe'],
    touch: ['push', 'press', 'stroke', 'feel', 'rub'],
    talk: ['speak', 'say'],
    use: ['slide', 'put', 'place', 'insert'],
    move: ['walk', 'go'],
    talk: ['speak', 'say'],
    shout: ['yell', 'holler', 'scream'],
    give: ['pass', 'hand','lend']
  },

  // this is a list of simple noun replacements that are not covered by the existing regions or inventory items (both who also have nouns)
  // so this can be used to identify other words, and the SimpleParserActions (see below) can be used to give responses to actions including these nouns.
  // For example, the noun 'ace': ['me', 'myself', 'player'] allows for sentences such as 'look at the player' or 'check out myself' to be identified as a single 'look ace'
  nouns: {
    'ace': ['me', 'myself', 'player']
  }
};

// first, we take the given text, remove clutter, replace verbs with known verbs (such as: it changes "insert" into "use"), replace nouns with their shorthand version
// then, if no region action is taken, this list of simple actions allows you to either parse the input as if it was some other input 
// like so: "foo" : { parseAs: "bar" } will make the text "foo" be parsed as if the player wrote "bar"
// or you can create simple responses such as "shout": { response: "AAAaaah!" } which will make that dialog appear when the player writes "shout".
// To also allow the use of "scream" instead of shout, add it to the verbs collection in the Dictionary.
var SimpleParserActions = {
  "use buckazoid": { parseAs: 'insert buckazoid into coin slot' },
  "use buckazoid arcade": { parseAs: 'insert buckazoid into coin slot' },
  "look ace": { response: "You look mighty fine if you say so yourself." },
  "talk ace": { response: ["\"Hey big boy. Nice wrench you've got there!\"", 1000, "\"Thanks!\""] },
  "talk mark": { response: "Mark seems to ignore you." },
  "talk scott": { response: "Scott seems to ignore you." },
  "give buckazoid mark": { response: "\"Thanks!\"" },
  "give buckazoid scott": { response: "\"Thanks!\"" }
};

var endUrl = 'http://guysfromandromeda.com/thoughts-living-concept-art-phase-5/';

// or leave empty to not go anywhere
//var endUrl = '';