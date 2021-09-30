import * as GL_CONST from '../../../../phaser-genesis/src/renderer/webgl1/GL_CONST';

import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadAtlasFile } from '../../../../phaser-genesis/src/loader/files/LoadAtlasFile';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { LoadSpriteSheetFile } from '../../../../phaser-genesis/src/loader/files/LoadSpriteSheetFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { TileSprite } from '../../../../phaser-genesis/src/gameobjects/tilesprite/TileSprite';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        const pixelArt = { glConfig: { minFilter: GL_CONST.NEAREST, magFilter: GL_CONST.NEAREST }};

        await LoadImageFile('cat', 'assets/orange-cat1.png', pixelArt);
        await LoadAtlasFile('atlas', 'assets/atlas-trimmed.png', 'assets/atlas-trimmed.json', pixelArt);
        await LoadAtlasFile('atlasnotrim', 'assets/atlas-notrim.png', 'assets/atlas-notrim.json', pixelArt);
        await LoadSpriteSheetFile('grid', 'assets/gridtiles.png', { frameWidth: 32, frameHeight: 32 }, pixelArt);

        const world = new StaticWorld(this);

        const bob = new TileSprite(20, 20, 'cat');

        // const bob = new TileSprite(20, 20, 'atlas', 'brain');
        // const bob = new TileSprite(20, 20, 'atlasnotrim', 'brain');
        // const bob = new TileSprite(20, 20, 'grid', 30);

        bob.tileScale.set(4, 2);
        // bob.rotation = 0.2;

        AddChild(world, bob);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
