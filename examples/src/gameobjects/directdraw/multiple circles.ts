import * as Easing from '../../../../../phaser-genesis/src/math/easing';

import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display';
import { AddTween } from '../../../../../phaser-genesis/src/motion/tween/nano/AddTween';
import { DirectDraw } from '../../../../../phaser-genesis/src/gameobjects';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { GetColorFromRGB } from '../../../../../phaser-genesis/src/color/GetColorFromRGB';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        const world = new StaticWorld(this);

        const dd = new DirectDraw();

        const pos = { x: -2, y: -2 };

        AddTween(pos).to(2500, { x: 2 }).easing(Easing.Sine.InOut).yoyo(true).repeat(-1);
        AddTween(pos).to(5000, { y: 2 }).easing(Easing.Sine.InOut).yoyo(true).repeat(-1);

        dd.render = () =>
        {
            let c = 1;
            let r = 5;

            for (let i = 0; i < 64; i++)
            {
                dd.circle(400 - (i * pos.x), 300 - (i * pos.y), 256 * c, GetColorFromRGB(r, 0, 0));

                r += (250 / 64);
                c -= (1 / 64);
            }

        };

        AddChild(world, dd);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
