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

const c_width = Math.ceil(kontra.getCanvas().width / SCALE);
const c_height = Math.ceil(kontra.getCanvas().height / SCALE);

let player = new Player();
let npc = new NPC();

const scene = new Scene(c_width, c_height, [player, npc]);

const loop = GameLoop({  // create the main game loop
    update: function () { // update the game state
        scene.update();
    },
    render: function () { // render the game state
        scene.render();
    }
});

loop.start();    // start the game
//
// import kontra, {TileEngine} from "kontra";
//
// kontra.init();
//
// kontra.initKeys();
// kontra.getContext().scale(4, 4);
//
// kontra.load('assets/tiles.png').then(function (a) {
//     let tileEngine = TileEngine({
//         // tile size
//         tilewidth: 9,
//         tileheight: 9,
//
//         // map size in tiles
//         width: 10,
//         height: 10,
//
//         // tileset object
//         tilesets: [{
//             firstgid: 1,
//             image: a[0]
//         }],
//
//         // layer object
//         layers: [{
//             name: 'ground',
//             data: [1, 1, 1, 1, 0, 1, 1, 1],
//         }]
//     });
//
//     tileEngine.render();
// });
