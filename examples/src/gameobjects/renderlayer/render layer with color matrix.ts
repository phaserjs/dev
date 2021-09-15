import * as Effects from '../../../../../phaser-genesis/src/colormatrix/';

import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { RenderLayer, Sprite } from '../../../../../phaser-genesis/src/gameobjects/';

import { AddChildren } from '../../../../../phaser-genesis/src/display/AddChildren';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { On } from '../../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { SetWillColorChildren } from '../../../../../phaser-genesis/src/components/permissions/SetWillColorChildren';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.setPath('assets/');

        loader.add(ImageFile('background', 'farm-background.png'));
        loader.add(ImageFile('ayu', 'ayu.png'));
        loader.add(ImageFile('logo', 'logo.png'));
        loader.add(ImageFile('rocket', 'rocket.png'));
        loader.add(ImageFile('farm', 'farm-logo.png'));
        loader.add(ImageFile('star', 'star.png'));
        loader.add(ImageFile('bubble', 'bubble256.png'));

        loader.start().then(() => this.create());
    }

    create ()
    {
        const world = new StaticWorld(this);

        const layer = new RenderLayer();

        SetWillColorChildren(layer.id, true);

        const bg = new Sprite(400, 300, 'background');
        const logo = new Sprite(200, 300, 'logo');
        const ayu = new Sprite(600, 300, 'ayu');
        const farm = new Sprite(200, 150, 'farm');
        const rocket = new Sprite(150, 500, 'rocket');
        const bubble = new Sprite(400, 450, 'bubble');
        const star = new Sprite(650, 500, 'star');

        //  Add these 5 children to the RenderLayer
        //  These will render to their own fbo, not on their own
        AddChildren(layer, ayu, logo, farm, rocket, bubble);

        //  The display list consists of 'bg', 'layer' and finally 'star'
        AddChildren(world, bg, layer, star);

        let h = 0;

        On(world, 'update', () =>
        {
            Effects.Hue(layer, h);

            h += 4;

            if (rocket.x < 800)
            {
                rocket.x += 1;
            }
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
