# js13kGames Rollup Boilerplate
Starter boilerplate for [js13kgames](https://www.js13kgames.com/) Game Jam using [Rollup](https://rollupjs.org/guide/en/).

## Getting Started

### Requirements

- Node.js `>= v10`
- Zip (compatible with info-zip command line).
- [AdvZip](https://github.com/amadvance/advancecomp).

### Commands

Development mode:

```
npm start
```

> It will open the browser, rebuild on changes and reload the browser.

Production mode:
```
npm run build
```

> It will minify, compress and inline styles and scripts in a single html file. It will also zip the file.

The generated files will be available in the `dist` directory.

## Development notes

The entry point for the application is the file `src/index.js`, from there any import will be automatically solved by `rollup` including external dependencies installed in `node_modules` folder. This includes `css` files thanks to [postcss](https://github.com/postcss/postcss).

The file `src/index.html` will be used as a template for the final bundle.

> The files `src/index.js` and `src/index.html` **are mandatory** for the scripts to work.

In production mode:

- The javascript code is optimized thanks to [terser](https://github.com/terser/terser).
- The javascript and styles _bundles are inlined in a single html file_ thanks to `html-inline` (and minified thanks to `html-minifier`).
- The zip file will only contain the single inlined html bundle.

## Credits
[Jerome Lecomte](https://github.com/herebefrogs) for his original boilerplate from which I based this one.
