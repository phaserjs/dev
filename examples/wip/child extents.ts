import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { AtlasFile } from '../../../../phaser-genesis/src/loader/files';
import { Between } from '../../../../phaser-genesis/src/math';
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
        loader.add(AtlasFile('atlas', 'assets/atlas-notrim.png', 'assets/atlas-notrim.json'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const frogs = [];

            AddChild(world, new Sprite(100, 100, 'frog'));
            AddChild(world, new Sprite(200, 100, 'frog'));
            const b = AddChild(world, new Sprite(300, 100, 'atlas', 'logo'));

            b.alpha = 0.5;
            // b.tint = 0x00ffff;

            for (let i = 0; i < 100; i++)
            {
                const x = Between(0, 800);
                const y = Between(0, 600);

                // AddChild(world, new Sprite(x, y, 'atlas', 'lemming'));
            }

            On(world, 'update', () => {

                frogs.forEach(frog => {
                    frog.rotation += 0.01;
                });
    
            });

            const mouse = new Mouse();

            On(mouse, 'pointerdown', (pointerX, pointerY) => {

                if (pointerX < 400)
                {
                    AddChild(world, new Sprite(pointerX, pointerY, 'frog'));
                }
                else
                {
                    frogs.push(AddChild(world, new Sprite(pointerX, pointerY, 'redfrog')));
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
