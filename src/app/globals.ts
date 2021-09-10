import kontra from "kontra";

kontra.init();

export let SCALE = 3;

export const CANVAS_WIDTH = Math.ceil(kontra.getCanvas().width / SCALE);
export const CANVAS_HEIGHT = Math.ceil(kontra.getCanvas().height / SCALE);

export function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "0";
}