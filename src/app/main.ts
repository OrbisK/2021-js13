import kontra, {GameLoop, init, initKeys} from 'kontra';
import Player from "./models/player";
import Entity from "./models/entity";

init();
initKeys();

kontra.getContext().scale(3, 3);

const entities: Array<Entity> = [
    new Player(),
    // new NPC()
]

const loop = GameLoop({  // create the main game loop
    update: function () { // update the game state
        for (const entity of entities) {
            entity.update()
        }
    },
    render: function () { // render the game state
        for (const entity of entities) {
            entity.render()
        }
    }
});

loop.start();    // start the game
