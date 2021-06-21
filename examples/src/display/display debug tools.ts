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

        loader.add(ImageFile('128', 'assets/128x128.png'));
        loader.add(ImageFile('512', 'assets/512x512.png'));
        loader.add(ImageFile('bubble', 'assets/bubble256.png'));
        loader.add(ImageFile('glove', 'assets/boxing-glove.png'));
        loader.add(ImageFile('brain', 'assets/brain.png'));
        loader.add(ImageFile('frog', 'assets/frog.png'));
        loader.add(ImageFile('redfrog', 'assets/redfrog.png'));
        loader.add(AtlasFile('atlas', 'assets/atlas-notrim.png', 'assets/atlas-notrim.json'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            // const parent = new Sprite(200, 200, '128');
            // const child1 = new Sprite(0, 0, 'brain');
            // const child2 = new Sprite(100, 0, 'brain');

            // AddChild(world, parent);
            // AddChild(parent, child1);
            // AddChild(parent, child2);

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
