import {GameObjectClass} from "kontra";
import {SceneManager} from "./SceneManager";

export abstract class Scene extends GameObjectClass{
    onShow: () => void = () => {}
    onHide: () => void = () => {}
    sceneManager: SceneManager

    constructor(sceneManager: SceneManager) {
        super();
        this.sceneManager = sceneManager
    }

    show(){
        this.onShow()
    }

    hide(){
        this.onHide()
    }
}