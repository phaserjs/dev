import * as Effects from '../../../../phaser-genesis/src/colormatrix/';

import { AddChild, AddChildren } from '../../../../phaser-genesis/src/display/';
import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SetPadding } from '../../../../phaser-genesis/src/gameobjects/text/SetPadding';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects/sprite/Sprite';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { Text } from '../../../../phaser-genesis/src/gameobjects/text/Text';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('pic', 'assets/traps.png');

        const world = new StaticWorld(this);

        const original = new Sprite(200, 150, 'pic');
        const variation1 = new Sprite(600, 150, 'pic');
        const variation2 = new Sprite(200, 450, 'pic');
        const variation3 = new Sprite(600, 450, 'pic');

        AddChildren(world, original, variation1, variation2, variation3);

        Effects.Saturate(variation1, 1.8);
        Effects.Sepia(variation2);
        Effects.ShiftToBGR(variation3);

        this.addLabel(world, original, 'Original');
        this.addLabel(world, variation1, 'Saturate');
        this.addLabel(world, variation2, 'Sepia');
        this.addLabel(world, variation3, 'ShiftToBGR');
    }

    addLabel (world, sprite, label)
    {
        const text = new Text(sprite.x - 160, sprite.y + 108, label);

        text.setOrigin(0, 0);
        
        SetPadding(0, 0, 8, 8, text);

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
