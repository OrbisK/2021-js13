export const CANVAS_WIDTH = 270;
export const CANVAS_HEIGHT = 99;

export function getSavedScore() {
    let score = decodeURIComponent(document.cookie).split('highscore=');
    return score.length > 1 ? score[1] : "0";
}