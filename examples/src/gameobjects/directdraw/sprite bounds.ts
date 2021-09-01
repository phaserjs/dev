import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { DirectDraw, Sprite } from '../../../../../phaser-genesis/src/gameobjects';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../../phaser-genesis/src/loader/files';
import { On } from '../../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('rocket', 'assets/rocket.png');
        await LoadImageFile('ball', 'assets/energy-ball.png');
        await LoadImageFile('eye', 'assets/lance-overdose-loader-eye.png');

        const world = new StaticWorld(this);

        const sprite1 = new Sprite(220, 180, 'rocket');
        const sprite2 = new Sprite(400, 300, 'ball');
        const sprite3 = new Sprite(600, 420, 'eye');

        const dd = new DirectDraw();

        dd.render = () =>
        {
            let bounds = sprite1.getBounds();
            dd.box(bounds.x, bounds.y, bounds.width, bounds.height, 1, 0xffff00);

            bounds = sprite2.getBounds();
            dd.box(bounds.x, bounds.y, bounds.width, bounds.height, 1, 0xff00ff);

            bounds = sprite3.getBounds();
            dd.box(bounds.x, bounds.y, bounds.width, bounds.height, 1, 0x00ff00);
        };

        AddChildren(world, sprite1, sprite2, sprite3, dd);

        On(world, 'update', () => {

            sprite3.rotation += 0.01;

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
