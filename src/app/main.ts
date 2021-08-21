import kontra, {GameLoop, init, initKeys, SpriteSheet} from 'kontra';
import Player from "./player";

init();
initKeys();

kontra.getContext().scale(3, 3);

// Load Image Path
kontra.setImagePath('assets');

kontra.load(
    "person-Sheet.png",
).then(
    function () {
        let playerSheet = SpriteSheet({
            image: kontra.imageAssets['person-Sheet'],
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

        let player = new Player(playerSheet);

        let loop = GameLoop({  // create the main game loop
            update: function () { // update the game state
                player.update();
            },
            render: function () { // render the game state
                player.render();
            }
        });

        loop.start();    // start the game
    }
)
