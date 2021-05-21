import { AddChild, AddChildren } from '../../../../../phaser-genesis/src/display/';
import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../../phaser-genesis/src/config';

import { Game } from '../../../../../phaser-genesis/src/Game';
import { ISprite } from '../../../../../phaser-genesis/src/gameobjects/sprite/ISprite';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects/';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    world: StaticWorld;

    constructor ()
    {
        super();

        this.world = new StaticWorld(this);

        const loader = new Loader();

        loader.setPath('assets/');

        loader.add(ImageFile('logo', 'logo.png'));
        loader.add(ImageFile('ayu', 'ayu.png'));

        loader.start().then(() => this.create());
    }

    create ()
    {
        const logo = AddChild(this.world, new Sprite(400, 300, 'ayu'));
        const logo2 = AddChild(this.world, new Sprite(450, 350, 'logo'));
        const logo3 = AddChild(this.world, new Sprite(500, 450, 'logo'));

        logo2.alpha = 0.2;
        logo3.alpha = 0.5;
    }
}


new Game(
    // CanvasRenderer(),
    WebGL(),
    Size(800, 600),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
