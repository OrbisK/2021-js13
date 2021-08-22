import Entity from "./entity";
import {keyPressed, SpriteSheet} from "kontra";

export default class Player extends Entity {
    xSpeed: number;
    ySpeed: number;

    constructor(xSpeed = 0.6, ySpeed = 0.4, assetId = 'player') {
        super({assetId});
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
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
            this.direction = "left";
        }
        if (keyPressed('right')) {
            vx += this.xSpeed;
            this.direction = "right";
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

            vy = this.collides(this.x, this.y + vy) ? 0 : vy;
            vx = this.collides(this.x + vx, this.y) ? 0 : vx;

            this.x += vx;
            this.y += vy;
        }
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