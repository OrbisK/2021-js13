import {onKey, Text} from "kontra";
import {CANVAS_WIDTH, getSavedScore} from "../globals";
import {TEXT_PROPS} from "../utils";
import {SceneManager} from "./SceneManager";
import {Scene} from "./Scene";

export class EndScene extends Scene{
    endText: Text = Text({...TEXT_PROPS, text: "", x: CANVAS_WIDTH, y: 5})

    constructor(sceneManager: SceneManager) {
        super(sceneManager)
        this.addChild(this.endText)

        this.onShow = () => {
            onKey('enter', () => {
                this.sceneManager.setScene("game")
            })
        }
    }

    setScore(score: number){
        this.endText.text = `Your Score: ${score}m\nHighscore: ${getSavedScore()}m\nPress Enter to restart`
    }

}