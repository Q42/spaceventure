var dialogs = {
  defaultLook: [
        ["Nothing to see here.",
        "You look again just in case, but nothing has changed.",
        "If only there were something interesting about this particular object. Unfortunately, there isn't.",
        "Look, there's just nothing worth saying about that particular object. Move on, Groucho.",
        "I give up. You're no fun."],

        ["There's nothing there.",
        "Try as you might, you aren't able to discern any relevant detail.",
        "Staring intently at the object, you strain your eyes enough that you begin to see spots. Good job.",
        "Did I ever tell you about that one time a player stared at the same thing so long she fainted? No? Well, I might start if you keep this up any longer.",
        "OK, look, there are plenty of other things to look at here. Seriously, just get on with it already!"],

        ["I don't see anything of interest.",
        "Nope. Nothing of substance that grabs your interest.",
        "Is that G-23 Paxilon Hydrochlorate?",
        "Perhaps having x-ray vision would help here. Too bad you aren't Superman!",
        "Congratulations! You have OCD."
        ]
    ],
  defaultHand: [
        ["That doesn't work.",
        "Feels pretty uninteresting.",
        "Maybe if you reverse polarity.... nope. Still not interactive.",
        "There is nothing you can say or do to make this object respond to your touch.",
        "Let me spell it out for you: You can't do anything with this object."],

        ["That's a negatory.",
        "There is a time and place for that. You are not in that time or that place.",
        "Holy cucumber sausages, Batman! You can't do that!",
        "It's too bad you can't absorb materials by osmosis. That way you could take this with you!",
        "I wish I could help you. We just didn't program anything in here. Sorry."],

        ["That does not compute.",
        "Error 404: command not found.",
        "Hey, I'm not ready for that kind of intimacy yet.",
        "Try jiggling it a little more.",
        "Even the Gwarkons from planet Febulax wouldn't know what to do with this."
        ]
    ],
  'screen1': {
    shipdock: "Your invisible ship docks. In fact, it’s so smooth it’s like it’s not even there. Looking around you notice an odd sensation, as if this part of the galaxy is not quite finished. Most interesting.",

    spacebottomleftlook: "There it is, space, just as you remember, vast, starry and useless. It does seem to be moving though. I’ll bet you wonder how. Sorry, we aren’t going to tell you. YOU should have paid more attention in school.",
    spacebottomlefthand: "You aren’t out there.",

    corridorlook: "You’re in a shiny new automatic airlock tube. After some of your ‘accidents’ in the past, the designers felt it was safer to make this one user-friendly. (They grew weary of mopping up your entrails.) Little ports allow a view. Wave ‘Hi’!",
    corridortouch: "It feels as smooth as it looks shiny. You could spend hours in here! (But we won’t let you.)",

    elevatorlobbylook: "You’re in an elevator lobby. It’s bigger than the airlock tube, but not as shiny.",
    elevatorlobbyhand: "It’s an elevator lobby. Do you just want to wave your hand and around like an orchestra conductor? (The answer is, No. No, you don’t.)",

    elevatorpadlook: "It looks like a fine location to place one’s feet for an elevator ride.",
    elevatorpadhand: "It feels like an excellent non-skid surface for one to stand on without fear of losing one’s footing.",

    elevatorbuttonlook: "As you can see, there’s a large square button with a green arrow pointing up – at least relative to how you’re standing given this being space and all.",

    //'presselevatorbutton': "You press the elevator button, something you’ve done a mere thirty or so times in previous games.",
    emergeonplatform: "Hmm, it’s oddly warm up here. In fact, the air bears the faint essence of…, what IS that? Oh, yeah, locker room. YUCK! Fortunately, a waterfall nearby seems to be combating the semi-offensive aroma.",
    upperlevelhand: "It feels like – air. How unusual.",

    stepslook: "The floor here has steps which seem to allow you to rise a little more as you step on each one. Very clever.",
    stepshand: "They feel remarkably like floor even though they’re steps.",

    leftsidefrondslook: "They appear to be fronds growing from beneath the rocks that border the pool on the other side of them.",
    leftsidefrondshand: "Mmmm, SO smooth.",

    foregroundrockslook: "They feel rocky, just like your sister’s complexion.",
    foregroundrockshand: "Surprisingly, they feel remarkably like tall boulders.",

    fauxbgrockslook: "The rock formation here looks to be synthetic.",
    fauxbgrockshand: "Touching it verifies that this rock formation is actually molded from CruddTex rock emulsion, a synthetic material that’s not necessarily the best buckazoids can buy but apparently the owners think it will do.",

    upperleftdomelook: "What a huge dome this has. And it’s clear! You can see right through it.",
    upperleftdomehand: "You can only imagine what it feels like. And do you know why that is? It’s because YOU AREN’T CLOSE ENOUGH! Could you not tell? (And you’re no Bender either.)",

    elevatorpaduplook: "Oddly, the elevator pad you rode up here on looks very much like the one you used on the lower level.",
    elevatorpaduphand: "You are still very reassured that it has that comfortingly safe non-skid feel.",
    
    waterfalllook: "The waterfalls are a very pleasant sight and sound. Based on the aroma in here, maybe someone should step under them and take a shower - please!",
    waterfallhand: "As is often the case, the water feels wet.",

    hugeplantlook: "What a soothing pink hue.",
    hugeplanthand: "The green petals feel furry! Heehee!",

    spaceuplook: "Look at all that space. There’s literally almost nothing there.",
    spaceuphand: "You can’t do that. You’re sealed inside, and knowing you, that’s a good thing.",

    plantstamenlook: "Wow, that is impressive, but it’s hard to truly appreciate its beauty from here.",
    plantstamenhand1: "Oh, no! Really? Is this what I think it is? Am I dying already?",
    plantstamenhand2: "Okay, now that’s starting to huurrrrrtt!!!",
    plantstamenhand3: "Well, well, Feels like old times, doesn’t it? Since this is the first time you’ve done something this stupid I guess we’ll let you off easily and give you a hint: You’re now dead. Dying didn’t feel good, did it? If you get another chance, TRY NOT TO DIE! That’s a good little space ranger.",

    fernstreeslook: "There’s a pleasant looking patch of what appear to be ferns and palm trees. I don’t know how we know what they’re called since we never see them in space. Regardless, they look as phony as the rock walls. Cheapskates. There’s probably a velvet Elvis painting around here somewhere, too!",
    fernstreeshand: "You can’t get close enough to be able to feel them, but since they look to be made from CruddTex™ plant emulsion it’s just as well.",

    poollook: "The water looks refreshing. You can’t really see anything below it since the falling water ripples the surface.",
    poolhand: "The water feels remarkably like the water falling from the rock formation. How odd.",

    'keycardslide': "The keycard conveniently slides into the slot in the panel.",
    'keycardrequired': "It is definitely a metal panel but touching it does nothing but make your hand feel cool.",
    'keycardslotlook': "It’s a slightly recessed metal panel.  There’s a very narrow slit in the center about one finger tall.",
    'keycardlook': "Hmm, it appears t be a narrow synthetic rectangular card with an arrow on it. In fact, it looks like a keycard. Oh, like that’s a big surprise. These guys almost never made a game without a keycard in it someplace. Why stop now?",
    'keycardhand': "You are now the proud owner of a keycard. It’s been a while, hasn’t it?",

    'controlpanellook': 'Cool. Dials and gauges. You like dials and gauges, don’t you? Yeah, you do!',
    controlpanelhand: "Oddly, they do nothing, at least now. Maybe when the designers are less lazy these will perform some fairly sweet function.",

    stepintowater: "Nice footwork. Michael Jackson would be jealous - not. EVEN with a point-and-click interface you’ve managed to miss the steps. We really tried to help, but noooo... Oh, well.",

    'marklook': "That guy looks very familiar, but then, you don’t easily forget someone with…, uh, THAT for a nose. Otherwise, he has dimples and smooth facial skin – like a baby’s butt!",
    'markhand': "Oh no, you don’t want to touch him! You HAVE noticed the aroma in this place, right?",
    'scottlook': "Hmmm, he looks kind of familiar. His beard makes him look wise and intriguing!",
    'scotthand': "You aren’t close enough. And even if you were, I believe he would object.",

    'stonesappear1': "You hear a quiet sound from the pool below the water fall.",
    'stonesappear2': 'One by one, stones have appeared from beneath the pool’s surface. They lead to a sandy area.',

    'wave': "You see what appears to be an… Andromedan? Yes, an Andromedan. Actually, two, lying on hover chairs. One of them is trying hard to get your attention and he seems happy to see you. What an honor!",
    'end1': "Yes! Now you recognize them. It's Mark Crowe and Scott Murphy, the legendary (as well as charismatic, funny, brilliant and stunningly handsome) game designer duo!",
    'end2': "You vaguely remember a piece in Gamasutra about them TRYING to get filthy rich through some Kickstarter campaign. So far, so good, it would appear. (Well, except for the heavy use of CruddTex™ around here.)",
    'end3': "\"Hi guys,\" you greet them, in an anxious, high-pitched tone which reminds you of puberty.  “You're...\"",
    'end4': "\"Yeah, yeah, we’re aware of who we are. We’ve been us for a long time now.\" says Scott, rudely, interrupting you. \"Hey, it's been three minutes since we ordered those drinks...\"",
    'end5': "\"And while you're at it, my hoverchair could use some squeegee action,\" adds Mark. \"So? Why are you just standing there? Make yourself useful.\"",
    'end6': "Mark turns to Scott. \"Where’s Roger when you need him?\"",
    'end7': "Turning back to you, Mark says: \"Really, why are you still standing there? Go back to the Kickstarter campaign page and help get us get to $300,000! Move along, little Earth man.\"",
    'end8': "“And we thought Roger was a loser!” says Scott. “Mark, have you seen my snoutblock? I don’t want to look weird in the spread we’re doing for Galacto-rhia.”"
  },
  avatar: {
    look: "You look pretty cool – at least to you.",
    touch: "Hey, what are you trying to do. This game is PG rated. We’ll have none of that here."
  },
  desktop: {
    look: "Is that real wood grain? Good start! Very classy.",
    hand: "It feels…, woody! Smooth and woody.",

    eraserlook: "That’s very pink. I’ll bet you wonder how it feels.",
    eraserhand: "It’s rubbery. It squishes under your firm touch. And, no, you can’t pick it up. Geez, we’re not even in the game yet.",

    pencillook: "You’ve seen one of these before. It’s a stylus of some sort.",
    pencilhand: "It’s stiff and cool. The artist clearly hasn’t been using it in a while. (Slacker. He’s probably having a beer.)",

    tapelook: "This seems to be some kind of miracle film with an adhesive backing. How clever.",
    tapehand: "This thin film is stuck firmly in place. No, you aren’t going to acquire it. Give it up."
  },
  gameover: {
    drownwaterfall1: "Uh oh!",
    drownwaterfall2: "In space, no one… teaches you to swim. After a couple of lungs full of water you start seeing things… that prom you never went to… because of the girlfriend you never had… because of what a geek you were… and how you wish someone would have taught you the advantages of changing your socks more than once a week, and the occasional use of antiperspirant. (Seems girls liked that.) How GREAT some air would feel right about now… BUT, it’s too late. You know the drill. You’re dead.",
    general1: "Wow, it’s been a long time since we’ve been able to kill someone – at least that anyone knows about! Well, this has been nostalgic. Thanks. We know we can always count on you for entertainment! Have a happy non-life.",
    airlock1: "Unbelievable! You’re going to die already. Now your friends are all going to point and laugh. The only word that comes to mind now is, MOMMY! Please note that we put in an automatic airlock system just to keep this from happening but, noooo, you managed to defeat it. Well, time for your death description.",
    airlock2: "With non-existent pressure outside your body your blood, along with every other contained fluid in your body begins to boil as gasses struggle to gain freedom from their liquid confines. Man, this is a headache you’d never forget if you were going to live long enough to remember it. You’re fortunate that this death is such a quick one. You’re now meteor meat. Enjoy eternity.",
    plant: "Thanks for playing! It's been 20 years, but you can rest happy knowing that you still stink at adventure games.",
    shark1: "Yyyouch!!! There’s really nothing quite like having cubic foot-sized sections of your body detached from the rest of you in a seemingly random manner, skin, bones, muscle, tendons, love handles and all. As much as you’d like to be able to describe it to someone, that’s just not going to be possible.",
    shark2: "Hey, look! Oh, right, you can’t, can you? However, if you could you’d see how nicely your blood tints the clear and refreshing water. I’m guessing only the shark knows how it tastes, but he’s not talking. He’s feasting.",
    shark3: "Ahh, haa haa! It’s been a LONG time since we’ve gotten to kill someone off - at least that anyone knows about!!! *Too bad you weren’t able to save your game. Soon, maybe. Keep your fingers crossed.*",
    buttons: "<br><br><div class='buttons'><button id='button-restore' class='restore'>Restore</button><button id='button-restart' class='restart'>Restart</button><button id='button-quit' class='quit'>Quit</button></div>"
  }
}

var endUrl = 'http://guysfromandromeda.com/closing-thoughts-scott-mark-prototype-2/';

// or leave empty to not go anywhere
//var endUrl = '';