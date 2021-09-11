import Entity from "./entity";

export default class NPC extends Entity {
    dir: number = 1;

    constructor(globalX: number, globalY: number, type: number = 0, xSpeed: number = 0.0, ySpeed: number = 0.0) {
        super(globalX, globalY);

        this.dx = xSpeed;
        this.dy = ySpeed;

        this.dir = Math.sign(this.dx);

        this.setScale(this.dir, 1);
        this.setAnimationFromCharsSheet(type);
    }

    advance() {

        this.dx == 0 && this.dy == 0 ? this.entitySprite.playAnimation("idle") : this.entitySprite.playAnimation("walk")

        this.globalX += this.dx
        this.globalY += this.dy
    }
}