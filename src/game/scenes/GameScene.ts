import {Text} from "kontra";
import {CANVAS_WIDTH} from "../globals";
import {FONT_SMALL, TEXT_PROPS} from "../utils";
import {SceneManager} from "./SceneManager";
import {Scene} from "./Scene";
import LevelBuilder from "../level/LevelBuilder";
import {Level} from "../level/Level";
import {LevelDirector} from "../level/LevelDirector";

export class GameScene extends Scene{
    distance: Text = Text({...TEXT_PROPS, text: "0m", x: CANVAS_WIDTH - 30, y: 5, align: "right", font: FONT_SMALL})
    corona: Text = Text({...TEXT_PROPS, text: "COVID Risk: 0%", x: CANVAS_WIDTH /2, y: 5, font: FONT_SMALL})

    level!: Level
    levelDirector: LevelDirector
    difficulty: number = 2

    constructor(sceneManager: SceneManager) {
        super(sceneManager)
        this.levelDirector = new LevelDirector(new LevelBuilder())

        this.onShow = () => {
            this.initGame()
        }
    }

    initGame(){
        this.level = this.levelDirector.buildLevelByDifficulty(this.difficulty)
        this.addChild(this.level)
    }

    setScore(score: number){
        this.distance.text = `${score}m`
    }

    setCorona(percent: number){
        this.corona.text = `COVID Risk: ${percent}%`
    }
}
