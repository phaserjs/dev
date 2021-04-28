import boxen from 'boxen';
import esbuild from 'esbuild';
import fileSize from 'filesize';
import fs from 'fs-extra';
import gzip from 'gzip-size';

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

    info = info.concat(`${message} in ${total} secs\n`);
}

startTimer();

const buildResults = esbuild.buildSync({
    entryPoints: [ './src/index-bundle.ts' ],
    outfile: './public/index.js',
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
    logTime(`✔ Bundle built`);
}

const minResults = esbuild.buildSync({
    entryPoints: [ './src/index.ts' ],
    outfile: './public/index.min.js',
    target: 'es6',
    sourcemap: true,
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
    logTime(`✔ Min Bundle built`);
}

endLog('✔ Build complete');

const code = fs.readFileSync('./public/index.js');
const codeMin = fs.readFileSync('./public/index.min.js');

const unminSize = fileSize(Buffer.byteLength(code));
const minSize = fileSize(Buffer.byteLength(codeMin));
const gzSize = fileSize(gzip.sync(codeMin));

info = info.concat(`
Bundle: ${unminSize}
Minified: ${minSize}
Gzipped: ${gzSize}`);

console.log(boxen(info, { padding: 1, margin: 1, borderColor: 'cyanBright', borderStyle: 'bold' }));
