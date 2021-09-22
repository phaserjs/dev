import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';
import { Sprite, Text } from '../../../../phaser-genesis/src/gameobjects/';

import { AddChild } from '../../../../phaser-genesis/src/display/';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadTextureFile } from '../../../../phaser-genesis/src/loader/files';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadTextureFile('labs', {
            'ASTC': 'assets/compressed/labs-astc-4x4.pvr',
            'ETC1': 'assets/compressed/labs-etc1.pvr',
            'PVRTC': 'assets/compressed/labs-pvrtc-4bpp-rgba-srgb.pvr',
            'S3TC': 'assets/compressed/labs-bc3-srgb.pvr',
            'IMG': 'assets/compressed/labs.png'
        });

        const world = new StaticWorld(this);

        const labs = new Sprite(400, 300, 'labs');

        const debug = new Text(10, 10, labs.texture.binding.format, '12px monospace').setOrigin(0);

        AddChild(world, labs);
        AddChild(world, debug);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d77),
    Scenes(Demo)
);
