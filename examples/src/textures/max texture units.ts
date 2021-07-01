import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
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
        await ImageFile('disk1', 'assets/items/disk1.png').load();
        await ImageFile('disk2', 'assets/items/disk2.png').load();
        await ImageFile('disk3', 'assets/items/disk3.png').load();
        await ImageFile('disk4', 'assets/items/disk4.png').load();
        await ImageFile('disk5', 'assets/items/disk5.png').load();
        await ImageFile('disk6', 'assets/items/disk6.png').load();
        await ImageFile('disk7', 'assets/items/disk7.png').load();
        await ImageFile('floppy1', 'assets/items/floppy1.png').load();
        await ImageFile('floppy2', 'assets/items/floppy2.png').load();
        await ImageFile('floppy3', 'assets/items/floppy3.png').load();
        await ImageFile('floppy4', 'assets/items/floppy4.png').load();
        await ImageFile('floppy5', 'assets/items/floppy5.png').load();
        await ImageFile('floppy6', 'assets/items/floppy6.png').load();
        await ImageFile('floppy7', 'assets/items/floppy7.png').load();
        await ImageFile('tape1', 'assets/items/tape1.png').load();
        await ImageFile('tape2', 'assets/items/tape2.png').load();
        await ImageFile('tape3', 'assets/items/tape3.png').load();
        await ImageFile('tape4', 'assets/items/tape4.png').load();
        await ImageFile('tape5', 'assets/items/tape5.png').load();
        await ImageFile('tape6', 'assets/items/tape6.png').load();
        await ImageFile('tape7', 'assets/items/tape7.png').load();
        await ImageFile('record1', 'assets/items/record1.png').load();
        await ImageFile('record2', 'assets/items/record2.png').load();
        await ImageFile('record3', 'assets/items/record3.png').load();
        await ImageFile('record4', 'assets/items/record4.png').load();
        await ImageFile('record5', 'assets/items/record5.png').load();
        await ImageFile('record6', 'assets/items/record6.png').load();
        await ImageFile('record7', 'assets/items/record7.png').load();
        await ImageFile('flower1', 'assets/items/flower1.png').load();
        await ImageFile('flower2', 'assets/items/flower2.png').load();
        await ImageFile('flower3', 'assets/items/flower3.png').load();
        await ImageFile('flower4', 'assets/items/flower4.png').load();
        await ImageFile('flower5', 'assets/items/flower5.png').load();
        await ImageFile('flower6', 'assets/items/flower6.png').load();
        await ImageFile('flower7', 'assets/items/flower7.png').load();
        await ImageFile('book1', 'assets/items/book1.png').load();
        await ImageFile('book2', 'assets/items/book2.png').load();
        await ImageFile('book3', 'assets/items/book3.png').load();
        await ImageFile('book4', 'assets/items/book4.png').load();
        await ImageFile('book5', 'assets/items/book5.png').load();
        await ImageFile('book6', 'assets/items/book6.png').load();
        await ImageFile('book7', 'assets/items/book7.png').load();

        const world = new StaticWorld(this);

        let x = 64;
        let y = 64;

        for (let i = 1; i < 8; i++)
        {
            AddChild(world, new Sprite(x, y, `disk${i}`));

            x += 64;
        }

        x = 64;
        y += 64;

        for (let i = 1; i < 8; i++)
        {
            AddChild(world, new Sprite(x, y, `floppy${i}`));

            x += 64;
        }

        x = 64;
        y += 64;

        for (let i = 1; i < 8; i++)
        {
            AddChild(world, new Sprite(x, y, `tape${i}`));

            x += 64;
        }

        x = 64;
        y += 64;

        for (let i = 1; i < 8; i++)
        {
            AddChild(world, new Sprite(x, y, `record${i}`));

            x += 64;
        }

        x = 64;
        y += 64;

        for (let i = 1; i < 8; i++)
        {
            AddChild(world, new Sprite(x, y, `flower${i}`));

            x += 64;
        }

        x = 64;
        y += 64;

        for (let i = 1; i < 8; i++)
        {
            AddChild(world, new Sprite(x, y, `book${i}`));

            x += 64;
        }
    }

}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
