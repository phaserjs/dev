import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Between } from '../../../../phaser-genesis/src/math';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse/Mouse';
import { On } from '../../../../phaser-genesis/src/events';
import { Pane } from 'tweakpane';
import { RenderStatsComponent } from '../../../../phaser-genesis/src/scenes/RenderStatsComponent';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import WinBox from '../../live/libs/winbox/js/winbox.js';

class Demo extends Scene
{
    pane: Pane;
    world: StaticWorld;
    renderStats: any;

    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(ImageFile('frog', 'assets/frog.png'));
        loader.add(ImageFile('redfrog', 'assets/redfrog.png'));

        loader.start().then(() => {

            this.world = new StaticWorld(this);

            const frogs = [];

            for (let i = 0; i < 100; i++)
            {
                const x = Between(0, 800);
                const y = Between(0, 600);

                AddChild(this.world, new Sprite(x, y, 'frog'));
            }

            for (let i = 0; i < 100; i++)
            {
                const x = Between(0, 800);
                const y = Between(0, 600);

                frogs.push(AddChild(this.world, new Sprite(x, y, 'redfrog')));
            }

            for (let i = 0; i < 100; i++)
            {
                const x = Between(0, 800);
                const y = Between(0, 600);

                AddChild(this.world, new Sprite(x, y, 'frog'));
            }

            this.renderStats = {
                gameFrame: 0,
                numScenes: 0,
                numWorlds: 0,
                numGameObjects: 0,
                numGameObjectsRendered: 0,
                numDirtyLocalTransforms: 0,
                numDirtyWorldTransforms: 0,
                numDirtyVertices: 0,
                numDirtyWorldLists: 0,
                numDirtyCameras: 0
            };

            On(this.world, 'update', (delta) => {

                frogs.forEach(frog => {
                    frog.rotation += 0.01;
                });
    
            });

            On(game, 'step', () => {

                const id = this.world.sceneManager.id;
                const stats = this.renderStats;

                stats.gameFrame = RenderStatsComponent.gameFrame[id];
                stats.numScenes = RenderStatsComponent.numScenes[id];
                stats.numWorlds = RenderStatsComponent.numWorlds[id];
                stats.numGameObjects = RenderStatsComponent.numGameObjects[id];
                stats.numGameObjectsRendered = RenderStatsComponent.numGameObjectsRendered[id];
                stats.numDirtyLocalTransforms = RenderStatsComponent.numDirtyLocalTransforms[id];
                stats.numDirtyWorldTransforms = RenderStatsComponent.numDirtyWorldTransforms[id];
                stats.numDirtyVertices = RenderStatsComponent.numDirtyVertices[id];
                stats.numDirtyWorldLists = RenderStatsComponent.numDirtyWorldLists[id];
                stats.numDirtyCamera = RenderStatsComponent.numDirtyCameras[id];

                this.pane.refresh();

            });

            this.createWindow();
            this.testUPlot();

        });
    }

    testUPlot ()
    {
        const examplesWindow = new WinBox({ 
            title: 'Render Stats',
            class: [ 'no-full' ],
            root: window.parent.top.document.body,
            x: 16,
            y: 300,
            width: 800,
            height: 600,
            iframe: 'stats.html'
        });

    }

    createWindow ()
    {
        this.pane = new Pane();

        // const format = (v: number) => Math.trunc(v);

        const folder = this.pane.addFolder({ title: 'Render Stats' });

        folder.addMonitor(this.renderStats, 'gameFrame', { label: 'Frame' });
        folder.addMonitor(this.renderStats, 'numScenes', { label: 'Scenes' });
        folder.addMonitor(this.renderStats, 'numWorlds', { label: 'Worlds' });
        folder.addMonitor(this.renderStats, 'numGameObjects', { label: 'Total' });
        folder.addMonitor(this.renderStats, 'numGameObjectsRendered', { label: 'Rendered' });
        folder.addMonitor(this.renderStats, 'numDirtyLocalTransforms', { label: 'local' });
        folder.addMonitor(this.renderStats, 'numDirtyWorldTransforms', { label: 'world' });
        folder.addMonitor(this.renderStats, 'numDirtyVertices', { label: 'vertices' });
        folder.addMonitor(this.renderStats, 'numDirtyWorldLists', { label: 'lists' });
    }

}

const game = new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
