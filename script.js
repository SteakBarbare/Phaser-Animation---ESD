var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("nicolasCageBackground", "assets/nicolasCageBackground.jpg");
  this.load.image("ground", "assets/platform.png");
  this.load.spritesheet(
    "wormChampionIdle",
    "assets/sprWormdeadChampionIdle.png",
    {
      frameWidth: 160,
      frameHeight: 123
    }
  );
  this.load.spritesheet(
    "wormChampionWalk",
    "assets/sprWormdeadChampionWalk.png",
    {
      frameWidth: 160,
      frameHeight: 123
    }
  );
}

function create() {
  //  A simple background for our game
  this.add.image(400, 300, "nicolasCageBackground");

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms.create(400, 568, "ground").setScale(2).refreshBody();

  // The player and its settings
  player = this.physics.add.sprite(100, 450, "wormChampionIdle");

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("wormChampionWalk", {
      start: 0,
      end: 13
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("wormChampionIdle", {
      start: 0,
      end: 31
    }),
    frameRate: 10,
    repeat: 1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("wormChampionWalk", {
      start: 0,
      end: 13
    }),
    frameRate: 10,
    repeat: -1
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  //  The score
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000"
  });

  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player, platforms);
}

function update() {
  if (gameOver) {
    return;
  }

  // Animations depending on playstate
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.setScale(-1, 1);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.setScale(1, 1);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("idle", true);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
