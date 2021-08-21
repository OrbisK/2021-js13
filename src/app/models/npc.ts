import Entity from "./entity";

export default class NPC extends Entity {
    withMask: boolean

    constructor(withMask: boolean = true, xSpeed: number = 0.4, ySpeed: number = 0.4, assetId: string = "q") {
        super({assetId});
        this.x = 20;
        this.y = 20;
        this.dx = xSpeed;
        this.dy = ySpeed
        this.withMask = withMask;
    }
}