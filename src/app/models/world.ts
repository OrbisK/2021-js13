import Entity from "./entity";
import {imageAssets, keyPressed, randInt, seedRand, Sprite, Text, TileEngine} from "kontra";
import {CANVAS_HEIGHT, CANVAS_WIDTH, getCookie} from "../globals";
import NPC from "./npc";
// @ts-ignore
import {zzfx} from 'ZzFX';

let rand = seedRand('x');

class Crossroad {
    s: number // start
    e: number // end

    constructor(start: number, end: number) {
        this.s = start
        this.e = end
    }

    getWalkingNPC() {
        let ySpeed = (randInt(0, 1) * 2 - 1) * Math.max(0.3, rand())
        let xPos = randInt(this.s * 9 + 5, this.e * 9 - 5)
        let yPos = ySpeed > 0 ? randInt(-50, -10) : randInt(CANVAS_HEIGHT + 10, CANVAS_HEIGHT + 50)
        return new NPC(xPos, yPos, randInt(1, 2), 0, ySpeed)
    }

    visible(leftBorder: number, rightBorder: number) {
        return rightBorder > this.s * 9 && leftBorder < this.e * 9
    }
}


export default class World {
    static a: World;
    static worldCount: number = 1;
    static started: boolean = false;

    uCh: Array<Entity> = [];
    rCh: Array<Entity> = [];
    score: number = 0;

    tE: any;
    player: Entity;
    crs: Array<Crossroad> = [];
    hiT: number;
    wiT: number = 200;
    genTick: number;
    maxChild: number = 1;
    timer: number = 0;
    bg: Sprite; // background

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

        this.hiT = CANVAS_HEIGHT / 9
        this.genTick = ~~(25 / World.worldCount) + 1
        this.maxChild = Math.min(100, 40 + World.worldCount * 10)

        this.bg = Sprite({
            x: 0,
            y: 0,
            height: CANVAS_HEIGHT,
            width: CANVAS_WIDTH,
            color: this.colors[World.worldCount % this.colors.length]
        })

        this.ite()
        this.f()

        World.a = this
    }

    static newWorld(oldWorld: World) {
        this.worldCount += 1;
        zzfx(...[, , 624, .01, .17, .44, , 1.88, , .7, 143, .05, , , , , , .66, .02, .48]);
        new World(oldWorld.player);
        oldWorld.player.gX = 50;
        oldWorld.player.gY = 50;
    }


    addChild(child: Entity, force: boolean = false) {
        if (force || this.uCh.length < this.maxChild) {
            // @ts-ignore
            child.world = this;
            this.uCh.push(child);
        }
    }

    ite() { // init tile engine
        this.tE = TileEngine({
            // tile size
            tilewidth: 9,
            tileheight: 9,

            // map size in tiles
            width: this.wiT,
            height: this.hiT,

            // tileset object
            tilesets: [{
                firstgid: 1,
                image: imageAssets['tiles'],
            }],

            // layer object
            layers: [{
                data: this.getGroundTiles(),
            }]
        });
    }

    noCrossroadAt(x: number) {
        for (let cr of this.crs) {
            if (x >= cr.s && x <= cr.e) {
                return false;
            }
        }
        return true;
    }

    getGroundTiles() {
        let groundTiles = [];

        for (let i = 0; i < this.wiT / 100; i++) {
            let width = randInt(5, 12);
            let start = randInt(i + 1, 100 * (i + 1) - 1 - width);
            this.crs.push(new Crossroad(start, start + width));
        }

        for (let y = 0; y < this.hiT; y++) {
            for (let x = 0; x < this.wiT; x++) {
                if ((y < 1 || y > this.hiT - 3) && this.noCrossroadAt(x)) {
                    groundTiles.push(2);
                } else {
                    groundTiles.push(1);
                }
            }
        }

        return groundTiles;
    }

    syringe() {
        zzfx(...[.5, 0, 566, , .06, .26, 1, .15, , , , , , , , , .08, .73, .02, .18])
        let left = this.tE.sx + 50
        let xPos = randInt(left, Math.max(left, this.player.gX - 10))
        let yPos = randInt(20, CANVAS_HEIGHT - 20)
        let syringe = new Entity(xPos, yPos, 1)
        syringe.setImg(2)
        this.addChild(syringe, true)
    }

    wnpc(type: number = 1) { // walgind npc
        let dir = randInt(0, 1) * 2 - 1;

        let right = this.tE.sx + CANVAS_WIDTH;

        this.addChild(new NPC(
            dir > 0 ? randInt(-50, this.tE.sx - 10) : randInt(right + 10, right + 50),
            randInt(10, CANVAS_HEIGHT - 5),
            type,
            dir * Math.max(0.3, rand()))
        )
    }

    snpc(npcType: number = 1) { // standing npc
        let yPos = randInt(10, CANVAS_HEIGHT - 5);
        let right = this.tE.sx + CANVAS_WIDTH;
        let xPos = randInt(right + 10, right + 50)

        this.addChild(new NPC(xPos, yPos, npcType))
    }


    f() { // focus
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

        let vsx_right = this.player.gX - Math.min(this.tE.sx + 170, this.wiT * 9);
        if (vsx_right > 0 && this.player.gX < this.wiT * 9 - 100) {
            this.tE._sx += vsx_right;
        }
    }

    uaCh() { // update all children
        let newUpdateChildren: Entity[] = []
        let newRenderChildren: Entity[] = []

        this.uCh.forEach(c => !c.del ? (c.update(), newUpdateChildren.push(c)) : null)
        newUpdateChildren.sort((a: Entity, b: Entity) => a.y < b.y ? -1 : 1)
        newUpdateChildren.forEach(c => c.isInScreen() ? newRenderChildren.push(c) : null)

        this.uCh = newUpdateChildren
        this.rCh = newRenderChildren
    }

    t() { // ticker
        this.timer += 1;

        if (this.timer % this.genTick == 0) {
            if (randInt(0, 4 + World.worldCount) > 0) {
                this.wnpc(randInt(1, 2))
            } else {
                this.snpc(randInt(1, 2))
            }
        }

        if (this.timer % (this.genTick * 150) == 0) {
            this.syringe()
        }

        for (let cr of this.crs) {
            if (cr.visible(this.tE.sx, this.tE.sx + CANVAS_WIDTH + 200)) {
                if (this.timer % Math.max(~~(60 / World.worldCount) + 1, 20) == 0) {
                    this.addChild(cr.getWalkingNPC())
                }
            }
        }
    }

    update() {
        if (!World.started) return
        this.t()
        this.uaCh()
        this.f()
        this.score = Math.max(~~(this.player.gX / 9) - 5, this.score)
    }

    render() {
        this.tE.render();
        this.bg.render();
        this.rCh.forEach(c => (c.sSp.render(), c instanceof NPC && c.type > 0 ? c.cSp.render() : null))
        this.rCh.forEach(c => c.render())
    }
}


export class GUI {
    score: Text
    start: Text
    title: Text
    coronaProb: Text
    color: string = 'rgb(250, 250, 250, 0.7)'

    constructor() {
        this.title = Text({
            text: 'Stay Safe!',
            font: '15px Verdana',
            color: this.color,
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2 - 35,
            textAlign: 'center'
        })

        this.score = Text({
            text: '0m',
            font: '5px Verdana',
            color: this.color,
            x: 265,
            y: 2,
            textAlign: 'right'
        })

        this.coronaProb = Text({
            text: '0m',
            font: '5px Verdana',
            color: this.color,
            x: CANVAS_WIDTH / 2,
            y: 2,
            textAlign: 'center'
        })

        this.start = Text({
            text: "Press Enter to start the Game.\nHighscore: " + getCookie("highscore") + "m",
            font: '8px Verdana',
            color: this.color,
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2 - 5,
            textAlign: 'center',
            lineHeight: 1.5,
        })


    }

    update() {
        // @ts-ignore
        if (keyPressed('enter') && World.a.player.life > 0) World.started = true
        this.score.text = ((World.worldCount - 1) * 195 + World.a.score) + "m"
        this.coronaProb.text = "Corona: " + ~~(100 - World.a.player.life / 10) + "%"
    }

    render() {
        // @ts-ignore
        if (!World.started && World.a.player.life > 0) {
            this.title.render()
            this.start.render()
        }
        this.score.render()
        this.coronaProb.render()
    }

}