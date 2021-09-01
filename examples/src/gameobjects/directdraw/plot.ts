import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display';
import { DirectDraw } from '../../../../../phaser-genesis/src/gameobjects';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const dd = new DirectDraw();

        dd.render = () =>
        {
            dd.plot(100, 100, 0xffffff);
            dd.plot(200, 100, 0xffffff);
            dd.plot(300.5, 100, 0xffffff);
            dd.plot(400, 100.5, 0xffffff);
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
