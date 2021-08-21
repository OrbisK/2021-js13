import {keyPressed, Sprite, SpriteSheet} from 'kontra';

export default class Player extends Sprite.class {
    constructor(spritesheet: SpriteSheet) {
        super({
            x: 10,
            y: 10,
            dir: 1,
            y_speed: 0.4,
            move: false,
            anchor: {x: 0.5, y: 0.5},
            animations: spritesheet.animations,
        });
    }

    update() {
        let vx = 0;
        let vy = 0;

        if (keyPressed('left')) {
            this.dir = -1;
            vx -= 0.6;
        }
        if (keyPressed('right')) {
            this.dir = 1;
            vx += 0.6;
        }
        if (keyPressed('up')) {
            vy -= 0.4;
        }
        if (keyPressed('down')) {
            vy += 0.4;
        }

        let move = this.x != prev_x || this.y != prev_y;

        if (!move) {
            this.playAnimation("idle");
            this.animations["walk"].reset();
        } else {
            this.playAnimation("walk");
        }

        super.update();
    }
}