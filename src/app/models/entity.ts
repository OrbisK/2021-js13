import {Sprite, SpriteSheet} from "kontra";
import World from "./world";

export default class Entity extends Sprite.class {
    scene: any;
    globalX: number;
    globalY: number;
    delete: boolean = false;
    shadow: any;

    static charSheet: any;

    constructor(globalX: number, globalY: number) {
        super({anchor: {x: 0.5, y: 0.8}})
        this.globalX = globalX;
        this.globalY = globalY;

        this.shadow = Sprite({
            color: "rgba(0, 0, 0, 0.6)",
            radius: 5,
            entity: this,

            render: function () {
                // @ts-ignore
                this.context.fillStyle = this.color;

                // @ts-ignore
                this.context.beginPath();
                // @ts-ignore
                this.context.ellipse(0, 0, 4, 3, 0, 0, 2 * Math.PI);
                // @ts-ignore
                this.context.fill();
            },
            update: function () {
                this.x = this.entity.x;
                this.y = this.entity.y + 2;
            }
        })
    }

    setWorld(world: World) {
        this.scene = world;
    }

    getCharAnimation(type: number) {
        let t = 3 * type;
        return SpriteSheet({
            image: Entity.charSheet,
            frameWidth: 7,
            frameHeight: 12,
            animations: {
                idle: {
                    frames: t + 1,
                    loop: false,
                },
                walk: {
                    frames: [t, t + 1, t + 2, t + 1],
                    frameRate: 6,
                }
            }
        }).animations;
    }

    render() {
        this.shadow.render();
        super.render();
    }

    update() {
        super.update();
        this.shadow.update();
    }
}