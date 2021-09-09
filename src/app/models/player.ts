import Entity from "./entity";
import {keyPressed} from "kontra";

export default class Player extends Entity {
    xSpeed: number = 2.0;
    ySpeed: number = 0.7;

    constructor() {
        super(50, 50);
        this.animations = this.getCharAnimation(0)
    }

    update() {
        super.update();
        this.move();
    }

    move() {
        let vx: number = 0;
        let vy: number = 0;

        if (keyPressed('left')) {
            vx -= this.xSpeed;
        }
        if (keyPressed('right')) {
            vx += this.xSpeed;
        }
        if (keyPressed('up')) {
            vy -= this.ySpeed;
        }
        if (keyPressed('down')) {
            vy += this.ySpeed;
        }

        let diagonalFactor: number = vy != 0 && vx != 0 ? 0.8 : 1.0;
        let move = vx != 0 || vy != 0;

        vx *= diagonalFactor;
        vy *= diagonalFactor;

        if (!move) {
            this.playAnimation("idle");
            this.animations["walk"].reset();
        } else {
            this.playAnimation("walk");
            if (this.globalX - this.scene.tileEngine.sx + vx < 10) {
                vx = 0;
            }
            if (this.globalY + vy < 14 || this.globalY + vy > this.scene.heightInPixels - 4) {
                vy = 0;
            }

            this.globalX += vx;
            this.globalY += vy;
        }

        this.x = this.globalX - this.scene.tileEngine.sx;
        this.y = this.globalY - this.scene.tileEngine.sy;
    }
}