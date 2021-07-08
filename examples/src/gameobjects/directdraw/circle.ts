import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display';
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
            // dd.circle(400, 300, 128, 0xff0000);

            dd.triangle(300, 200, 300, 400, 500, 400, 0xffffff00);
            dd.triangle(100, 100, 300, 330, 500, 60, 0x88ff00ff);

            // dd.rect(0, 0, 128, 128, 0xffffff);
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
