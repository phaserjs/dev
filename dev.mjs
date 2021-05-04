import boxen from 'boxen';
import chalk from 'chalk';
import dirTree from 'directory-tree';
import esbuild from 'esbuild';
import fileSize from 'filesize';
import fs from 'fs-extra';
import gradient from 'gradient-string';
import gzip from 'gzip-size';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

const argv = yargs(hideBin(process.argv)).argv

let src = '';
let info = '';
const times = [];

if (argv.dev)
{
    src = argv._[0];
}
else if (argv.src)
{
    src = argv.src;
}

if (!src || src === '')
{
    info = chalk`{whiteBright Missing command-line argument:} {yellowBright --src file}`;
    console.log(boxen(info, { padding: 1, margin: 1, borderColor: 'redBright', borderStyle: 'bold' }));
    process.exit(1);
}

const srcTS = (!src.endsWith('.ts')) ? src.concat('.ts') : src;
const srcJS = (src.endsWith('.ts')) ? src.replace('.ts', '.js') : src.concat('.js');
const srcMinJS = (src.endsWith('.ts')) ? src.replace('.ts', '.min.js') : src.concat('.min.js');

const pathTS = `./src/${srcTS}`;
const pathJS = `./public/${srcJS}`;
const pathMinJS = `./public/${srcMinJS}`;

const startTimer = () =>
{
    times.push(Date.now());
}

const logTime = (message, skipTime = false) =>
{
    if (skipTime)
    {
        info = info.concat(`${message}\n`);

        startTimer();

        return;
    }

    const startTime = times[times.length - 1];
    let duration = Date.now() - startTime;

    if (duration > 1000)
    {
        duration /= 1000;
        duration = duration.toFixed(2);

        info = info.concat(`${message} (${duration} secs)\n`);
    }
    else
    {
        info = info.concat(`${message} (${duration} ms)\n`);
    }

    startTimer();
}

const endLog = (message) =>
{
    let total = 0;

    for (let i = 1; i < times.length; i++)
    {
        const prev = times[ i - 1 ];
        const now = times[ i ];

        total += (now - prev);
    }

    total /= 1000;

    info = info.concat(gradient.rainbow(`${message} in ${total} secs`));
}

startTimer();

if (!fs.existsSync(pathTS))
{
    info = chalk`{whiteBright File {yellowBright ${pathTS}} is missing}`;
    console.log(boxen(info, { padding: 1, margin: 1, borderColor: 'redBright', borderStyle: 'bold' }));
    process.exit(1);
}

const buildResults = esbuild.buildSync({
    entryPoints: [ pathTS ],
    outfile: pathJS,
    target: 'es6',
    sourcemap: true,
    minify: false,
    bundle: true
});

if (buildResults.errors.length > 0)
{
    console.log('❌ esbuild error');
    console.log(buildResults.errors);
    process.exit(1);
}
else
{
    logTime(chalk`✔ {whiteBright ${srcJS}}`);
}

const minResults = esbuild.buildSync({
    entryPoints: [ pathTS ],
    outfile: pathMinJS,
    target: 'es6',
    sourcemap: false,
    minify: true,
    bundle: true
});

if (minResults.errors.length > 0)
{
    console.log('❌ esbuild min error');
    console.log(minResults.errors);
    process.exit(1);
}
else
{
    logTime(chalk`✔ {whiteBright ${srcMinJS}}`);
}

const code = fs.readFileSync(pathJS);
const codeMin = fs.readFileSync(pathMinJS);

const unminSize = fileSize(Buffer.byteLength(code));
const minSize = fileSize(Buffer.byteLength(codeMin));
const gzSize = fileSize(gzip.sync(codeMin));

info = info.concat(chalk`
{yellowBright.bold Bundle:} ${unminSize}
{yellowBright.bold Minified:} ${minSize}
{yellowBright.bold Gzipped:} ${gzSize}\n\n`);

//  Update Examples JSON file



endLog('Build complete');

console.log(boxen(info, { padding: 1, margin: 1, borderColor: 'cyanBright', borderStyle: 'bold' }));
