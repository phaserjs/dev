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
        const path = 'assets/compressed';

        await LoadTextureFile('test', {
            'ASTC': { type: 'PVR', textureURL: `${path}/textures-astc-4x4.pvr`, atlasURL: `${path}/textures.json` },
            'PVRTC': { type: 'PVR', textureURL: `${path}/textures-pvrtc-4bpp-rgba.pvr`, atlasURL: `${path}/textures-pvrtc-4bpp-rgba.json` },
            'S3TC': { type: 'PVR', textureURL: `${path}/textures-dxt5.pvr`, atlasURL: `${path}/textures-dxt5.json` },
            'IMG': { textureURL: `${path}/textures.png`, atlasURL: `${path}/textures.json` }
        });

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
