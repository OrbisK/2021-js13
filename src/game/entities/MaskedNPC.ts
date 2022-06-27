import NPC from "./NPC";
import {Level} from "../level/Level";

export default class MaskedNPC extends NPC {
    constructor(x: number, y: number, level: Level, dx: number = 0.0, dy: number = 0.0) {
        super(x, y, level, 10, dx, dy)
        this.loadCharAnimation(1);
        this.initAnimation()
    }
}