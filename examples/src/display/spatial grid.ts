import { AddChild, BringChildToTop } from '../../../../phaser-genesis/src/display';
import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { DirectDraw, Sprite } from '../../../../phaser-genesis/src/gameobjects';

import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse/Mouse';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await ImageFile('box', 'assets/box-item-boxed.png').load();

        const world = new StaticWorld(this);

        const mouse = new Mouse();

        const grid = world.spatialGrid;

        const dd = new DirectDraw();

        dd.render = () =>
        {
            grid.debug.forEach(cell =>
            {
                dd.box(cell.x, cell.y, cell.width, cell.height, 1, 0x00ff00);
            });
        };

        AddChild(world, dd);

        On(mouse, 'pointerdown', (x: number, y: number, button: number) => {

            const sprite = new Sprite(x, y, 'box');

            AddChild(world, sprite);

            // grid.insert(sprite.id);

            console.log(grid);

            BringChildToTop(dd);
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
