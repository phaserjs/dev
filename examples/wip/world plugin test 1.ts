import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '../src/config';
import { Off, On } from '../src/events';

import { AddChildren } from '../src/display';
import { AddedToWorldEvent } from '../src/gameobjects/events/AddedToWorldEvent';
import { Between } from '../src/math';
import { Game } from '../src/Game';
import { GetRandom } from '../src/utils/array/GetRandom';
import { IBaseWorld } from '../src/world/IBaseWorld';
import { IEventInstance } from '../src/events/IEventInstance';
import { IGameObject } from '../src/gameobjects/IGameObject';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Loader } from '../src/loader/Loader';
import { Scene } from '../src/scenes/Scene';
import { Sprite } from '../src/gameobjects';
import { StaticWorld } from '../src/world/StaticWorld';
import { UppercaseFirst } from '../src/utils/string/UppercaseFirst';

class DemoPlugin
{
    world: IBaseWorld;

    syllables: string[];

    private _listener: IEventInstance;

    constructor (world: IBaseWorld)
    {
        this.world = world;

        this.syllables = [ 'fro', 'tir', 'nag', 'bli', 'mon', 'fay', 'shi', 'zag', 'blarg', 'rash', 'izen' ];

        this._listener = On(world, AddedToWorldEvent, (child: IGameObject) => this.addedToWorld(child));
    }

    addedToWorld (child: IGameObject)
    {
        child.name = this.getName();
    }

    getName ()
    {
        let name = '';

        for (let i = 0; i < Between(2, 4); i++)
        {
            name = name.concat(GetRandom(this.syllables));
        }

        return UppercaseFirst(name);
    }

    shutdown (): void
    {
        Off(this.world, AddedToWorldEvent, this._listener);
    }
}

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const plugin = new DemoPlugin(world);

        const loader = new Loader();

        loader.setPath('/phaser4-examples/public/assets/');
        // loader.setPath('/examples/public/assets/');

        loader.add(ImageFile('logo', 'logo.png'));
        loader.add(ImageFile('rocket', 'rocket.png'));
        loader.add(ImageFile('star', 'star.png'));
        loader.add(ImageFile('bubble', 'bubble256.png'));

        loader.start().then(() => {

            const logo = new Sprite(400, 100, 'logo').setRotation(0.5);
            const rocket = new Sprite(200, 300, 'rocket');

            AddChildren(world, logo, rocket);

            console.log('logo', logo.name);
            console.log('rocket', rocket.name);

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
