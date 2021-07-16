import { AddChild, AddChildren } from '../../../../../phaser-genesis/src/display';
import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { Container, DirectDraw, GameObjectTree, Sprite } from '../../../../../phaser-genesis/src/gameobjects';

import { Between } from '../../../../../phaser-genesis/src/math';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files';
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
        await ImageFile('mushroom', 'assets/mushroom-32x32.png').load();

        const world = new StaticWorld(this);

        AddChild(world, new Sprite(64, 64, 'mushroom'));

        const parent = new Container(400, 300);

        parent.name = 'Parent';

        for (let i = 0; i < 32; i++)
        {
            const x = Between(-200, 200);
            const y = Between(-200, 200);

            AddChild(parent, new Sprite(x, y, 'mushroom'));
        }

        const dd = new DirectDraw();

        dd.render = () =>
        {
            // const bounds = parent.getBounds();

            dd.box(30, 30, 64, 64, 1, 0xff00ff);

            // dd.box(bounds.x, bounds.y, bounds.width, bounds.height, 1, 0xffff00);
        };

        AddChildren(world, parent, dd);

        console.log(parent.getDisplayData());

        // console.log(world.id, '>', GameObjectTree.get(world.id));
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
