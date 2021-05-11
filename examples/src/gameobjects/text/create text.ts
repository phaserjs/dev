import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';
import { Text } from '../../../../../phaser-genesis/src/gameobjects/text';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const text = new Text(400, 300, 'Phaser 4', '96px Arial Black');

        AddChild(world, text);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
