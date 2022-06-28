// // import {imageAssets, keyPressed, randInt, seedRand, Sprite, Text, TileEngine} from "kontra";
// // import {CANVAS_HEIGHT, CANVAS_WIDTH, getSavedScore} from "../globals";
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


// //     static worldCount: number = 1;
// //     static started: boolean = false;
// //
// //     uCh: Array<Entity> = [];
// //     rCh: Array<Entity> = [];
// //     score: number = 0;
// //
// //     tE: any;
// //     player: Entity;
// //     crs: Array<Crossroad> = [];
// //     hiT: number;
// //     wiT: number = 150;
// //     genTick: number;
// //     maxChild: number = 1;
// //     timer: number = 0;
// //     bg: Sprite; // background
// //
//     colors = [
//         "rgb(0, 255, 0, 0.07)",
//         "rgb(255, 0, 0, 0.07)",
//         "rgb(0, 0, 255, 0.07)",
//         "rgb(0, 255, 255, 0.07)",
//         "rgb(255, 255, 0, 0.07)",
//         "rgb(255, 0, 255, 0.07)",
//     ]
//
//
// //     constructor(focusPoint: Entity) {
// //         this.player = focusPoint
// //         this.addChild(focusPoint)
// //
// //         this.hiT = CANVAS_HEIGHT / 9
// //         this.genTick = ~~(25 / (World.worldCount / 2)) + 1
// //         this.maxChild = Math.min(100, 40 + World.worldCount * 7)
// //
// //
// //         this.ite()
// //         this.f()
// //
// //         World.a = this
// //     }
// //
// //     static score() {
// //         return (World.worldCount - 1) * 195 + World.a.score
// //     }
// //
// //     static newWorld(oldWorld: World) {
// //         this.worldCount += 1;
// //         zzfx(...[, , 624, .01, .17, .44, , 1.88, , .7, 143, .05, , , , , , .66, .02, .48]);
// //         new World(oldWorld.player);
// //         oldWorld.player.gX = 50;
// //         oldWorld.player.gY = 50;
// //     }
// //
// //
// //     addChild(child: Entity, force: boolean = false) {
// //         if (force || this.uCh.length < this.maxChild) {
// //             // @ts-ignore
// //             child.world = this;
// //             this.uCh.push(child);
// //         }
// //     }
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
// //     wnpc(type: number = 1) { // walgind npc
// //         let dir = randInt(0, 1) * 2 - 1;
// //
// //         let right = this.tE.sx + CANVAS_WIDTH;
// //
// //         this.addChild(new NPC(
// //             dir > 0 ? randInt(-50, this.tE.sx - 10) : randInt(right + 10, right + 50),
// //             randInt(10, CANVAS_HEIGHT - 5),
// //             type,
// //             dir * Math.max(0.3, rand()))
// //         )
// //     }
// //
// //     snpc(npcType: number = 1) { // standing npc
// //         let yPos = randInt(10, CANVAS_HEIGHT - 5);
// //         let right = this.tE.sx + CANVAS_WIDTH;
// //         let xPos = randInt(right + 10, right + 50)
// //
// //         if (this.noCrossroadAt(xPos / 9)) this.addChild(new NPC(xPos, yPos, npcType))
// //     }

// //     uaCh() { // update all children
// //         let newUpdateChildren: Entity[] = []
// //         let newRenderChildren: Entity[] = []
// //
// //         this.uCh.forEach(c => !c.del ? (c.update(), newUpdateChildren.push(c)) : null)
// //         newUpdateChildren.sort((a: Entity, b: Entity) => a.y < b.y ? -1 : 1)
// //         newUpdateChildren.forEach(c => c.isInScreen() ? newRenderChildren.push(c) : null)
// //
// //         this.uCh = newUpdateChildren
// //         this.rCh = newRenderChildren
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
// //
// //         for (let cr of this.crs) {
// //             if (cr.visible(this.tE.sx, this.tE.sx + CANVAS_WIDTH + 200)) {
// //                 if (this.timer % Math.max(~~(60 / World.worldCount) + 1, 20) == 0) {
// //                     this.addChild(cr.getWalkingNPC())
// //                 }
// //             }
// //         }
// //     }
// //
// //     update() {
// //         if (!World.started) return
// //         this.t()
// //         this.uaCh()
// //         this.f()
// //         this.score = Math.max(~~(this.player.gX / 9) - 5, this.score)
// //     }
// //
// //     render() {
// //         this.tE.render();
// //         this.bg.render();
// //         this.rCh.forEach(c => (c instanceof NPC && c.type > 0 ? c.cSp.render() : null, c.sSp.render()))
// //         this.rCh.forEach(c => c.render())
// //     }
// }
