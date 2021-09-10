import {Sprite, SpriteSheet} from "kontra";
import World from "./world";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../globals";

export default class Entity extends Sprite.class {
    globalX: number;
    globalY: number;
    delete: boolean = false;
    type: number;

    world: any;
    shadow: any;

    static charSheet: any;
    static tileSheet: any;

    constructor(globalX: number, globalY: number, type: number = 0) {
        super({anchor: {x: 0.5, y: 0.8}})
        this.globalX = globalX;
        this.globalY = globalY;
        this.type = type;

        this.shadow = Sprite({
            entity: this,

            render: function () {
                // @ts-ignore
                this.context.fillStyle = "rgba(0, 0, 0, 0.7)";

                // @ts-ignore
                this.context.beginPath();
                // @ts-ignore
                this.context.ellipse(0, 0, Math.floor(this.entity.width / 2), 2, 0, 0, 2 * Math.PI);
                // @ts-ignore
                this.context.fill();
            },
            update: function () {
                this.x = this.entity.x;
                this.y = this.entity.y + 2;
            }
        })
    }

    isInScreen() {
        return this.x > -3 && this.y > -5 && this.x < CANVAS_WIDTH + 2 && this.y < CANVAS_HEIGHT + 2;
    }

    setWorld(world: World) {
        this.world = world;
    }

    setCharAnimation(t: number) {
        this.animations = SpriteSheet({
            image: Entity.charSheet,
            frameWidth: 7,
            frameHeight: 12,
            animations: {
                idle: {
                    frames: t * 3 + 1,
                },
                walk: {
                    frames: [t * 3, t * 3 + 1, t * 3 + 2, t * 3 + 1],
                    frameRate: 6,
                }
            }
        }).animations;
    }

    setSprite(pos: number) {
        this.animations = SpriteSheet({
            image: Entity.tileSheet,
            frameWidth: 9,
            frameHeight: 9,
            animations: {
                idle: {
                    frames: pos,
                },
            }
        }).animations;
    }

    render() {
        this.shadow.render();
        super.render();
    }

    update() {
        super.update();

        this.x = this.globalX - this.world.tileEngine.sx;
        this.y = this.globalY - this.world.tileEngine.sy;
        this.shadow.update();
    }
}