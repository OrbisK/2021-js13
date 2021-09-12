import {keyPressed} from "kontra";
import World from "./world";
import NPC from "./npc";

// @ts-ignore
import {zzfx} from 'ZzFX';
import {CANVAS_HEIGHT} from "../globals";

export default class Player extends NPC {
    constructor() {
        super(50, 50, 0, 1.0, 0.7);
        this.type = -1;
        this.life = 1000;
    }

    advance() {
        let vx: number = 0
        let vy: number = 0

        if (keyPressed('left')) vx -= this.dx
        if (keyPressed('right')) vx += this.dx
        if (keyPressed('up')) vy -= this.dy
        if (keyPressed('down')) vy += this.dy

        if (vx != 0 && this.dir != Math.sign(vx)) {
            this.dir *= -1
            this.setScale(this.dir, 1)
        }

        let diagonalFactor: number = vy != 0 && vx != 0 ? 0.8 : 1.0
        let move = vx != 0 || vy != 0

        vx *= diagonalFactor
        vy *= diagonalFactor

        if (!move) {
            this.play("idle")
            this.eSp.animations["walk"].reset()
        } else {
            this.play("walk")

            if (this.gX - this.world.tE.sx + vx < 4) vx = 0
            if (this.gY + vy < 7 || this.gY + vy > CANVAS_HEIGHT - 4) vy = 0

            this.gX += vx;
            this.gY += vy;
        }

        for (let child of this.world.uCh) {
            if (this.coll(child)) {
                if (child.type == 1) {
                    zzfx(...[, 0, 344, .07, .28, .19, , 1.04, .6, , 54, .05, .15, .1, , , , .83, .07]);
                    child.del = true;
                    this.life = Math.min(1000, this.life + 200);
                } else {
                    this.life--;
                }
            }
        }

        if (this.gX > this.world.wiT * 9) {
            World.newWorld(this.world)
        }
    }
}