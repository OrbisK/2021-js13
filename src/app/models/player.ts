import Entity from "./entity";
import {keyPressed} from "kontra";

export default class Player extends Entity {
    xSpeed: number;
    ySpeed: number;

    constructor(xSpeed=0.6, ySpeed=0.4) {
        const assetId= 'player'
        super({assetId});
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    update(){
        super.update();
        this.move();
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