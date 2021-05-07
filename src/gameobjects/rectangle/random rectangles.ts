import { BackgroundColor, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display/';
import { Between } from '../../../../phaser-genesis/src/math';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetColorSpectrum } from '../../../../phaser-genesis/src/color';
import { Rectangle } from '../../../../phaser-genesis/src/gameobjects/';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const colors = GetColorSpectrum(256);

        for (let i = 0; i < 256; i++)
        {
            const x = Between(0, 800);
            const y = Between(0, 600);
            const w = Between(8, 96);
            const h = Between(8, 96);

            const rect = new Rectangle(x, y, w, h, colors[i]);

            AddChild(world, rect);
        }
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    BackgroundColor(0x000000),
    Scenes(Demo)
);
