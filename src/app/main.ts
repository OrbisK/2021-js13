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

kontra.getContext().scale(SCALE, SCALE);

let player = new Player(70, 30);
const level = new Scene(100, player);

level.addChildren([
    player,
    new NPC(30, 50),
])

const loop = GameLoop({  // create the main game loop
    update: function () { // update the game state
        level.update();
    },
    render: function () { // render the game state
        level.render();
    }
});

loop.start();    // start the game


