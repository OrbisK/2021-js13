import {keyPressed} from "kontra";
import World from "./world";
// @ts-ignore
import {zzfx} from 'ZzFX';
import NPC from "./npc";

export default class Player extends NPC {
    constructor() {
        super(50, 50, 0, 1.3, 0.7);
    }

    advance() {
        let vx: number = 0;
        let vy: number = 0;

        if (keyPressed('left')) {
            vx -= this.dx;
        }
        if (keyPressed('right')) {
            vx += this.dx;
        }
        if (keyPressed('up')) {
            vy -= this.dy;
        }
        if (keyPressed('down')) {
            vy += this.dy;
        }

        if (vx != 0 && this.dir != Math.sign(vx)) {
            this.dir *= -1;
            this.setScale(this.dir, 1);
        }

        let diagonalFactor: number = vy != 0 && vx != 0 ? 0.8 : 1.0;
        let move = vx != 0 || vy != 0;

        vx *= diagonalFactor;
        vy *= diagonalFactor;

        if (!move) {
            this.entitySprite.playAnimation("idle");
            this.entitySprite.animations["walk"].reset();
        } else {
            this.entitySprite.playAnimation("walk");

            if (this.globalX - this.world.tileEngine.sx + vx < 10) {
                vx = 0;
            }
            if (this.globalY + vy < 7 || this.globalY + vy > this.world.heightInPixels - 4) {
                vy = 0;
            }

            this.globalX += vx;
            this.globalY += vy;
        }

        if (this.globalX > this.world.widthInTiles * 9) {
            World.newWorld(this.world)
        }
    }
}