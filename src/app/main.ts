import kontra, {GameLoop, initKeys} from 'kontra';
import World from "./models/world";
import {SCALE} from "./globals";
import ProgressBar from "./progressbar";
import Player from "./models/player";

new ProgressBar(document.querySelectorAll("img"), () => {

})

initKeys();
kontra.getContext().scale(SCALE, SCALE);

let player = new Player(70, 30);
const world = new World(80, player);

world.addChildren([player])

world.addRandomRunningNPCs(30);
world.addRandomStandingNPCs(10);

const loop = GameLoop({  // create the main game loop
    update: function () { // update the game state
        world.update();
    },
    render: function () { // render the game state
        world.render();
    }
});

loop.start();    // start the game


