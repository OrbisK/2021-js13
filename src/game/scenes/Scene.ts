import {GameObjectClass} from "kontra";
import {SceneManager} from "./SceneManager";

export abstract class Scene extends GameObjectClass{
    onShow: () => void = () => {}
    onHide: () => void = () => {}
    hidden: boolean = true
    sceneManager: SceneManager

    constructor(sceneManager: SceneManager) {
        super();
        this.sceneManager = sceneManager
    }

    show(){
        this.hidden = false
        this.onShow()
    }

    hide(){
        this.hidden = true
        this.onHide()
    }
}