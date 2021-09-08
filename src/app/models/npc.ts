import Entity from "./entity";
import {CANVAS_WIDTH} from "../globals";

export default class NPC extends Entity {
    constructor(globalX: number, globalY: number, npcType: number = 0, xSpeed: number = 0.0, ySpeed: number = 0.0) {
        super(globalX, globalY);

        this.dx = xSpeed;
        this.dy = ySpeed;
        this.npcType = npcType;
        this.lifetime = 60 * 20;

        this.animations = this.getCharAnimation(npcType == 0 ? [6, 7, 8, 7] : [3, 4, 5, 4]);
    }

    update() {
        this.lifetime -= 1;
        super.update();
        this.move();
    }

    move() {
        if (this.dx == 0 && this.dy == 0) {
            this.playAnimation("idle");
        } else {
            this.playAnimation("walk");
        }

        this.globalX += this.dx;
        this.globalY += this.dy;

        this.x = this.globalX - this.scene.tileEngine.sx;
        this.y = this.globalY - this.scene.tileEngine.sy;

        this.delete = this.lifetime <= 0 && (this.x < 10 || this.x > CANVAS_WIDTH + 10);
    }
}