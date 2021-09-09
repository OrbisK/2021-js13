import Entity from "./entity";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../globals";

export default class NPC extends Entity {
    constructor(globalX: number, globalY: number, npcType: number = 0, xSpeed: number = 0.0, ySpeed: number = 0.0) {
        super(globalX, globalY);

        this.dx = xSpeed;
        this.dy = ySpeed;
        this.npcType = npcType;
        this.lifetime = 60 * 3;

        this.animations = this.getCharAnimation(npcType);
    }

    update() {
        this.lifetime -= 1;
        this.move();
        super.update();
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

        this.delete = (this.dx <= 0 && this.x < -7) || (this.y < -10 && this.dy < 0) || (this.y > CANVAS_HEIGHT + 5 && this.dy > 0) || (
            this.lifetime <= 0 && (this.x > CANVAS_WIDTH + 5 || this.x < 0));
    }
}