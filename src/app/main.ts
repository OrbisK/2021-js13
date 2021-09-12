import kontra, {GameLoop, init, initKeys, load, setImagePath} from 'kontra';
import Player from "./models/player";
import World, {GUI} from "./models/world";

init();
initKeys();
kontra.getContext().scale(4, 4);
setImagePath('assets');

load(
    'chars.png',
    'tiles.png',
).then(function () {
    new World(new Player());
    let gui = new GUI();

    const loop = GameLoop({  // create the main game loop
        update: function () { // update the game state
            gui.update();
            World.a.update();
        },
        render: function () { // render the game state
            World.a.render();
            gui.render();
        }
    });

    loop.start()
});