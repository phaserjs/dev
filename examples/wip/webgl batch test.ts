import { AddChild, AddChildren } from '../src/display/';
import { BackgroundColor, BatchSize, DefaultOrigin, Parent, Scenes, SetWebGL, Size } from '../src/config';

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

        loader.add(ImageFile('32', 'shinyball.png'));

        loader.start().then(() => {

            //  450 sprites (batch size set to 256, so will be 2 draw calls to complete)
            for (let y = 0; y < 18; y++)
            {
                for (let x = 0; x < 25; x++)
                {
                    const ball = new Sprite(x * 32, y * 32, '32');

                    AddChild(world, ball);
                }
            }

        });
    }
}

export default function (): void
{
    new Game(
        SetWebGL(),
        BatchSize(256),
        DefaultOrigin(0),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
