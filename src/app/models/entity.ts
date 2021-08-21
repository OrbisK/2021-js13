import {keyPressed, Sprite, SpriteSheet} from "kontra";

const _getAsset = (name: string): any => {
    return document.querySelector(`#${name}`)
}

type EntityType = {
    assetId: string,
    xSpeed?: number,
    ySpeed?: number,
}

export default class Entity extends Sprite.class {
    xSpeed: number;
    ySpeed: number;
    isForward: boolean;
    isMoving: boolean;

    constructor({assetId, xSpeed = 0.6, ySpeed = 0.4}: EntityType) {
        const playerSheet = SpriteSheet({
            image: _getAsset(assetId),
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
        });
        const sprite = {
            x: 10,
            y: 10,
            anchor: {x: 0.5, y: 0.5},
            animations: playerSheet.animations
        }
        super(sprite)
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.isForward = true;
        this.isMoving = false;

    }

    move() {
        this.isMoving = false;
        if (keyPressed('left')) {
            if (this.isForward) this.isForward = false;
            this.x += (this.isForward ? 1 : -1) * this.xSpeed;
            this.isMoving = true;
        } else if (keyPressed('right')) {
            if (!this.isForward) this.isForward = true;

            this.x += (this.isForward ? 1 : -1) * this.xSpeed;
            this.isMoving = true;
        }

        if (keyPressed('up')) {
            this.y -= this.ySpeed;
            this.isMoving = true;
        } else if (keyPressed('down')) {
            this.y += this.ySpeed;
            this.isMoving = true;
        }

        if (!this.isMoving) {
            this.playAnimation("idle");
            this.animations["walk"].reset();
        } else {
            this.playAnimation("walk");
        }
    }


}