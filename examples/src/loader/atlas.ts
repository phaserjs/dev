import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadAtlasFile } from '../../../../phaser-genesis/src/loader/files/LoadAtlasFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
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
        await LoadAtlasFile('items', 'assets/cartoon-items.png', 'assets/cartoon-items.json');

        const world = new StaticWorld(this);

        AddChild(world, new Sprite(200, 200, 'items', 'coin-silver-1'));
        AddChild(world, new Sprite(400, 200, 'items', 'pouch-1'));
        AddChild(world, new Sprite(600, 200, 'items', 'gem-1'));
        AddChild(world, new Sprite(200, 400, 'items', 'heart-1'));
        AddChild(world, new Sprite(400, 400, 'items', 'star-1'));
        AddChild(world, new Sprite(600, 400, 'items', 'meat-1'));
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
