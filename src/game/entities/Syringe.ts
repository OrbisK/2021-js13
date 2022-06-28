import Entity from "./Entity";
import {Level} from "../level/Level";
import {imageAssets, SpriteSheet} from "kontra";

export class Syringe extends Entity{
    constructor(x: number, y: number, level: Level) {
        super(x, y, level, 5)

        this.entitySprite.setScale(this.dir, 1);
        this.rangeSprite.render = () => {}
        this.entitySprite.sprite.animations = SpriteSheet({
            image: imageAssets['tiles'],
            frameWidth: 9,
            frameHeight: 9,
            animations: {
                idle: {frames: 2}
            }
        }).animations
    }
}