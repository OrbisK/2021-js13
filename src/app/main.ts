import kontra, {GameLoop, init, initKeys} from 'kontra';
import Scene from "./models/scene";
import {SCALE} from "./globals";
import ProgressBar from "./progressbar";
import Player from "./models/player";
import NPC from "./models/npc";


new ProgressBar(document.querySelectorAll("img"), () => {

})
init();
initKeys();

// kontra.getContext().scale(SCALE, SCALE);

const c_width = Math.ceil(kontra.getCanvas().width / SCALE);
const c_height = Math.ceil(kontra.getCanvas().height / SCALE);

const scene = new Scene(c_width, c_height);
scene.addChildren([
    new Player(),
    new NPC(),
])

const loop = GameLoop({  // create the main game loop
    update: function () { // update the game state
        scene.update();
    },
    render: function () { // render the game state
        scene.render();
    }
});

loop.start();    // start the game
