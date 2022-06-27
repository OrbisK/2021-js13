import {GameObjectClass, Sprite} from "kontra";
import {Level} from "../level/Level";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../globals";

export default class Entity extends GameObjectClass {
    characterSprite: Sprite = Sprite({anchor: {x: 0.5, y: 0.5}})
    shadowSprite: Sprite = Sprite()
    rangeSprite: Sprite = Sprite()
    radius: [number, number]

    globalX: number
    globalY: number
    level: Level

    // lifetime: number = 120
    // del: boolean = false

    constructor(globalX: number, globalY: number, level: Level, radius: number = 8) {
        super({anchor: {x: 0.5, y: 0.8}})

        this.globalX = globalX
        this.globalY = globalY
        this.level = level
        this.radius = [radius, radius/2]

        this.rangeSprite.render = () => {
            this.context.fillStyle = "rgba(255, 0, 0, 0.3)"
            this.context.beginPath()
            this.context.ellipse(0, 6, this.radius[0], this.radius[1], 0, 0, 2 * Math.PI)
            this.context.fill()
        }

        this.shadowSprite.render = () => {
            this.context.fillStyle = "rgb(0, 0, 0, 0.8)"
            this.context.beginPath()
            this.context.ellipse(0, 6, 4, 1.5, 0, 0, 2 * Math.PI)
            this.context.fill()
        }

        this.addChild(this.rangeSprite, this.shadowSprite, this.characterSprite)
    }

    setRealX(){
        this.x = this.globalX - this.level.getOffsetX()
    }

    setRealY(){
        this.y = this.globalY - this.level.getOffsetY()
    }

    update() {
        this.setRealX()
        this.setRealY()
        super.update()
    }

    coll(o: Entity) {
        return o != this && (this.x - o.x) ** 2 / o.xRadius ** 2 + (this.y - o.y) ** 2 / o.yRadius ** 2 <= 1
    }


    isInScreen() {
        return this.x > -3 && this.y > -5 && this.x < CANVAS_WIDTH + 2 && this.y < CANVAS_HEIGHT + 2
    }

    //
    // setImg(pos: number) {
    //     this.eSp.animations = SpriteSheet({
    //         image: imageAssets['tiles'],
    //         frameWidth: 9,
    //         frameHeight: 9,
    //         animations: {
    //             idle: {
    //                 frames: pos,
    //             },
    //         }
    //     }).animations
    // }
}