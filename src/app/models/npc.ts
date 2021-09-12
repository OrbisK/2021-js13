import Entity from "./entity";
import {randInt} from "kontra";

export default class NPC extends Entity {
    constructor(gX: number, gY: number, npcType: number = 0, dx: number = 0.0, dy: number = 0.0) {
        super(gX, gY, 10, npcType == 1 ? 14 : 20)

        this.dx = dx;
        this.dy = dy;
        this.dir = this.dx != 0 ? Math.sign(this.dx) : randInt(0, 1) * 2 - 1;
        this.setScale(this.dir, 1);
        this.setAnim(npcType);
    }

    advance() {
        this.dx == 0 && this.dy == 0 ? this.play("idle") : this.play("walk")
        this.gX += this.dx
        this.gY += this.dy
    }
}