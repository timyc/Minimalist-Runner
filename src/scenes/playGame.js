'use strict';
var score = -10;
var scoreText;
var music;
var duration;
var durationText;

class playGame extends Phaser.Scene {
    constructor() {
        super({key: 'playGame'});
    }
    create() {
        music = this.sound.add('theme');
        music.play({loop: true});
        this.input.on('pointerup', function (pointer) {
                duration = pointer.getDuration();
        });
        this.backgroundImage = this.add.sprite(this.centerX(), this.centerY(), 'background1');
        this.backgroundImage2 = this.add.tileSprite(this.centerX(), this.centerY(), 1920, 1080, 'background2');
        this.backgroundImage3 = this.add.tileSprite(this.centerX(), this.centerY(), 1920, 1080, 'background3');
        if (window.innerWidth < 1000) {
            this.backgroundImage.scaleX = 0.5;
            this.backgroundImage.scaleY = this.backgroundImage.scaleX;
        }
        if (window.innerWidth < 1000) {
            this.backgroundImage2.scaleX = 0.5;
            this.backgroundImage2.scaleY = this.backgroundImage2.scaleX;
        }
        if (window.innerWidth < 1000) {
            this.backgroundImage3.scaleX = 0.5;
            this.backgroundImage3.scaleY = this.backgroundImage3.scaleX;
        }
        if (window.innerwidth > 1000) {
            scoreText = this.add.text(16, 16, 'Score: 0', { font: '50pt Mini7', fill: '#fff' });
            durationText = this.add.text(16, 46, 'debug_velocity: 0', { font: '30pt Mini7', fill: '#fff' });
        } else {
            scoreText = this.add.text(16, 16, 'Score: 0', { font: '25pt Mini7', fill: '#fff' });
            durationText = this.add.text(16, 46, 'debug_velocity: 0', { font: '20pt Mini7', fill: '#fff' });
        }
        
        var playerSprite = {
            key: 'playerSprite',
            frames: this.anims.generateFrameNumbers('player', {
                start: 1,
                end: 16
            }),
            repeat: -1,
            frameRate: 10
        };
        this.anims.create(playerSprite);
        this.platformGroup = this.add.group({
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
        this.platformPool = this.add.group({
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });
        this.playerJumps = 0;
        
        this.addPlatform(game.config.width, game.config.width / 2);
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, 'player');
        if (window.innerWidth < 1000) {
            this.player.scaleX = 0.5;
            this.player.scaleY = this.backgroundImage.scaleX;
        }
        this.player.anims.play('playerSprite');
        this.player.setGravityY(gameOptions.playerGravity);
        this.physics.add.collider(this.player, this.platformGroup);
        this.input.on('pointerdown', this.jump, this);
    }
    addPlatform(platformWidth, posX) {
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }
        else {
            var platformRandNum = Math.floor((Math.random() * 2) + 1);
            var randomShift = Math.floor((Math.random() * (-100+200)) - 100);
            platform = this.physics.add.sprite(posX, (game.config.height * 0.8) + randomShift, 'platform' + platformRandNum);
            if (window.innerWidth < 1000) {
                platform.scaleX = 0.5;
                platform.scaleY = this.backgroundImage.scaleX;
            }
            platform.setImmovable(true);
            platform.setVelocityX((gameOptions.platformStartSpeed + (score/20)) * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
        score += 10;
        scoreText.setText('Score: ' + score);
    }
    jump() {
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            
            this.player.setVelocityY((gameOptions.jumpForce + duration/100)* -1);
            this.playerJumps ++;
            durationText.setText('debug_velocity: ' + duration);
        }
    }
    update() {
        this.backgroundImage2.tilePositionX += 0.15;
        this.backgroundImage3.tilePositionX += 0.5;
        if(this.player.y > game.config.height) {
            sessionStorage.setItem('thisScore', score);
            score = -10;
            music.pause();
            this.scene.start('gameOver');
        }
        this.player.x = gameOptions.playerStartPosition;
        let minDistance = game.config.width;
        this.platformGroup.getChildren().forEach(function(platform) {
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
        if(minDistance > this.nextPlatformDistance) {
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }
    }
    centerX() {
        return this.sys.game.config.width / 2;
    }
    centerY() {
        return this.sys.game.config.height / 2;
    }
};