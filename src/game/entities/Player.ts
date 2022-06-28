// import {zzfx} from 'ZzFX';

import NPC from "./NPC";
import {keyPressed} from "kontra";
import {CANVAS_HEIGHT} from "../globals";
import {Level} from "../level/Level";

export default class Player extends NPC {
    score: number = 0

    constructor(x: number, y: number, level: Level) {
        super(x, y, level, 0.1, 2.7, 0.5)
        this.life = 1000
        this.loadCharAnimation(0)
    }

    update(){
        super.update()
        this.score = Math.max(this.globalX / this.level.tileWidth, this.score)
    }

    advance() {
        let vx: number = 0
        let vy: number = 0

        if (keyPressed('arrowleft')) vx -= this.dx
        if (keyPressed('arrowright')) vx += this.dx
        if (keyPressed('arrowup')) vy -= this.dy
        if (keyPressed('arrowdown')) vy += this.dy

        let diagonalFactor: number = vy != 0 && vx != 0 ? 0.8 : 1.0
        vx *= diagonalFactor
        vy *= diagonalFactor

        if (vx != 0 && this.dir != Math.sign(vx)) {
            this.dir *= -1
            this.setScale(this.dir, 1)
        }

        if (vx == 0 && vy == 0) {
            this.characterSprite.playAnimation("idle")
            this.characterSprite.animations["walk"].reset()
        } else {
            this.characterSprite.playAnimation("walk")
            if (this.globalY + vy < -2 || this.globalY + vy > CANVAS_HEIGHT - 10) vy = 0
        }

        if (this.x + vx < 4) vx = 0

        if(vx > 0){
            let vsx_right = this.globalX - Math.min(this.level.getOffsetX() + 200, this.level.pixelWidth())
            if (vsx_right > 0 && this.globalX < this.level.rightBorder) {
                this.level.tileEngine.sx += vx
            }
        }

        this.globalX += vx
        this.globalY += vy

//         if (this.world.timer % 2 == 0) return
//
//         for (let child of this.world.uCh) {
//             if (this.coll(child)) {
//                 if (child.type == 1) {
//                     zzfx(...[, 0, 344, .07, .28, .19, , 1.04, .6, , 54, .05, .15, .1, , , , .83, .07]);
//                     child.del = true;
//                     this.life = Math.min(1000, this.life + 200);
//                 } else {
//                     this.life -= 3;
//                     if (this.life <= 0) {
//                         World.started = false;
//                         if (+getSavedScore() < World.score()) localStorage.setItem('highscore', `${World.score()}`);
//
//                     }
//                 }
//             }
//         }
//

    }
}