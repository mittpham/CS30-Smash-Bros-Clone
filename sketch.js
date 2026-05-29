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

// Things to do:
// jumping into top blastzone should not kill
// Create multihit attacks jab, nair, sideb
// Add controls
// 1. fix moving after hitstun
// 2. add sounds kill sound, marth voice
// 3. display stocks
// 4. Adjust marths stats
// 5. Fix the ratio for stage - 1 meter in game is about 16 pixels

// Canvas constants
const SCREEN_WIDTH = 1440;
const SCREEN_HEIGHT = 810;

// Universal player variables and constants
const JUMPSQUAT_TIMER = 3;
const SOFT_LANDING_LAG_TIMER = 2;
const HARD_LANDING_LAG_TIMER = 4;
const SPAWNING_TIMER = 30;
const INVINCIBILITY_TIMER = 120;
const ANGEL_PLATFORM_TIMER = 300;
const PLAYER_STOCKS = 3;
const KNOCKBACK_MULTIPLIER = 0.2;
const HITSTUN_MULTIPLIER = 0.4;
const SAKURAI_SPECIAL_ANGLE = 361;
const LOW_KNOCKBACK_ANGLE = 0;
const HIGH_KNOCKBACK_ANGLE = -38;
const LOW_KNOCKBACK_THRESHOLD = 66;
const HIGH_KNOCKBACK_THRESHOLD = 88;
const R_KEY = 82;
const PLAYER_TEXT_SIZE = 20;
const BUFFER_WINDOW = 9;

let winner = null;

// Player 1 constants and variables
const PLAYER_ONE_START_X = 520;
const PLAYER_ONE_START_Y = 550;
const PLAYER_ONE_SPAWN_X = 520;
const PLAYER_ONE_SPAWN_Y = 200;

let playerOne;

// Player 1 controls
let playerOneControls = {
  left: 65, // A key
  right: 68, // D key
  jump: 87, // W key
  up: 69, // E key
  down: 83, // S key
  shortHop: 81, // Q key
  attack: 85, // U key
  special: 89, // Y key
};

// Player 2 constants and variables
const PLAYER_TWO_START_X = 920;
const PLAYER_TWO_START_Y = 550;
const PLAYER_TWO_SPAWN_X = 920;
const PLAYER_TWO_SPAWN_Y = 200;

let playerTwo;

// Player 2 controls
let playerTwoControls = {
  left: 37, // Left arrow
  right: 39, // Right arrow
  jump: 38, // Up arrow
  up: 33, // Page up / Numberpad 9
  down: 40, // Down arrow
  shortHop: 36, // Home key / Numberpad 7
  attack: 191, // Slash key
  special: 16, // Shift key
};

// Stage constants and variables
const STAGE_X = 320;
const STAGE_Y = 550;
const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 50;

const TOP_BLAST_ZONE = -25;
const BOTTOM_BLAST_ZONE = 835;
const LEFT_BLAST_ZONE = -25;
const RIGHT_BLAST_ZONE = 1465;

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

let countdownTimer = 180;
let countdownBegun = false;
let marthWinDone = false;
let gameAnnouncerPlayed = false;
let gameState = "starting"; // menu, controls, starting, playing, gameOver

// Sounds
let backgroundMusic;
let countdownAnnouncer;
let marthWin;
let gameEndMusic;
let gameAnnouncer;

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

// Marth stats
let playerOneMarthStats = {
  runSpeed: 4,
  initialDash: 5,
  airAcceleration: 1,
  airSpeed: 2.4,
  friction: 0.886,
  gravity: 0.6,
  fallSpeed: 8,
  fastFallSpeed: 12.8,
  shortHopPower: -10,
  fullHopPower: -15,
  doubleJumpPower: -15,
  weight: 90,
  color: "blue",
  width: 40,
  currentHeight: 80,
  idleHeight: 80,
  crouchHeight: 40,
  offsetCrouchHeight: 20,
  name: "P1",
};

let playerTwoMarthStats = {
  runSpeed: 4,
  initialDash: 5,
  airAcceleration: 1,
  airSpeed: 2.4,
  friction: 0.886,
  gravity: 0.6,
  fallSpeed: 8,
  fastFallSpeed: 12.8,
  shortHopPower: -10,
  fullHopPower: -15,
  doubleJumpPower: -15,
  weight: 90,
  color: "blue",
  width: 40,
  currentHeight: 80,
  idleHeight: 80,
  crouchHeight: 40,
  offsetCrouchHeight: 20,
  name: "P2",
};

// Marth attacks

// Jab
let marthJabOne = {
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
  autoTransition: true,
};

let marthJabTwo = {
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
  offsetX: 60,
  offsetY: -10,
  width: 100,
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
  offsetX: 0,
  offsetY: -40,
  width: 120,
  height: 140,
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
  offsetX: 20,
  offsetY: -20,
  width: 100,
  height: 30,
  startingFrames: 6,
  activeFrames: 1,
  endingFrames: 0,
  damage: 5,
  angle: -90,
  knockback: 35,
  growthKnockback: 50,
  shieldStun: 3,
  transitionFrame: 7,
  autoTransition: true,
  landingLag: 7,
  autoCancelStart: 0,
  autoCancelEnd: 47,
};

let marthNeutralAirTwo = {
  offsetX: 0,
  offsetY: -20,
  width: 150,
  height: 30,
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
  offsetX: 60,
  offsetY: 0,
  width: 120,
  height: 130,
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
  offsetX: 0,
  offsetY: 0,
  width: 100,
  height: 100,
  startingFrames: 7,
  activeFrames: 4,
  endingFrames: 28,
  damage: 12.5,
  angle: 361,
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
  offsetX: 0,
  offsetY: 60,
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
  offsetX: 0,
  offsetY: -40,
  width: 110,
  height: 110,
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

// Create the base player
class Player {
  constructor(x, y, stats, controls, sounds, spawnX, spawnY) {

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
    this.state = "idle"; // idle, running, crouching, airborne, jumpsquat, landing, dead, spawning, attacking, crouchAttacking, airAttacking, multihitAttacking, hitstun

    // Flags/Conditions
    this.direction = true; // Right
    this.jumpSquatting = false;
    this.jumpAvailable = true;
    this.doubleJumpAvailable = false;
    this.fastFalling = false;
    this.invincible = false;
    this.touchingTop = false;
    this.touchingLeft = false;
    this.touchingRight = false;
    this.touchingBottom = false;
    this.multihitAir = false;

    // Timers
    this.jumpSquatTimer = JUMPSQUAT_TIMER;
    this.landingLagTimer = 0;
    this.spawningTimer = SPAWNING_TIMER;
    this.invincibilityTimer = INVINCIBILITY_TIMER;
    this.angelPlatformTimer = ANGEL_PLATFORM_TIMER;
    this.attackFrameTimer = 0;
    this.hitstunTimer = 0;
    this.multihitBuffer = 0;
  }

  // Display the player and hitboxes
  display() {

    // Draw player from the center
    rectMode(CENTER);

    // Square to represent the player
    noStroke();
    fill(this.stats.color);
    rect(this.position.x, this.position.y, this.stats.width, this.stats.currentHeight);

    // Marker to show player
    fill("white");
    stroke("black");
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(PLAYER_TEXT_SIZE);
    text(this.stats.name, this.position.x, this.position.y - 3 * this.stats.idleHeight / 4);

    // Draw hitboxes
    if (this.currentAttack !== null) {
      this.currentAttack.display();
    }
  }

  // Update the player’s state and movement
  update(player) {

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
    if (this.state === "airborne" || this.state === "airAttacking" || this.state === "multihitAttacking") {
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
        this.touchingBottom = true;
        this.position.y = stageBottom + this.stats.currentHeight / 2;
        this.velocity.y = 0;
        return true;
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
        hurtbox.hasHit = false;
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
      if (!this.invincible) {
        this.stats.color = "blue";
      }

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

      if (this.position.x > RIGHT_BLAST_ZONE || this.position.x < LEFT_BLAST_ZONE || this.position.y > BOTTOM_BLAST_ZONE || this.position.y < TOP_BLAST_ZONE) {
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
      }

      break;

    // running state behaviors and triggers
    case "running":

      // State Behavior
      this.groundMovement();
      this.addFriction();
      if (!this.invincible) {
        this.stats.color = "purple";
      }

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

      if (this.position.x > RIGHT_BLAST_ZONE || this.position.x < LEFT_BLAST_ZONE || this.position.y > BOTTOM_BLAST_ZONE || this.position.y < TOP_BLAST_ZONE) {
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
      }

      break;

      // crouching state behaviors and triggers
    case "crouching":

      // State behaviours
      this.addFriction();
      if (!this.invincible) {
        this.stats.color = "orange";
      }

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
      }

      break;

    // airborne state behaviors and triggers
    case "airborne":

      // State behavior
      this.airMovement();
      if (!this.fastFalling && !this.invincible) {
        this.stats.color = "pink";
      }

      // State triggers
      if (this.touchingTop) {
        this.state = "landing";

        // Choose landing lag depending on the player's fall speed
        if (this.fastFalling) { 
          this.landingLagTimer = HARD_LANDING_LAG_TIMER;
        }
        else {
          this.landingLagTimer = SOFT_LANDING_LAG_TIMER;
        }

        // Reset velocity and snap to stage
        this.velocity.y = 0;
        this.position.y = STAGE_Y - this.stats.currentHeight / 2;
      }

      if (this.position.x > RIGHT_BLAST_ZONE || this.position.x < LEFT_BLAST_ZONE || this.position.y > BOTTOM_BLAST_ZONE || this.position.y < TOP_BLAST_ZONE) {
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

      if (this.position.x > RIGHT_BLAST_ZONE || this.position.x < LEFT_BLAST_ZONE || this.position.y > BOTTOM_BLAST_ZONE || this.position.y < TOP_BLAST_ZONE) {
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
      if (!this.invincible) {
        this.stats.color = "red";
      }

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

      if (this.position.x > RIGHT_BLAST_ZONE || this.position.x < LEFT_BLAST_ZONE || this.position.y > BOTTOM_BLAST_ZONE || this.position.y < TOP_BLAST_ZONE) {
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

      if (this.position.x > RIGHT_BLAST_ZONE || this.position.x < LEFT_BLAST_ZONE || this.position.y > BOTTOM_BLAST_ZONE || this.position.y < TOP_BLAST_ZONE) {
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

      if (this.position.x > RIGHT_BLAST_ZONE || this.position.x < LEFT_BLAST_ZONE || this.position.y > BOTTOM_BLAST_ZONE || this.position.y < TOP_BLAST_ZONE) {
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
      }
      
      break;

    // airAttacking state behavior
    case "airAttacking":

      // State behavior
      this.airMovement();
      
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
      
      // If the opponent lands while air attacking
      if (this.touchingTop) {
        this.state = "landing";
        
        if (this.currentAttack !== null) {
          let currentFrame = this.currentAttack.currentFrame;
          let autoCancelStartingWindow = this.currentAttack.autoCancelStart;
          let autoCancelEndingWindow = this.currentAttack.autoCancelEnd;
          let landingLag = this.currentAttack.landingLag;
          
          // Remove the attack
          this.currentAttack = null;
          
          // Reset velocity and snap to stage
          this.velocity.y = 0;
          this.position.y = STAGE_Y - this.stats.currentHeight / 2;
          
          
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
        this.state = "airborne";
      }

      if (this.position.x > RIGHT_BLAST_ZONE || this.position.x < LEFT_BLAST_ZONE || this.position.y > BOTTOM_BLAST_ZONE || this.position.y < TOP_BLAST_ZONE) {
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

        // Transition to next attack if buffered and transitionable
        if (this.currentAttack.currentFrame >= this.currentAttack.transitionFrame) {
          if (this.currentAttack.currentFrame - this.multihitBuffer <= BUFFER_WINDOW) {

            this.multihitIndex++;
            let attack = this.hitboxes[this.multihitIndex];

            this.currentAttack = new Attack(this.direction, this.position.x, this.position.y, attack.offsetX, 
              attack.offsetY, attack.width, attack.height, attack.damage, 
              attack.startingFrames, attack.activeFrames, attack.endingFrames, 
              attack.angle, attack.knockback, attack.growthKnockback, attack.shieldStun, 
              attack.transitionFrame, attack.autoTransition);
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
      }

      // If the opponent lands while air attacking
      else if (this.multihitAir && this.touchingTop) {
        this.state = "landing";
        
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
          this.position.y = STAGE_Y - this.stats.currentHeight / 2;
          
          
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

      if (this.position.x > RIGHT_BLAST_ZONE || this.position.x < LEFT_BLAST_ZONE || this.position.y > BOTTOM_BLAST_ZONE || this.position.y < TOP_BLAST_ZONE) {
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
      }

      break;

    // dead state behavior
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
      if (!this.invincible) {
        this.stats.color = "red";
      }

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
      this.acceleration.add(this.stats.airAcceleration, 0);
    }

    // Move left
    if (keyIsDown(this.controls.left)) {
      this.acceleration.add(-this.stats.airAcceleration, 0);
    }
  }

  // Jump to fastfall speed if player presses down
  fastFall() {

    // Condition to fastfall is player is either at the peak of their jump or falling
    if (this.velocity.y >= 0) {
      this.fastFalling = true;

      if (this.fastFalling && !this.invincible) {
        this.stats.color = "green";
      }
    }
  }

  // Pause before the player jumps
  prepareGroundJump() {
    this.jumpSquatTimer--;
    if (!this.invincible) {
      this.stats.color = "red";
    }
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
    if (this.doubleJumpAvailable) {
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
    this.currentAttack = new Attack(this.direction, this.position.x, this.position.y, attack.offsetX, 
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
    this.currentAttack = new Attack(this.direction, this.position.x, this.position.y, attack.offsetX, 
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
    this.currentAttack = new Attack(this.direction, this.position.x, this.position.y, attackSequence[0].offsetX, 
      attackSequence[0].offsetY, attackSequence[0].width, attackSequence[0].height, attackSequence[0].damage, 
      attackSequence[0].startingFrames, attackSequence[0].activeFrames, attackSequence[0].endingFrames, 
      attackSequence[0].angle, attackSequence[0].knockback, attackSequence[0].growthKnockback, attackSequence[0].shieldStun, 
      attackSequence[0].transitionFrame, attackSequence[0].autoTransition);
    this.currentAttack.hasHit = false;

    // Change to proper attack state
    this.multihitAir = airborne;
    this.state = "multihitAttacking";
    
    // Play sound
    this.playSound("swing");
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
    if (this.invincible) {
      this.stats.color = "white";
    }
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
  constructor(playerDirection, playerX, playerY, attackOffsetX, attackOffsetY, attackWidth, 
    attackHeight, attackDamage, attackStartingFrames, attackActiveFrames, attackEndingFrames, attackAngle, 
    attackBaseKnockback, attackGrowthKnockBack, attackShieldStun, attackTransitionFrame, attackAutoTransition, attackLandingLag, attackAutoCancelStart, attackAutoCancelEnd) {

    // Hitbox and size
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

    // Stage properties
    this.x = stageX;
    this.y = stageY;
    this.w = stageW;
    this.h = stageH;
    this.blastzone = blastzoneGap;
  }

  // Show the stage
  display(playerOne, playerTwo) {
    rectMode(CORNER);
    fill("white");
    rect(this.x, this.y, this.w, this.h);

    // Show the players percent
    this.displayDamageMeter(playerOne, playerTwo);
  }

  // Go through animation frames
  update() {
    // Nice to have stuff
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
    text("PLAYER 1", PLAYER_ONE_START_X, DAMAGE_METER_Y + DAMAGE_METER_GAP);
    text("PLAYER 2", PLAYER_TWO_START_X, DAMAGE_METER_Y + DAMAGE_METER_GAP);

    // Show the percent
    textSize(DAMAGE_METER_TEXT_SIZE);
    let playerOnePercent = String(playerOne.percentage);
    let playerTwoPercent = String(playerTwo.percentage);

    text(playerOnePercent + "%", PLAYER_ONE_START_X, DAMAGE_METER_Y);
    text(playerTwoPercent + "%", PLAYER_TWO_START_X, DAMAGE_METER_Y);

    // Show the stocks
    for (let i = 0; i < playerOne.stocks; i++) {
      
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
  finalKoOne = loadSound("assets/marth/sounds/finalKo.mp3");

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
  finalKoTwo = loadSound("assets/marth/sounds/finalKo.mp3");
}

// Setup player
function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

  // Start background music
  backgroundMusic.loop();
  backgroundMusic.setVolume(0.1);
  
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
  };

  // Create player 1
  playerOne = new Player(PLAYER_ONE_START_X, PLAYER_ONE_START_Y - playerOneMarthStats.currentHeight / 2, 
    playerOneMarthStats, playerOneControls, playerOneSounds, PLAYER_ONE_SPAWN_X, PLAYER_ONE_SPAWN_Y);

  // Create player 2
  playerTwo = new Player(PLAYER_TWO_START_X, PLAYER_TWO_START_Y - playerTwoMarthStats.currentHeight / 2, 
    playerTwoMarthStats, playerTwoControls, playerTwoSounds, PLAYER_TWO_SPAWN_X, PLAYER_TWO_SPAWN_Y);

  // Create stage
  stage = new Stage(STAGE_X, STAGE_Y, STAGE_WIDTH, STAGE_HEIGHT, 100);
}

// Manage players
function draw() {
  background(0);

  // menu state
  if (gameState === "menu") {
    displayMenu();
  }

  // controls state
  else if (gameState === "controls") {
    displayControls();
  }

  // starting state
  else if (gameState === "starting") {

    // Show countdown
    countDown();
  }

  // playing state
  else if (gameState === "playing") {
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
      if (keyCode === playerOne.controls.attack) {
  
        // Attacks from idle state
        if (playerOne.state === "idle") {
  
          // Attacking left and right
          if (keyIsDown(playerOne.controls.left) || keyIsDown(playerOne.controls.right)) {
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
          if (keyIsDown(playerOne.controls.left) || keyIsDown(playerOne.controls.right)) {
            playerOne.spawnAirHitbox(marthForwardAir);
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
            playerOne.spawnAirHitbox(marthForwardAir);
          }
        }

        // Attacks from multihitAttacking state
        else if (playerOne.state === "multihitAttacking") {
          playerOne.multihitBuffer = playerOne.currentAttack.currentFrame;
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
      if (keyCode === playerTwo.controls.attack) {
  
        // Attacks from idle state
        if (playerTwo.state === "idle") {

          // Attacking forward
          if (keyIsDown(playerTwo.controls.left) || keyIsDown(playerTwo.controls.right)) {
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
          if (keyIsDown(playerTwo.controls.left) || keyIsDown(playerTwo.controls.right)) {
            playerTwo.spawnAirHitbox(marthForwardAir);
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
            playerTwo.spawnAirHitbox(marthForwardAir);
          }
        }
        
        // Attacks from multihitAttacking state
        else if (playerTwo.state === "multihitAttacking") {
          playerTwo.multihitBuffer = playerTwo.currentAttack.currentFrame;
        }
      }
    }
  }

  // Events while game over
  if (gameState === "gameOver") {

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
      playerOne.state = "idle";
      playerTwo.state = "idle";
      playerOne.position.set(PLAYER_ONE_START_X, PLAYER_ONE_START_Y - playerOneMarthStats.currentHeight / 2);
      playerTwo.position.set(PLAYER_TWO_START_X, PLAYER_TWO_START_Y - playerTwoMarthStats.currentHeight / 2);
      playerOne.velocity.set(0, 0);
      playerTwo.velocity.set(0, 0);
      playerOne.hitboxes = [];
      playerTwo.hitboxes = [];
      playerOne.currentAttack = null;
      playerTwo.currentAttack = null;
      playerOne.stocks = PLAYER_STOCKS;
      playerTwo.stocks = PLAYER_STOCKS;
      winner = null;
    }
  }
}

// Menu screen for game
function displayMenu() {

}

// Controls for players
function displayControls() {

}

// Start the countdown before the game starts
function countDown() {

  // Define style
  fill("white");
  stroke("black");
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(COUNTDOWN_TEXT_SIZE);

  // Start countdown
  countdownTimer--;

  // Play sound
  if (!countdownBegun) {
    countdownAnnouncer.play();
    countdownBegun = true;
  }

  // Show correct number
  if (countdownTimer > THREE_SECOND_MARK) {
    text("3", width / 2, height / 2);

    // Draw stage
    stage.update();
    stage.display(playerOne, playerTwo);

    // Display player
    playerOne.display();
    playerTwo.display();
  }
  else if (countdownTimer > TWO_SECOND_MARK) {
    text("2", width / 2, height / 2);

    // Draw stage
    stage.update();
    stage.display(playerOne, playerTwo);

    // Display player
    playerOne.display();
    playerTwo.display();
  }
  else if (countdownTimer > ONE_SECOND_MARK) {
    text("1", width / 2, height / 2);

    // Draw stage
    stage.update();
    stage.display(playerOne, playerTwo);

    // Display player
    playerOne.display();
    playerTwo.display();
  }
  else if (countdownTimer > GO_MARK) {
    text("GO!", width / 2, height / 2);

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