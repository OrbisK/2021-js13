import Entity from "./entity";
import {TileEngine} from "kontra";
import {_getAsset} from "../globals";

export default class Scene {
    children: Array<Entity> = [];
    canvasWidth: number;
    canvasHeight: number;
    tileEngine: any;

    worldHeight: number;
    worldWidth: number = 200;

    borderLeft: number;
    borderRight: number;

    TILE_SIZE: number = 9;
    BORDER_SIZE: number = 70;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.worldHeight = Math.ceil(canvasHeight / this.TILE_SIZE)
        this.borderLeft = this.BORDER_SIZE;
        this.borderRight = canvasWidth - this.BORDER_SIZE;

        this.initTileEngine();
    }

    addChildren(newChildren: Array<Entity>) {
        for (let child of newChildren) {
            child.setScene(this);
            this.children.push(child);
        }
    }

    getGroundTiles() {
        let groundTiles = [];

        for (let y = 0; y < this.worldHeight; y++) {
            for (let x = 0; x < this.worldWidth; x++) {
                if (y < 2 || y > this.worldHeight - 3) {
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
            width: this.worldWidth,
            height: this.worldHeight,

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

    moveSx(vsx: number) {
        this.tileEngine.sx += vsx;
    }

    update() {
        // Sprites must be sorted to make sure, which Entity is in the background and which in the foreground
        this.children.sort((a: Entity, b: Entity) => a.y < b.y ? -1 : 1);

        for (const child of this.children) {
            child.update();
        }
    }

    render() {
        this.tileEngine.render();
        for (const child of this.children) {
            child.render();
        }
    }
}