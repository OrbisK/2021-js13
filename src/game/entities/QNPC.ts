import NPC from "./NPC";
import {Level} from "../level/Level";

export default class QNPC extends NPC {
    constructor(x: number, y: number, level: Level, dx: number = 0.0, dy: number = 0.0) {
        super(x, y, level, 14, dx, dy)
        this.coronaPlus = 1.2
        this.loadCharAnimation(2);
        this.initAnimation()
    }
}