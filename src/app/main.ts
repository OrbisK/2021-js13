import kontra, {GameLoop, init, initKeys} from 'kontra';
import Entity from "./models/entity";


init();
initKeys();
kontra.getContext().scale(6, 6);



const player = new Entity({assetId: 'player'})

let loop = GameLoop({  // create the main game loop
    update: function () { // update the game state
        player.update();
        player.move()
    },
    render: function () { // render the game state
        player.render();
    }
});

loop.start();    // start the game
