import Entity from "./entity";
import {SpriteSheet} from "kontra";

export default class NPC extends Entity {
    withMask: boolean

    constructor(withMask: boolean = true, xSpeed: number = 0.0, ySpeed: number = 0.0, assetId: string = "q") {
        super({assetId});
        this.x = 20;
        this.y = 20;
        this.dx = xSpeed;
        this.dy = ySpeed
        this.withMask = withMask;

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
    }
}