import Entity from "./entity";
import {getContext, keyPressed, SpriteSheet} from "kontra";

export default class Player extends Entity {
    xSpeed: number;
    ySpeed: number;

    constructor(xSpeed = 0.8, ySpeed = 0.6, assetId = 'player') {
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

        this.x = 40;
        this.y = 40;
    }

    render() {
        super.render();
        let imageData = getContext().getImageData(0, 0, this.width, this.height);
        for (var i = 0; i < imageData.data.length; i += 4) {
            // is this pixel the old rgb?
            if (imageData.data[i] == 41 &&
                imageData.data[i + 1] == 41 &&
                imageData.data[i + 2] == 41
            ) {
                // change to your new rgb
                imageData.data[i] = 50;
                imageData.data[i + 1] = 100;
                imageData.data[i + 2] = 200;
            }
        }
        getContext().putImageData(imageData, this.x, this.y);
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

            if (this.x > this.scene.borderRight && vx > 0) {
                this.scene.moveSx(vx);
            } else if (this.x < this.scene.borderLeft && vx < 0) {
                this.scene.moveSx(vx);
            } else {
                this.x += vx;
            }

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