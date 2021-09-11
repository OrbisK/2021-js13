import Entity from "./entity";
import {randInt} from "kontra";

export default class NPC extends Entity {
    constructor(globalX: number, globalY: number, npcType: number = 0, dx: number = 0.0, dy: number = 0.0) {
        super(globalX, globalY, 10, npcType == 1 ? 9 : 14)

        this.dx = dx;
        this.dy = dy;
        this.dir = this.dx != 0 ? Math.sign(this.dx) : randInt(0, 1) * 2 - 1;
        this.setScale(this.dir, 1);
        this.setAnimationFromCharsSheet(npcType);
    }

    advance() {
        this.dx == 0 && this.dy == 0 ? this.entitySprite.playAnimation("idle") : this.entitySprite.playAnimation("walk")
        this.globalX += this.dx
        this.globalY += this.dy
    }
}