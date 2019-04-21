'use strict';
var state;
class loader extends Phaser.Scene {   
    constructor() {
        super({key: 'loader'});
    } 
    preload() {
        this.cameras.main.setBackgroundColor('#000000');
        this.createProgressbar(this.centerX(), this.centerY());
        //logo
        this.load.image('logo', 'assets/images/logo.png');
        //alternates between the two platforms
        this.load.image('platform1', 'assets/images/platform1.png');
        this.load.image('platform2', 'assets/images/platform2.png');
        //player is now animated
        this.load.spritesheet('player', 'assets/images/stickmansprite.png', {
        frameWidth: 63, frameHeight: 50, endFrame: 15});
        //buttons for UI
        this.load.image('startButton', 'assets/images/startbutton.png');
        this.load.image('mainMenuButton', 'assets/images/mainmenubutton.png');
        this.load.image('tryAgainButton', 'assets/images/tryagainbutton.png');
        //gameover text made with same font as the logo
        this.load.image('gameOver', 'assets/images/gameover.png');
        //three backgrounds
        this.load.image('background1', 'assets/images/background1.png');
        this.load.image('background2', 'assets/images/background2.png');
        this.load.image('background3', 'assets/images/background3.png');
        //music to be played in the background
        this.load.audio('theme', [
        'assets/music/tniyc.ogg',
        'assets/music/tniyc.mp3'
        ]);
    }
    createProgressbar(x, y) {
        // size & position
        let width = 400;
        let height = 20;
        let xStart = x - width / 2;
        let yStart = y - height / 2;

        // border size
        let borderOffset = 2;

        let borderRect = new Phaser.Geom.Rectangle(
            xStart - borderOffset,
            yStart - borderOffset,
            width + borderOffset * 2,
            height + borderOffset * 2);

        let border = this.add.graphics({
            lineStyle: {
                width: 5,
                color: 0xaaaaaa
            }
        });
        border.strokeRectShape(borderRect);

        let progressbar = this.add.graphics();

        let updateProgressbar = function(percentage)
        {
            progressbar.clear();
            progressbar.fillStyle(0xffffff, 1);
            progressbar.fillRect(xStart, yStart, percentage * width, height);
        };

        this.load.on('progress', updateProgressbar);

        this.load.once('complete', function ()
        {

            this.load.off('progress', updateProgressbar);
            this.scene.start('gameMenu');

        }, this);
    }
    
    centerX() {
        return this.sys.game.config.width / 2;
    }
    centerY() {
        return this.sys.game.config.height / 2;
    }
};