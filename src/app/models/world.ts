import Entity from "./entity";
import {randInt, seedRand, Sprite, TileEngine} from "kontra";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../globals";
import NPC from "./npc";

let rand = seedRand('kontra');

class Crossroad {
    start: number;
    end: number;
    genTick: number = 50;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    getWalkingNPC() {
        let dir = randInt(0, 1) * 2 - 1;
        let xPos = randInt(this.start * 9 + 5, this.end * 9 - 5);
        let yPos = dir > 0 ? randInt(-50, -10) : randInt(CANVAS_HEIGHT + 10, CANVAS_HEIGHT + 50);
        return new NPC(xPos, yPos, randInt(1, 2), 0, dir * Math.max(0.3, rand()))
    }

    visible(leftBorder: number, rightBorder: number) {
        return rightBorder > this.start * 9 && leftBorder < this.end * 9;
    }
}

export default class World {

    static activeWorld: World;
    static worldCount: number = 0;

    updateChildren: Array<Entity> = [];
    renderChildren: Array<Entity> = [];

    tileEngine: any;
    focusPoint: Entity;
    crossroads: Array<Crossroad> = [];
    heightInTiles: number;
    widthInTiles: number = 200;
    heightInPixels: number;
    borderRight: number;
    genTick: number = 10;
    maxChildCount: number = 50;
    timer: number = 0;
    bgSprite: Sprite;

    TILE_SIZE: number = 9;
    BORDER_SIZE: number = 100;

    colors = [
        "rgb(255, 0, 0, 0.07)",
        "rgb(0, 255, 0, 0.07)",
        "rgb(0, 0, 255, 0.07)",
        "rgb(0, 255, 255, 0.07)",
        "rgb(255, 255, 0, 0.07)",
        "rgb(255, 0, 255, 0.07)",
    ]


    constructor(focusPoint: Entity) {
        this.focusPoint = focusPoint;
        this.addChild(focusPoint);

        this.heightInTiles = Math.ceil(CANVAS_HEIGHT / this.TILE_SIZE)
        this.heightInPixels = this.heightInTiles * this.TILE_SIZE;
        this.borderRight = CANVAS_WIDTH - this.BORDER_SIZE;

        this.bgSprite = Sprite({
            x: 0,
            y: 0,
            height: CANVAS_HEIGHT,
            width: CANVAS_WIDTH,
            color: this.colors[World.worldCount % this.colors.length]
        })

        this.initTileEngine();
        this.focus();
    }

    static newWorld(oldWorld: World) {
        this.worldCount += 1;

        let newWorld = new World(oldWorld.focusPoint);
        newWorld.focusPoint.globalX = 50;
        newWorld.focusPoint.globalY = 50;

        World.activeWorld = newWorld;
    }


    addChild(child: Entity) {
        if (this.updateChildren.length < this.maxChildCount) {
            child.setWorld(this);
            this.updateChildren.push(child);
        }
    }

    initTileEngine() {
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
                image: Entity.tileSheet,
            }],

            // layer object
            layers: [{
                name: 'ground',
                data: this.getGroundTiles(),
            }]
        });
    }

    noCrossroadAt(x: number) {
        for (let cr of this.crossroads) {
            if (x >= cr.start && x <= cr.end) {
                return false;
            }
        }
        return true;
    }

    getGroundTiles() {
        let groundTiles = [];

        for (let i = 0; i < Math.floor(this.widthInTiles / 100); i++) {
            let min = i + 1;
            let max = 100 * (i + 1) - 1;
            let width = randInt(5, 12);
            let start = randInt(min, max - width);
            this.crossroads.push(new Crossroad(start, start + width));
        }

        for (let y = 0; y < this.heightInTiles; y++) {
            for (let x = 0; x < this.widthInTiles; x++) {
                if ((y < 2 || y > this.heightInTiles - 3) && this.noCrossroadAt(x)) {
                    groundTiles.push(2);
                } else {
                    groundTiles.push(1);
                }
            }
        }

        return groundTiles;
    }

    addSyringe() {
        let xPos = randInt(9 * 8, Math.max(9 * 8, this.focusPoint.globalX - 10))
        let yPos = randInt(10, this.heightInPixels - 5)
        let syringe = new Entity(xPos, yPos, 1);
        syringe.setSprite(2);
        this.addChild(syringe)
    }

    addWalkingNPC(npcType: number = 1) {
        let dir = randInt(0, 1) * 2 - 1;

        let yPos = randInt(10, this.heightInPixels - 5);

        let right = this.tileEngine.sx + CANVAS_WIDTH;
        let xPos = dir > 0 ? randInt(-50, this.tileEngine.sx - 10) : randInt(right + 10, right + 50)

        this.addChild(new NPC(xPos, yPos, npcType, dir * Math.max(0.3, rand())))
    }

    addStandingNPC(npcType: number = 1) {
        let yPos = randInt(0, 1) == 0 ? randInt(10, this.heightInPixels / 3) : randInt(this.heightInPixels / 3 * 2, this.heightInPixels - 5);
        let right = this.tileEngine.sx + CANVAS_WIDTH;
        let xPos = randInt(right + 10, right + 50)

        this.addChild(new NPC(xPos, yPos, npcType))
    }


    focus() {
        /* Focus is based on the Game borders
        *
        |------------------------------------|
        |                              |     |
        |                              |     |
        |          p                   |     |
        |                              |     |
        |------------------------------------|
        |                              ^ lb  |
        *   
        * lb = left border, p = player
        * The camera follows the player in the inner range.
        * If the player collides with an inner border, the camera moves.
        * Once the end of the level is reached, the player can also enter the border areas
        */

        let vsx_right = this.focusPoint.globalX - Math.min(this.tileEngine.sx + this.borderRight, this.widthInTiles * 9);
        if (vsx_right > 0 && this.focusPoint.globalX < this.widthInTiles * 9 - this.BORDER_SIZE) {
            this.tileEngine._sx += vsx_right;
        }
    }

    updateAllChildren() {
        let newUpdateChildren: Entity[] = []
        let newRenderChildren: Entity[] = []

        this.updateChildren.forEach(c => !c.delete ? (c.update(), newUpdateChildren.push(c)) : null)
        newUpdateChildren.sort((a: Entity, b: Entity) => a.y < b.y ? -1 : 1)
        newUpdateChildren.forEach(c => c.isInScreen() ? newRenderChildren.push(c) : null)

        this.updateChildren = newUpdateChildren
        this.renderChildren = newRenderChildren
    }

    ticker() {
        this.timer += 1;

        if (this.timer % this.genTick == 0) {
            if (randInt(0, 4) < 4) {
                this.addWalkingNPC(randInt(1, 2))
            } else {
                this.addStandingNPC(randInt(1, 2))
            }
        }

        if (this.timer % (this.genTick * 100) == 0) {
            this.addSyringe()
        }

        for (let cr of this.crossroads) {
            if (cr.visible(this.tileEngine.sx, this.tileEngine.sx + CANVAS_WIDTH + 200)) {
                if (this.timer % cr.genTick == 0) {
                    this.addChild(cr.getWalkingNPC())
                }
            }
        }
    }

    update() {
        this.ticker()
        this.updateAllChildren();
        this.focus()
    }

    render() {
        this.tileEngine.render();
        this.bgSprite.render();
        this.renderChildren.forEach(c => c.render())
    }
}