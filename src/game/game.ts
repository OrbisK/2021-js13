import kontra, {GameLoop, init, initKeys, load, setImagePath} from 'kontra';
import {SceneManager} from "./scenes/SceneManager";

init();
initKeys();
kontra.getContext().scale(4, 4);
setImagePath('assets');

export const sceneManager = new SceneManager();

load(
    'chars.png',
    'tiles.png',
).then(function () {
    const loop = GameLoop({
        update: function () {
            sceneManager.activeScene.update()
        },
        render: function () {
            sceneManager.activeScene.render()
        }
    });
    loop.start()
});