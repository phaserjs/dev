import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(ImageFile('frog', 'assets/frog.png'));
        loader.add(ImageFile('knight', 'assets/knight.png'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const child1 = new Sprite(100, 300, 'knight');
            const child2 = new Sprite(200, 250, 'frog');
            const child3 = new Sprite(300, 300, 'knight');
            const child4 = new Sprite(400, 200, 'frog');
            const child5 = new Sprite(500, 300, 'knight');
            const child6 = new Sprite(600, 250, 'frog');
            const child7 = new Sprite(700, 300, 'knight');
    
            AddChild(world, child1);
            AddChild(world, child2);
            AddChild(world, child3);
            AddChild(world, child4);
            AddChild(world, child5);
            AddChild(world, child6);
            AddChild(world, child7);
    
        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0057b8),
    Scenes(Demo)
);
