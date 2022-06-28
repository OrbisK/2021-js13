import {GameObjectClass} from "kontra"
import {MenuScene} from "./MenuScene";
import {EndScene} from "./EndScene";
import {GameScene} from "./GameScene";
import {Scene} from "./Scene";

export class SceneManager extends GameObjectClass{
    scenes: any = {
        menu: new MenuScene(this),
        game: new GameScene(this),
        end: new EndScene(this),
    }
    activeScene!: Scene

    constructor() {
        super()
        this.setScene("menu")
    }

    setScene(type: string){
        this.activeScene?.hide()
        this.activeScene = this.scenes[type]
        this.activeScene.show()
        return this.activeScene
    }
}