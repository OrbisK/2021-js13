import {Sprite, SpriteSheet} from "kontra";
import World from "./world";

export default class Entity extends Sprite.class {
    scene: any;
    globalX: number;
    globalY: number;
    delete: boolean = false;

    static charSheet: any;

    constructor(globalX: number, globalY: number) {
        super({anchor: {x: 0.5, y: 0.8}})
        this.globalX = globalX;
        this.globalY = globalY;
    }

    setWorld(world: World) {
        this.scene = world;
    }

    getCharAnimation(movement: number[]) {
        return SpriteSheet({
            image: Entity.charSheet,
            frameWidth: 7,
            frameHeight: 12,
            animations: {
                idle: {
                    frames: 1,
                    loop: false,
                },
                walk: {
                    frames: movement, // 0, 1, 2, 1
                    frameRate: 6,
                }
            }
        }).animations;
    }
}