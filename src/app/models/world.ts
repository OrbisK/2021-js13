import Entity from "./entity";
import {randInt, seedRand, TileEngine} from "kontra";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../globals";
import NPC from "./npc";

export default class World {
    children: Array<Entity> = [];
    tileEngine: any;
    focusPoint: Entity;

    heightInTiles: number;
    widthInTiles: number = 5000;
    heightInPixels: number;
    borderRight: number;
    genTick: number = 10;
    timer: number = 0;

    TILE_SIZE: number = 9;
    BORDER_SIZE: number = 100;

    rand = seedRand('kontra');

    constructor(focusPoint: Entity, tileAsset: any) {
        this.focusPoint = focusPoint;

        this.heightInTiles = Math.ceil(CANVAS_HEIGHT / this.TILE_SIZE)
        this.heightInPixels = this.heightInTiles * this.TILE_SIZE;
        this.borderRight = CANVAS_WIDTH - this.BORDER_SIZE;

        this.initTileEngine(tileAsset);
        this.focus();
    }

    addChild(child: Entity) {
        child.setWorld(this);
        this.children.push(child);
    }

    initTileEngine(tileAsset: any) {
        this.tileEngine = TileEngine({
            // tile size
            tilewidth: 9,
            tileheight: 9,

            // map size in tiles
            width: this.widthInTiles,
            height: this.heightInTiles,

            // tileset object
            tilesets: [{
                firstgid: 1,
                image: tileAsset,
            }],

            // layer object
            layers: [{
                name: 'ground',
                data: this.getGroundTiles(),
            }]
        });
    }

    getGroundTiles() {
        let groundTiles = [];

        for (let y = 0; y < this.heightInTiles; y++) {
            for (let x = 0; x < this.widthInTiles; x++) {
                if (y < 2 || y > this.heightInTiles - 3) {
                    groundTiles.push(2);
                } else {
                    groundTiles.push(1);
                }
            }
        }

        return groundTiles;
    }

    addWalkingNPC(npcType: number = 0) {
        let dir = randInt(0, 1) * 2 - 1;

        let yPos = randInt(10, this.heightInPixels - 5);

        let right = this.tileEngine.sx + CANVAS_WIDTH;
        let xPos = dir > 0 ? randInt(-50, this.tileEngine.sx - 10) : randInt(right + 10, right + 50)

        this.addChild(new NPC(xPos, yPos, npcType, dir * Math.max(0.3, this.rand())))
    }


    focus() {
        /* Focus is based on the Game borders
        *
        |-------------------------------------|
        |     |                         |     |
        |     |                         |     |
        |     |     p                   |     |
        |     |                         |     |
        |-------------------------------------|
        | rb  ^                         ^ lb  |
        *   
        * rb = right border, lb = left border, p = player
        * The camera follows the player in the inner range.
        * If the player collides with an inner border, the camera moves.
        * Once the end of the level is reacherd, the player can also enter the border areas
        */

        let vsx_right = this.focusPoint.globalX - this.globalBorderRight();

        if (vsx_right > 0 && this.focusPoint.globalX < 20000 - this.BORDER_SIZE) {
            this.tileEngine._sx += vsx_right;
        }
    }

    globalBorderRight() {
        return Math.min(this.tileEngine.sx + this.borderRight, 20000);
    }

    clearChildren() {
        let children: Entity[] = [];

        for (let child of this.children) {
            if (!child.delete) {
                children.push(child);
            }
        }

        this.children = children;
    }

    update() {
        this.timer += 1;

        if (this.timer % this.genTick == 0) {
            this.addWalkingNPC(randInt(0, 1));
        }

        // Sprites must be sorted to make sure, which Entity is in the background and which in the foreground
        this.clearChildren();
        this.children.sort((a: Entity, b: Entity) => a.y < b.y ? -1 : 1);

        for (const child of this.children) {
            child.update();
        }

        // Refocus player if moved
        this.focus()
    }

    render() {
        this.tileEngine.render();
        for (const child of this.children) {
            child.render();
        }
    }
}