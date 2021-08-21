import kontra, {GameLoop, keyPressed, Sprite, SpriteSheet} from 'kontra';
//
//
// const kontra = require('kontra')

// let {init, Sprite, GameLoop} = kontra
// let {canvas} = init();

const SCALE = 6;
kontra.getContext().scale(SCALE, SCALE);

// Load Image Path
kontra.setImagePath('assets');


kontra.load(
    "person_sheet_min.png",
).then(
    function () {
        let spriteSheet = SpriteSheet({
            image: kontra.imageAssets['person_sheet_min'],
            frameWidth: 7,
            frameHeight: 14,
            animations: {
                idle: {
                    frames: 1,
                    loop: false,
                },
                walk: {
                    frames: [0, 1, 2, 1],
                    frameRate: 6,
                }
            }
        });

        let sprite = Sprite({
            x: 10,
            y: 10,
            anchor: {x: 0.5, y: 0.5},
            animations: spriteSheet.animations
        })

        let dir = 1;
        let x_speed = 0.6;
        let y_speed = 0.4;

        let loop = GameLoop({  // create the main game loop
            update: function () { // update the game state
                sprite.update();

                let move = false;

                if (keyPressed('left')) {
                    if (dir == 1) {
                        dir = -1;
                    }

                    sprite.x += dir * x_speed;
                    move = true;
                } else if (keyPressed('right')) {
                    if (dir == -1) {
                        dir = 1;
                    }

                    sprite.x += dir * x_speed;
                    move = true;
                }

                if (keyPressed('up')) {
                    sprite.y -= y_speed;
                    move = true;
                } else if (keyPressed('down')) {
                    sprite.y += y_speed;
                    move = true;
                }

                if (!move) {
                    sprite.playAnimation("idle");
                    sprite.animations["walk"].reset();
                } else {
                    sprite.playAnimation("walk");
                }
            },
            render: function () { // render the game state
                sprite.render();
            }
        });

        loop.start();    // start the game
    }
)
