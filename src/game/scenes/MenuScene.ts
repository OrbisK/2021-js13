import {onKey, Text} from "kontra";
import {CANVAS_HEIGHT, CANVAS_WIDTH, getSavedScore} from "../globals";
import {TEXT_PROPS} from "../utils";
import {SceneManager} from "./SceneManager";
import {Scene} from "./Scene";

export class MenuScene extends Scene{
    title: Text = Text({
        ...TEXT_PROPS, text: 'Stay Safe', x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 - 35,
    })
    score: Text = Text({
        ...TEXT_PROPS, text: "Press Enter to start the Game.\nHighscore: " + getSavedScore() + "m",
        x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 - 5,
    })

    constructor(sceneManager: SceneManager) {
        super(sceneManager)
        this.addChild(this.title, this.score)

        this.onShow = () => {
            onKey('enter', () => {
                this.sceneManager.setScene("game")
            })
        }
    }
}