import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { LocalMatrix2DComponent } from '../../../../../phaser-genesis/src/components/transform/LocalMatrix2DComponent';
import { On } from '../../../../../phaser-genesis/src/events';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects/';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';
import { Transform2DComponent } from '../../../../../phaser-genesis/src/components/transform/Transform2DComponent';
import { WorldMatrix2DComponent } from '../../../../../phaser-genesis/src/components/transform/WorldMatrix2DComponent';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(ImageFile('rocket', 'assets/rocket.png'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const rocket = new Sprite(400, 300, 'rocket');
            const rocket2 = new Sprite(200, 100, 'rocket');
            const rocket3 = new Sprite(600, 500, 'rocket');

            AddChild(world, rocket);
            AddChild(world, rocket2);
            AddChild(world, rocket3);

            window.addEventListener('mousedown', () => {

                Transform2DComponent.x[world.id] += 10;

            });

            On(this, 'update', () => {

                rocket.rotation += 0.01;
                rocket2.rotation -= 0.01;
                rocket3.rotation -= 0.01;

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
