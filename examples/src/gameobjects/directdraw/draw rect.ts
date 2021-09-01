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
        await ImageFile('logo', 'assets/logo.png');

        const world = new StaticWorld(this);

        const dd = new DirectDraw();

        dd.render = () =>
        {
            dd.rect(100, 100, 340, 240, 0xff0000);

            dd.alpha = 0.6;
            dd.rect(200, 200, 512, 64, 0xffff00);

            dd.alpha = 1;
            dd.rect(300, 300, 48, 210, 0xff00ff);
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
