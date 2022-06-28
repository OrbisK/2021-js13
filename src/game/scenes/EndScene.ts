import {onKey, Text} from "kontra";
import {CANVAS_WIDTH, getSavedScore, TEXT_PROPS} from "../globals";
import {SceneManager} from "./SceneManager";
import {Scene} from "./Scene";
import {GameScene} from "./GameScene";

export class EndScene extends Scene{
    endText: Text = Text({...TEXT_PROPS, text: "", x: CANVAS_WIDTH / 2, y: 20})

    constructor(sceneManager: SceneManager) {
        super(sceneManager)
        this.addChild(this.endText)

        this.onShow = () => {
            onKey('enter', () => {
                this.sceneManager.scenes["game"] = new GameScene(this.sceneManager)
                this.sceneManager.setScene("game")
            })
        }
    }

    setScore(score: number){
        if(parseInt(getSavedScore()) < score){
            localStorage.setItem('highscore', `${score.toFixed(1)}`)
        }
        this.endText.text = `Your Score: ${score.toFixed(1)}m\nHighscore: ${getSavedScore()}m\nPress Enter to restart`
    }
}