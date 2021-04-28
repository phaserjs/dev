import { AddChild, AddChildren, MoveToPosition } from '../src/display/';
import { BackgroundColor, CanvasRenderer, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

import { Game } from '../src/Game';
import { ISprite } from '../src/gameobjects/sprite/ISprite';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Loader } from '../src/loader/Loader';
import { Scene } from '../src/scenes/Scene';
import { Sprite } from '../src/gameobjects/';
import { StaticWorld } from '../src/world/StaticWorld';

class Demo extends Scene
{
    world: StaticWorld;

    constructor ()
    {
        super();

        this.world = new StaticWorld(this);

        const loader = new Loader();

        loader.add(ImageFile('logo', '/phaser4-examples/public/assets/logo.png'));
        loader.add(ImageFile('ayu', '/phaser4-examples/public/assets/ayu.png'));

        loader.start(() => this.create());
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

export default function (): void
{
    new Game(
        // CanvasRenderer(),
        WebGLRenderer(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
