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
            {height: CANVAS_HEIGHT, width: CANVAS_WIDTH, color: color}
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

        for (let i = 0; i < this.level.numTilesWidth / 15; i++) {
            let width = randInt(
                Math.min(5, 5 + crossRoadWidth),
                Math.min(15, 5 + crossRoadWidth * 2)
            );

            let startX = randInt(15 * i + 20, 15 * (i + 1) + 2 - width)
            this.level.crossRoads.push(new CrossRoad(startX, startX + width, this.level))
        }

        for (let y = 0; y < this.level.numTilesHeight; y++) {
            for (let x = 0; x < this.level.numTilesWidth; x++) {
                (y < 1 || y > this.level.numTilesHeight - 3) && this.noCrossroadAt(x) ? groundTiles.push(2) : groundTiles.push(1)
            }
        }

        return groundTiles;
    }

    private noCrossroadAt(x: number) {
        return this.level.crossRoads.every((crossRoad: { startTileX: number; endTileX: number; }) => (x < crossRoad.startTileX || x > crossRoad.endTileX))
    }
}