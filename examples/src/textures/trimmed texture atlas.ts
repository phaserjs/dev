import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display/';
import { AtlasFile } from '../../../../phaser-genesis/src/loader/files';
import { Between } from '../../../../phaser-genesis/src/math';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetFrames } from '../../../../phaser-genesis/src/textures';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects/';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(AtlasFile('atlas', 'assets/atlas-trimmed.png', 'assets/atlas-trimmed.json'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const frames = GetFrames('atlas');

            for (const frame of frames)
            {
                const x = Between(100, 700);
                const y = Between(100, 500);

                const sprite = new Sprite(x, y, frame);

                AddChild(world, sprite);
            }

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x59010c),
    Scenes(Demo)
);
