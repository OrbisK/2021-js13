// // // @ts-ignore
// // import {zzfx} from 'ZzFX';

import Player from "../entities/Player";
import {imageAssets, randInt, Sprite, TileEngine} from "kontra";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../globals";
import {CrossRoad, Level} from "./Level";

export default class LevelBuilder {
    level!: Level

    reset() {
        this.level = new Level()
    }

    setWorldSize(width: number, height: number) {
        this.level.numTilesWidth = width
        this.level.numTilesHeight = height
        return this
    }

    addPlayerAt(player: Player, x: number, y: number) {
        player.globalX = x
        player.globalY = y
        this.level.player = player
        return this
    }

    setBackgroundColorLayer(color: string) {
        this.level.backgroundColorLayer = Sprite(
            {x: 0, y: 0, height: CANVAS_HEIGHT, width: CANVAS_WIDTH, color: color}
        )
        return this
    }

    setTileEngine(crossRoadWidth: number) {
        this.level.tileEngine = TileEngine({
            tilewidth: this.level.tileWidth, tileheight: this.level.tileHeight,
            width: this.level.numTilesWidth, height: this.level.numTilesHeight,
            tilesets: [{firstgid: 1, image: imageAssets['tiles'],}],
            layers: [{data: this.initGroundTiles(crossRoadWidth)}]
        });
        this.level.tileEngine.sx = 0
        this.level.tileEngine.sy = 0
        return this
    }

    getResult() {
        return this.level
    }

    initDifficulty(difficulty: number){
        this.level.maxEntities = 50 + difficulty * 15
        this.level.npcSpeed = Math.min(0.5, difficulty * 0.1)
        this.level.tick = Math.max(10, 40 - difficulty * 3)
        this.level.walk = difficulty - 1
        return this
    }

    private initGroundTiles(crossRoadWidth: number) {
        let groundTiles: any = [];

        for (let i = 0; i < this.level.numTilesWidth / 50; i++) {
            let width = randInt(
                Math.min(15, 5 + crossRoadWidth),
                Math.min(25, 5 + crossRoadWidth * 2)
            );

            let startX = randInt(50 * i + 1, 50 * (i + 1) + 2 - width)
            this.level.crossRoads.push(new CrossRoad(startX, startX + width, this.level))
        }

        for (let y = 0; y < this.level.numTilesHeight; y++) {
            for (let x = 0; x < this.level.numTilesWidth; x++) {
                if ((y < 1 || y > this.level.numTilesHeight - 3) && this.noCrossroadAt(x)) {
                    groundTiles.push(2)
                } else {
                    groundTiles.push(1)
                }
            }
        }

        return groundTiles;
    }

    private noCrossroadAt(x: number) {
        return this.level.crossRoads.every((crossRoad: { startTileX: number; endTileX: number; }) => (x < crossRoad.startTileX || x > crossRoad.endTileX))
    }
}


//
// //
// //     syringe() {
// //         zzfx(...[.5, 0, 566, , .06, .26, 1, .15, , , , , , , , , .08, .73, .02, .18])
// //         let left = this.tE.sx + 50
// //         let xPos = randInt(left, Math.max(left, this.player.gX - 10))
// //         let yPos = randInt(20, CANVAS_HEIGHT - 20)
// //         let syringe = new Entity(xPos, yPos, 1)
// //         syringe.setImg(2)
// //         this.addChild(syringe, true)
// //     }
// //
// //
// //
// //     snpc(npcType: number = 1) { // standing npc
// //         let yPos = randInt(10, CANVAS_HEIGHT - 5);
// //         let right = this.tE.sx + CANVAS_WIDTH;
// //         let xPos = randInt(right + 10, right + 50)
// //
// //         if (this.noCrossroadAt(xPos / 9)) this.addChild(new NPC(xPos, yPos, npcType))
// //     }

// //
// //     t() { // ticker
// //         this.timer += 1;
// //
// //         if (this.timer % this.genTick == 0) {
// //             if (randInt(0, 4 + World.worldCount) > 0) {
// //                 this.wnpc(randInt(1, 2))
// //             } else {
// //                 this.snpc(randInt(1, 2))
// //             }
// //         }
// //
// //         if (this.timer % (this.genTick * 150) == 0) {
// //             this.syringe()
// //         }
