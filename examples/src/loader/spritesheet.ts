import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { FlatWorld } from '../../../../phaser-genesis/src/world';
import { Game } from '../../../../phaser-genesis/src/Game';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { SpriteSheetFile } from '../../../../phaser-genesis/src/loader/files';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await SpriteSheetFile('tiles', 'assets/fantasy-tiles.png', { frameWidth: 64, frameHeight: 64 });

        const world = new FlatWorld(this);

        AddChild(world, new Sprite(200, 200, 'tiles', 31));
        AddChild(world, new Sprite(400, 200, 'tiles', 32));
        AddChild(world, new Sprite(600, 200, 'tiles', 42));
        AddChild(world, new Sprite(200, 400, 'tiles', 49));
        AddChild(world, new Sprite(400, 400, 'tiles', 54));
        AddChild(world, new Sprite(600, 400, 'tiles', 55));
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
