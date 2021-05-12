import { AddChildren, OverlapBounds } from '../../../../phaser-genesis/src/display';
import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Sprite, Text } from '../../../../phaser-genesis/src/gameobjects';

import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(ImageFile('box', 'assets/box-item-boxed.png'));
        loader.add(ImageFile('mushroom', 'assets/mushroom-32x32.png'));
        loader.add(ImageFile('rocket', 'assets/rocket.png'));
        loader.add(ImageFile('eye', 'assets/lance-overdose-loader-eye.png'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const box = new Sprite(200, 300, 'box');
            const eye = new Sprite(400, 300, 'eye');
            const mushroom = new Sprite(600, 200, 'mushroom').setScale(4, 2);
            const rocket = new Sprite(200, 500, 'rocket').setSkew(-0.9, 0);

            const result = new Text(10, 10, 'Overlap: false').setOrigin(0);

            AddChildren(world, result, eye, mushroom, rocket, box);

            On(new Mouse(), 'pointermove', (x: number, y: number) => {

                box.setPosition(x, y);

                const overlapping = OverlapBounds(box, eye, mushroom, rocket);

                result.setText('Overlap: ' + overlapping);

                if (overlapping)
                {
                    box.tint = 0x00ff00;
                }
                else
                {
                    box.tint = 0xffffff;
                }
    
            });

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
