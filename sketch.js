// Super Smash Bros Clone
// Mitt Pham
// April 16, 2026
// 
// References and resources:
// https://p5js.org/reference/p5/p5.Vector/ - vector class
// https://editor.p5js.org/jeffThompson/sketches/rrssQYach - frame count
// https://gameprogrammingpatterns.com/state.html - state machines
// https://editor.p5js.org/shfitz/sketches/8s9FLdrai - switch and case
// https://ultimateframedata.com/stats - character statistics
// https://kuroganehammer.com/Ultimate/Marth - Marth knockback and damage values
// https://www.jeffreythompson.org/collision-detection/rect-rect.php - rect/rect collision detection
// https://blog.hamaluik.ca/posts/simple-aabb-collision-using-minkowski-difference/ - Minkowksi difference
// https://www.youtube.com/watch?v=CxvdO_kkXmY - smash bros knockback explanation
// https://www.ssbwiki.com/Knockback - smash knockback formula
// https://www.ssbwiki.com/Hitstun - hitstun
// https://www.ssbwiki.com/Tumbling - tumbling
// https://www.ssbwiki.com/Rage - rage
// https://www.ssbwiki.com/Sakurai_angle - Sakurai's special angle
// https://editor.p5js.org/jesse_harding/sketches/dzF-WbKuk - platform collision
// https://www.youtube.com/playlist?list=PLf9yt-2olqyLxr-vouWl-qk4toUfjF2LC - street fighter clone
// https://www.reddit.com/r/smashbros/comments/1h78zyq/how_does_an_attacks_frames_on_shield_and_ending/ - how end lag works with frames
// https://www.youtube.com/watch?v=ht3bZcLxBlQ - smash mechanics explanation
// https://www.reddit.com/r/smashbros/comments/ah7obo/how_ultimates_buffer_works_full_explanation/ - how buffering works

// In game:
// https://www.spriters-resource.com/custom_edited/supersmashbroscustoms/asset/62979/ - stage
// https://www.youtube.com/watch?v=wrZd9ox36BE - background
// https://www.101soundboards.com/boards/1048309-marth-super-smash-bros-ultimate - marth sounds
// https://www.deviantart.com/the-screen-ko-plus/art/SSBC-Marth-Sprite-Sheet-Reupload-1125121853 - marth sprites
// https://www.youtube.com/watch?v=6JYnDGh5mCE&list=PLYzPRovwO_fOl0WuwqizjhPLbIwnks8Lg&index=6 - music
// https://www.myinstants.com/en/instant/3-2-1-go-87996/?utm_source=copy&utm_medium=share - announcer countdown
// https://www.youtube.com/watch?v=FIV4jXtg6-s&list=RDFIV4jXtg6-s&start_radio=1 - game end sound
// https://www.youtube.com/watch?v=7HzxdnW2gaI - marth win sound
// https://www.youtube.com/watch?v=14dHroamo2E - final ko sound
// https://www.myinstants.com/en/instant/stage-fallout-super-smash-bros-ultimate-16980/ - regular death sound
// https://www.myinstants.com/en/instant/game-super-smash-bros-6647/ - announcer game sound
// https://sounds.spriters-resource.com/wii_u/supersmashbrosforwiiu/asset/397960/ - more marth sounds
// https://www.hiclipart.com/free-transparent-background-png-clipart-vvulw - marth icon
// https://www.spriters-resource.com/custom_edited/supersmashbroscustoms/asset/196310/ - marth portrait
// https://www.youtube.com/watch?v=6znq-EYa8C0&list=RD6znq-EYa8C0&start_radio=1 - menu music

// Universal player variables and constants
const JUMPSQUAT_TIMER = 3;
const SOFT_LANDING_LAG_TIMER = 2;
const HARD_LANDING_LAG_TIMER = 4;
const SPAWNING_TIMER = 30;
const INVINCIBILITY_TIMER = 120;
const ANGEL_PLATFORM_TIMER = 300;
const PLAYER_STOCKS = 3;
const KNOCKBACK_MULTIPLIER = 0.15;
const HITSTUN_MULTIPLIER = 0.4;
const SAKURAI_SPECIAL_ANGLE = 361;
const LOW_KNOCKBACK_ANGLE = 0;
const HIGH_KNOCKBACK_ANGLE = -38;
const LOW_KNOCKBACK_THRESHOLD = 66;
const HIGH_KNOCKBACK_THRESHOLD = 88;
const R_KEY = 82;
const P_KEY = 80;
const C_KEY = 67;
const M_KEY = 77;
const PLAYER_TEXT_SIZE = 20;
const BUFFER_WINDOW = 9;
const MARTH_ICON_SCALE_FACTOR = 0.2;
const MARTH_ICON_GAP = 135;
const ZERO_OPACITY = 255;
const INCREASED_OPACITY = 150;

let winner = null;

// Player 1 constants and variables
const PLAYER_ONE_DIRECTION = true;

let playerOneStartX;
let playerOneStartY;
let playerOneSpawnX;
let playerOneSpawnY;
let playerOneStockX;
let playerOneStockY;

let playerOne;

// Player 1 controls
let playerOneControls = {
  left: 65, // A key
  right: 68, // D key
  jump: 87, // W key
  up: 69, // E key
  down: 83, // S key
  shortHop: 81, // Q key
  attack: 84, // T key
  forwardTilt: 85, // U key
  special: 89, // Y key
};

// Player 2 constants and variables
const PLAYER_TWO_DIRECTION = false;

let playerTwoStartX;
let playerTwoStartY;
let playerTwoSpawnX;
let playerTwoSpawnY;
let playerTwoStockX;
let playerTwoStockY;

let playerTwo;

// Player 2 controls
let playerTwoControls = {
  left: 37, // Left arrow
  right: 39, // Right arrow
  jump: 38, // Up arrow
  up: 35, // End key / Numberpad 1
  down: 40, // Down arrow
  shortHop: 16, // Shift key
  attack: 45, // Insert key / Numberpad 0
  forwardTilt: 13, // Enter key
  special: 46,  // Delete key / Numberpad .
};

// Stage constants and variables
const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 50;
const BLAST_ZONE_GAP = 100;
const STAGE_Y_OFFSET = 318.5;

let stageX;
let stageY;
let topBlastZone;
let bottomBlastZone;
let leftBlastZone;
let rightBlastZone;

let stage;

// Game state variables and constants
const THREE_SECOND_MARK = 120;
const TWO_SECOND_MARK = 60;
const ONE_SECOND_MARK = 0;
const GO_MARK = -60;
const COUNTDOWN_TEXT_SIZE = 100;
const DAMAGE_METER_TEXT_SIZE = 40;
const DAMAGE_METER_Y = 730;
const PLAYER_NAME_TEXT_SIZE = 20;
const DAMAGE_METER_GAP = 30;
const MENU_TEXT_SIZE = 70;
const CONTROLS_TEXT_SIZE = 40;

let countdownTimer = 180;
let countdownBegun = false;
let marthWinDone = false;
let gameAnnouncerPlayed = false;
let gameState = "menu"; // menu, controls, starting, playing, gameOver

// Sounds
let backgroundMusic;
let countdownAnnouncer;
let marthWin;
let gameEndMusic;
let gameAnnouncer;
let menuMusic;
let entranceSound;

// Sprites and images
let stageSprite;
let stageBackground;
let marthSheet;
let marthIcon;

// Player one
let marthAppearOne;
let marthRun1One;
let marthRun2One;
let marthRun3One;
let marthSourHitOne;
let marthSweetHitOne;
let marthSwingOne;
let marthJumpOne;
let marthDoubleJumpOne;
let marthLandOne;
let marthHurtOne;
let marthSquatOne;
let marthRiseOne;
let koOne;
let finalKoOne;
let marthUpSpecialOne;

// Player two
let marthAppearTwo;
let marthRun1Two;
let marthRun2Two;
let marthRun3Two;
let marthSourHitTwo;
let marthSweetHitTwo;
let marthSwingTwo;
let marthJumpTwo;
let marthDoubleJumpTwo;
let marthLandTwo;
let marthHurtTwo;
let marthSquatTwo;
let marthRiseTwo;
let koTwo;
let finalKoTwo;
let marthUpSpecialTwo;

// Marth stats
let playerOneMarthStats = {
  runSpeed: 3.6,
  initialDash: 5,
  airAcceleration: 1,
  airSpeed: 2,
  friction: 0.886,
  gravity: 0.6,
  fallSpeed: 8,
  fastFallSpeed: 12.8,
  shortHopPower: -8.6,
  fullHopPower: -13.6,
  doubleJumpPower: -13.6,
  weight: 90,
  color: "blue",
  width: 40,
  currentHeight: 80,
  idleHeight: 80,
  crouchHeight: 40,
  offsetCrouchHeight: 20,
  name: "P1",
  upSpecialPower: -20,
};

let playerTwoMarthStats = {
  runSpeed: 3.6,
  initialDash: 5,
  airAcceleration: 1,
  airSpeed: 2,
  friction: 0.886,
  gravity: 0.6,
  fallSpeed: 8,
  fastFallSpeed: 12.8,
  shortHopPower: -8.6,
  fullHopPower: -13.6,
  doubleJumpPower: -13.6,
  weight: 90,
  color: "blue",
  width: 40,
  currentHeight: 80,
  idleHeight: 80,
  crouchHeight: 40,
  offsetCrouchHeight: 20,
  name: "P2",
  upSpecialPower: -20,
};

// Marth attacks

// Jab
let marthJabOne = {
  name: "marthJabOne",
  offsetX: 60,
  offsetY: -10,
  width: 100,
  height: 100,
  startingFrames: 5,
  activeFrames: 1,
  endingFrames: 19,
  damage: 5,
  angle: 361,
  knockback: 30,
  growthKnockback: 12,
  shieldStun: 6,
  transitionFrame: 11,
  autoTransition: false,
};

let marthJabTwo = {
  name: "marthJabTwo",
  offsetX: 60,
  offsetY: -10,
  width: 100,
  height: 100,
  startingFrames: 4,
  activeFrames: 1,
  endingFrames: 23,
  damage: 6,
  angle: 45,
  knockback: 62,
  growthKnockback: 75,
  shieldStun: 6,
  transitionFrame: null,
  autoTransition: false,
};

let marthJab = [marthJabOne, marthJabTwo];

// Forward tilt
let marthForwardTilt = {
  name: "marthForwardTilt",
  offsetX: 60,
  offsetY: -10,
  width: 120,
  height: 110,
  startingFrames: 8,
  activeFrames: 3,
  endingFrames: 22,
  damage: 12,
  angle: 361,
  knockback: 55,
  growthKnockback: 85,
  shieldStun: 11,
};

// Down tilt
let marthDownTilt = {
  name: "marthDownTilt",
  offsetX: 60,
  offsetY: 10,
  width: 120,
  height: 40,
  startingFrames: 7,
  activeFrames: 1,
  endingFrames: 15,
  damage: 10,
  angle: -30,
  knockback: 50,
  growthKnockback: 40,
  shieldStun: 10,
};

// Up tilt
let marthUpTilt = {
  name: "marthUpTilt",
  offsetX: 20,
  offsetY: -10,
  width: 120,
  height: 120,
  startingFrames: 6,
  activeFrames: 6,
  endingFrames: 21,
  damage: 10,
  angle: -100,
  knockback: 65,
  growthKnockback: 100,
  shieldStun: 9,
};

// Neutral air
let marthNeutralAirOne = {
  name: "marthNeutralAirOne",
  offsetX: 20,
  offsetY: 0,
  width: 100,
  height: 30,
  startingFrames: 6,
  activeFrames: 1,
  endingFrames: 1,
  damage: 5,
  angle: -90,
  knockback: 35,
  growthKnockback: 50,
  shieldStun: 3,
  transitionFrame: 8,
  autoTransition: true,
  landingLag: 7,
  autoCancelStart: 0,
  autoCancelEnd: 47,
};

let marthNeutralAirTwo = {
  name: "marthNeutralAirTwo",
  offsetX: 20,
  offsetY: 10,
  width: 150,
  height: 50,
  startingFrames: 8,
  activeFrames: 6,
  endingFrames: 28,
  damage: 9.5,
  angle: 361,
  knockback: 60,
  growthKnockback: 100,
  shieldStun: 4,
  transitionFrame: null,
  autoTransition: false,
  landingLag: 7,
  autoCancelStart: 0,
  autoCancelEnd: 47,
};

let marthNeutralAir = [marthNeutralAirOne, marthNeutralAirTwo];

// Forward air
let marthForwardAir = {
  name: "marthForwardAir",
  offsetX: 60,
  offsetY: 0,
  width: 80,
  height: 100,
  startingFrames: 6,
  activeFrames: 2,
  endingFrames: 29,
  damage: 11.5,
  angle: 361,
  knockback: 40,
  growthKnockback: 80,
  shieldStun: 5,
  transitionFrame: null,
  autoTransition: false,
  landingLag: 10,
  autoCancelStart: 0,
  autoCancelEnd: 36,
};

// Back air
let marthBackAir = {
  name: "marthBackAir",
  offsetX: -50,
  offsetY: 0,
  width: 140,
  height: 120,
  startingFrames: 7,
  activeFrames: 4,
  endingFrames: 28,
  damage: 12.5,
  angle: -135,
  knockback: 40,
  growthKnockback: 94,
  shieldStun: 5,
  transitionFrame: null,
  autoTransition: false,
  landingLag: 10,
  autoCancelStart: 2,
  autoCancelEnd: 32,
};

// Down air
let marthDownAir = {
  name: "marthDownAir",
  offsetX: 0,
  offsetY: 30,
  width: 120,
  height: 120,
  startingFrames: 9,
  activeFrames: 4,
  endingFrames: 46,
  damage: 15,
  angle: -270,
  knockback: 40,
  growthKnockback: 80,
  shieldStun: 5,
  transitionFrame: null,
  autoTransition: false,
  landingLag: 14,
  autoCancelStart: 2,
  autoCancelEnd: 55,
};

// Up air
let marthUpAir = {
  name: "marthUpAir",
  offsetX: 0,
  offsetY: -40,
  width: 120,
  height: 100,
  startingFrames: 5,
  activeFrames: 4,
  endingFrames: 36,
  damage: 13,
  angle: -90,
  knockback: 40,
  growthKnockback: 84,
  shieldStun: 5,
  transitionFrame: null,
  autoTransition: false,
  landingLag: 8,
  autoCancelStart: 2,
  autoCancelEnd: 38,
};

// Up special
let marthUpSpecial = {
  name: "marthUpSpecial",
  offsetX: 30,
  offsetY: -20,
  width: 70,
  height: 140,
  startingFrames: 5,
  activeFrames: 6,
  endingFrames: 0,
  damage: 11,
  angle: -35,
  knockback: 70,
  growthKnockback: 90,
  shieldStun: 10,
  transitionFrame: null,
  autoTransition: false,
  landingLag: 24,
  autoCancelStart: 0,
  autoCancelEnd: 999,
};

// Side special
let marthSideSpecialOne = {
  name: "marthSideSpecialOne",
  offsetX: 60,
  offsetY: 0,
  width: 100,
  height: 100,
  startingFrames: 9,
  activeFrames: 2,
  endingFrames: 28,
  damage: 3,
  angle: 361, 
  knockback: 25,
  growthKnockback: 30,
  shieldStun: 4,
  transitionFrame: 12,
  autoTransition: false,
  landingLag: 18,
  autoCancelStart: 0,
  autoCancelEnd: 999,
};

let marthSideSpecialTwo = {
  name: "marthSideSpecialTwo",
  offsetX: 60,
  offsetY: 0,
  width: 100,
  height: 100,
  startingFrames: 5,
  activeFrames: 2,
  endingFrames: 31,
  damage: 3,
  angle: 361,
  knockback: 30,
  growthKnockback: 25,
  shieldStun: 4,
  transitionFrame: 8,
  autoTransition: false,
  landingLag: 18,
  autoCancelStart: 0,
  autoCancelEnd: 999,
};

let marthSideSpecialThree = {
  name: "marthSideSpecialThree",
  offsetX: 60,
  offsetY: 0,
  width: 100,
  height: 100,
  startingFrames: 4,
  activeFrames: 2,
  endingFrames: 37,
  damage: 4,
  angle: 55,
  knockback: 55,
  growthKnockback: 30,
  shieldStun: 5,
  transitionFrame: 7,
  autoTransition: false,
  landingLag: 18,
  autoCancelStart: 0,
  autoCancelEnd: 999,
};

let marthSideSpecialFour = {
  name: "marthSideSpecialFour",
  offsetX: 60,
  offsetY: 0,
  width: 100,
  height: 100,
  startingFrames: 7,
  activeFrames: 2,
  endingFrames: 46,
  damage: 6,
  angle: 361,
  knockback: 85,
  growthKnockback: 125,
  shieldStun: 6,
  transitionFrame: null,
  autoTransition: false,
  landingLag: 18,
  autoCancelStart: 0,
  autoCancelEnd: 999,
};

let marthSideSpecial = [marthSideSpecialOne, marthSideSpecialTwo, marthSideSpecialThree, marthSideSpecialFour];

// Create the base player
class Player {
  constructor(x, y, stats, controls, sounds, spawnX, spawnY, direction) {

    // Physics and stats
    this.controls = controls;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.stats = stats;
    this.stocks = PLAYER_STOCKS;
    this.percentage = 0;
    this.rage = 1;
    this.currentAttack = null;
    this.hitboxes = [];
    this.multihitIndex = 0;
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.sounds = sounds;

    // States
    this.state = "entrance"; 
    // idle, running, crouching, airborne, jumpsquat, landing, dead, spawning, attacking, 
    // crouchAttacking, airAttacking, multihitAttacking, hitstun, entrance, specialFall

    // Flags/Conditions
    this.direction = direction;
    this.spawnDirection = direction;
    this.jumpSquatting = false;
    this.jumpAvailable = true;
    this.doubleJumpAvailable = false;
    this.fastFalling = false;
    this.invincible = false;
    this.touchingTop = true;
    this.touchingLeft = false;
    this.touchingRight = false;
    this.touchingBottom = false;
    this.multihitAir = false;
    this.transitionWindowOpen = false;
    this.upSpecialAvailable = true;

    // Timers
    this.jumpSquatTimer = JUMPSQUAT_TIMER;
    this.landingLagTimer = 0;
    this.spawningTimer = SPAWNING_TIMER;
    this.invincibilityTimer = INVINCIBILITY_TIMER;
    this.angelPlatformTimer = ANGEL_PLATFORM_TIMER;
    this.attackFrameTimer = 0;
    this.hitstunTimer = 0;
    this.multihitBuffer = 0;
    this.upSpecialLag = marthUpSpecial.landingLag;

    // Animation properties
    this.currentFrame = 0;
    this.currentAnimation = "idle";
    this.animationTimer = 0;
    this.animationSpeed = 3;
    this.animationDirection = null;
    this.animations = new Map();

    // Setting the animations
    this.animations.set("idle", [
      [[51, 155, 38, 60], [68, 215]],
      [[99, 154, 38, 61], [115, 215]],
      [[147, 153, 39, 62], [164, 215]],
      [[195, 153, 39, 62], [212, 215]],
      [[243, 153, 39, 62], [260, 215]],
      [[291, 154, 38, 61], [308, 215]]
    ]);

    this.animations.set("running", [
      [[256, 325, 49, 40], [270, 365]],
      [[323, 325, 62, 40], [342, 365]],
      [[394, 326, 58, 38], [411, 364]],
      [[457, 322, 60, 42], [473, 364]],
      [[525, 323, 58, 43], [537, 366]],
      [[589, 328, 59, 38], [605, 366]]
    ]);

    this.animations.set("crouching", [
      [[362, 492, 58, 37], [376, 529]]
    ]);

    this.animations.set("jumping",[
      [[60, 579, 36, 63], [73, 642]],
      [[109, 580, 47, 62], [125, 642]],
      [[159, 580, 50, 62], [175, 642]],
      [[212, 582, 51, 59], [229, 641]],
      [[270, 583, 47, 58], [282, 641]],
      [[325, 583, 46, 57], [338, 640]],
      [[383, 583, 46, 57], [396, 640]],
      [[436, 583, 46, 57], [449, 640]]
    ]);

    this.animations.set("doubleJumping", [
      [[57, 667, 48, 57], [80, 731]],
      [[124, 666, 39, 55], [144, 731]],
      [[194, 665, 36, 52], [214, 731]],
      [[257, 673, 46, 55], [282, 728]],
      [[325, 679, 51, 49], [352, 728]],
      [[387, 676, 56, 46], [417, 733]],
      [[455, 666, 60, 40], [491, 736]],
      [[535, 660, 38, 55], [558, 737]]
    ]);

    this.animations.set("landing", [
      [[50, 840, 41, 46], [67, 885]],
      [[119, 843, 37, 45], [134, 885]],
      [[189, 838, 29, 47], [200, 884]], 
      [[255, 832, 37, 53], [265, 884]],
      [[315, 828, 47, 58], [334, 885]],
      [[373, 827, 54, 59], [399, 886]],
      [[433, 826, 57, 60], [463, 886]],
      [[495, 826, 58, 60] ,[530, 886]],
      [[573, 826, 44, 60], [597, 886]],
      [[646, 826, 37, 60], [663, 886]]
    ]);

    this.animations.set("entrance", [
      [[48, 35, 25, 57], [59, 92]],
      [[95, 35, 26, 58], [109, 93]],
      [[146, 35, 38, 58], [162, 93]],
      [[198, 35, 24, 61], [212, 96]],
      [[237, 35, 42, 57], [261, 92]],
      [[295, 35, 28, 56], [309, 91]],
      [[353, 43, 26, 64], [364, 107]],
      [[444, 39, 25, 68], [454, 107]],
      [[533, 47, 36, 60], [546, 107]],
      [[619, 47, 37, 60], [635, 107]],
      [[709, 47, 37, 60], [725, 107]],
    ]),

    this.animations.set("jabOne", [
      [[55, 912, 39, 60], [74, 972]], 
      [[164, 915, 39, 56], [186, 971]], 
      [[285, 914, 35, 58], [300, 971]], 
      [[389, 923, 45, 49], [407, 971]], 
      [[506, 921, 91, 51], [519, 972]],
      [[615, 907, 86, 65], [630, 972]],
      [[716, 884, 52, 87], [741, 971]],
      [[819, 916, 66, 56], [854, 972]],
      [[938, 919, 55, 52], [963, 971]],
      [[1058, 917, 41, 54], [1075, 970]],
      [[1164, 917, 60, 55], [1185, 971]]
    ]);

    this.animations.set("jabTwo", [
      [[30, 1002, 57, 61], [65, 1063]],
      [[180, 999, 48, 64], [187, 1063]],
      [[300, 1012, 90, 52], [307, 1064]],
      [[422, 1021, 59, 43], [428, 1064]],
      [[541, 1022, 56, 42], [548, 1064]],
      [[661, 1017, 54, 47], [668, 1064]],
      [[781, 1014, 53, 50], [788, 1064]],
      [[901, 1015, 46, 49], [908, 1064]],
      [[1023, 1009, 47, 55], [1031, 1064]],
      [[1147, 1010, 38, 54], [1158, 1064]],
      [[1261, 1007, 55, 57], [1281, 1064]],
      [[1379, 1003, 54, 60], [1401, 1063]]
    ]);

    this.animations.set("downTilt", [
      [[64, 1144, 58, 37], [72, 1181]],
      [[168, 1150, 57, 33], [175, 1183]],
      [[267, 1147, 50, 39], [277, 1183]],
      [[371, 1146, 64, 37], [376, 1183]],
      [[473, 1148, 92, 35], [478, 1183]],
      [[574, 1148, 94, 35], [579, 1183]],
      [[675, 1148, 84, 34], [680, 1182]],
      [[776, 1149, 74, 33], [781, 1182]],
      [[877, 1149, 67, 34], [882, 1183]],
      [[979, 1149, 56, 34], [983, 1183]],
      [[1079, 1149, 55, 34], [1084, 1183]],
      [[1174, 1147, 58, 36], [1185, 1183]]
    ]);

    this.animations.set("forwardTilt", [
      [[72, 1230, 38, 54], [88, 1282]],
      [[173, 1231, 38, 53], [183, 1283]],
      [[280, 1234, 82, 49], [286, 1283]],
      [[380, 1237, 91, 46], [386, 1282]],
      [[480, 1218, 52, 64], [486, 1282]],
      [[572, 1246, 61, 39], [587, 1282]],
      [[683, 1246, 51, 39], [689, 1282]],
      [[786, 1244, 48, 42], [790, 1282]],
      [[890, 1234, 52, 51], [895, 1283]],
      [[978, 1225, 52, 59], [996, 1284]],
      [[1078, 1224, 48, 60], [1097, 1284]],
      [[1189, 1224, 37, 60], [1199, 1284]]
    ]);

    this.animations.set("upTilt", [
      [[80, 1351, 36, 50], [95, 1398]],
      [[166, 1345, 79, 56], [177, 1401]],
      [[257, 1326, 62, 75], [265, 1401]],
      [[345, 1327, 37, 74], [353, 1401]],
      [[422, 1340, 46, 61], [441, 1401]],
      [[511, 1350, 47, 51], [529, 1401]],
      [[598, 1347, 44, 54], [616, 1400]],
      [[689, 1344, 43, 59], [701, 1401]],
      [[778, 1341, 39, 60], [792, 1401]]
    ]);

    this.animations.set("neutralAir", [
      [[70, 1459, 43, 61], [79, 1520]],
      [[176, 1457, 47, 61], [190, 1518]],
      [[268, 1456, 66, 58], [304, 1514]],
      [[412, 1461, 27, 54], [415, 1515]],
      [[519, 1462, 77, 54], [527, 1516]],
      [[629, 1462, 47, 54], [640, 1516]],
      [[743, 1462, 34, 54], [751, 1516]],
      [[847, 1459, 45, 57], [862, 1516]],
      [[961, 1464, 42, 53], [971, 1517]],
      [[1080, 1463, 79, 55], [1084, 1518]],
      [[1194, 1460, 31, 58], [1198, 1518]],
      [[1273, 1458, 74, 61], [1314, 1519]],
      [[1409, 1460, 52, 59], [1431, 1519]],
      [[1528, 1460, 48, 60], [1547, 1520]],
      [[1645, 1461, 70, 60], [1662, 1521]],
      [[1757, 1462, 68, 59], [1777, 1521]],
      [[1870, 1461, 45, 61], [1891, 1522]],
      [[1984, 1464, 29, 58], [1998, 1522]],
      [[2088, 1465, 41, 53], [2102, 1518]],
      [[2207, 1464, 45, 58], [2218, 1522]]
    ]);

    this.animations.set("upAir", [
      [[74, 1580, 40, 46], [102, 1626]],
      [[167, 1577, 60, 52], [201, 1629]],
      [[264, 1562, 65, 67], [298, 1629]],
      [[360, 1541, 42, 90], [394, 1631]],
      [[431, 1562, 64, 70], [486, 1632]],
      [[522, 1580, 70, 52], [575, 1632]],
      [[641, 1586, 47, 47], [670, 1633]],
      [[744, 1583, 45, 45], [785, 1619]],
      [[842, 1577, 55, 51], [874, 1577]],
      [[928, 1577, 62, 54], [935, 1577]],
      [[1022, 1577, 55, 48], [1023, 1592]],
      [[1124, 1578, 47, 44], [1130, 1622]],
      [[1222, 1571, 46, 57], [1235, 1628]]
    ]);

    this.animations.set("backAir", [
      [[73, 1683, 46, 57], [86, 1739]],
      [[189, 1681, 46, 59], [202, 1740]],
      [[303, 1670, 38, 72], [320, 1742]],
      [[419, 1682, 50, 60], [436, 1742]],
      [[535, 1682, 61, 59], [556, 1741]],
      [[655, 1682, 55, 60], [683, 1737]],
      [[757, 1680, 75, 67], [823, 1737]],
      [[843, 1685, 111, 55], [938, 1740]],
      [[993, 1659, 75, 84], [1050, 1743]],
      [[1129, 1657, 45, 85], [1165, 1742]],
      [[1243, 1666, 42, 68], [1282, 1734]],
      [[1355, 1686, 47, 51], [1391, 1737]],
      [[1474, 1683, 46, 57], [1509, 1740]]
    ]);

    this.animations.set("forwardAir", [
      [[86, 1788, 45, 58], [103, 1846]], 
      [[180, 1773, 43, 68], [206, 1841]],
      [[287, 1778, 71, 65], [322, 1841]],
      [[384, 1792, 79, 53], [416, 1842]],
      [[477, 1794, 60, 58], [507, 1845]],
      [[572, 1794, 45, 60], [590, 1849]],
      [[653, 1795, 59, 53], [678, 1848]],
      [[749, 1794, 57, 54], [770, 1848]],
      [[847, 1791, 56, 51], [861, 1842]],
      [[952, 1796, 42, 41], [960, 1836]],
      [[1048, 1792, 40, 46], [1051, 1838]],
      [[1146, 1789, 39, 53], [1149, 1842]],
      [[1235, 1789, 40, 55], [1243, 1844]],
      [[1326, 1789, 46, 57], [1340, 1846]]
    ]);

    this.animations.set("downAir", [
      [[89, 1904, 58, 52], [114, 1955]],
      [[191, 1893, 48, 71], [227, 1963]],
      [[302, 1905, 42, 55], [330, 1960]],
      [[403, 1910, 73, 55], [439, 1964]],
      [[507, 1912, 45, 75], [529, 1987]],
      [[600, 1915, 54, 50], [649, 1965]],
      [[686, 1911, 79, 53], [750, 1964]],
      [[805, 1889, 69, 71], [852, 1960]],
      [[937, 1888, 38, 71], [956, 1959]],
      [[1040, 1888, 48, 75], [1060, 1963]],
      [[1134, 1893, 59, 70], [1166, 1963]],
      [[1230, 1891, 67, 73], [1270, 1964]],
      [[1352, 1901, 46, 65], [1369, 1966]],
      [[1462, 1899, 32, 66], [1472, 1965]],
      [[1561, 1906, 46, 57], [1574, 1963]]
    ]);

    this.animations.set("upSpecial", [
      // [[62, 2740, 77, 45], [127, 2785]],
      // [[202, 2721, 58, 65], [241, 2785]],
      // [[304, 2730, 64, 56], [356, 2786]],
      // [[435, 2733, 49, 53], [472, 2786]],
      [[561, 2730, 51, 56], [586, 2786]],
      [[681, 2728, 71, 58], [700, 2786]],
      [[796, 2713, 63, 73], [815, 2786]],
      [[913, 2696, 39, 90], [930, 2786]],
      [[1030, 2693, 29, 93], [1044, 2786]],
      [[1131, 2709, 45, 77], [1157, 2785]],
      [[1255, 2713, 37, 73], [1271, 2785]],
      [[1382, 2719, 38, 66], [1382, 2785]],
      [[1497, 2723, 53, 62], [1498, 2785]],
      [[1614, 2720, 39, 65], [1614, 2785]]
    ]);

    this.animations.set("specialFall", [
      [[1715, 2715, 36, 70], [1734, 2784]]
    ]);

    this.animations.set("sideSpecialOne", [
      [[55, 912, 39, 60], [74, 972]], 
      [[164, 915, 39, 56], [186, 971]], 
      [[285, 914, 35, 58], [300, 971]], 
      [[389, 923, 45, 49], [407, 971]], 
      [[506, 921, 91, 51], [519, 972]],
      [[615, 907, 86, 65], [630, 972]],
      [[716, 884, 52, 87], [741, 971]],
      [[819, 916, 66, 56], [854, 972]],
      [[938, 919, 55, 52], [963, 971]],
      [[1058, 917, 41, 54], [1075, 970]],
      [[1164, 917, 60, 55], [1185, 971]]
    ]);

    this.animations.set("sideSpecialTwo", [
      [[30, 1002, 57, 61], [65, 1063]],
      [[180, 999, 48, 64], [187, 1063]],
      [[300, 1012, 90, 52], [307, 1064]],
      [[422, 1021, 59, 43], [428, 1064]],
      [[541, 1022, 56, 42], [548, 1064]],
      [[661, 1017, 54, 47], [668, 1064]],
      [[781, 1014, 53, 50], [788, 1064]],
      [[901, 1015, 46, 49], [908, 1064]],
      [[1023, 1009, 47, 55], [1031, 1064]],
      [[1147, 1010, 38, 54], [1158, 1064]],
      [[1261, 1007, 55, 57], [1281, 1064]],
      [[1379, 1003, 54, 60], [1401, 1063]]
    ]);

    this.animations.set("sideSpecialThree", [
      [[55, 912, 39, 60], [74, 972]], 
      [[164, 915, 39, 56], [186, 971]], 
      [[285, 914, 35, 58], [300, 971]], 
      [[389, 923, 45, 49], [407, 971]], 
      [[506, 921, 91, 51], [519, 972]],
      [[615, 907, 86, 65], [630, 972]],
      [[716, 884, 52, 87], [741, 971]],
      [[819, 916, 66, 56], [854, 972]],
      [[938, 919, 55, 52], [963, 971]],
      [[1058, 917, 41, 54], [1075, 970]],
      [[1164, 917, 60, 55], [1185, 971]]
    ]);

    this.animations.set("sideSpecialFour", [
      [[30, 1002, 57, 61], [65, 1063]],
      [[180, 999, 48, 64], [187, 1063]],
      [[300, 1012, 90, 52], [307, 1064]],
      [[422, 1021, 59, 43], [428, 1064]],
      [[541, 1022, 56, 42], [548, 1064]],
      [[661, 1017, 54, 47], [668, 1064]],
      [[781, 1014, 53, 50], [788, 1064]],
      [[901, 1015, 46, 49], [908, 1064]],
      [[1023, 1009, 47, 55], [1031, 1064]],
      [[1147, 1010, 38, 54], [1158, 1064]],
      [[1261, 1007, 55, 57], [1281, 1064]],
      [[1379, 1003, 54, 60], [1401, 1063]]
    ]);
  }

  // Display the player and hitboxes
  display() {

    // Draw player from the center
    rectMode(CENTER);

    // Square to represent the player
    noStroke();
    fill(this.stats.color);
    rect(this.position.x, this.position.y, this.stats.width, this.stats.currentHeight);

    // Draw hitboxes
    if (this.currentAttack !== null) {
      this.currentAttack.display();
    }

    // Pull the current animation as well as the current frame
    let currentAnimationData = this.animations.get(this.currentAnimation);
    let framePoints = currentAnimationData[this.currentFrame];

    let croppedPoints = framePoints[0];
    let originPoints = framePoints[1];

    let croppedX = croppedPoints[0];
    let croppedY = croppedPoints[1];
    let croppedW = croppedPoints[2];
    let croppedH = croppedPoints[3];

    let originX = originPoints[0];
    let originY = originPoints[1];
    let offsetX = originX - croppedX;
    let offsetY = originY - croppedY;


    push();

    // Flip the animation if the direction is left
    translate(this.position.x, this.position.y + this.stats.currentHeight / 2);
    if (!this.direction) {
      scale(-1.3, 1.3);
    }
    else {
      scale(1.3, 1.3);
    }

    // Draw the frame
    imageMode(CORNER);
    if (this.invincible) {
      tint(255, INCREASED_OPACITY);
    }
    else {
      tint(255, ZERO_OPACITY);
    }
    image(marthSheet, 
      -offsetX, -offsetY, 
      croppedW, croppedH, 
      croppedX, croppedY, 
      croppedW, croppedH);
    pop();


    // Marker to show player
    fill("white");
    stroke("black");
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(PLAYER_TEXT_SIZE);
    text(this.stats.name, this.position.x, this.position.y - 3 * this.stats.idleHeight / 4);
  }

  // Update the player’s state and movement
  update(player) {

    // Animation marth
    this.updateAnimation();

    // Count down invincibility from angel platform
    this.countInvincibility();

    // Check state and behavior
    this.manageState();
    
    // Constant gravity
    this.addGravity();
    
    // Add vector forces
    this.addVectors();

    // Check for collisions with the stage
    this.checkStageCollision(); 

    // Check for collisions between hitboxes and hurtboxes of player
    this.checkAttackCollision(player);
  }

  // Update and control the animations for marth
  updateAnimation() {

    // Default animation
    let newAnimation = this.currentAnimation;
    
    // Manage animations
    if (this.state === "idle") {
      this.animationSpeed = 8;
      newAnimation = "idle";
    }
    else if (this.state === "running") {
      this.animationSpeed = 3;
      newAnimation = "running";
    }
    else if (this.state === "crouching") {
      newAnimation = "crouching";
    }
    else if (this.state === "airborne" && !this.doubleJumpAvailable) {
      this.animationSpeed = 8;
      newAnimation = "doubleJumping";
    }
    else if (this.state === "airborne" && this.doubleJumpAvailable) {
      this.animationSpeed = 6;
      newAnimation = "jumping";
    }
    else if (this.state === "landing") {
      this.animationSpeed = 2.4;
      newAnimation = "landing";
    }
    else if (this.state === "entrance") {
      this.animationSpeed = 5.5;
      newAnimation = "entrance";
    }
    else if (this.state === "spawning") {
      this.animationSpeed = 8;
      newAnimation = "idle";
    }
    else if (this.state === "specialFall") {
      newAnimation = "specialFall";
    }
    else if (this.currentAttack !== null) {

      if (this.currentAttack.name === "marthJabOne") {
        this.animationSpeed = 2.3;
        newAnimation = "jabOne";
      }
      else if (this.currentAttack.name === "marthJabTwo") {
        this.animationSpeed = 2.3;
        newAnimation = "jabTwo";
      }
      else if (this.currentAttack.name === "marthDownTilt") {
        this.animationSpeed = 1.9;
        newAnimation = "downTilt";
      }
      else if (this.currentAttack.name === "marthForwardTilt") {
        this.animationSpeed = 2.8;
        newAnimation = "forwardTilt";
      }
      else if (this.currentAttack.name === "marthUpTilt") {
        this.animationSpeed = 3.7;
        newAnimation = "upTilt";
      }
      else if (this.currentAttack.name === "marthNeutralAirOne"
         || this.currentAttack.name === "marthNeutralAirTwo") {
        this.animationSpeed = 2.5;
        newAnimation = "neutralAir";
      }
      else if (this.currentAttack.name === "marthUpAir") {
        this.animationSpeed = 3.5;
        newAnimation = "upAir";
      }
      else if (this.currentAttack.name === "marthBackAir") {
        this.animationSpeed = 3;
        newAnimation = "backAir";
      }
      else if (this.currentAttack.name === "marthForwardAir") {
        this.animationSpeed = 2.6;
        newAnimation = "forwardAir";
      }
      else if (this.currentAttack.name === "marthDownAir") {
        this.animationSpeed = 3.9;
        newAnimation = "downAir";
      }
      else if (this.currentAttack.name === "marthUpSpecial") {
        this.animationSpeed = 2;
        newAnimation = "upSpecial";
      }
      else if (this.currentAttack.name === "marthSideSpecialOne") {
        this.animationSpeed = 3.5;
        newAnimation = "sideSpecialOne";
      }
      else if(this.currentAttack.name === "marthSideSpecialTwo") {
        this.animationSpeed = 3.2;
        newAnimation = "sideSpecialTwo";
      }
      else if (this.currentAttack.name === "marthSideSpecialThree") {
        this.animationSpeed = 3.9;
        newAnimation = "sideSpecialThree";
      }
      else if (this.currentAttack.name === "marthSideSpecialFour") {
        this.animationSpeed = 4.6;
        newAnimation = "sideSpecialFour";
      }
      else {
        this.animationSpeed = 8;
        newAnimation = "idle";
      }
    }

    // Reset animations if they change
    if (this.currentAnimation !== newAnimation) {
      this.currentAnimation = newAnimation;
      this.currentFrame = 0;
      this.animationTimer = 0;
    }
    
    // Count timer to update frames
    this.animationTimer++;
    let totalFrames = this.animations.get(this.currentAnimation).length;

    if (this.animationTimer >= this.animationSpeed) {
      this.currentFrame++;
      this.animationTimer = 0;
    }

    // Loop back to first frame
    if (this.currentFrame >= totalFrames) {
      this.currentFrame = 0;
    }
  }

  // Count down timer for 5 seconds from spawning before removing i-frames
  countInvincibility() {

    // Begin counting if the player is playing and invincible
    if (this.invincible && this.state !== "spawning" && this.state !== "dead") {
      this.invincibilityTimer--;

      // Remove invincibility
      if (this.invincibilityTimer <= 0) {
        this.invincible = false;
      }
    }
  }

  // Add gravity to player
  addGravity() {

    // Only add gravity if the player isn't touching the top of the stage or on the angel platform
    if (!this.touchingTop && this.state !== "spawning") {
      this.velocity.y += this.stats.gravity;

      // Cap the fall speed if player isn't fast falling
      if (this.velocity.y > this.stats.fallSpeed && !this.fastFalling) {
        this.velocity.y = this.stats.fallSpeed;
      }
      else if (this.fastFalling) {
        this.velocity.y = this.stats.fastFallSpeed;
      }
    }
  }

  // Add friction to player
  addFriction() {
    this.velocity.x *= this.stats.friction;
  }

  // Apply user input to player
  addVectors() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    // Cap speeds corresponding to state
    if (this.state === "running" || this.state === "idle") {
      this.velocity.x = constrain(this.velocity.x, -this.stats.runSpeed, this.stats.runSpeed);
    }
    if (this.state === "airborne" || this.state === "airAttacking" 
      || this.state === "multihitAttacking" || this.state === "specialFall") {
      this.velocity.x = constrain(this.velocity.x, -this.stats.airSpeed, this.stats.airSpeed);
    }
  }

  // Check if the player is touching the stage
  checkStageCollision() {

    // Player edges
    let playerBottom = this.position.y + this.stats.currentHeight / 2;
    let playerTop = this.position.y - this.stats.currentHeight / 2;
    let playerRight = this.position.x + this.stats.width / 2;
    let playerLeft = this.position.x - this.stats.width / 2;

    // Stage edges
    let stageBottom = stage.y + stage.h;
    let stageTop = stage.y;
    let stageRight = stage.x + stage.w;
    let stageLeft = stage.x;

    // Reset touching flags
    this.touchingBottom = false;
    this.touchingTop = false;
    this.touchingRight = false;
    this.touchingLeft = false;

    // First check if there is any collision and then detect which side is the closest
    if (playerBottom >= stageTop && playerTop <= stageBottom && playerRight >= stageLeft && playerLeft <= stageRight) {

      // Find the amount of overlap on each edge
      let bottomOverlap = stageBottom - playerTop;
      let topOverlap = playerBottom - stageTop;
      let rightOverlap = stageRight - playerLeft;
      let leftOverlap = playerRight - stageLeft;

      // Find the smallest overlap
      let minimumOverlap = Math.min(bottomOverlap, topOverlap, rightOverlap, leftOverlap);
      
      // Push the player out of the nearest side and return which side was touched as well as a true or false
      if (minimumOverlap === topOverlap) {
        this.touchingTop = true;
        this.position.y = stageTop - this.stats.currentHeight / 2;
        return true;
      }
  
      else if (minimumOverlap === bottomOverlap) {

        // Special case if the player bonks their head into the bottom of the stage
        if (this.currentAttack !== null && this.currentAttack.name === "marthUpSpecial") {

          // Push the player to the right or left depending on which one is closer
          if (rightOverlap > leftOverlap) {
            this.touchingLeft = true;
            this.position.x = stageLeft - this.stats.width / 2;
            return true;
          }
          else {
            this.touchingRight = true;
            this.position.x = stageRight + this.stats.width / 2;
            return true;
          }
        }

        // Regular case
        else {
          this.touchingBottom = true;
          this.position.y = stageBottom + this.stats.currentHeight / 2;
          this.velocity.y = 0;
          return true;
        }
      }
  
      else if (minimumOverlap === leftOverlap) {
        this.touchingLeft = true;
        this.position.x = stageLeft - this.stats.width / 2;
        return true;
      }
      
      else if (minimumOverlap === rightOverlap) {
        this.touchingRight = true;
        this.position.x = stageRight + this.stats.width / 2;
        return true;
      }
  
      else {
        return false;
      }
    }
  }

  // Use player 2 as the hurtbox to check if any attack's hitbox collides with them
  checkAttackCollision(hurtbox) {

    // Make sure that there is an attack out currently and that the attack is in its active frames
    if (this.currentAttack !== null && 
      this.currentAttack.currentFrame >= this.currentAttack.startingFrames && 
      this.currentAttack.currentFrame <= this.currentAttack.startingFrames + this.currentAttack.activeFrames) {

      // Player's hitbox's edges
      let hitboxBottom = this.currentAttack.y + this.currentAttack.h / 2;
      let hitboxTop = this.currentAttack.y - this.currentAttack.h / 2;
      let hitboxRight = this.currentAttack.x + this.currentAttack.w / 2;
      let hitboxLeft = this.currentAttack.x - this.currentAttack.w / 2;
  
      // Enemy's hurtbox's edges
      let hurtboxBottom = hurtbox.position.y + hurtbox.stats.currentHeight / 2;
      let hurtboxTop = hurtbox.position.y - hurtbox.stats.currentHeight / 2;
      let hurtboxRight = hurtbox.position.x + hurtbox.stats.width / 2;
      let hurtboxLeft = hurtbox.position.x - hurtbox.stats.width / 2;
  
      // Add damage and calculate knockback if there is a collision
      if (hitboxBottom >= hurtboxTop && hitboxTop <= hurtboxBottom && 
      hitboxRight >= hurtboxLeft && hitboxLeft <= hurtboxRight) {

        // Calculate rage for knockback
        this.rage = constrain(1 + (this.percentage - 35)/115 * 0.1, 1, 1.1); // Smash Bros rage formula
        this.currentAttack.calculateKnockback(this, hurtbox, this.rage);
      }
      // Reset the hit flag
      else {
        this.currentAttack.hasHit = false;
      }
    }
  }

  // Control the player’s states, conditions, and behavior
  manageState() {
    switch (this.state) {

    // idle state behaviors and triggers
    case "idle":

      // State behavior
      this.addFriction();
      // if (!this.invincible) {
      //   this.stats.color = "blue";
      // }

      // State flags
      this.fastFalling = false;

      // State triggers
      if (this.jumpSquatting) {
        this.state = "jumpSquat";
      }

      if (keyIsDown(this.controls.left) || keyIsDown(this.controls.right)) {
        this.state = "running";
      }

      if (keyIsDown(this.controls.down)) {
        this.state = "crouching";
        this.stats.currentHeight = this.stats.crouchHeight;
        this.position.y += this.stats.offsetCrouchHeight;

        // Play sound
        this.playSound("squat");
      }

      if (!this.touchingTop) {
        this.state = "airborne";
        this.jumpAvailable = false;
        this.doubleJumpAvailable = true;
      }

      if (this.position.x > rightBlastZone || this.position.x < leftBlastZone || this.position.y > bottomBlastZone || this.position.y < topBlastZone) {
        this.state = "dead";
        if (this.stocks > 0) {
          this.stocks--;

          // Play death sound
          if (this.stocks === 0) {
            this.playSound("finalKo");
          }
          else {
            this.playSound("ko");
          }
        }
      }

      if (this.hitstunTimer > 0) {
        this.state = "hitstun";
        this.hitboxes = [];
        this.currentAttack = null;
        this.transitionWindowOpen = false;
        this.multihitBuffer = 0;
      }

      break;

    // running state behaviors and triggers
    case "running":

      // State Behavior
      this.groundMovement();
      this.addFriction();
      // if (!this.invincible) {
      //   this.stats.color = "purple";
      // }

      // State flags
      this.fastFalling = false;

      // State triggers
      if (!keyIsDown(this.controls.left) && !keyIsDown(this.controls.right)) {
        this.state = "idle";
      }

      if (keyIsDown(this.controls.down)) {
        this.state = "crouching";
        this.stats.currentHeight = this.stats.crouchHeight;
        this.position.y += this.stats.offsetCrouchHeight;

        // Play sound
        this.playSound("squat");
      }

      if (this.jumpSquatting) {
        this.state = "jumpSquat";
      }

      if (!this.touchingTop) {
        this.state = "airborne";
        this.jumpAvailable = false;
        this.doubleJumpAvailable = true;
      }

      if (this.position.x > rightBlastZone || this.position.x < leftBlastZone || this.position.y > bottomBlastZone || this.position.y < topBlastZone) {
        this.state = "dead";
        if (this.stocks > 0) {
          this.stocks--;

          // Play death sound
          if (this.stocks === 0) {
            this.playSound("finalKo");
          }
          else {
            this.playSound("ko");
          }
        }
      }

      if (this.hitstunTimer > 0) {
        this.state = "hitstun";
        this.hitboxes = [];
        this.currentAttack = null;
        this.transitionWindowOpen = false;
        this.multihitBuffer = 0;
      }

      break;

      // crouching state behaviors and triggers
    case "crouching":

      // State behaviours
      this.addFriction();
      // if (!this.invincible) {
      //   this.stats.color = "orange";
      // }

      // State triggers
      if (!keyIsDown(this.controls.down)) {
        this.state = "idle";
        this.stats.currentHeight = this.stats.idleHeight;
        this.position.y -= this.stats.offsetCrouchHeight;

        if (keyIsDown(this.controls.left) || keyIsDown(this.controls.right)) {
          this.state = "running";
          this.stats.currentHeight = this.stats.idleHeight;
        }

        // Play sound
        this.playSound("rise");
      } 

      if (this.hitstunTimer > 0) {
        this.state = "hitstun";
        this.hitboxes = [];
        this.currentAttack = null;
        this.transitionWindowOpen = false;
        this.multihitBuffer = 0;
      }

      break;

    // airborne state behaviors and triggers
    case "airborne":

      // State behavior
      this.airMovement();
      // if (!this.fastFalling && !this.invincible) {
      //   this.stats.color = "pink";
      // }

      // State triggers
      if (this.touchingTop) {
        this.state = "landing";
        this.upSpecialAvailable = true;

        // Choose landing lag depending on the player's fall speed
        if (this.fastFalling) { 
          this.landingLagTimer = HARD_LANDING_LAG_TIMER;
        }
        else {
          this.landingLagTimer = SOFT_LANDING_LAG_TIMER;
        }

        // Reset velocity and snap to stage
        this.velocity.y = 0;
        this.position.y = stageY - this.stats.currentHeight / 2;
      }

      if (this.position.x > rightBlastZone || this.position.x < leftBlastZone || this.position.y > bottomBlastZone || this.position.y < topBlastZone) {
        this.state = "dead";
        if (this.stocks > 0) {
          this.stocks--;

          // Play death sound
          if (this.stocks === 0) {
            this.playSound("finalKo");
          }
          else {
            this.playSound("ko");
          }
        }
      }

      if (this.hitstunTimer > 0) {
        this.state = "hitstun";
        this.hitboxes = [];
        this.currentAttack = null;
        this.transitionWindowOpen = false;
        this.multihitBuffer = 0;
      }

      break;

    // jumpSquat state behaviours and trigger
    case "jumpSquat":

      // State behavior
      this.prepareGroundJump();
      this.addFriction();

      // State triggers
      if (!this.touchingTop) {
        this.state = "airborne";
      }

      if (this.position.x > rightBlastZone || this.position.x < leftBlastZone || this.position.y > bottomBlastZone || this.position.y < topBlastZone) {
        this.state = "dead";
        if (this.stocks > 0) {
          this.stocks--;

          // Play death sound
          if (this.stocks === 0) {
            this.playSound("finalKo");
          }
          else {
            this.playSound("ko");
          }
        }
      }
    
      if (this.hitstunTimer > 0) {
        this.state = "hitstun";
        this.hitboxes = [];
        this.currentAttack = null;
        this.transitionWindowOpen = false;
        this.multihitBuffer = 0;
      }

      break;

    // landing state behaviours and trigger
    case "landing":

      // State behaviour
      this.addFriction();

      // Play sound
      this.playSound("land");

      // Start timer
      this.landingLagTimer--;
      // if (!this.invincible) {
      //   this.stats.color = "red";
      // }

      // State triggers
      if (this.landingLagTimer <= 0) {
        this.state = "idle";

        // Reset jumpsquat timer and jumps
        this.jumpAvailable = true;
        this.doubleJumpAvailable = false;
        this.jumpSquatting = false;
        this.fastFalling = false;
        this.jumpSquatTimer = JUMPSQUAT_TIMER;
      }

      if (this.position.x > rightBlastZone || this.position.x < leftBlastZone || this.position.y > bottomBlastZone || this.position.y < topBlastZone) {
        this.state = "dead";
        if (this.stocks > 0) {
          this.stocks--;

          // Play death sound
          if (this.stocks === 0) {
            this.playSound("finalKo");
          }
          else {
            this.playSound("ko");
          }
        }
      }

      if (this.hitstunTimer > 0) {
        this.state = "hitstun";
        this.hitboxes = [];
        this.currentAttack = null;
        this.transitionWindowOpen = false;
        this.multihitBuffer = 0;
      }

      break;

    // attacking state behavior
    case "attacking":

      // State behavior
      this.addFriction();

      // Control the hitboxes
      if (this.currentAttack !== null) {
        
        // Update the frame and position
        this.currentAttack.currentFrame++;
        this.currentAttack.update(this.position.x, this.position.y, this.direction);
        
        // Remove hitboxes that have ended
        if (this.currentAttack.currentFrame > this.currentAttack.totalFrames) {
          this.currentAttack = null;
        }
      }

      // State triggers
      if (this.currentAttack === null) {
        this.state = "idle";
      }

      if (this.position.x > rightBlastZone || this.position.x < leftBlastZone || this.position.y > bottomBlastZone || this.position.y < topBlastZone) {
        this.state = "dead";
        if (this.stocks > 0) {
          this.stocks--;

          // Play death sound
          if (this.stocks === 0) {
            this.playSound("finalKo");
          }
          else {
            this.playSound("ko");
          }
        }
      }

      if (this.hitstunTimer > 0) {
        this.state = "hitstun";
        this.hitboxes = [];
        this.currentAttack = null;
        this.transitionWindowOpen = false;
        this.multihitBuffer = 0;
      }
      
      break;

    // crouchAttacking state behavior
    case "crouchAttacking":

      // State behavior
      this.addFriction();

      // Control the hitboxes
      if (this.currentAttack !== null) {
        
        // Update the frame and position
        this.currentAttack.currentFrame++;
        this.currentAttack.update(this.position.x, this.position.y, this.direction);
        
        // Remove hitboxes that have ended
        if (this.currentAttack.currentFrame > this.currentAttack.totalFrames) {
          this.currentAttack = null;
        }
      }

      // State triggers
      if (this.currentAttack === null) {
        if (keyIsDown(this.controls.down)) {
          this.state = "crouching";

        }
        else {
          this.state = "idle";
          this.stats.currentHeight = this.stats.idleHeight;
          this.position.y -= this.stats.offsetCrouchHeight;
        }
      }

      if (this.position.x > rightBlastZone || this.position.x < leftBlastZone || this.position.y > bottomBlastZone || this.position.y < topBlastZone) {
        this.state = "dead";
        if (this.stocks > 0) {
          this.stocks--;

          // Play death sound
          if (this.stocks === 0) {
            this.playSound("finalKo");
          }
          else {
            this.playSound("ko");
          }
        }
      }

      if (this.hitstunTimer > 0) {
        this.state = "hitstun";
        this.hitboxes = [];
        this.currentAttack = null;
        this.transitionWindowOpen = false;
        this.multihitBuffer = 0;
      }
      
      break;

    // airAttacking state behavior
    case "airAttacking":

      // State behavior
      this.airMovement();

      let name = null;

      // Control the hitboxes
      if (this.currentAttack !== null) {
        
        // Update the frame and position
        this.currentAttack.currentFrame++;
        this.currentAttack.update(this.position.x, this.position.y, this.direction);
        name = this.currentAttack.name;
        
        // Remove hitboxes that have ended
        if (this.currentAttack.currentFrame > this.currentAttack.totalFrames) {
          this.currentAttack = null;
        }
      }
      
      // State triggers
      
      // If the opponent lands while air attacking
      if (this.touchingTop && this.velocity.y >= 0) {
        this.state = "landing";
        this.upSpecialAvailable = true;
        
        if (this.currentAttack !== null) {
          let currentFrame = this.currentAttack.currentFrame;
          let autoCancelStartingWindow = this.currentAttack.autoCancelStart;
          let autoCancelEndingWindow = this.currentAttack.autoCancelEnd;
          let landingLag = this.currentAttack.landingLag;
          
          // Remove the attack
          this.currentAttack = null;
          
          // Reset velocity and snap to stage
          this.velocity.y = 0;
          this.position.y = stageY - this.stats.currentHeight / 2;
          
          
          // Determine the endlag based on the current frame
          if (currentFrame >= autoCancelEndingWindow) {
            this.landingLagTimer = HARD_LANDING_LAG_TIMER;
          }
          else if (currentFrame <= autoCancelStartingWindow) {
            this.landingLagTimer = HARD_LANDING_LAG_TIMER;
          }
          else {
            this.landingLagTimer = landingLag;
          }
        }
      }
      
      // If the opponent finishes the attack in the air
      else if (this.currentAttack === null) {
        if (name === "marthUpSpecial") {
          this.state = "specialFall";
        }
        else {
          this.state = "airborne";
        }
      }

      if (this.position.x > rightBlastZone || this.position.x < leftBlastZone || this.position.y > bottomBlastZone || this.position.y < topBlastZone) {
        this.state = "dead";
        if (this.stocks > 0) {
          this.stocks--;

          // Play death sound
          if (this.stocks === 0) {
            this.playSound("finalKo");
          }
          else {
            this.playSound("ko");
          }
        }
      }
      
      if (this.hitstunTimer > 0) {
        this.state = "hitstun";
        this.hitboxes = [];
        this.currentAttack = null;
        this.transitionWindowOpen = false;
        this.multihitBuffer = 0;
      }

      break;

    // multihitAttacking state behavior
    case "multihitAttacking":

      // State behavior
      if (!this.multihitAir) {
        this.addFriction();
      }
      else {
        this.airMovement();
      }

      // Control the hitboxes
      if (this.currentAttack !== null) {
        
        // Update the frame and position
        this.currentAttack.currentFrame++;
        this.currentAttack.update(this.position.x, this.position.y, this.direction);

        // Open up window to transition into the next attack
        if (this.currentAttack.currentFrame >= this.currentAttack.transitionFrame) {
          this.transitionWindowOpen = true;
        }

        // Transition to new attack if possible and within buffer window
        if (this.transitionWindowOpen && this.multihitIndex < this.hitboxes.length - 1) {
          
          // Automatic multihits (neutral air only)
          if (this.currentAttack.autoTransition) {
            
            // Update attack index
            this.multihitIndex++;
            let attack = this.hitboxes[this.multihitIndex];
            
            // Close the window to change moves
            this.transitionWindowOpen = false;
            this.multihitBuffer = 0;
  
            // New attack
            this.currentAttack = new Attack(attack.name, this.direction, this.position.x, this.position.y, attack.offsetX, 
              attack.offsetY, attack.width, attack.height, attack.damage, 
              attack.startingFrames, attack.activeFrames, attack.endingFrames, 
              attack.angle, attack.knockback, attack.growthKnockback, attack.shieldStun, 
              attack.transitionFrame, attack.autoTransition, attack.landingLag,
              attack.autoCancelStart, attack.autoCancelEnd);
            this.currentAttack.hasHit = false;
  
            // Play sound
            this.playSound("swing");
          }

          // Manual multihits (side special and jab)
          else if (this.currentAttack.currentFrame - this.multihitBuffer <= BUFFER_WINDOW && this.multihitBuffer > 0) {

            // Update attack index
            this.multihitIndex++;
            let attack = this.hitboxes[this.multihitIndex];

            // Close the window to change moves
            this.transitionWindowOpen = false;
            this.multihitBuffer = 0;
  
            // New attack
            this.currentAttack = new Attack(attack.name, this.direction, this.position.x, this.position.y, attack.offsetX, 
              attack.offsetY, attack.width, attack.height, attack.damage, 
              attack.startingFrames, attack.activeFrames, attack.endingFrames, 
              attack.angle, attack.knockback, attack.growthKnockback, attack.shieldStun, 
              attack.transitionFrame, attack.autoTransition, attack.landingLag,
              attack.autoCancelStart, attack.autoCancelEnd);
            this.currentAttack.hasHit = false;
  
            // Play sound
            this.playSound("swing");
          }
        }
        
        // Remove hitboxes that have ended
        if (this.currentAttack.currentFrame > this.currentAttack.totalFrames) {
          this.hitboxes = [];
          this.currentAttack = null;
        } 
      }

      // State triggers

      // Ground multihit
      if (!this.multihitAir && this.currentAttack === null) {
        this.state = "idle";
        this.hitboxes = [];
        this.currentAttack = null;
      }

      // If the opponent lands while air attacking
      else if (this.multihitAir && this.touchingTop) {
        this.state = "landing";
        this.upSpecialAvailable = true;
        
        if (this.currentAttack !== null) {
          let currentFrame = this.currentAttack.currentFrame;
          let autoCancelStartingWindow = this.currentAttack.autoCancelStart;
          let autoCancelEndingWindow = this.currentAttack.autoCancelEnd;
          let landingLag = this.currentAttack.landingLag;
          
          // Remove the attack
          this.hitboxes = [];
          this.currentAttack = null;
          
          // Reset velocity and snap to stage
          this.velocity.y = 0;
          this.position.y = stageY - this.stats.currentHeight / 2;
          
          
          // Determine the endlag based on the current frame
          if (currentFrame >= autoCancelEndingWindow) {
            this.landingLagTimer = HARD_LANDING_LAG_TIMER;
          }
          else if (currentFrame <= autoCancelStartingWindow) {
            this.landingLagTimer = HARD_LANDING_LAG_TIMER;
          }
          else {
            this.landingLagTimer = landingLag;
          }
        }
      }
      
      // If the opponent finishes the attack in the air
      else if (this.multihitAir && this.currentAttack === null) {
        this.state = "airborne";
      }

      if (this.position.x > rightBlastZone || this.position.x < leftBlastZone || this.position.y > bottomBlastZone || this.position.y < topBlastZone) {
        this.state = "dead";
        if (this.stocks > 0) {
          this.stocks--;

          // Play death sound
          if (this.stocks === 0) {
            this.playSound("finalKo");
          }
          else {
            this.playSound("ko");
          }
        }
      }

      if (this.hitstunTimer > 0) {
        this.state = "hitstun";
        this.hitboxes = [];
        this.currentAttack = null;
        this.transitionWindowOpen = false;
        this.multihitBuffer = 0;
      }

      break;

    // specialFall state behavoir and triggers
    case "specialFall":

      // State behavior
      this.airMovement();

      // State triggers

      if (this.touchingTop && this.velocity.y >= 0) {
        this.state = "landing";

        // Set the landing lag
        this.landingLagTimer = this.upSpecialLag;

        // Remove the attack
        this.hitboxes = [];
        this.currentAttack = null;

        // Reset velocity and snap to stage
        this.velocity.y = 0;
        this.position.y = stageY - this.stats.currentHeight / 2;
        this.upSpecialAvailable = true;
      }

      if (this.position.x > rightBlastZone || this.position.x < leftBlastZone || this.position.y > bottomBlastZone || this.position.y < topBlastZone) {
        this.state = "dead";
        if (this.stocks > 0) {
          this.stocks--;

          // Play death sound
          if (this.stocks === 0) {
            this.playSound("finalKo");
          }
          else {
            this.playSound("ko");
          }
        }
      }

      if (this.hitstunTimer > 0) {
        this.state = "hitstun";
        this.hitboxes = [];
        this.currentAttack = null;
        this.transitionWindowOpen = false;
        this.multihitBuffer = 0;
      }
      break;

    // dead state behavior and triggers
    case "dead":

      // State behavior
      this.spawningTimer--;

      // State trigger
      if (this.spawningTimer <= 0) {
        this.resetPlayer();
        this.state = "spawning";
      }

      break;

    // spawning state behavior and triggers
    case "spawning":

      // State behavior
      this.angelPlatform();
      this.direction = this.spawnDirection;

      // State triggers
      if (keyIsDown(this.controls.down)) {
        this.state = "airborne";
        this.fastFalling = true;
      }

      if (keyIsDown(this.controls.left) || keyIsDown(this.controls.right) || this.angelPlatformTimer <= 0) {
        this.angelPlatformTimer = ANGEL_PLATFORM_TIMER;
        this.state = "airborne";
      }

      break;

    // hitstun state behavior and triggers
    case "hitstun":

      // State behavior
      // if (!this.invincible) {
      //   this.stats.color = "red";
      // }

      if (this.touchingTop) {
        this.addFriction();
      }

      // Count hitstun frames
      this.hitstunTimer--;

      // State triggers
      if (this.hitstunTimer <= 0) {

        // Reset the height of the character if they are hit while crouching
        if (this.stats.currentHeight !== this.stats.idleHeight) {
          this.stats.currentHeight = this.stats.idleHeight;
          this.position.y -= this.stats.offsetCrouchHeight;
        }

        // Change to airborne or idle depending on the position
        if (!this.touchingTop) {
          this.state = "airborne";
        }
        else {
          this.state = "idle";
        }
      }

      break;
    }
  }

  // Move player on the stage
  groundMovement() {

    // Move right
    if (keyIsDown(this.controls.right)) {
      this.acceleration.add(this.stats.initialDash, 0);
      this.direction = true; // Right

      // Play sound
      this.playSound("run1");
    }

    // Move left
    if (keyIsDown(this.controls.left)) {
      this.acceleration.add(-this.stats.initialDash, 0);
      this.direction = false; // Left

      // Play sound
      this.playSound("run1");
    }
  }

  // make the player smaller
  crouch() {
    if (keyIsDown(this.controls.down)) {
      this.stats.currentHeight = this.stats.crouchHeight;
      this.position.y += this.stats.crouchHeight;
    }
  }

  // Move player in the air
  airMovement() {

    // Move right
    if (keyIsDown(this.controls.right)) {
      
      // Move in the air differently depending on the state
      if (this.state === "airborne" || this.state === "airAttacking" || this.state === "multihitAttacking") {
        this.acceleration.add(this.stats.airAcceleration, 0);
      }
      else if (this.state === "specialFall") {
        this.acceleration.add(this.stats.airAcceleration * 0.3, 0);
      }
    }

    // Move left
    if (keyIsDown(this.controls.left)) {

      // Move in the air differently depending on the state
      if (this.state === "airborne" || this.state === "airAttacking" || this.state === "multihitAttacking") {
        this.acceleration.add(-this.stats.airAcceleration, 0);
      }
      else if (this.state === "specialFall") {
        this.acceleration.add(-this.stats.airAcceleration * 0.3, 0);
      }
    }
  }

  // Jump to fastfall speed if player presses down
  fastFall() {

    // Condition to fastfall is player is either at the peak of their jump or falling
    if (this.velocity.y >= 0) {
      this.fastFalling = true;

      // if (this.fastFalling && !this.invincible) {
      //   this.stats.color = "green";
      // }
    }
  }

  // Pause before the player jumps
  prepareGroundJump() {
    this.jumpSquatTimer--;
    // if (!this.invincible) {
    //   this.stats.color = "red";
    // }
    if (this.jumpSquatTimer <= 0) {
      this.jumpSquatting = false;
      this.groundJump();
    }
  }

  // Make player jump from the ground
  groundJump() {
    if (this.jumpAvailable) {

      // Determine jump height
      if (keyIsDown(this.controls.shortHop)) {
        this.velocity.y = this.stats.shortHopPower;
      }
      else if (keyIsDown(this.controls.jump)) {
        this.velocity.y = this.stats.fullHopPower;
      }
      else {
        this.velocity.y = this.stats.shortHopPower;
      }

      // Play sound
      this.playSound("jump");

      // Disable ground jump and unlock double jump
      this.jumpAvailable = false;
      this.doubleJumpAvailable = true;
    }
  }

  // Double jump
  doubleJump() {
    if (this.doubleJumpAvailable && this.upSpecialAvailable) {
      this.velocity.y = this.stats.doubleJumpPower;

      // Play sound
      this.playSound("doubleJump");

      // Disable double jump and fast falling
      this.fastFalling = false;
      this.doubleJumpAvailable = false;
    }
  }

  // Create new ground attack
  spawnGroundHitbox(attack, crouching) {

    // Make the players current attack a new instance
    this.currentAttack = new Attack(attack.name, this.direction, this.position.x, this.position.y, attack.offsetX, 
      attack.offsetY, attack.width, attack.height, attack.damage, 
      attack.startingFrames, attack.activeFrames, attack.endingFrames, 
      attack.angle, attack.knockback, attack.growthKnockback, attack.shieldStun);

    this.currentAttack.hasHit = false;

    // Change to proper attack state
    if (crouching) {
      this.state = "crouchAttacking";
    }
    else {
      this.state = "attacking";
    }
    
    // Play sound
    this.playSound("swing");
  }

  // Create a new air attack
  spawnAirHitbox(attack) {

    // Make the players current attack a new instance
    this.currentAttack = new Attack(attack.name, this.direction, this.position.x, this.position.y, attack.offsetX, 
      attack.offsetY, attack.width, attack.height, attack.damage, 
      attack.startingFrames, attack.activeFrames, attack.endingFrames, 
      attack.angle, attack.knockback, attack.growthKnockback, attack.shieldStun, 
      attack.transitionFrame, attack.autoTransition, attack.landingLag, 
      attack.autoCancelStart, attack.autoCancelEnd);
    this.currentAttack.hasHit = false;

    // Change to proper attack state
    this.state = "airAttacking";
    
    // Play sound
    this.playSound("swing");
  }

  // Create a new multihit attack
  spawnMultihit(attackSequence, airborne) {

    // Store the sequence
    this.multihitIndex = 0;
    this.hitboxes = attackSequence;
    this.multihitBuffer = 0;

    // Make the players current attack a new instance
    this.currentAttack = new Attack(attackSequence[0].name, this.direction, this.position.x, this.position.y, attackSequence[0].offsetX, 
      attackSequence[0].offsetY, attackSequence[0].width, attackSequence[0].height, attackSequence[0].damage, 
      attackSequence[0].startingFrames, attackSequence[0].activeFrames, attackSequence[0].endingFrames, 
      attackSequence[0].angle, attackSequence[0].knockback, attackSequence[0].growthKnockback, attackSequence[0].shieldStun, 
      attackSequence[0].transitionFrame, attackSequence[0].autoTransition, attackSequence[0].landingLag,
      attackSequence[0].autoCancelStart, attackSequence[0].autoCancelEnd);
    this.currentAttack.hasHit = false;

    // Change to proper attack state
    this.multihitAir = airborne;
    this.state = "multihitAttacking";
    
    // Play sound
    this.playSound("swing");
  }

  // Create a special attack
  spawnSpecial(attack) {

    // Prevent infinite specials
    if (this.upSpecialAvailable) {

      // Make the players current attack a new instance
      this.currentAttack = new Attack(attack.name, this.direction, this.position.x, this.position.y, attack.offsetX, 
        attack.offsetY, attack.width, attack.height, attack.damage, 
        attack.startingFrames, attack.activeFrames, attack.endingFrames, 
        attack.angle, attack.knockback, attack.growthKnockback, attack.shieldStun, attack.transitionFrame, 
        attack.autoTransition, attack.landingLag, attack.autoCancelStart, attack.autoCancelEnd);
  
      // Propel the player up
      this.velocity.y = this.stats.upSpecialPower;
  
      this.currentAttack.hasHit = false;
  
      // Change to proper attack state
      this.state = "airAttacking";
      this.upSpecialAvailable = false;
  
      // Play sound
      this.playSound("upSpecial");
    }
  }

  // Reset player if dead
  resetPlayer() {

    // Reset player states and flags
    this.percentage = 0;
    this.direction = true;
    this.jumpSquatting = false;
    this.jumpAvailable = false;
    this.doubleJumpAvailable = true;
    this.fastFalling = false;
    this.invincible = true;
    this.stats.currentHeight = this.stats.idleHeight;
    this.multihitBuffer = 0;
    this.hitboxes = [];
    this.multihitIndex = 0;
    this.currentAttack = null;
    this.multihitAir = false;
    this.transitionWindowOpen = false;
    this.upSpecialAvailable = true;
    gameAnnouncerPlayed = false;

    // Reset timers
    this.invincibilityTimer = INVINCIBILITY_TIMER;
    this.spawningTimer = SPAWNING_TIMER;
  }

  // Put player on the angel platform and prevent all damage until input
  angelPlatform() {

    // Start the timer for how long you can stay on the angel platform
    this.angelPlatformTimer--;

    // Reset player position
    this.position.x = this.spawnX;
    this.position.y = this.spawnY;

    // Halt all movement
    this.acceleration.mult(0);
    this.velocity.mult(0);

    // Make player white to show invincibility
    // if (this.invincible) {
    //   this.stats.color = "white";
    // }
  }

  // Manage the sounds of the player
  playSound(soundName) {

    // Make sure that the sound isn't playing and exists
    if (this.sounds[soundName] && !this.sounds[soundName].isPlaying()) {
      this.sounds[soundName].play();
    }
  }
}

// Create an attack
class Attack {
  constructor(name, playerDirection, playerX, playerY, attackOffsetX, attackOffsetY, attackWidth, 
    attackHeight, attackDamage, attackStartingFrames, attackActiveFrames, attackEndingFrames, attackAngle, 
    attackBaseKnockback, attackGrowthKnockBack, attackShieldStun, attackTransitionFrame, attackAutoTransition, 
    attackLandingLag, attackAutoCancelStart, attackAutoCancelEnd) {

    // Hitbox and size
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.offsetX = attackOffsetX;
    this.offsetY = attackOffsetY;
    this.w = attackWidth;
    this.h = attackHeight;

    // Damage and knockback
    this.damage = attackDamage;
    this.knockback = attackBaseKnockback;
    this.growthKnockback = attackGrowthKnockBack;
    this.angle = attackAngle;
    this.shieldStun = attackShieldStun;
    this.currentAngle = null;

    // Frame data
    this.startingFrames = attackStartingFrames;
    this.activeFrames = attackActiveFrames;
    this.endingFrames = attackEndingFrames;
    this.totalFrames = this.startingFrames + this.activeFrames + this.endingFrames;
    this.currentFrame = 0;
    this.hasHit = false;

    // Multihit specifics
    this.transitionFrame = attackTransitionFrame;
    this.autoTransition = attackAutoTransition;

    // Air attack specifics
    this.landingLag = attackLandingLag;
    this.autoCancelStart = attackAutoCancelStart;
    this.autoCancelEnd = attackAutoCancelEnd;
  }

  // Show the hitbox for the attack
  display() {

    // Use the center to draw the hitbox
    rectMode(CENTER);
    noStroke();

    // Add a hitbox if the attack is active
    if (this.currentFrame >= this.startingFrames && this.currentFrame <= this.startingFrames + this.activeFrames) {
      fill("blue");
      rect(this.x, this.y, this.w, this.h);
    } 
    else {
      noFill();
      rect(this.x, this.y, this.w, this.h);
    }
  }

  // Move the hitbox with the player
  update(playerX, playerY, playerDirection) {

    let currentOffsetX = null;

    // Determine the offset X position based off of the player's direction
    if (!playerDirection) {
      currentOffsetX = -this.offsetX;
    }
    else {
      currentOffsetX = this.offsetX;
    }

    // Determine the angle based of the player's direction for normal attacks
    if (!playerDirection) {
      this.currentAngle = 180 - this.angle;
    }
    else {
      this.currentAngle = this.angle;
    }

    // Attach the hitbox to the player
    this.x = playerX + currentOffsetX;
    this.y = playerY + this.offsetY;
  }

  // Determine the angle, hitstun, and knockback of the move
  calculateKnockback(attacker, defender, rage) {

    // Make sure that the player isn't invincible
    if (defender.state !== "dead" && defender.state !== "spawning" && !defender.invincible) {

      // Only calculate for one frame
      if (!this.hasHit) {

        // Add damage
        defender.percentage += this.damage;

        // Calculate knockback and hitstun
        let p = defender.percentage;
        let d = this.damage;
        let w = defender.stats.weight;
        let s = this.growthKnockback / 100;
        let b = this.knockback;
        let r = rage;
        let rawKnockback = ((((((p / 10) + (p * d / 20)) * 200 / (w + 100)) * 1.4) + 18) * s + b) * r; // Smash Bros knockback formula
        let scaledKnockback = rawKnockback * KNOCKBACK_MULTIPLIER;
        let hitstun = rawKnockback * HITSTUN_MULTIPLIER * KNOCKBACK_MULTIPLIER;
        
        // Calculate Sakurai's Special Angle
        let sakuraiAngle = this.angle;
  
        if (this.angle === SAKURAI_SPECIAL_ANGLE) {
          
          // Grounded angles
          if (defender.touchingTop) {
            
            // Angle will be 0 if the knockback is low and enemy grounded < 66
            if (rawKnockback < LOW_KNOCKBACK_THRESHOLD) {
              sakuraiAngle = LOW_KNOCKBACK_ANGLE;
            }
            
            // Angle will be 38 if the knockback is high and enemy grounded >= 88 
            else if (rawKnockback >= HIGH_KNOCKBACK_THRESHOLD) {
              sakuraiAngle = HIGH_KNOCKBACK_ANGLE;
            }
            
            // Angle will scale linearly if the knockback is in between 66 and 88
            else {
              sakuraiAngle = map(rawKnockback, LOW_KNOCKBACK_THRESHOLD, HIGH_KNOCKBACK_THRESHOLD, LOW_KNOCKBACK_ANGLE, HIGH_KNOCKBACK_ANGLE);
            }
          }

          // Angle will always be 38 if the enemy is airborne
          else {
            sakuraiAngle = HIGH_KNOCKBACK_ANGLE;
          }
        }

        // Determine the final angle to use for knockback
        let finalAngle = null;

        if (this.angle === SAKURAI_SPECIAL_ANGLE) {
          finalAngle = sakuraiAngle;
        }
        else {
          finalAngle = this.currentAngle;
        }

        // Fix direction after calculating angle for Sakurai Angle attacks
        if (this.angle === SAKURAI_SPECIAL_ANGLE && !attacker.direction) {
          finalAngle = 180 - finalAngle;
        }

        // Send the opponent up if grounded down air hits
        if (this.name === "marthDownAir" && defender.touchingTop) {
          finalAngle = -90;
        }
  
        // Calculate angle
        let radianAngle = radians(finalAngle);
        let knockbackAngle = p5.Vector.fromAngle(radianAngle, scaledKnockback);
        
        // Put the player who got hit into hitstun
        defender.state = "hitstun";
        this.hasHit = true;

        // Play sound
        attacker.playSound("sweet");

        // Add hitstun and vector
        defender.velocity.set(knockbackAngle);
        defender.hitstunTimer = round(hitstun);

        if (defender.jumpAvailable) {
          defender.jumpAvailable = false;
          defender.doubleJumpAvailable = true;
        }
      }
    }
  }
}

// Create a stage
class Stage {
  constructor(stageX, stageY, stageW, stageH, blastzoneGap) {

    // Physical stage properties
    this.x = stageX;
    this.y = stageY;
    this.w = stageW;
    this.h = stageH;
    this.blastzone = blastzoneGap;

    // Animation stage properties
    this.animationHeight = 300;
    this.animationX = windowWidth / 2;
    this.animationY = windowHeight - 200;

    // Animation properties
    this.frameWidth = 456;
    this.frameHeight = 237;
    this.currentFrame = 0;
    this.totalFrames = 6;
    this.animationTimer = 0;
    this.animationSpeed = 7;
  }

  // Show the stage
  display(playerOne, playerTwo) {

    // Hitbox
    // rectMode(CORNER);
    // fill("white");
    // rect(this.x, this.y, this.w, this.h);

    // Shuffle through frames
    let frameX = this.currentFrame * this.frameWidth;
    
    // Show the stage
    imageMode(CENTER);
    image(stageSprite, this.animationX, this.animationY, this.w, this.animationHeight, 
      frameX, 0, this.frameWidth, this.frameHeight); 
    
    // Show the players percent
    this.displayDamageMeter(playerOne, playerTwo);
  }

  // Go through animation frames
  update() {
    
    // Count timer to update frames
    this.animationTimer++;
    if (this.animationTimer > this.animationSpeed) {
      this.currentFrame++;
      this.animationTimer = 0;
    }

    // Loop back to first frame
    if (this.currentFrame > this.totalFrames) {
      this.currentFrame = 0;
    }
  }

  // Show how many lives each player has
  displayDamageMeter(playerOne, playerTwo) {

    // Define the style
    fill("white");
    stroke("black");
    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    // Show the players
    textSize(PLAYER_NAME_TEXT_SIZE);
    text("PLAYER 1", playerOneStartX, DAMAGE_METER_Y + DAMAGE_METER_GAP);
    text("PLAYER 2", playerTwoStartX, DAMAGE_METER_Y + DAMAGE_METER_GAP);

    // Show the percent
    textSize(DAMAGE_METER_TEXT_SIZE);
    let playerOnePercent = String(playerOne.percentage);
    let playerTwoPercent = String(playerTwo.percentage);

    text(playerOnePercent + "%", playerOneStartX, DAMAGE_METER_Y);
    text(playerTwoPercent + "%", playerTwoStartX, DAMAGE_METER_Y);

    // Show the stocks
    for (let i = 0; i < playerOne.stocks; i++) {
      push();
      scale(MARTH_ICON_SCALE_FACTOR, MARTH_ICON_SCALE_FACTOR);
      imageMode(CORNER);
      image(marthIcon, playerOneStockX + i * MARTH_ICON_GAP, playerOneStockY);
      pop();
    }

    for (let i = 0; i < playerTwo.stocks; i++) {
      push();
      scale(MARTH_ICON_SCALE_FACTOR, MARTH_ICON_SCALE_FACTOR);
      imageMode(CORNER);
      image(marthIcon, playerTwoStockX + i * MARTH_ICON_GAP, playerTwoStockY);
      pop();
    }
  }
}

// Load sounds and sprites
function preload() {

  // Stage sounds
  backgroundMusic = loadSound("assets/stage/sounds/backgroundmusic.mp3");
  countdownAnnouncer = loadSound("assets/stage/sounds/countdown.mp3");
  marthWin = loadSound("assets/stage/sounds/marthwin.mp3");
  gameEndMusic = loadSound("assets/stage/sounds/gameendmusic.mp3");
  gameAnnouncer = loadSound("assets/stage/sounds/game.mp3");
  menuMusic = loadSound("assets/stage/sounds/menumusic.mp3");
  entranceSound = loadSound("assets/marth/sounds/entrance.mp3");

  // Player 1 sounds
  marthAppearOne = loadSound("assets/marth/sounds/marthappear.mp3");
  marthRun1One = loadSound("assets/marth/sounds/marthrun1.mp3");
  marthRun2One = loadSound("assets/marth/sounds/marthrun2.mp3");
  marthRun3One = loadSound("assets/marth/sounds/marthrun3.mp3");
  marthSweetHitOne = loadSound("assets/marth/sounds/marthsweetspot.mp3");
  marthSwingOne = loadSound("assets/marth/sounds/marthswing.mp3");
  marthJumpOne = loadSound("assets/marth/sounds/marthjump.mp3");
  marthDoubleJumpOne = loadSound("assets/marth/sounds/marthdoublejump.mp3");
  marthLandOne = loadSound("assets/marth/sounds/marthland.mp3");
  marthSquatOne = loadSound("assets/marth/sounds/marthsquat.mp3");
  marthRiseOne = loadSound("assets/marth/sounds/marthrise.mp3");
  koOne = loadSound("assets/marth/sounds/ko.mp3");
  finalKoOne = loadSound("assets/marth/sounds/finalko.mp3");
  marthUpSpecialOne = loadSound("assets/marth/sounds/marthupspecial.mp3");

  // Player 2 sounds
  marthAppearTwo = loadSound("assets/marth/sounds/marthappear.mp3");
  marthRun1Two = loadSound("assets/marth/sounds/marthrun1.mp3");
  marthRun2Two = loadSound("assets/marth/sounds/marthrun2.mp3");
  marthRun3Two = loadSound("assets/marth/sounds/marthrun3.mp3");
  marthSweetHitTwo = loadSound("assets/marth/sounds/marthsweetspot.mp3");
  marthSwingTwo = loadSound("assets/marth/sounds/marthswing.mp3");
  marthJumpTwo = loadSound("assets/marth/sounds/marthjump.mp3");
  marthDoubleJumpTwo = loadSound("assets/marth/sounds/marthdoublejump.mp3");
  marthLandTwo = loadSound("assets/marth/sounds/marthland.mp3");
  marthSquatTwo = loadSound("assets/marth/sounds/marthsquat.mp3");
  marthRiseTwo = loadSound("assets/marth/sounds/marthrise.mp3");
  koTwo = loadSound("assets/marth/sounds/ko.mp3");
  finalKoTwo = loadSound("assets/marth/sounds/finalko.mp3");
  marthUpSpecialTwo = loadSound("assets/marth/sounds/marthupspecial.mp3");

  // Stage sprites
  stageSprite = loadImage("assets/stage/stagesprite.png");
  stageBackground = loadImage("assets/stage/stagebackground.jpg");

  // Marth sprites
  marthSheet = loadImage("assets/marth/animations/marthsprite.png");
  marthIcon = loadImage("assets/marth/animations/marthicon.png");
}

// Setup player
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Start background music
  backgroundMusic.setVolume(0.1);
  menuMusic.setVolume(0.1);
  
  // Player 1 sounds
  let playerOneSounds = {
    appear: marthAppearOne,
    jump: marthJumpOne,
    doubleJump: marthDoubleJumpOne,
    land: marthLandOne,
    run1: marthRun1One,
    run2: marthRun2One,
    run3: marthRun3One,
    squat: marthSquatOne,
    rise: marthRiseOne,
    sweet: marthSweetHitOne,
    swing: marthSwingOne,
    ko: koOne,
    finalKo: finalKoOne,
    upSpecial: marthUpSpecialOne,
  };
  
  // Player 2 sounds
  let playerTwoSounds = {
    appear: marthAppearTwo,
    jump: marthJumpTwo,
    doubleJump: marthDoubleJumpTwo,
    land: marthLandTwo,
    run1: marthRun1Two,
    run2: marthRun2Two,
    run3: marthRun3Two,
    squat: marthSquatTwo,
    rise: marthRiseTwo,
    sweet: marthSweetHitTwo,
    swing: marthSwingTwo,
    ko: koTwo,
    finalKo: finalKoTwo,
    upSpecial: marthUpSpecialTwo,
  };

  // Set the stage position and blast zones
  stageX = windowWidth / 2 - STAGE_WIDTH / 2;
  stageY = windowHeight - STAGE_Y_OFFSET;
  topBlastZone = -BLAST_ZONE_GAP;
  leftBlastZone = -BLAST_ZONE_GAP;
  bottomBlastZone = windowHeight + BLAST_ZONE_GAP;
  rightBlastZone = windowWidth + BLAST_ZONE_GAP;

  // Set up player positions
  playerOneStartX = windowWidth / 2 - 200;
  playerOneStartY = windowHeight - STAGE_Y_OFFSET;
  playerOneSpawnX = playerOneStartX;
  playerOneSpawnY = 300;
  playerOneStockX = 3000;
  playerOneStockY = 3850;
  
  playerTwoStartX = windowWidth / 2 + 200;
  playerTwoStartY = windowHeight - STAGE_Y_OFFSET;
  playerTwoSpawnX = playerTwoStartX;
  playerTwoSpawnY = 300;
  playerTwoStockX = 5000;
  playerTwoStockY = 3850;

  // Create player 1
  playerOne = new Player(playerOneStartX, playerOneStartY - playerOneMarthStats.currentHeight / 2, 
    playerOneMarthStats, playerOneControls, playerOneSounds, playerOneSpawnX, playerOneSpawnY, PLAYER_ONE_DIRECTION);

  // Create player 2
  playerTwo = new Player(playerTwoStartX, playerTwoStartY - playerTwoMarthStats.currentHeight / 2, 
    playerTwoMarthStats, playerTwoControls, playerTwoSounds, playerTwoSpawnX, playerTwoSpawnY, PLAYER_TWO_DIRECTION);

  // Create stage
  stage = new Stage(stageX, stageY, STAGE_WIDTH, STAGE_HEIGHT, 100);
}

// Manage players
function draw() {

  // menu state
  if (gameState === "menu") {
    background(0);
    displayMenu();
    if (!menuMusic.isPlaying()) {
      menuMusic.play();
    }
  }

  // controls state
  else if (gameState === "controls") {
    background(0);
    displayControls();
    if (!menuMusic.isPlaying()) {
      menuMusic.play();
    }
  }

  // starting state
  else if (gameState === "starting") {

    menuMusic.stop();

    // Display background
    imageMode(CORNER);
    image(stageBackground, 0, 0, windowWidth, windowHeight);

    // Show countdown
    countDown();
  }

  // playing state
  else if (gameState === "playing") {

    // Display background
    imageMode(CORNER);
    image(stageBackground, 0, 0, windowWidth, windowHeight);

    noStroke();
  
    // Draw stage
    stage.update();
    stage.display(playerOne, playerTwo);
  
    // Update player states and movement
    playerOne.update(playerTwo);
    playerTwo.update(playerOne);  
  
    // Check for collision between players and attacks
    playerCollisions(playerOne, playerTwo);
  
    // Display player
    playerOne.display();
    playerTwo.display();
  
    // Check stocks for winner
    gameEnd(playerOne.stocks, playerTwo.stocks);
  }

  // gameOver state
  else if (gameState === "gameOver") {
    background(0);
    displayWinner(winner);
    backgroundMusic.stop();
    if (!gameEndMusic.isPlaying()) {
      gameEndMusic.play();
    }
  }
}

// Handle player input for single events
function keyPressed() {

  // Events while playing
  if (gameState === "playing" || gameState === "starting" && countdownTimer < ONE_SECOND_MARK) {

    // PLAYER ONE CONTROLS
  
    // make sure the player isn't stuck in hitstun or dead
    if (playerOne.state !== "hitstun" && playerOne.state !== "dead") {
  
      // Jumping
      if (keyCode === playerOne.controls.jump || keyCode === playerOne.controls.shortHop) {
  
        // Angel platform jump
        if (playerOne.state === "spawning") {
          playerOne.state = "airborne";
          playerOne.doubleJump();
        }
  
        // Ground jump
        else if (playerOne.jumpAvailable) {
          playerOne.jumpSquatting = true;
        }
  
        // Double jump
        else if (playerOne.doubleJumpAvailable) {
          playerOne.doubleJump();
        }
      }
  
      // Fast falling
      if (keyCode === playerOne.controls.down) {
  
        // Check that player is airborne
        if (playerOne.state === "airborne") {
          playerOne.fastFall();
        }
      }
  
      // Attacking
      if (keyCode === playerOne.controls.attack || keyCode === playerOne.controls.forwardTilt) {
  
        // Attacks from idle state
        if (playerOne.state === "idle" || playerOne.state === "running") {
  
          // Attacking left and right
          if (keyIsDown(playerOne.controls.forwardTilt)) {
            playerOne.spawnGroundHitbox(marthForwardTilt, false);
          }
  
          // Attacking up
          else if (keyIsDown(playerOne.controls.up)) {
            playerOne.spawnGroundHitbox(marthUpTilt, false);
          }
  
          // Default attack
          else {
            playerOne.spawnMultihit(marthJab, false);
          }
        }
  
        // Attacks from crouching state
        else if (playerOne.state === "crouching") {

          // Attacking down
          if (keyIsDown(playerOne.controls.down)) {
            playerOne.spawnGroundHitbox(marthDownTilt, true);
          }

          // Default attack
          else {
            playerOne.spawnGroundHitbox(marthDownTilt, true);
          }
        }

        // Attacks from airborne state
        else if (playerOne.state === "airborne") {

          // Attacking forward
          if (keyIsDown(playerOne.controls.left) && !playerOne.direction || 
          keyIsDown(playerOne.controls.right) && playerOne.direction) {
            playerOne.spawnAirHitbox(marthForwardAir);
          }

          // Attacking backward
          else if (keyIsDown(playerOne.controls.left) && playerOne.direction ||
          keyIsDown(playerOne.controls.right) && !playerOne.direction) {
            playerOne.spawnAirHitbox(marthBackAir);
          }

          // Attacking down
          else if (keyIsDown(playerOne.controls.down)) {
            playerOne.spawnAirHitbox(marthDownAir);
          }

          // Attacking up
          else if (keyIsDown(playerOne.controls.up)) {
            playerOne.spawnAirHitbox(marthUpAir);
          }

          // Default attack
          else {
            playerOne.spawnMultihit(marthNeutralAir, true);
          }
        }

        // Attacks from multihitAttacking state
        else if (playerOne.state === "multihitAttacking") {
          playerOne.multihitBuffer = playerOne.currentAttack.currentFrame;
        }
      }

      // Special attacks
      if (keyCode === playerOne.controls.special) {

        // Attacks from multihitAttacking state
        if (playerOne.state === "multihitAttacking") {
          playerOne.multihitBuffer = playerOne.currentAttack.currentFrame;
        }

        // Up special
        else if (keyIsDown(playerOne.controls.up) || keyIsDown(playerOne.controls.jump)) {

          // Allow the player to change directions for the up special
          if (keyIsDown(playerOne.controls.left)) {
            playerOne.direction = false; // left
          }
          else if (keyIsDown(playerOne.controls.right)) {
            playerOne.direction = true; // right
          }
          playerOne.spawnSpecial(marthUpSpecial);
        }

        // Side special
        else if (keyIsDown(playerOne.controls.left) || keyIsDown(playerOne.controls.right)) {

          // Allow the player to change directions for the side special
          if (keyIsDown(playerOne.controls.left)) {
            playerOne.direction = false; // left
          }
          else if (keyIsDown(playerOne.controls.right)) {
            playerOne.direction = true; // right
          }

          // Grounded side special
          if (playerOne.state === "grounded" || playerOne.state === "running") {
            playerOne.spawnMultihit(marthSideSpecial, false);
          }
          // Aerial side special
          else if (playerOne.state === "airborne") {
            playerOne.spawnMultihit(marthSideSpecial, true);
          }
        }
      }
    }
  
    // PLAYER TWO CONTROLS
  
    // make sure the player isn't stuck in hitstun or dead
    if (playerTwo.state !== "hitstun" && playerTwo.state !== "dead") {
  
      // Jumping
      if (keyCode === playerTwo.controls.jump || keyCode === playerTwo.controls.shortHop) {
  
        // Angel platform jump
        if (playerTwo.state === "spawning") {
          playerTwo.state = "airborne";
          playerTwo.doubleJump();
        }
  
        // Ground jump
        else if (playerTwo.jumpAvailable) {
          playerTwo.jumpSquatting = true;
        }
  
        // Double jump
        else if (playerTwo.doubleJumpAvailable) {
          playerTwo.doubleJump();
        }
      }
  
      // Fast falling
      if (keyCode === playerTwo.controls.down) {
  
        // Check that player is airborne
        if (playerTwo.state === "airborne") {
          playerTwo.fastFall();
        }
      }
  
      // Attacking
      if (keyCode === playerTwo.controls.attack || keyCode === playerTwo.controls.forwardTilt) {
  
        // Attacks from idle state
        if (playerTwo.state === "idle" || playerTwo.state === "running") {

          // Attacking forward
          if (keyIsDown(playerTwo.controls.forwardTilt)) {
            playerTwo.spawnGroundHitbox(marthForwardTilt, false);
          }
  
          // Attacking up
          else if (keyIsDown(playerTwo.controls.up)) {
            playerTwo.spawnGroundHitbox(marthUpTilt, false);
          }
  
          // Default attack
          else {
            playerTwo.spawnMultihit(marthJab, false);
          }
        }
  
        // Attacks from crouching state
        else if (playerTwo.state === "crouching") {

          // Attacking down
          if (keyIsDown(playerTwo.controls.down)) {
            playerTwo.spawnGroundHitbox(marthDownTilt, true);
          }

          // Default attack
          else {
            playerTwo.spawnGroundHitbox(marthDownTilt, true);
          }
        }

        // Attacks from airborne state
        else if (playerTwo.state === "airborne") {

          // Attacking forward
          if (keyIsDown(playerTwo.controls.left) && !playerTwo.direction || 
          keyIsDown(playerTwo.controls.right) && playerTwo.direction) {
            playerTwo.spawnAirHitbox(marthForwardAir);
          }

          // Attacking backward
          else if (keyIsDown(playerTwo.controls.left) && playerTwo.direction ||
          keyIsDown(playerTwo.controls.right) && !playerTwo.direction) {
            playerTwo.spawnAirHitbox(marthBackAir);
          }

          // Attacking down
          else if (keyIsDown(playerTwo.controls.down)) {
            playerTwo.spawnAirHitbox(marthDownAir);
          }

          // Attacking up
          else if (keyIsDown(playerTwo.controls.up)) {
            playerTwo.spawnAirHitbox(marthUpAir);
          }

          // Default attack
          else {
            playerTwo.spawnMultihit(marthNeutralAir, true);
          }
        }
        
        // Attacks from multihitAttacking state
        else if (playerTwo.state === "multihitAttacking") {
          playerTwo.multihitBuffer = playerTwo.currentAttack.currentFrame;
        }
      }

      // Special attacks
      if (keyCode === playerTwo.controls.special) {

        // Attacks from multihitAttacking state
        if (playerTwo.state === "multihitAttacking") {
          playerTwo.multihitBuffer = playerTwo.currentAttack.currentFrame;
        }

        // Up special
        else if (keyIsDown(playerTwo.controls.up) || keyIsDown(playerTwo.controls.jump)) {

          // Allow the player to change directions for the up special
          if (keyIsDown(playerTwo.controls.left)) {
            playerTwo.direction = false; // left
          }
          else if (keyIsDown(playerTwo.controls.right)) {
            playerTwo.direction = true; // right
          }

          playerTwo.spawnSpecial(marthUpSpecial);
        }

        // Side special
        else if (keyIsDown(playerTwo.controls.left) || keyIsDown(playerTwo.controls.right)) {

          // Allow the player to change directions for the side special
          if (keyIsDown(playerTwo.controls.left)) {
            playerTwo.direction = false; // left
          }
          else if (keyIsDown(playerTwo.controls.right)) {
            playerTwo.direction = true; // right
          }

          // Grounded side special
          if (playerTwo.state === "grounded" || playerTwo.state === "running") {
            playerTwo.spawnMultihit(marthSideSpecial, false);
          }
          // Aerial side special
          else if (playerTwo.state === "airborne") {
            playerTwo.spawnMultihit(marthSideSpecial, true);
          }
        }
      }
    }
  }

  // Events while menu
  else if (gameState === "menu") {
    if (keyCode === P_KEY) {
      gameState = "starting";
      if (!backgroundMusic.isPlaying()) {
        backgroundMusic.loop();
      }   
    }
    else if (keyCode === C_KEY) {
      gameState = "controls";
    }
  }

  // Events while menu
  else if (gameState === "controls") {
    if (keyCode === M_KEY) {
      gameState = "menu";
    }
  }

  // Events while game over
  else if (gameState === "gameOver") {

    // Restart game
    if (keyCode === R_KEY) {

      // Reset game state and countdown
      gameState = "starting";
      countdownBegun = false;
      countdownTimer = 180;
      gameEndMusic.stop();
      backgroundMusic.loop();

      // Reset players
      playerOne.resetPlayer();
      playerTwo.resetPlayer();
      playerOne.state = "entrance";
      playerTwo.state = "entrance";
      playerOne.position.set(playerOneStartX, playerOneStartY - playerOneMarthStats.currentHeight / 2);
      playerTwo.position.set(playerTwoStartX, playerTwoStartY - playerTwoMarthStats.currentHeight / 2);
      playerOne.velocity.set(0, 0);
      playerTwo.velocity.set(0, 0);
      playerOne.hitboxes = [];
      playerTwo.hitboxes = [];
      playerOne.currentAttack = null;
      playerTwo.currentAttack = null;
      playerOne.stocks = PLAYER_STOCKS;
      playerTwo.stocks = PLAYER_STOCKS;
      playerOne.invincible = false;
      playerTwo.invincible = false;
      playerOne.direction = true;
      playerTwo.direction = false;
      winner = null;
    }
  }
}

// Menu screen for game
function displayMenu() {

  // Define style
  fill("white");
  stroke("black");
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(MENU_TEXT_SIZE);
  text("Press P to play and C for controls.", width / 2, height / 2);
}

// Controls for players
function displayControls() {

  // Define style
  fill("white");
  stroke("black");
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(CONTROLS_TEXT_SIZE);
  text(`PLAYER ONE CONTROLS:
    WASD movement
    T attack
    Y special
    U forward tilt
    Q shorthop
    E up
    PLAYER TWO CONTROLS:
    ARROWS movement
    0 attack
    . special
    Enter forward tilt
    Shift shorthop
    1 up
    Press M to go back to the menu`, width / 2, height / 2);
}

// Start the countdown before the game starts
function countDown() {

  // Start countdown
  countdownTimer--;

  // Play sound
  if (!countdownBegun) {
    countdownAnnouncer.play();
    countdownBegun = true;
  }

  // Show correct number
  if (countdownTimer > THREE_SECOND_MARK) {
    
    // Play sound
    if (!entranceSound.isPlaying()) {
      entranceSound.play();
    }

    // Draw stage
    stage.update();
    stage.display(playerOne, playerTwo);

    // Display player
    playerOne.display();
    playerOne.updateAnimation();
    playerTwo.display();
    playerTwo.updateAnimation();

    // Define style
    fill("white");
    stroke("black");
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(COUNTDOWN_TEXT_SIZE);
    text("3", width / 2, height / 2);
  }
  else if (countdownTimer > TWO_SECOND_MARK) {
  
    // Draw stage
    stage.update();
    stage.display(playerOne, playerTwo);

    // Display player
    playerOne.state = "idle";
    playerOne.display();
    playerOne.updateAnimation();
    playerTwo.state = "idle";
    playerTwo.display();
    playerTwo.updateAnimation();

    // Define style
    fill("white");
    stroke("black");
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(COUNTDOWN_TEXT_SIZE);
    text("2", width / 2, height / 2);
  }
  else if (countdownTimer > ONE_SECOND_MARK) {

    // Draw stage
    stage.update();
    stage.display(playerOne, playerTwo);

    // Display player
    playerOne.display();
    playerOne.updateAnimation();
    playerTwo.display();
    playerTwo.updateAnimation();

    // Define style
    fill("white");
    stroke("black");
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(COUNTDOWN_TEXT_SIZE);
    text("1", width / 2, height / 2);
  }
  else if (countdownTimer > GO_MARK) {
    noStroke();
    
    // Draw stage
    stage.update();
    stage.display(playerOne, playerTwo);
    
    // Update player states and movement
    playerOne.update(playerTwo);
    playerTwo.update(playerOne);  
    
    // Check for collision between players and attacks
    playerCollisions(playerOne, playerTwo);
    
    // Display player
    playerOne.display();
    playerTwo.display();

    // Define style
    fill("white");
    stroke("black");
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(COUNTDOWN_TEXT_SIZE);
    text("GO!", width / 2, height / 2);
  }
  else {
    countdownAnnouncer.stop();
    gameState = "playing";
  }
}

// Check if the players are colliding and prevent them from overlapping
function playerCollisions(playerOne, playerTwo) {
  
  // Player one edges
  let playerOneBottom = playerOne.position.y + playerOne.stats.currentHeight / 2;
  let playerOneTop = playerOne.position.y - playerOne.stats.currentHeight / 2;
  let playerOneRight = playerOne.position.x + playerOne.stats.width / 2;
  let playerOneLeft = playerOne.position.x - playerOne.stats.width / 2;

  // Player two edges
  let playerTwoBottom = playerTwo.position.y + playerTwo.stats.currentHeight / 2;
  let playerTwoTop = playerTwo.position.y - playerTwo.stats.currentHeight / 2;
  let playerTwoRight = playerTwo.position.x + playerTwo.stats.width / 2;
  let playerTwoLeft = playerTwo.position.x - playerTwo.stats.width / 2;

  // First check if there is any collision and then detect which side is the closest
  if (playerOneBottom >= playerTwoTop && playerOneTop <= playerTwoBottom && 
    playerOneRight >= playerTwoLeft && playerOneLeft <= playerTwoRight) {

    // Find the amount of overlap on the left and right
    let rightOverlap = playerTwoRight - playerOneLeft;
    let leftOverlap = playerOneRight - playerTwoLeft;

    // Find the smallest overlap
    let minimumOverlap = Math.min(rightOverlap, leftOverlap);
    
    // Push the player out to the left or right
    if (minimumOverlap === leftOverlap) {
      playerOne.position.x -= leftOverlap / 2;
      playerTwo.position.x += leftOverlap / 2;
    }
    
    else if (minimumOverlap === rightOverlap) {
      playerOne.position.x += rightOverlap / 2;
      playerTwo.position.x -= rightOverlap / 2;
    }
  }
}

// End game if either player wins
function gameEnd(playerOneStocks, playerTwoStocks) {
  if (playerOneStocks === 0) {
    winner = playerTwo;
    gameState = "gameOver";

    // Play game sound
    if (!gameAnnouncerPlayed) {
      gameAnnouncer.play();
      gameAnnouncerPlayed = true;
    }
  }
  if (playerTwoStocks === 0) {
    winner = playerOne;
    gameState = "gameOver";

    // Play game sound
    if (!gameAnnouncerPlayed) {
      gameAnnouncer.play();
      gameAnnouncerPlayed = true;
    }
  }
}

// Show the winner
function displayWinner(winner) {
  background(0);
  fill("white");
  stroke("black");
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(COUNTDOWN_TEXT_SIZE);
  if (winner === playerOne) {
    text(`Player 1 wins!
    Press R to play again`, width / 2, height / 2);
  }
  else if (winner === playerTwo) {
    text(`Player 2 wins!
    Press R to play again`, width / 2, height / 2);
  }
}