import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display';
import { Between } from '../../../../../phaser-genesis/src/math';
import { DirectDraw } from '../../../../../phaser-genesis/src/gameobjects';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files';
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

        dd.render = () =>
        {
            dd.box(100, 100, 600, 400, 3, 0xffff00);

            dd.circle(400, 300, 128, 0xff0000);

            dd.triangle(350, 250, 350, 450, 550, 450, 0x00a651);

            dd.rect(90, 50, 256, 128, 0xec008c);

            dd.line(100, 100, 700, 500, 1, 0xffff00);
        };

        console.log(dd);

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
