import kontra, {GameLoop, imageAssets, initKeys, load, setImagePath} from 'kontra';
import {SCALE} from "./globals";
import Player from "./models/player";
import World from "./models/world";
import Entity from "./models/entity";

initKeys();
kontra.getContext().scale(SCALE, SCALE);

setImagePath('assets');
load(
    'chars.png',
    'tiles.png',
).then(function () {
    Entity.charSheet = imageAssets['chars']
    Entity.tileSheet = imageAssets['tiles']

    World.activeWorld = new World(new Player());
    const loop = GameLoop({  // create the main game loop
        update: function () { // update the game state
            World.activeWorld.update();
        },
        render: function () { // render the game state
            World.activeWorld.render();
        }
    });

    loop.start()
});


