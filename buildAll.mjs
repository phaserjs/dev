import boxen from 'boxen';
import { buildExamples } from './buildExamples.mjs';
import chalk from 'chalk';
import dirTree from 'directory-tree';
import esbuild from 'esbuild';
import gradient from 'gradient-string';

let info = '';
const times = [];

const srcFolder = './examples/src';
const liveFolder = './examples/live';

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

const buildSource = (data) =>
{
    if (data.type === 'directory' && data.hasOwnProperty('children') && data.children.length > 0)
    {
        for (let i = 0; i < data.children.length; i++)
        {
            const child = data.children[i];

            if (child.type === 'file' && child.name.endsWith('.ts'))
            {
                const path = child.path.replace('examples/src/', '').replace('.ts', '.js');
                const outfile = `${liveFolder}/${path}`;

                // console.log(child.path, '>', outfile);

                const buildResults = esbuild.buildSync({
                    entryPoints: [ child.path ],
                    outfile,
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
                    logTime(chalk`✔ {whiteBright ${outfile}}`);
                }
            }
            else if (child.type === 'directory')
            {
                buildSource(child);
            }
        }
    }
}

startTimer();

let filteredTree = dirTree(srcFolder, {
    extensions: /\.ts$/,
    normalizePath: true,
    exclude: [
        /global.d.ts/
    ]
});

buildSource(filteredTree);

logTime(chalk`✔ {whiteBright ${buildExamples()}}`);

endLog('Build complete');

console.log(boxen(info, { padding: 1, margin: 1, borderColor: 'cyanBright', borderStyle: 'bold' }));
