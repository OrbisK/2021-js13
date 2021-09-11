import kontra, {GameLoop, imageAssets, initKeys, load, setImagePath} from 'kontra';
import {SCALE} from "./globals";
import Player from "./models/player";
import Entity from "./models/entity";
import World, {GUI} from "./models/world";

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
    let gui = new GUI();


    const loop = GameLoop({  // create the main game loop
        update: function () { // update the game state
            gui.update();
            World.activeWorld.update();
        },
        render: function () { // render the game state
            World.activeWorld.render();
            gui.render();
        }
    });

    loop.start()
});