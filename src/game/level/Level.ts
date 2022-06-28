import {GameObjectClass, randInt, seedRand, Sprite, TileEngine} from "kontra";
import Player from "../entities/Player";
import NPC from "../entities/NPC";
import {CANVAS_HEIGHT} from "../globals";
import MaskedNPC from "../entities/MaskedNPC";

let rand = seedRand('x');

export class CrossRoad {
    startTileX: number
    endTileX: number
    level: Level

    constructor(startX: number, endX: number, level: Level) {
        this.startTileX = startX
        this.endTileX = endX
        this.level = level
    }

    generateNPC(){
        let ySpeed = (randInt(0, 1) * 2 - 1) * Math.max(0.3, rand())
        let x = randInt(this.startTileX * 9 + 5, this.endTileX * 9 - 5)
        let y = ySpeed > 0 ? randInt(-50, -10) : randInt(CANVAS_HEIGHT + 10, CANVAS_HEIGHT + 50)

        return new MaskedNPC(x, y, this.level, 0, ySpeed)
    }

    visible(leftBorder: number, rightBorder: number) {
        return rightBorder > this.startTileX * 9 && leftBorder < this.endTileX * 9
    }
}

export class Level extends GameObjectClass{
    numTilesWidth: number
    numTilesHeight: number
    tileWidth: number = 9
    tileHeight: number = 9

    backgroundColorLayer: Sprite = Sprite()
    tileEngine!: TileEngine
    crossRoads: Array<CrossRoad> = []
    player!: Player
    npcs!: Array<NPC>

    constructor() {
        super()
        this.numTilesWidth = 100
        this.numTilesHeight = 11
    }

    addPlayerAt(player: Player, globalX: number, globalY: number){
        this.player = player
        this.player.globalX = globalX
        this.player.globalY = globalY
    }

    pixelWidth(){
        return this.numTilesWidth * this.tileWidth
    }

    getOffsetX(){
        return this.tileEngine ? this.tileEngine.sx : 0
    }

    getOffsetY(){
        return this.tileEngine ? this.tileEngine.sy : 0
    }

    render(){
        this.tileEngine.render()
        this.backgroundColorLayer.render()
        this.player?.render()
    }

    update(){
        this.player.update()
    }
}