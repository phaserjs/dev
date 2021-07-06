import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';
import { Sprite, Text } from '../../../../phaser-genesis/src/gameobjects/';

import { AddChild } from '../../../../phaser-genesis/src/display/';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GameInstance } from '../../../../phaser-genesis/src/GameInstance';
import { GetRenderer } from '../../../../phaser-genesis/src/config/renderer';
import { IWebGLRenderer } from '../../../../phaser-genesis/src/renderer/webgl1/IWebGLRenderer';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { TextureFile } from '../../../../phaser-genesis/src/loader/files';
import { WebGLRenderer } from '../../../../phaser-genesis/src/renderer/webgl1';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        // const d = new Text(10, 10, 'Hello World', '12px monospace');

        // d.backgroundStyle = '#000000';
        // d.lineSpacing = 2;

        // d.origin.set(0, 0);

        // const log = [];

        // for (const [ key, value ] of Object.entries(this.game.renderer.compression))
        // {
        //     log.push(`${key}: ${value}`);

        //     if (value !== null)
        //     {
        //         for (const key2 in value)
        //         {
        //             log.push(`--- ${key2}`);
        //         }
        //     }
        // }

        // d.setText(log);

        //  Works, but no alpha channel
        // await TextureFile('test', 'assets/compressed/atlas-pvr-dxt1.pvr').load();

        //  Works on Windows / Mac OS with alpha channel
        // await TextureFile('test', 'assets/compressed/atlas-pvr-dxt5.pvr').load();

        //  Android?
        // await TextureFile('test', 'assets/compressed/atlas-pvr-etc2-rgba.pvr').load();

        //  iOS
        // await TextureFile('test', 'assets/compressed/atlas-pvr-pvrtci2bpp-rgba.pvr').load();
        // await TextureFile('test', 'assets/compressed/atlas-pvr-pvrtci4bpp-rgba.pvr').load();
        // await TextureFile('test', 'assets/compressed/atlas-pvr-rgba-astc-4x4.pvr').load();
        await TextureFile('test', 'assets/compressed/eac-r11-unorm-linear.pvr').load();

        const d = new Text(10, 10, 'red boi', '12px monospace');
        d.origin.set(0, 0);
        // d.backgroundStyle = '#000000';
        // d.text = 'RGBA knickers';

        const world = new StaticWorld(this);

        const sprite = new Sprite(0, 0, 'test');

        sprite.origin.set(0, 0);

        AddChild(world, sprite);
        AddChild(world, d);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d77),
    Scenes(Demo)
);
