import { AddChild, DisplayDebugTools } from '../../../../phaser-genesis/src/display';
import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AtlasFile } from '../../../../phaser-genesis/src/loader/files';
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

        loader.setPath('assets');

        loader.add(
            ImageFile('128', '128x128.png'),
            ImageFile('512', '512x512.png'),
            ImageFile('bubble', 'bubble256.png'),
            ImageFile('glove', 'boxing-glove.png'),
            ImageFile('brain', 'brain.png'),
            ImageFile('frog', 'frog.png'),
            ImageFile('redfrog', 'redfrog.png'),
            AtlasFile('atlas', 'atlas-notrim.png', 'atlas-notrim.json')
        );

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const parent = new Sprite(200, 200, '128');
            const child1 = new Sprite(0, 0, 'brain');
            const child2 = new Sprite(100, 0, 'frog');

            AddChild(world, parent);
            AddChild(parent, child1);
            AddChild(parent, child2);

            DisplayDebugTools(world);

        });
    }
}

const game = new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
