import * as vscode from 'vscode';

import { buildSync } from 'esbuild';
import fileSize from 'filesize';
import gzip from 'gzip-size';

export function activate (context: vscode.ExtensionContext)
{
	let disposable1 = vscode.commands.registerCommand('phaser4examples.create', () =>
    {
        const ed = vscode.window.activeTextEditor;

        let path = '../../../../../phaser-genesis/srcx';

        if (ed)
        {
            const folders = ed.document.fileName.split('\\');

            const where = folders.indexOf('src');

            path = '../'.repeat((folders.length - where) + 1) + 'phaser-genesis/src';
        }

        const content = `//  Phaser 4 Example

        import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '${path}/config';

import { AddChild } from '${path}/display/';
import { Game } from '${path}/Game';
import { ImageFile } from '${path}/loader/files/ImageFile';
import { Loader } from '${path}/loader/Loader';
import { Scene } from '${path}/scenes/Scene';
import { Sprite } from '${path}/gameobjects/';
import { StaticWorld } from '${path}/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await ImageFile('logo', 'assets/logo.png');

        const world = new StaticWorld(this);

        const logo = new Sprite(400, 300, 'logo');

        AddChild(world, logo);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
`;

        vscode.workspace.openTextDocument({ language: 'typescript', content });

    });

	context.subscriptions.push(disposable1);

    let disposable2 = vscode.commands.registerCommand('phaser4examples.build', () =>
    {
        const ed = vscode.window.activeTextEditor;

        if (ed)
        {
            // d:\wamp\www\dev\examples\src\test\renderdraw.ts
            const fullPath = ed.document.fileName;

            //  For now, we'll only work on Windows (and my PC! but this extension is for me after all)
            if (fullPath.startsWith('d:\\wamp\\www\\dev\\examples\\src'))
            {
                const outfile = fullPath.replace('d:\\wamp\\www\\dev\\examples\\src', 'd:\\wamp\\www\\dev\\examples\\live').replace('.ts', '.js');
                const outfilemin = fullPath.replace('d:\\wamp\\www\\dev\\examples\\src', 'd:\\wamp\\www\\dev\\examples\\live').replace('.ts', '.min.js');
                const fileName = fullPath.replace('d:\\wamp\\www\\dev\\examples\\src\\', '');

                const buildResults = buildSync({
                    entryPoints: [ fullPath ],
                    outfile,
                    target: 'esnext',
                    sourcemap: true,
                    minify: false,
                    bundle: true,
                    metafile: true,
                    logLevel: 'silent'
                });
                
                if (buildResults.errors.length > 0)
                {
                    vscode.window.showInformationMessage(`esbuild error ${buildResults.errors}`);
                }
                else
                {
                    const exampleFile = fileName.replace('.ts', '.js').replace('\\', '/');

                    const exampleURL = `http://192.168.0.100/dev/examples/live/debug.html?f=${exampleFile}`;

                    vscode.env.clipboard.writeText(exampleURL);

                    vscode.window.showInformationMessage(`Built Phaser 4 Example: ${fileName}`, 'Metafile', 'Stats', 'Open').then(item =>
                    {
                        if (item === 'Metafile')
                        {
                            vscode.workspace.openTextDocument({ language: 'text', content: JSON.stringify(buildResults.metafile, null, 2) });
                        }
                        else if (item === 'Open')
                        {
                            vscode.env.openExternal(vscode.Uri.parse(exampleURL));
                        }
                        else if (item === 'Stats')
                        {
                            buildSync({
                                entryPoints: [ fullPath ],
                                outfile: outfilemin,
                                target: 'esnext',
                                sourcemap: false,
                                minify: true,
                                bundle: true,
                                metafile: false,
                                logLevel: 'silent'
                            });

                            Promise.all([
                                vscode.workspace.fs.stat(vscode.Uri.file(outfile)),
                                vscode.workspace.fs.stat(vscode.Uri.file(outfilemin)),
                                vscode.workspace.fs.readFile(vscode.Uri.file(outfilemin))
                            ]).then(values =>
                            {
                                const unminSize = fileSize(values[0].size);
                                const minSize = fileSize(values[1].size);
                                const gzSize = fileSize(gzip.sync(Buffer.from(values[2])));

                                vscode.window.showInformationMessage(`Bundle: ${unminSize} - Min: ${minSize} - Gzip: ${gzSize}`);

                            }).catch(error =>
                            {
                                console.error('fucking arse', error);
                            });
                        }
                    });
                }
            }
            else
            {
                vscode.window.showErrorMessage('Not a Phaser 4 Example');
            }
        }

    });

	context.subscriptions.push(disposable2);
}

export function deactivate() {}
