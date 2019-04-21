class gameMenu extends Phaser.Scene {
	constructor() {
		super({key: 'gameMenu'});
	}
	create() {
		this.backgroundImage = this.add.sprite(this.centerX(), this.centerY(), 'background1');
        this.backgroundImage.width = game.config.width;
        this.backgroundImage.height = game.config.height;
        if (window.innerWidth < 1000) {
            this.backgroundImage.scaleX = 0.5;
            this.backgroundImage.scaleY = this.backgroundImage.scaleX;
        }
        
        if (window.innerWidth < 1000) {
        	this.insertLogo = this.add.sprite(this.centerX(), this.centerY() - 100, 'logo');
            this.insertLogo.scaleX = 0.5;
            this.insertLogo.scaleY = this.insertLogo.scaleX;
        } else {
        	this.insertLogo = this.add.sprite(this.centerX(), this.centerY() - 200, 'logo');
        	this.insertLogo.width = game.config.width;
        	this.insertLogo.height = game.config.height;
        }
		if (window.innerWidth < 1000) {
			this.startButton = this.add.sprite(this.centerX(), this.centerY() + 100, 'startButton').setInteractive();
            this.startButton.scaleX = 0.5;
            this.startButton.scaleY = this.startButton.scaleX;
        } else {
        	this.startButton = this.add.sprite(this.centerX(), this.centerY() + 200, 'startButton').setInteractive();
			this.startButton.width = game.config.width;
        	this.startButton.height = game.config.height;
        }
        this.startButton.on('pointerdown', function () {
			this.scene.start('playGame');
		}, this);
	}
	centerX() {
        return this.sys.game.config.width / 2;
    }
    centerY() {
        return this.sys.game.config.height / 2;
    }
};