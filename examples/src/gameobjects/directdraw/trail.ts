import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { Vec2, Vec2Clone } from '../../../../../phaser-genesis/src/math/vec2';

import { AddChild } from '../../../../../phaser-genesis/src/display';
import { AddTween } from '../../../../../phaser-genesis/src/motion/tween/nano/AddTween';
import { DirectDraw } from '../../../../../phaser-genesis/src/gameobjects';
import { Easing } from '../../../../../phaser-genesis/src/math';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../../phaser-genesis/src/textures';
import { LoadImageFile } from '../../../../../phaser-genesis/src/loader/files';
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
        await LoadImageFile('flash', 'assets/muzzleflash2.png');

        const world = new StaticWorld(this);

        const flash = GetTexture('flash');

        const dd = new DirectDraw();

        const trail = [];

        const position = new Vec2(60, 0);

        AddTween(position).to(3200, { x: 550 }).yoyo(true).repeat(-1).easing(Easing.Back.InOut);
        AddTween(position).to(2000, { y: 450 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);

        dd.render = () =>
        {
            trail.push(Vec2Clone(position));

            let alpha = 0;
            const alphaInc = 1 / trail.length;

            trail.forEach(pos =>
            {
                dd.image(flash, pos.x, pos.y, alpha);

                alpha += alphaInc;
            });

            if (trail.length > 128)
            {
                trail.shift();
            }
        };

        AddChild(world, dd);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x080808),
    Scenes(Demo)
);
