import {Text} from "kontra";
import {CANVAS_WIDTH} from "../globals";
import {FONT_SMALL, TEXT_PROPS} from "../utils";
import {SceneManager} from "./SceneManager";
import {Scene} from "./Scene";
import LevelBuilder from "../level/LevelBuilder";
import {Level} from "../level/Level";
import {LevelDirector} from "../level/LevelDirector";
import Player from "../entities/Player";

export class GameScene extends Scene{
    distance: Text = Text({...TEXT_PROPS, text: "0m", x: CANVAS_WIDTH - 30, y: 5, align: "right", font: FONT_SMALL})
    corona: Text = Text({...TEXT_PROPS, text: "COVID Risk: 0%", x: CANVAS_WIDTH /2, y: 5, font: FONT_SMALL})

    level!: Level
    player!: Player
    levelDirector: LevelDirector
    difficulty: number = 1
    previousLevelsDistance: number = 0

    constructor(sceneManager: SceneManager) {
        super(sceneManager)
        this.levelDirector = new LevelDirector(new LevelBuilder())


        this.onShow = () => {
            this.level = this.levelDirector.buildLevelByDifficulty(this.difficulty)
            this.player = new Player(-1, -1, this.level)
            this.level.addPlayerAt(this.player, 20, 20)

            this.addChild(this.level, this.distance, this.corona)
        }
    }

    update(){
        super.update()
        this.updateScore()
    }

    startNextLevel(){
        this.difficulty += 1
        this.previousLevelsDistance += this.level.tileWidth
        this.level = this.levelDirector.buildLevelByDifficulty(this.difficulty)
        this.level.addPlayerAt(this.player, 20, 20)
    }
    updateScore(){
        let score = this.player.score + this.previousLevelsDistance
        this.distance.text = `${score.toFixed(1)}m`
    }

    setCorona(percent: number){
        this.corona.text = `COVID Risk: ${percent}%`
    }
}
