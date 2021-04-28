import { AddChild, AddChildren } from '../src/display/';
import { BackgroundColor, CanvasRenderer, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

import { Game } from '../src/Game';
import { Scene } from '../src/scenes/Scene';
import { SolidColorTexture } from '../src/textures/types';
import { Sprite } from '../src/gameobjects/';
import { StaticWorld } from '../src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const block1 = new Sprite(100, 100, SolidColorTexture('#f00', 128, 128));
        const block2 = new Sprite(300, 100, SolidColorTexture('#0f0', 128, 128));
        const block3 = new Sprite(500, 100, SolidColorTexture('#00f', 128, 128));

        AddChildren(world, block1, block2, block3);
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
