import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Easing, Wrap } from '../../../../phaser-genesis/src/math';

import { AddTween } from '../../../../phaser-genesis/src/motion/tween/nano/AddTween';
import { CSVFile } from '../../../../phaser-genesis/src/loader/files';
import { Cache } from '../../../../phaser-genesis/src/cache/Cache';
import { DrawFrame } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawFrame';
import { FillRect } from '../../../../phaser-genesis/src/renderer/webgl1/draw/FillRect';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetColorSpectrum } from '../../../../phaser-genesis/src/color/GetColorSpectrum';
import { GetTexture } from '../../../../phaser-genesis/src/textures/GetTexture';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SpriteSheetFile } from '../../../../phaser-genesis/src/loader/files/SpriteSheetFile';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { Vec2 } from '../../../../phaser-genesis/src/math/vec2';
import { WorldPostRenderEvent } from '../../../../phaser-genesis/src/world/events';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.preload();
    }

    async preload ()
    {
        const loader = new Loader();

        loader.add(SpriteSheetFile('tiles', 'assets/fantasy-tiles.png', { frameWidth: 64 }));
        loader.add(CSVFile('map', 'assets/minimap.csv'));

        await loader.start();

        //  Parse the csv data
        const data = (Cache.getEntry('CSV', 'map') as string).split('\n').flatMap(row => row.split(','));

        const mapData = data.map(tile => Number(tile));

        const texture = GetTexture('tiles');

        const world = new StaticWorld(this);

        const offset = new Vec2(0, 0);

        const colors = GetColorSpectrum(512);

        AddTween(offset).to(3000, { x: -224 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);
        AddTween(offset).to(6000, { y: -424 }).yoyo(true).repeat(-1);

        On(world, WorldPostRenderEvent, (renderPass: IRenderPass) => {

            //  The background
            for (let y = 0; y < 600; y += 8)
            {
                let f = Wrap((Math.abs(offset.y) + y) * 0.4, 0, colors.length - 1);

                FillRect(renderPass, 0, y, 800, 8, colors[Math.floor(f)]);
            }

            let x = 0;
            let y = 0;

            mapData.forEach(tile => {

                if (tile !== -1)
                {
                    DrawFrame(renderPass, texture, tile, Math.floor(offset.x + x), Math.floor(offset.y + y));
                }

                x += 64;

                //  map width = 1024px (16 tiles)
                if (x === 1024)
                {
                    x = 0;
                    y += 64;
                }

            });

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0ac6d3),
    Scenes(Demo)
);
