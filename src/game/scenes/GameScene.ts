import {onKey, Text} from "kontra";
import {CANVAS_WIDTH} from "../globals";
import {FONT_SMALL, TEXT_PROPS} from "../utils";
import {SceneManager} from "./SceneManager";
import {Scene} from "./Scene";
import LevelBuilder from "../level/LevelBuilder";
import {Level} from "../level/Level";
import {LevelDirector} from "../level/LevelDirector";
import Player from "../entities/Player";
// @ts-ignore
import {zzfx} from "ZzFX";

export class GameScene extends Scene{
    distance: Text = Text({...TEXT_PROPS, text: "0m", x: CANVAS_WIDTH - 40, y: 2, align: "right", font: FONT_SMALL})
    corona: Text = Text({...TEXT_PROPS, text: "COVID Risk: 0%", x: CANVAS_WIDTH /2, y: 2, font: FONT_SMALL})

    level!: Level
    player!: Player
    levelDirector: LevelDirector
    difficulty: number = 1
    previousLevelsDistance: number = 0

    constructor(sceneManager: SceneManager) {
        super(sceneManager)
        this.levelDirector = new LevelDirector(new LevelBuilder())

        this.onShow = () => {
            onKey('enter', () => {})

            this.level = this.levelDirector.buildLevelByDifficulty(this.difficulty)
            this.player = new Player(-1, -1, this.level)
            this.level.addPlayerAt(this.player, 10, 20)
        }
    }

    render(){
        this.level.render()
        this.distance.render()
        this.corona.render()
    }

    update(){
        this.level.update()
        this.updateScore()
        this.updateCorona()
        this.updateLevel()

        if(this.player.corona >= 100){
            this.sceneManager.setScene('end').setScore(this.player.score + this.previousLevelsDistance)
        }
    }

    startNextLevel(){
        this.difficulty += 1
        this.previousLevelsDistance += this.level.numTilesWidth
        this.level = this.levelDirector.buildLevelByDifficulty(this.difficulty)
        this.level.addPlayerAt(this.player, 5, this.player.globalY)
        this.player.score = 0
        zzfx(...[, , 624, .01, .17, .44, , 1.88, , .7, 143, .05, , , , , , .66, .02, .48]);
    }

    updateScore(){
        let score = this.player.score + this.previousLevelsDistance
        this.distance.text = `${score.toFixed(1)}m`
    }

    updateCorona(){
        this.corona.text = `COVID Risk: ${this.player.corona.toFixed(0)}%`
    }

    updateLevel(){
        if (this.player.globalX > this.level.pixelWidth()) {
            this.startNextLevel()
        }
    }


}
