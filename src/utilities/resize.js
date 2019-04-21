function resizeApp()
{
    // Width-height-ratio of game resolution
    let game_ratio = (window.innerWidth) / (window.innerHeight);
    
    // Make div full height of browser and keep the ratio of game resolution
    let div = document.getElementById('phaser-app');
    div.style.width = (window.innerHeight * game_ratio) + 'px';
    div.style.height = window.innerHeight + 'px';
    
    // Check if device DPI messes up the width-height-ratio
    let canvas = document.getElementsByTagName('canvas')[0];
    
    let dpi_w = (parseInt(div.style.width) / canvas.width);
    let dpi_h = (parseInt(div.style.height) / canvas.height);       
    
    let height = window.innerHeight * (dpi_w / dpi_h);
    let width = height * 0.6;
    
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
}

// Add to resize event
window.addEventListener('resize', resizeApp);

// Set correct size when page loads the first time
resizeApp();