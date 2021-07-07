import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';
import { Sprite, Text } from '../../../../phaser-genesis/src/gameobjects/';

import { AddChild } from '../../../../phaser-genesis/src/display/';
import { Game } from '../../../../phaser-genesis/src/Game';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { TextureFile } from '../../../../phaser-genesis/src/loader/files';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await TextureFile('test', {
            'ASTC': { type: 'PVR', textureURL: 'assets/compressed/astc-4x4-unorm-linear.pvr' },
            'PVRTC': { type: 'PVR', textureURL: 'assets/compressed/atlas-pvr-pvrtci2bpp-rgba.pvr' },
            'S3TC': { type: 'PVR', textureURL: 'assets/compressed/atlas-pvr-dxt5.pvr', atlasURL: 'assets/compressed/atlas-pvr-dxt5.json' },
            'IMG': { textureURL: 'assets/compressed/atlas-png.png', atlasURL: 'assets/compressed/atlas-png.json' }
        }).load();

        const world = new StaticWorld(this);

        const bubble = new Sprite(0, 40, 'test', 'bubble256').setOrigin(0);
        const logo = new Sprite(80, 100, 'test', 'logo').setOrigin(0);

        const debug = new Text(10, 10, bubble.texture.binding.format, '12px monospace').setOrigin(0);

        AddChild(world, bubble);
        AddChild(world, logo);
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
