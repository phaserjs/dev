import boxen from 'boxen';
import chalk from 'chalk';
import esbuild from 'esbuild';
import fileSize from 'filesize';
import fs from 'fs-extra';
import gradient from 'gradient-string';
import gzip from 'gzip-size';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

const argv = yargs(hideBin(process.argv)).argv

let info = '';
const times = [];

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

const src = argv.src;

if (!src)
{
    info = chalk`{whiteBright Missing command-line argument:} {yellowBright --src file}`;
    console.log(boxen(info, { padding: 1, margin: 1, borderColor: 'redBright', borderStyle: 'bold' }));
    process.exit(1);
}

if (!fs.existsSync(`./src/${src}.ts`))
{
    info = chalk`{whiteBright File {yellowBright src/${src}.ts} is missing}`;
    console.log(boxen(info, { padding: 1, margin: 1, borderColor: 'redBright', borderStyle: 'bold' }));
    process.exit(1);
}

const buildResults = esbuild.buildSync({
    entryPoints: [ `./src/${src}.ts` ],
    outfile: `./public/${src}.js`,
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
    logTime(chalk`✔ {whiteBright ${src}.js}`);
}

const minResults = esbuild.buildSync({
    entryPoints: [ `./src/${src}.ts` ],
    outfile: `./public/${src}.min.js`,
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
    logTime(chalk`✔ {whiteBright ${src}.min.js}`);
}

const code = fs.readFileSync(`./public/${src}.js`);
const codeMin = fs.readFileSync(`./public/${src}.min.js`);

const unminSize = fileSize(Buffer.byteLength(code));
const minSize = fileSize(Buffer.byteLength(codeMin));
const gzSize = fileSize(gzip.sync(codeMin));

info = info.concat(chalk`
{yellowBright.bold Bundle:} ${unminSize}
{yellowBright.bold Minified:} ${minSize}
{yellowBright.bold Gzipped:} ${gzSize}\n\n`);

endLog('Build complete');

console.log(boxen(info, { padding: 1, margin: 1, borderColor: 'cyanBright', borderStyle: 'bold' }));
