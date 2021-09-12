import Entity from "./entity";
import {imageAssets, keyPressed, randInt, seedRand, Sprite, Text, TileEngine} from "kontra";
import {CANVAS_HEIGHT, CANVAS_WIDTH, getCookie} from "../globals";
import NPC from "./npc";
// @ts-ignore
import {zzfx} from 'ZzFX';

let rand = seedRand('x');

class Crossroad {
    start: number
    end: number

    constructor(start: number, end: number) {
        this.start = start
        this.end = end
    }

    getWalkingNPC() {
        let ySpeed = (randInt(0, 1) * 2 - 1) * Math.max(0.3, rand())
        let xPos = randInt(this.start * 9 + 5, this.end * 9 - 5)
        let yPos = ySpeed > 0 ? randInt(-50, -10) : randInt(CANVAS_HEIGHT + 10, CANVAS_HEIGHT + 50)
        return new NPC(xPos, yPos, randInt(1, 2), 0, ySpeed)
    }

    visible(leftBorder: number, rightBorder: number) {
        return rightBorder > this.start * 9 && leftBorder < this.end * 9
    }
}


export default class World {

    static activeWorld: World;
    static worldCount: number = 1;
    static started: boolean = false;

    uCh: Array<Entity> = [];
    rCh: Array<Entity> = [];
    score: number = 0;

    tE: any;
    player: Entity;
    crossroads: Array<Crossroad> = [];
    heightInTiles: number;
    widthInTiles: number = 200;
    borderRight: number;
    genTick: number;
    maxChildCount: number = 1;
    timer: number = 0;
    bgSprite: Sprite;

    colors = [
        "rgb(0, 255, 0, 0.07)",
        "rgb(255, 0, 0, 0.07)",
        "rgb(0, 0, 255, 0.07)",
        "rgb(0, 255, 255, 0.07)",
        "rgb(255, 255, 0, 0.07)",
        "rgb(255, 0, 255, 0.07)",
    ]


    constructor(focusPoint: Entity) {
        this.player = focusPoint
        this.addChild(focusPoint)

        this.heightInTiles = CANVAS_HEIGHT / 9
        this.borderRight = CANVAS_WIDTH - 100
        this.genTick = ~~(30 / World.worldCount) + 1
        this.maxChildCount = 60 + World.worldCount * 20

        this.bgSprite = Sprite({
            x: 0,
            y: 0,
            height: CANVAS_HEIGHT,
            width: CANVAS_WIDTH,
            color: this.colors[World.worldCount % this.colors.length]
        })

        this.initTileEngine()
        this.focus()
    }

    static newWorld(oldWorld: World) {
        this.worldCount += 1;
        zzfx(...[, , 624, .01, .17, .44, , 1.88, , .7, 143, .05, , , , , , .66, .02, .48]);
        World.activeWorld = new World(oldWorld.player);
        oldWorld.player.gX = 50;
        oldWorld.player.gY = 50;
    }


    addChild(child: Entity, force: boolean = false) {
        if (force || this.uCh.length < this.maxChildCount) {
            // @ts-ignore
            child.world = this;
            this.uCh.push(child);
        }
    }

    initTileEngine() {
        this.tE = TileEngine({
            // tile size
            tilewidth: 9,
            tileheight: 9,

            // map size in tiles
            width: this.widthInTiles,
            height: this.heightInTiles,

            // tileset object
            tilesets: [{
                firstgid: 1,
                image: imageAssets['tiles'],
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

        for (let i = 0; i < this.widthInTiles / 100; i++) {
            let min = i + 1;
            let max = 100 * (i + 1) - 1;
            let width = randInt(5, 12);
            let start = randInt(min, max - width);
            this.crossroads.push(new Crossroad(start, start + width));
        }

        for (let y = 0; y < this.heightInTiles; y++) {
            for (let x = 0; x < this.widthInTiles; x++) {
                if ((y < 1 || y > this.heightInTiles - 3) && this.noCrossroadAt(x)) {
                    groundTiles.push(2);
                } else {
                    groundTiles.push(1);
                }
            }
        }

        return groundTiles;
    }

    addSyringe() {
        let left = this.tE.sx + 50
        let xPos = randInt(left, Math.max(left, this.player.gX - 10))
        let yPos = randInt(20, CANVAS_HEIGHT - 20)
        let syringe = new Entity(xPos, yPos, 1)
        syringe.setImg(2)
        this.addChild(syringe, true)
        zzfx(...[.5, 0, 566, , .06, .26, 1, .15, , , , , , , , , .08, .73, .02, .18])
    }

    addWalkingNPC(type: number = 1) {
        let dir = randInt(0, 1) * 2 - 1;

        let yPos = randInt(10, CANVAS_HEIGHT - 5);

        let right = this.tE.sx + CANVAS_WIDTH;
        let xPos = dir > 0 ? randInt(-50, this.tE.sx - 10) : randInt(right + 10, right + 50)

        this.addChild(new NPC(xPos, yPos, type, dir * Math.max(0.3, rand())))
    }

    addStandingNPC(npcType: number = 1) {
        let yPos = randInt(10, CANVAS_HEIGHT - 5);
        let right = this.tE.sx + CANVAS_WIDTH;
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

        let vsx_right = this.player.gX - Math.min(this.tE.sx + this.borderRight, this.widthInTiles * 9);
        if (vsx_right > 0 && this.player.gX < this.widthInTiles * 9 - 100) {
            this.tE._sx += vsx_right;
        }
    }

    updateAllChildren() {
        let newUpdateChildren: Entity[] = []
        let newRenderChildren: Entity[] = []

        this.uCh.forEach(c => !c.del ? (c.update(), newUpdateChildren.push(c)) : null)
        newUpdateChildren.sort((a: Entity, b: Entity) => a.y < b.y ? -1 : 1)
        newUpdateChildren.forEach(c => c.isInScreen() ? newRenderChildren.push(c) : null)

        this.uCh = newUpdateChildren
        this.rCh = newRenderChildren
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
            if (cr.visible(this.tE.sx, this.tE.sx + CANVAS_WIDTH + 200)) {
                if (this.timer % (~~(60 / World.worldCount) + 1) == 0) {
                    this.addChild(cr.getWalkingNPC())
                }
            }
        }
    }

    update() {
        if (!World.started) return
        this.ticker()
        this.updateAllChildren()
        this.focus()
        this.score = Math.max(~~(this.player.gX / 9) - 5, this.score)
    }

    render() {
        this.tE.render();
        this.bgSprite.render();
        this.rCh.forEach(c => c.sSp.render())
        this.rCh.forEach(c => c instanceof NPC && c.type > 0 ? c.cSp.render() : null)
        this.rCh.forEach(c => c.render())
    }
}

export class GUI {
    score: Text;
    start: Text;

    constructor() {
        this.score = Text({
            text: '0m',
            font: '5px Verdana',
            color: 'rgb(250, 250, 250, 0.7)',
            x: 265,
            y: 5,
            textAlign: 'right'
        })

        this.start = Text({
            text: "Press Enter to start the Game.\nHighscore: " + getCookie("highscore") + "m",
            font: '8px Verdana',
            color: 'rgb(250, 250, 250, 0.7)',
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2 - 5,
            textAlign: 'center',
            lineHeight: 1.5,
        })
    }

    update() {
        if (keyPressed('enter')) World.started = true
        this.score.text = ((World.worldCount - 1) * 195 + World.activeWorld.score) + "m"
    }

    render() {
        if (!World.started) this.start.render()
        this.score.render()
    }

}