import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { RenderLayer, Sprite } from '../../../../phaser-genesis/src/gameobjects/';

import { AddChildren } from '../../../../phaser-genesis/src/display/AddChildren';
import { Between } from '../../../../phaser-genesis/src/math/Between';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { QuadVertexComponent } from '../../../../phaser-genesis/src/components/vertices/QuadVertexComponent';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.preload();
    }

    async preload ()
    {
        await ImageFile('background', 'assets/farm-background.png');
        await ImageFile('ayu', 'assets/ayu.png');
        await ImageFile('logo', 'assets/logo.png');
        await ImageFile('rocket', 'assets/rocket.png');
        await ImageFile('farm', 'assets/farm-logo.png');
        await ImageFile('star', 'assets/star.png');
        await ImageFile('bubble', 'assets/bubble256.png');

        this.create();
    }

    create ()
    {
        const world = new StaticWorld(this);

        const layer = new RenderLayer();

        const bg = new Sprite(400, 300, 'background');
        const logo = new Sprite(200, 300, 'logo');
        const ayu = new Sprite(600, 300, 'ayu');
        const farm = new Sprite(200, 150, 'farm');
        const rocket = new Sprite(150, 500, 'rocket');
        const bubble = new Sprite(400, 450, 'bubble');
        const star = new Sprite(650, 500, 'star');

        AddChildren(layer, ayu, farm, rocket, bubble, logo);

        AddChildren(world, bg, layer, star);

        document.body.onclick = () =>
        {
            AddChildren(layer, new Sprite(Between(0, 800), Between(0, 600), 'star'));
        };
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
