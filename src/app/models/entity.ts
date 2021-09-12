import {GameObject, imageAssets, Sprite, SpriteSheet} from "kontra";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../globals";

let anchor = {x: 0.5, y: 0.8}
export default class Entity extends GameObject.class {
    gX: number
    gY: number
    lifetime: number = 120
    dir: number = 1
    del: boolean = false
    type: number
    world: any

    constructor(globalX: number, globalY: number, type: number = 0, xRadius: number = 4) {
        super({
            anchor: anchor,
            eSp: Sprite({anchor: anchor}), // EntitySprite -> main sprite

            update: function () {
                this.eSp.update()
            },
            render: function () {
                this.eSp.render()
            },
        })

        this.gX = globalX
        this.gY = globalY
        this.xRadius = xRadius
        this.yRadius = xRadius * 0.5
        this.type = type

        this.cSp = Sprite({ // cSp -> ShadowSprite
            anchor: anchor,
            entity: this,

            render: function () {
                // @ts-ignore
                this.context.fillStyle = "rgba(255, 0, 0, 0.3)"
                // @ts-ignore
                this.context.beginPath()
                // @ts-ignore
                this.context.ellipse(0, 0, this.entity.xRadius, this.entity.yRadius, 0, 0, 2 * Math.PI)
                // @ts-ignore
                this.context.fill()
            },
            update: function () {
                this.x = this.entity.x
                this.y = this.entity.y + 2
            }
        })

        this.sSp = Sprite({ // sSp --> shadowSprite
            anchor: anchor,
            entity: this,
            render: function () {
                let ctx = this.context
                // @ts-ignore
                ctx.fillStyle = "rgb(0, 0, 0, 0.8)"
                // @ts-ignore
                ctx.beginPath()
                // @ts-ignore
                ctx.ellipse(0, 0, 4, 1.5, 0, 0, 2 * Math.PI)
                // @ts-ignore
                ctx.fill()
            },
            update: function () {
                this.x = this.entity.x
                this.y = this.entity.y + 2
            }
        })
    }

    update() {
        super.update()
        this.sSp.update()
        this.cSp.update()
        this.del = this.lifetime-- < 0 && !this.isInScreen()

        this.advance()
        this.x = this.gX - this.world.tE.sx
        this.y = this.gY - this.world.tE.sy
    }

    coll(o: Entity) {
        return o != this && (this.x - o.x) ** 2 / o.xRadius ** 2 + (this.y - o.y) ** 2 / o.yRadius ** 2 <= 1
    }

    isInScreen() {
        return this.x > -3 && this.y > -5 && this.x < CANVAS_WIDTH + 2 && this.y < CANVAS_HEIGHT + 2
    }

    setAnim(t: number) {
        t *= 3
        this.eSp.animations = SpriteSheet({
            image: imageAssets['chars'],
            frameWidth: 7,
            frameHeight: 12,
            animations: {
                idle: {
                    frames: t + 1,
                },
                walk: {
                    frames: [t, t + 1, t + 2, t + 1],
                    frameRate: 5,
                }
            }
        }).animations
    }

    setImg(pos: number) {
        this.eSp.animations = SpriteSheet({
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

    play(a: string) {
        this.eSp.playAnimation(a)
    }
}