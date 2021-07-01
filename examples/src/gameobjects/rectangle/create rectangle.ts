import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChildren } from '../../../../../phaser-genesis/src/display/';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { Rectangle } from '../../../../../phaser-genesis/src/gameobjects/';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const rect1 = new Rectangle(272, 300, 128, 128, 0xff0000);
        const rect2 = new Rectangle(400, 300, 128, 128, 0x00ff00);
        const rect3 = new Rectangle(528, 300, 128, 128, 0x0000ff);

        console.log(rect1);
        // console.log(rect2);
        // console.log(rect3);

        AddChildren(world, rect1, rect2, rect3);

        window.bob = rect1;

        // AddChildren(world, rect1);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
