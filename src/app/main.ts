import kontra, {GameLoop, init, initKeys} from 'kontra';
import Player from "./models/player";
import NPC from "./models/npc";
import Entity from "./models/entity";


init();
initKeys();
kontra.getContext().scale(6, 6);

const entities: Array<Entity> = [
    new Player(),
    new NPC()
]

const loop = GameLoop({  // create the main game loop
    update: function () { // update the game state
        for(const entity of entities){
            entity.update()
        }
    },
    render: function () { // render the game state
        for(const entity of entities){
            entity.render()
        }
    }
});

loop.start();    // start the game
