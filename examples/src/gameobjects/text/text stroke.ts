import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { SetStrokeStyle, Text } from '../../../../../phaser-genesis/src/gameobjects/text';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const bit = 'Quite so!\nSaid the fox to the bear.\nJust exactly what\nare you doing\nover there?';

        const text = new Text(400, 300, bit, '30px Zapfino', '#c51b7d');

        SetStrokeStyle('#de77ae', 8, text);

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
