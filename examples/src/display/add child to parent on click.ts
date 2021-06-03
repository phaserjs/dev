import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
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

        loader.add(ImageFile('frog', 'assets/frog.png'));
        loader.add(ImageFile('redfrog', 'assets/redfrog.png'));
        loader.add(ImageFile('wood', 'assets/textures/wooden-crate.png'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const parent1 = new Sprite(140, 300, 'wood');
            const parent2 = new Sprite(660, 300, 'wood');
    
            AddChild(world, parent1);
            AddChild(world, parent2);
    
            const mouse = new Mouse();
    
            On(mouse, 'pointerdown', (x: number, y: number) => {
    
                if (x < 400)
                {
                    AddChild(parent1, new Sprite(x - 140, y - 300, 'frog'));
                }
                else
                {
                    AddChild(parent2, new Sprite(x - 660, y - 300, 'redfrog'));
                }
    
            });

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
