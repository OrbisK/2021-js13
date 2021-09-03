import Entity from "./entity";
import {TileEngine} from "kontra";
import {_getAsset, CANVAS_HEIGHT, CANVAS_WIDTH} from "../globals";

export default class Scene {
    children: Array<Entity> = [];
    tileEngine: any;
    focusPoint: Entity;

    levelTileHeight: number;
    levelTileWidth: number;
    levelWidth: number;

    borderLeft: number;
    borderRight: number;

    TILE_SIZE: number = 9;
    BORDER_SIZE: number = 70;

    constructor(levelTileWidth: number, focusPoint: Entity) {
        this.levelTileWidth = levelTileWidth;
        this.levelWidth = levelTileWidth * this.TILE_SIZE;
        this.focusPoint = focusPoint;

        this.levelTileHeight = Math.ceil(CANVAS_HEIGHT / this.TILE_SIZE)

        this.borderLeft = this.BORDER_SIZE;
        this.borderRight = CANVAS_WIDTH - this.BORDER_SIZE;

        this.initTileEngine();
        this.focus();
    }

    addChildren(newChildren: Array<Entity>) {
        for (let child of newChildren) {
            child.setScene(this);
            this.children.push(child);
        }
    }

    getGroundTiles() {
        let groundTiles = [];

        for (let y = 0; y < this.levelTileHeight; y++) {
            for (let x = 0; x < this.levelTileWidth; x++) {
                if (y < 2 || y > this.levelTileHeight - 3) {
                    groundTiles.push(2);
                } else {
                    groundTiles.push(1);
                }
            }
        }

        return groundTiles;
    }

    initTileEngine() {
        this.tileEngine = new TileEngine({
            // tile size
            tilewidth: 9,
            tileheight: 9,

            // map size in tiles
            width: this.levelTileWidth,
            height: this.levelTileHeight,

            // tileset object
            tilesets: [{
                firstgid: 1,
                image: _getAsset("tiles"),
            }],

            // layer object
            layers: [{
                name: 'ground',
                data: this.getGroundTiles(),
            }]
        });
    }

    focus() {
        let vsx_left = this.globalBorderLeft() - this.focusPoint.globalX;
        let vsx_right = this.focusPoint.globalX - this.globalBorderRight();

        if (vsx_left > 0 && this.tileEngine.sx - vsx_left >= 0) {
            this.tileEngine._sx -= vsx_left;
        } else if (vsx_right > 0 && this.focusPoint.globalX < this.levelWidth - this.BORDER_SIZE) {
            this.tileEngine._sx += vsx_right;
        }
    }

    moveSx(vsx: number) {
        this.tileEngine.sx += vsx;
    }

    globalBorderRight() {
        return Math.min(this.tileEngine.sx + this.borderRight, this.levelWidth);
    }

    globalBorderLeft() {
        return this.borderLeft + this.tileEngine.sx;
    }


    update() {
        // Sprites must be sorted to make sure, which Entity is in the background and which in the foreground
        this.children.sort((a: Entity, b: Entity) => a.y < b.y ? -1 : 1);

        for (const child of this.children) {
            child.update();
        }

        this.focus()
    }

    render() {
        this.tileEngine.render();
        for (const child of this.children) {
            child.render();
        }
    }
}