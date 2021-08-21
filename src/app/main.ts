import kontra, {GameLoop, init, initKeys, keyPressed, Sprite, SpriteSheet} from 'kontra';
import loadedAssets from "./loadedAssets";


init();
initKeys();

kontra.getContext().scale(6, 6);

kontra.setImagePath('assets');

const assetMapping = loadedAssets.map((a, index) => {
    return {...a, id: +index}
})


kontra.load(...assetMapping.map(a => a.path)).then((assets) => {
        const _getAsset = (name: string): any => {
            const asset = assetMapping.find(a => {
                console.log(a.name === name)
                return a.name === name;
            })
            if (!asset?.id && asset?.id !== 0) {
                console.warn(`Asset "${name}" not found.`)
                return undefined
            }
            return assets[asset.id]
        }

        let spriteSheet = SpriteSheet({
            image: _getAsset('person'),
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
