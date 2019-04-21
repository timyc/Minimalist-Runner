let gameOptions = {
    platformStartSpeed: 250,
    spawnRange: [120, 260],
    platformSizeRange: [80, 250],
    playerGravity: 900,
    jumpForce: 480,
    playerStartPosition: 300,
    jumps: 1
}

let gameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [loader, gameMenu, playGame, gameOver],
    backgroundColor: 0x444444,
    parent: 'phaser-app',
    physics: {
        default: "arcade"
    }
}


window.onload = function() {
    game = new Phaser.Game(gameConfig);
}