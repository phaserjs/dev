import { AddChild, DisplayDebugTools } from '../../../../phaser-genesis/src/display';
import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AtlasFile } from '../../../../phaser-genesis/src/loader/files';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetRandom } from '../../../../phaser-genesis/src/utils/array/GetRandom';
import { Loader } from '../../../../phaser-genesis/src/loader';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse/Mouse';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(AtlasFile('atlas', 'assets/atlas-notrim.png', 'assets/atlas-notrim.json'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            DisplayDebugTools(world);

            AddChild(world, new Sprite(400, 200, 'atlas', 'logo'));

            const rotating = [];

            On(world, 'update', () => {

                rotating.forEach(frog => {
                    frog.rotation += 0.01;
                });
    
            });

            const frames = [ 'brain', 'orange-cat1', 'box-item-boxed', 'phaser_tiny', 'lemming', 'beball1', 'skull', 'sonic', 'phaser-ship', 'clown', 'carrot', 'mushroom-32x32', 'shinyball' ];

            const mouse = new Mouse();

            let i = 1;

            On(mouse, 'pointerdown', (pointerX, pointerY) => {

                const sprite = AddChild(world, new Sprite(pointerX, pointerY, 'atlas', GetRandom(frames) ));

                sprite.name = sprite.frame.key.toString() + i.toString();

                if (pointerX > 400)
                {
                    rotating.push(sprite);
                }
                
                i++;

            });

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
