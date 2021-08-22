import kontra, {GameLoop, init, initKeys} from 'kontra';
import Player from "./models/player";
import NPC from "./models/npc";
import Scene from "./models/scene";
import {SCALE} from "./globals";
import ProgressBar from "./progressbar";


new ProgressBar(document.querySelectorAll("img"), () => {

})

init();
initKeys();

kontra.getContext().scale(SCALE, SCALE);

const scene = new Scene([
    new Player(),
    new NPC(),
]);



const loop = GameLoop({  // create the main game loop
    update: function () { // update the game state
        scene.update();
    },
    render: function () { // render the game state
        scene.render();
    }
});

loop.start();    // start the game