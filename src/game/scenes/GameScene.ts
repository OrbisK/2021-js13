import {onKey, Text} from "kontra";
import {CANVAS_WIDTH, FONT_SMALL, TEXT_PROPS} from "../globals";
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
    corona: Text = Text({...TEXT_PROPS, text: "", x: CANVAS_WIDTH /2, y: 2, font: FONT_SMALL})
    street: Text = Text({...TEXT_PROPS, text: "", x: 16, y: 2, font: FONT_SMALL})

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
        this.street.render()
    }

    update(){
        this.level.update()
        let score = this.player.score + this.previousLevelsDistance
        this.distance.text = `${score.toFixed(1)}m`
        this.corona.text = `COVID Risk: ${this.player.corona.toFixed(0)}%`
        this.street.text = `Street ${this.difficulty}`

        this.player.globalX > this.level.pixelWidth() && this.startNextLevel()
        this.player.corona >= 100 && this.sceneManager.setScene('end').setScore(score)
    }

    startNextLevel(){
        this.difficulty += 1
        this.previousLevelsDistance += this.level.numTilesWidth
        this.level = this.levelDirector.buildLevelByDifficulty(this.difficulty)
        this.level.addPlayerAt(this.player, 5, this.player.globalY)
        this.player.score = 0
        zzfx(...[, , 624, .01, .17, .44, , 1.88, , .7, 143, .05, , , , , , .66, .02, .48]);
    }
}
