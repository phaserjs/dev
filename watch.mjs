import boxen from 'boxen';
import { buildExamples } from './buildExamples.mjs';
import esbuild from 'esbuild';
import fs from 'fs-extra';
import { hideBin } from 'yargs/helpers';
import terminalKit from 'terminal-kit';
import yargs from 'yargs';

const term = terminalKit.terminal;

const argv = yargs(hideBin(process.argv)).argv

let src = argv._[0];

let info = '';

if (!src || src === '')
{
    term('Choose a file: ');

    await term.fileInput({

        baseDir: './src/',
        autoCompleteMenu: true,
        autoCompleteHint: true

    }).then(input => {

        src = input.replace(process.cwd(), '');

    }).catch(error => {

        term.red.bold( "\nAn error occurs: " + error + "\n" ) ;

        process.exit() ;

    });
}

if (src.startsWith('src/') || src.startsWith('src\\'))
{
    src = src.substr(4);
}
else if (src.startsWith('/src/') || src.startsWith('\\src\\'))
{
    src = src.substr(5);
}

const srcTS = (!src.endsWith('.ts')) ? src.concat('.ts') : src;
const srcJS = (src.endsWith('.ts')) ? src.replace('.ts', '.js') : src.concat('.js');

const pathTS = `./src/${srcTS}`;
const pathJS = `./public/${srcJS}`;

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
    x: 18,
    y: 5
});

term.hideCursor();

esbuild.build({
    entryPoints: [ pathTS ],
    outfile: pathJS,
    target: 'es6',
    sourcemap: true,
    minify: false,
    bundle: true,
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

});
