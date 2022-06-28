import {GameObjectClass, Sprite} from "kontra";
import {Level} from "../level/Level";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../globals";

class EntitySprite extends GameObjectClass{
    sprite: Sprite
    entity: Entity

    constructor(entity: Entity) {
        super();
        this.entity = entity
        this.sprite = Sprite({anchor: {x: 0.5, y: 0.5}})
        this.addChild(this.sprite)
    }

    update(){
        this.x = this.entity.x
        this.y = this.entity.y
        super.update()
    }
}

export default class Entity extends GameObjectClass {
    entitySprite: EntitySprite
    shadowSprite: Sprite = Sprite({anchor: {x: 0.5, y: 0.5}})
    rangeSprite: Sprite = Sprite({anchor: {x: 0.5, y: 0.5}})
    radius: [number, number]

    globalX: number
    globalY: number
    level: Level

    lifetime: number = 120
    delete: boolean = false

    constructor(globalX: number, globalY: number, level: Level, radius: number = 8) {
        super()

        this.entitySprite = new EntitySprite(this)
        this.globalX = globalX
        this.globalY = globalY
        this.level = level
        this.radius = [radius, radius/2]

        this.rangeSprite.render = () => {
            this.context.fillStyle = "rgba(255, 0, 0, 0.3)"
            this.context.beginPath()
            this.context.ellipse(this.x, this.y + 6, this.radius[0], this.radius[1], 0, 0, 2 * Math.PI)
            this.context.fill()
        }

        this.shadowSprite.render = () => {
            this.context.fillStyle = "rgb(0, 0, 0, 0.8)"
            this.context.beginPath()
            this.context.ellipse(this.x , this.y + 6, 4, 1.5, 0, 0, 2 * Math.PI)
            this.context.fill()
        }
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
        this.entitySprite.update()
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