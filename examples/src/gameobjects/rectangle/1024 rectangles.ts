import { BackgroundColor, DefaultOrigin, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { GetColorSpectrum } from '../../../../../phaser-genesis/src/color';
import { Rectangle } from '../../../../../phaser-genesis/src/gameobjects/';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';
import { Wrap } from '../../../../../phaser-genesis/src/math';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const colors = GetColorSpectrum();

        let x = 0;
        let y = 0;

        colors.forEach(color => {

            const rect = new Rectangle(x, y, 15, 23, color.getColor());

            AddChild(world, rect);

            x = Wrap(x + 16, 0, 768);

            if (x === 0)
            {
                y += 24;
            }

        });
    }
}

new Game(
    DefaultOrigin(0, 0),
    WebGL(),
    GlobalVar('Phaser4'),
    Parent('gameParent'),
    BackgroundColor(0x000000),
    Scenes(Demo)
);
