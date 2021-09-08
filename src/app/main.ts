import kontra, {GameLoop, imageAssets, initKeys, load, setImagePath} from 'kontra';
import {SCALE} from "./globals";
import Player from "./models/player";
import World from "./models/world";
import Entity from "./models/entity";

initKeys();
kontra.getContext().scale(SCALE, SCALE);

// world.addRandomRunningNPCs(30);
// world.addRandomStandingNPCs(10);

setImagePath('assets');
load(
    'chars.png',
    'tiles.png',
).then(function () {
    Entity.charSheet = imageAssets['chars']

    let player = new Player();
    let world = new World(player, imageAssets['tiles']);
    world.addChild(player)
    world.addWalkingNPC(1);

    const loop = GameLoop({  // create the main game loop
        update: function () { // update the game state
            world.update();
        },
        render: function () { // render the game state
            world.render();
        }
    });

    loop.start()
});


