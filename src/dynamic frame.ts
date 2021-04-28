import * as Easing from '../src/math/easing';

import { AddChild, AddChildren } from '../src/display/';
import { BackgroundColor, BatchSize, Parent, Scenes, SetWebGL, Size } from '../src/config';

import { AddTween } from '../src/motion/tween/nano/AddTween';
import { Game } from '../src/Game';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Loader } from '../src/loader/Loader';
import { On } from '../src/events';
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

        if (window.location.href.includes('192.168.0.100/phaser-genesis/'))
        {
            loader.setPath('/phaser4-examples/public/assets/');
        }
        else
        {
            loader.setPath('/examples/public/assets/');
        }

        loader.add(ImageFile('fry', 'frymire-1024.png'));

        loader.start().then(() => {

            const pic = new Sprite(400, 300, 'fry');

            const dynamicFrame = pic.texture.addFrame('fakemask', 0, 0, 256, 640);

            pic.setFrame('fakemask');

            AddChildren(world, pic);

        });
    }
}

export default function (): void
{
    new Game(
        SetWebGL(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
