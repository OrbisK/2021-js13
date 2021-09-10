import kontra from "kontra";

kontra.init();

export let SCALE = 3;

export const CANVAS_WIDTH = Math.ceil(kontra.getCanvas().width / SCALE);
export const CANVAS_HEIGHT = Math.ceil(kontra.getCanvas().height / SCALE);