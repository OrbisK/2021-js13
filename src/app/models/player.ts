import Entity from "./entity";
import {keyPressed, SpriteSheet} from "kontra";

export default class Player extends Entity {
    xSpeed: number;
    ySpeed: number;

    constructor(globalX: number, globalY: number) {
        let assetId = 'player'
        super({assetId}, globalX, globalY);

        this.xSpeed = 0.8;
        this.ySpeed = 0.6;

        this.animations = SpriteSheet({
            image: this.asset,
            frameWidth: 7,
            frameHeight: 14,
            animations: {
                idle: {
                    frames: 1,
                    loop: false,
                },
                walk: {
                    frames: [0, 1, 2, 1],
                    frameRate: 6,
                }
            }
        }).animations;
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

        let move = vx != 0 || vy != 0;

        if (!move) {
            this.playAnimation("idle");
            this.animations["walk"].reset();
        } else {
            this.playAnimation("walk");

            vy = this.collides(this.globalX, this.y + vy) ? 0 : vy;
            vx = this.collides(this.globalY + vx, this.y) ? 0 : vx;

            if (this.globalX + vx < 10 || this.globalX + vx > this.scene.levelWidth - 10) {
                vx = 0;
            }
            if (this.globalY + vy < 14 || this.globalY + vy > this.scene.levelHeight - 4) {
                vy = 0;
            }

            this.globalX += vx;
            this.globalY += vy;
        }

        this.x = this.globalX - this.scene.tileEngine.sx;
        this.y = this.globalY - this.scene.tileEngine.sy;

    }

    collides(newX: number, newY: number) {
        if (newX <= 0) {
            return true;
        }
        if (newY <= 0) {
            return true;
        }
        return false;
    }
}