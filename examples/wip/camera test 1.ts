import { AddChild, AddChildren } from '../src/display/';
import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

import { Between } from '../src/math';
import { Game } from '../src/Game';
import { Keyboard } from '../src/input/keyboard';
import { Loader } from '../src/loader/Loader';
import { On } from '../src/events';
import { Scene } from '../src/scenes/Scene';
import { Sprite } from '../src/gameobjects/';
import { SpriteSheetFile } from '../src/loader/files/';
import { WebGLRenderer as W } from '../src/renderer/webgl1/WebGLRenderer';
import { World } from '../src/world/World';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.setPath('/phaser4-examples/public/assets/');

        loader.add(SpriteSheetFile('fruits', '32x32-item-pack.png', { frameWidth: 32 }));

        loader.start(() => this.create());
    }

    create ()
    {
        (this.game.renderer as W).optimizeRedraw = false;

        const world = new World(this);

        world.enableCameraCull = false;

        for (let i = 0; i < 256; i++)
        {
            const x = Between(-800, 0);
            const y = Between(0, 600);
            const f = Between(0, 35);

            AddChild(world, new Sprite(x, y, 'fruits', f));
        }

        for (let i = 0; i < 256; i++)
        {
            const x = Between(0, 800);
            const y = Between(0, 600);
            const f = Between(0, 35);

            AddChild(world, new Sprite(x, y, 'fruits', f));
        }

        for (let i = 0; i < 256; i++)
        {
            const x = Between(800, 1600);
            const y = Between(0, 600);
            const f = Between(0, 35);

            AddChild(world, new Sprite(x, y, 'fruits', f));
        }

        const keyboard = new Keyboard();

        On(keyboard, 'keydown', (event: KeyboardEvent) => {

            // const frame = parseInt(event.key);
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
