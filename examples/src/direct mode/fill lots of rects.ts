import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { FillRect } from '../../../../phaser-genesis/src/renderer/webgl1/draw/FillRect';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetColorSpectrum } from '../../../../phaser-genesis/src/color/GetColorSpectrum';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WorldPostRenderEvent } from '../../../../phaser-genesis/src/world/events';
import { Wrap } from '../../../../phaser-genesis/src/math';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const colors = GetColorSpectrum();

        let c = 0;
        let f = 0;

        On(world, WorldPostRenderEvent, (renderPass: IRenderPass) => {

            for (let y = 0; y < 600; y += 8)
            {
                f = Wrap(c + y, 0, colors.length - 1);

                const color1 = colors[Math.floor(f)];

                FillRect(renderPass, 0, y, 400, 8, color1.r, color1.g, color1.b, 1);

                f = Wrap(c - y, 0, colors.length - 1);

                const color2 = colors[Math.floor(f)];

                FillRect(renderPass, 400, y, 400, 8, color2.r, color2.g, color2.b, 1);
            }

            c += 4;

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
