import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { Mouse } from '../../../../../phaser-genesis/src/input/mouse/Mouse';
import { On } from '../../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects/index';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';
import { Text } from '../../../../../phaser-genesis/src/gameobjects/text';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('bg', 'assets/textures/metal.png');

        const world = new StaticWorld(this);

        AddChild(world, new Sprite(400, 300, 'bg'));

        const text = new Text(400, 300, 'Move the Mouse', '96px Arial Black');

        AddChild(world, text);

        const mouse = new Mouse();

        On(mouse, 'pointermove', (x, y) =>
        {
            text.setText(`x: ${x} y: ${y}`);
        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
