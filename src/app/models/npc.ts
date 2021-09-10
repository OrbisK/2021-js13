import Entity from "./entity";

export default class NPC extends Entity {
    constructor(globalX: number, globalY: number, npcType: number = 0, xSpeed: number = 0.0, ySpeed: number = 0.0) {
        super(globalX, globalY);

        this.dx = xSpeed;
        this.dy = ySpeed;
        this.npcType = npcType;
        this.lifetime = 60 * 3;

        this.setCharAnimation(npcType);
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

        this.delete = this.lifetime < 0 && !this.isInScreen();
    }
}