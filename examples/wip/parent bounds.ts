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
        await ImageFile('lemming', 'assets/lemming.png').load();
        await ImageFile('garfield', 'assets/orange-cat1.png').load();
        await ImageFile('clown', 'assets/clown.png').load();

        const world = new StaticWorld(this);

        AddChild(world, new Sprite(64, 64, 'mushroom'));

        const parent = new Container(200, 300);

        parent.name = 'Lemming Container';

        for (let i = 0; i < 4; i++)
        {
            const x = Between(-100, 100);
            const y = Between(-100, 100);

            AddChild(parent, new Sprite(x, y, 'lemming'));
        }

        const parent2 = new Container(400, 300);

        parent2.name = 'Cat Container';

        for (let i = 0; i < 4; i++)
        {
            const x = Between(-100, 100);
            const y = Between(-100, 100);

            AddChild(parent2, new Sprite(x, y, 'garfield'));
        }

        AddChildren(world, parent, parent2);

        const parent3 = new Container(600, 300);

        parent3.name = 'Deep Container';

        const parent4 = new Container(0, 0);

        parent4.name = 'Deep 1';

        AddChild(parent3, parent4);

        AddChild(parent3, new Sprite(0, 0, 'mushroom'));

        AddChild(parent4, new Sprite(50, 50, 'clown'));

        AddChildren(world, parent3);


        /*
        const dd = new DirectDraw();

        dd.render = () =>
        {
            // const bounds = parent.getBounds();

            dd.box(30, 30, 64, 64, 1, 0xff00ff);

            // dd.box(bounds.x, bounds.y, bounds.width, bounds.height, 1, 0xffff00);
        };

        AddChildren(world, parent, dd);

        console.log(parent.getDisplayData());
        */

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
