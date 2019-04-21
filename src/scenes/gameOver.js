class gameOver extends Phaser.Scene {
	constructor() {
		super({key: 'gameOver'});
	}
	create() {
		var backgroundImage = this.add.sprite(this.centerX(), this.centerY(), 'background1');
        backgroundImage.width = game.config.width;
        backgroundImage.height = game.config.height;
        if (window.innerWidth < 1000) {
            backgroundImage.scaleX = 0.5;
            backgroundImage.scaleY = backgroundImage.scaleX;
        }
		if (window.innerWidth < 1000) {
			var gameOver = this.add.sprite(this.centerX(), this.centerY()-100, 'gameOver');
            gameOver.scaleX = 0.5;
            gameOver.scaleY = gameOver.scaleX;
        } else {
        	var gameOver = this.add.sprite(this.centerX(), this.centerY()-300, 'gameOver');
        }
		var retrieveScore = sessionStorage.getItem('thisScore');
		if (window.innerWidth > 1000) {
			scoreText = this.add.text(this.centerX()-240, this.centerY()-200, 'Score: ' + retrieveScore, { font: '64pt Mini7', fill: '#fff' });
		} else {
			scoreText = this.add.text(this.centerX()-80, this.centerY()-45, 'Score: ' + retrieveScore, { font: '20pt Mini7', fill: '#fff' });
		}
		if (window.innerWidth < 1000) {
			var tryAgainButton = this.add.sprite(this.centerX(), this.centerY()+40, 'tryAgainButton').setInteractive();
            tryAgainButton.scaleX = 0.5;
            tryAgainButton.scaleY = tryAgainButton.scaleX;
        } else {
        	var tryAgainButton = this.add.sprite(this.centerX(), this.centerY(), 'tryAgainButton').setInteractive();
        }
        tryAgainButton.on('pointerdown', function() {
			this.scene.start('playGame');
		}, this);
		if (window.innerWidth < 1000) {
			var mainMenuButton = this.add.sprite(this.centerX(), this.centerY()+120, 'mainMenuButton').setInteractive();
            mainMenuButton.scaleX = 0.5;
            mainMenuButton.scaleY = tryAgainButton.scaleX;
        } else {
        	var mainMenuButton = this.add.sprite(this.centerX(), this.centerY()+200, 'mainMenuButton').setInteractive();
        }
        mainMenuButton.on('pointerdown', function() {
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