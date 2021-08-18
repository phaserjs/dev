import boxen from 'boxen';
import { buildExamples } from './buildExamples.mjs';
import esbuild from 'esbuild';
import fs from 'fs-extra';
import { hideBin } from 'yargs/helpers';
import ifdef from 'esbuild-plugin-ifdef';
import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';
import path from 'path';
import terminalKit from 'terminal-kit';
import yargs from 'yargs';

// import watPlugin from 'esbuild-plugin-wat';

const term = terminalKit.terminal;

const argv = yargs(hideBin(process.argv)).argv

let src = argv._[0];

let info = '';

if (!src || src === '')
{
    term('Choose a file: ');

    await term.fileInput({

        baseDir: './examples/src/',
        autoCompleteMenu: true,
        autoCompleteHint: true

    }).then(input => {

        src = input.replace(process.cwd(), '');

    }).catch(error => {

        term.red.bold( "\nAn error occurs: " + error + "\n" ) ;

        process.exit() ;

    });
}

if (src.startsWith('examples/src/') || src.startsWith('examples\\src\\'))
{
    src = src.substr(13);
}
else if (src.startsWith('/examples/src/') || src.startsWith('\\examples\\src\\'))
{
    src = src.substr(14);
}

const srcTS = (!src.endsWith('.ts')) ? src.concat('.ts') : src;
const srcJS = (src.endsWith('.ts')) ? src.replace('.ts', '.js') : src.concat('.js');

const pathTS = `./examples/src/${srcTS}`;
const pathJS = `./examples/live/${srcJS}`;

if (!fs.existsSync(pathTS))
{
    info = term.brightWhite.str('File') + term.brightYellow.str(` ${pathTS} `) + term.brightWhite.str('is missing');
    console.log(boxen(info, { padding: 1, margin: 1, borderColor: 'redBright', borderStyle: 'bold' }));
    process.exit(1);
}

term.clear();

const document = term.createDocument({
    palette: new terminalKit.Palette()
});

const table = new terminalKit.TextTable({
    parent: document,
    cellContents: [
        [ 'File:' , `^Y${srcTS}` ],
        [ 'Built:' , `^C${new Date().toTimeString().substr(0, 8)}` ],
        [ 'Info:' , '^WWatching     Press ^RCtrl + C ^Wto quit' ]
    ],
    hasBorder: true,
    contentHasMarkup: true,
    borderChars: 'lightRounded' ,
    borderAttr: { color: 'blue' } ,
    width: 60,
    fit: true
});

const spinner = await new terminalKit.AnimatedText({
    parent: document,
    animation: 'impulse',
    x: 19,
    y: 5
});

// term.hideCursor();

// const define = {
//     'process.env.RENDER_STATS': true,
//     'process.env.GET_DISPLAY_DATA': true,
// };

// define,
// plugins: [ ifdef(define) ],

// https://github.com/mitschabaude/esbuild-plugin-inline-worker



let wasmPlugin = {
    name: 'wasm',
    setup(build) {
    //   let path = require('path')
        //   let fs = require('fs')
  
      // Resolve ".wasm" files to a path with a namespace
      build.onResolve({ filter: /\.wasm$/ }, args => {
        // If this is the import inside the stub module, import the
        // binary itself. Put the path in the "wasm-binary" namespace
        // to tell our binary load callback to load the binary file.
        if (args.namespace === 'wasm-stub') {
          return {
            path: args.path,
            namespace: 'wasm-binary',
          }
        }
  
        // Otherwise, generate the JavaScript stub module for this
        // ".wasm" file. Put it in the "wasm-stub" namespace to tell
        // our stub load callback to fill it with JavaScript.
        //
        // Resolve relative paths to absolute paths here since this
        // resolve callback is given "resolveDir", the directory to
        // resolve imports against.
        if (args.resolveDir === '') {
          return // Ignore unresolvable paths
        }
        return {
          path: path.isAbsolute(args.path) ? args.path : path.join(args.resolveDir, args.path),
          namespace: 'wasm-stub',
        }
      })
  
      // Virtual modules in the "wasm-stub" namespace are filled with
      // the JavaScript code for compiling the WebAssembly binary. The
      // binary itself is imported from a second virtual module.
      build.onLoad({ filter: /.*/, namespace: 'wasm-stub' }, async (args) => ({
        // contents: `import wasm from ${JSON.stringify(args.path)}
        //   export default (imports) =>
        //     WebAssembly.instantiate(wasm, imports).then(
        //       result => result.instance.exports)`,

              contents: `import wasm from ${JSON.stringify(args.path)}
              export default () =>
                WebAssembly.instantiate(wasm).then(
                  result => result.instance.exports)`,
    
        }))
  
      // Virtual modules in the "wasm-binary" namespace contain the
      // actual bytes of the WebAssembly file. This uses esbuild's
      // built-in "binary" loader instead of manually embedding the
      // binary data inside JavaScript code ourselves.
      build.onLoad({ filter: /.*/, namespace: 'wasm-binary' }, async (args) => ({
        contents: await fs.promises.readFile(args.path),
        loader: 'binary',
      }))
    },
  }

//   plugins: [ inlineWorkerPlugin(), watPlugin({
//     loader: 'binary', // what loader esbuild should use to load the .wasm file. Default: 'binary'
//     inlineFunctions: false, // optimize .wasm/.wat files by inlining all functions. Default: false
//   }) ],


esbuild.build({
    entryPoints: [ pathTS ],
    outfile: pathJS,
    target: 'esnext',
    sourcemap: true,
    minify: false,
    bundle: true,
    plugins: [ wasmPlugin ],
    watch: {
        onRebuild(error, result)
        {
            if (error)
            {
                table.setCellContent(1, 1, '^RRebuild failed');
                console.log();
                process.exit(1);
            }
            else
            {
                table.setCellContent(1, 1, `${new Date().toTimeString().substr(0, 8)}`);
            }
        }
    }
}).then(result => {

    if (result.errors.length > 0)
    {
        console.log('Failed');
    }
    else
    {
        buildExamples();

        term.grabInput();
    
        term.on('key', key =>
        {
            if (key === 'CTRL_C')
            {
                term.grabInput(false);
                term.reset();
                term('Build complete\n');
                result.stop();
                process.exit();
            }
        });
    }

}).catch(error => {

    term.grabInput(false);
    term.reset();
    console.log(error);
    process.exit();

});
