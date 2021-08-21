import kontra from 'kontra';
//
//
// const kontra = require('kontra')

let {init, Sprite, GameLoop} = kontra

let {canvas} = init();


let player= Sprite({
    x: 100,        // starting x,y position of the sprite
    y: 80,
    color: 'red',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 40,
    dx: 2          // move the sprite 2px to the right every frame
})

let loop = GameLoop({  // create the main game loop
    update: function () { // update the game state
        player.update();

        // wrap the sprites position when it reaches
        // the edge of the screen
        if (player.x > canvas.width) {
            player.x = -player.width;
        }
    },
    render: function () { // render the game state
        player.render();
    }
});

loop.start();    // start the game