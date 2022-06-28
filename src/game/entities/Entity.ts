import {GameObjectClass, Sprite} from "kontra";
import {Level} from "../level/Level";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../globals";

const anchor = {anchor: {x: 0.5, y: 0.5}}
class ScalableSprite extends GameObjectClass{
    sprite: Sprite
    entity: Entity

    constructor(entity: Entity) {
        super();
        this.entity = entity
        this.sprite = Sprite(anchor)
        this.addChild(this.sprite)
    }

    update(){
        this.x = this.entity.x
        this.y = this.entity.y
        super.update()
    }

    playAnimation(anim: string){
        this.sprite.playAnimation(anim)
    }
}

export default class Entity extends GameObjectClass {
    entitySprite: ScalableSprite
    shadowSprite: Sprite = Sprite(anchor)
    rangeSprite: Sprite = Sprite(anchor)
    radius: [number, number]

    globalX: number
    globalY: number
    level: Level

    constructor(globalX: number, globalY: number, level: Level, radius: number = 8) {
        super()

        this.entitySprite = new ScalableSprite(this)
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

    update() {
        this.x = this.globalX - this.level.getOffsetX()
        this.y = this.globalY - this.level.getOffsetY()
        this.entitySprite.update()
        super.update()
    }

    coll(o: Entity) {
        return o != this && (this.x - o.x) ** 2 / o.radius[0] ** 2 + (this.y - o.y) ** 2 / o.radius[1] ** 2 <= 1
    }

    isInScreen() {
        return this.x > -3 && this.y > -5 && this.x < CANVAS_WIDTH + 2 && this.y < CANVAS_HEIGHT + 10
    }
}