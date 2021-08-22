import Entity from "./entity";

export default class Scene {
    children: Array<Entity>;

    constructor(children: Array<Entity>) {
        this.children = children;

        let img = new Image();
        img.src = 'assets/tiles.png';
    }

    update() {
        // Sprites must be sorted to make sure, which Entity is in the background and which in the foreground
        this.children.sort((a: Entity, b: Entity) => a.y < b.y ? -1 : 1);

        for (const child of this.children) {
            child.update();
        }
    }

    render() {
        for (const child of this.children) {
            child.render();
        }
    }
}