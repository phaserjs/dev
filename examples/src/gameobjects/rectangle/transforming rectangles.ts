import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChildren } from '../../../../../phaser-genesis/src/display/';
import { AddTween } from '../../../../../phaser-genesis/src/motion/tween/nano/AddTween';
import { Easing } from '../../../../../phaser-genesis/src/math';
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

        const rect1 = new Rectangle(272, 100, 128, 128, 0xff0000);
        const rect2 = new Rectangle(400, 300, 128, 128, 0x00ff00);
        const rect3 = new Rectangle(528, 300, 128, 128, 0x0000ff);

        AddChildren(world, rect1, rect2, rect3);

        AddTween(rect1).to(3000, { y: 500, rotation: 1 }).easing(Easing.Quartic.InOut).yoyo().repeat(-1);
        AddTween(rect2.scale).to(1000, { x: 0.1, y: 2 }).easing(Easing.Quartic.InOut).yoyo().repeat(-1);
        AddTween(rect3.skew).to(2000, { x: 2, y: 4 }).easing(Easing.Sine.InOut).yoyo().repeat(-1);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
