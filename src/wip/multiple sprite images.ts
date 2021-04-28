import { AddChild, AddChildren } from '../src/display/';
import { BackgroundColor, CanvasRenderer, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

import { Game } from '../src/Game';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Loader } from '../src/loader/Loader';
import { Scene } from '../src/scenes/Scene';
import { Sprite } from '../src/gameobjects/';
import { StaticWorld } from '../src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const loader = new Loader();

        loader.setPath('/phaser4-examples/public/assets/');
        // loader.setPath('/examples/public/assets/');

        loader.add(ImageFile('logo', 'logo.png'));
        loader.add(ImageFile('256', 'f-texture.png'));
        loader.add(ImageFile('64', 'box-item-boxed.png'));
        loader.add(ImageFile('32', 'shinyball.png'));
        loader.add(ImageFile('16', 'skull.png'));

        loader.start(() => {

            AddChild(world, new Sprite(400, 200, '256'));
            AddChild(world, new Sprite(400, 300, 'logo'));
            AddChild(world, new Sprite(400, 400, '64'));
            AddChild(world, new Sprite(400, 500, '32'));
            AddChild(world, new Sprite(400, 550, '16'));

        });

    }
}

export default function (): void
{
    new Game(
        WebGLRenderer(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
