import {GameObject, imageAssets, Sprite, SpriteSheet} from "kontra";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../globals";

export default class Entity extends GameObject.class {
    globalX: number;
    globalY: number;
    lifetime: number = 60 * 2;
    dir: number = 1;
    deleteFlag: boolean = false;
    type: number;
    world: any;

    constructor(globalX: number, globalY: number, type: number = 0) {
        super({
            anchor: {x: 0.5, y: 0.8},
            entitySprite: Sprite({anchor: {x: 0.5, y: 0.8}}),
            shadowSprite: Sprite({
                y: 2,
                render: function () {
                    // @ts-ignore
                    this.context.fillStyle = "rgba(0, 0, 0, 0.7)";
                    // @ts-ignore
                    this.context.beginPath();
                    // @ts-ignore
                    this.context.ellipse(0, 0, Math.floor(3), 2, 0, 0, 2 * Math.PI);
                    // @ts-ignore
                    this.context.fill();
                }
            }),
            update: function () {
                this.shadowSprite.update()
                this.entitySprite.update()
            },
            render: function () {
                this.shadowSprite.render()
                this.entitySprite.render()
            }
        })

        this.globalX = globalX
        this.globalY = globalY
        this.type = type
    }

    update() {
        super.update()
        this.deleteFlag = this.lifetime-- < 0 && !this.isInScreen()

        this.advance()
        this.x = this.globalX - this.world.tileEngine.sx
        this.y = this.globalY - this.world.tileEngine.sy
    }


    isInScreen() {
        return this.x > -3 && this.y > -5 && this.x < CANVAS_WIDTH + 2 && this.y < CANVAS_HEIGHT + 2
    }

    setAnimationFromCharsSheet(t: number) {
        this.entitySprite.animations = SpriteSheet({
            image: imageAssets['chars'],
            frameWidth: 7,
            frameHeight: 12,
            animations: {
                idle: {
                    frames: t * 3 + 1,
                },
                walk: {
                    frames: [t * 3, t * 3 + 1, t * 3 + 2, t * 3 + 1],
                    frameRate: 5,
                }
            }
        }).animations
    }

    setImageFromTileSheet(pos: number) {
        this.entitySprite.animations = SpriteSheet({
            image: imageAssets['tiles'],
            frameWidth: 9,
            frameHeight: 9,
            animations: {
                idle: {
                    frames: pos,
                },
            }
        }).animations
    }
}