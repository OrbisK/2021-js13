// FROM: https://github.com/sdepold/noegnud/blob/5d1abab8fc80800382c1afcd8942b67ad5a01c68/src/app/progress-bar.js#L1

export default class ProgressBar {
    assets: NodeListOf<HTMLImageElement>;
    loaded:Array<HTMLImageElement|null>;
    callback:Function

    constructor(assets: NodeListOf<HTMLImageElement>, callback:Function) {
        this.assets = assets;
        this.loaded = [];
        this.callback = callback;

        this.load();
    }

    load() {
        const markLoaded = (asset:any) => {
            this.loaded.push(asset);
            this.verify();
        };
        this.assets.forEach(asset => {
            if (asset.complete) {
                markLoaded(asset);
            } else {
                asset.onload = () => {
                    markLoaded(asset);
                };
            }
        });
    }

    verify() {
        if (this.loaded.length === this.assets.length) {
            setTimeout(() => {
                this.callback();
            }, 1000);
        }
    }
}