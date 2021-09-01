import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Between } from '../../../../phaser-genesis/src/math';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse/Mouse';
import { On } from '../../../../phaser-genesis/src/events';
import { Pane } from 'tweakpane';
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

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const frogs = [];

			/*
			for (let i = 0; i < 10; i++)
            {
                const x = Between(0, 800);
                const y = Between(0, 600);

                AddChild(world, new Sprite(x, y, 'frog'));
            }

            for (let i = 0; i < 10; i++)
            {
                const x = Between(0, 800);
                const y = Between(0, 600);

                frogs.push(AddChild(world, new Sprite(x, y, 'redfrog')));
            }
			*/

            On(world, 'update', () => {

                frogs.forEach(frog => {
                    frog.rotation += 0.01;
                });
    
            });

            const mouse = new Mouse();

            On(mouse, 'pointerdown', pointerX => {

                const x = Between(0, 800);
                const y = Between(0, 600);

                if (pointerX < 400)
                {
                    for (let i = 0; i < 1; i++)
                    {
                        const x = Between(0, 800);
                        const y = Between(0, 600);
        
                        AddChild(world, new Sprite(x, y, 'frog'));
                    }
                }
                else
                {
                    for (let i = 0; i < 1; i++)
                    {
                        const x = Between(0, 800);
                        const y = Between(0, 600);
        
                        frogs.push(AddChild(world, new Sprite(x, y, 'redfrog')));
                    }
                }

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
