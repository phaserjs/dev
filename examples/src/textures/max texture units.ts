import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetMaxTextures } from '../../../../phaser-genesis/src/config/maxtextures';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
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
        const loader = new Loader();

        loader.add(
            ImageFile('disk1', 'assets/items/disk1.png'),
            ImageFile('disk2', 'assets/items/disk2.png'),
            ImageFile('disk3', 'assets/items/disk3.png'),
            ImageFile('disk4', 'assets/items/disk4.png'),
            ImageFile('disk5', 'assets/items/disk5.png'),
            ImageFile('disk6', 'assets/items/disk6.png'),
            ImageFile('disk7', 'assets/items/disk7.png'),
            ImageFile('floppy1', 'assets/items/floppy1.png'),
            ImageFile('floppy2', 'assets/items/floppy2.png'),
            ImageFile('floppy3', 'assets/items/floppy3.png'),
            ImageFile('floppy4', 'assets/items/floppy4.png'),
            ImageFile('floppy5', 'assets/items/floppy5.png'),
            ImageFile('floppy6', 'assets/items/floppy6.png'),
            ImageFile('floppy7', 'assets/items/floppy7.png'),
            ImageFile('tape1', 'assets/items/tape1.png'),
            ImageFile('tape2', 'assets/items/tape2.png'),
            ImageFile('tape3', 'assets/items/tape3.png'),
            ImageFile('tape4', 'assets/items/tape4.png'),
            ImageFile('tape5', 'assets/items/tape5.png'),
            ImageFile('tape6', 'assets/items/tape6.png'),
            ImageFile('tape7', 'assets/items/tape7.png'),
            ImageFile('record1', 'assets/items/record1.png'),
            ImageFile('record2', 'assets/items/record2.png'),
            ImageFile('record3', 'assets/items/record3.png'),
            ImageFile('record4', 'assets/items/record4.png'),
            ImageFile('record5', 'assets/items/record5.png'),
            ImageFile('record6', 'assets/items/record6.png'),
            ImageFile('record7', 'assets/items/record7.png'),
            ImageFile('flower1', 'assets/items/flower1.png'),
            ImageFile('flower2', 'assets/items/flower2.png'),
            ImageFile('flower3', 'assets/items/flower3.png'),
            ImageFile('flower4', 'assets/items/flower4.png'),
            ImageFile('flower5', 'assets/items/flower5.png'),
            ImageFile('flower6', 'assets/items/flower6.png'),
            ImageFile('flower7', 'assets/items/flower7.png'),
            ImageFile('book1', 'assets/items/book1.png'),
            ImageFile('book2', 'assets/items/book2.png'),
            ImageFile('book3', 'assets/items/book3.png'),
            ImageFile('book4', 'assets/items/book4.png'),
            ImageFile('book5', 'assets/items/book5.png'),
            ImageFile('book6', 'assets/items/book6.png'),
            ImageFile('book7', 'assets/items/book7.png')
        );

        await loader.start();

        const world = new StaticWorld(this);

        //  How many textures does this GPU support?
        const maxTextures = GetMaxTextures();

        console.log('max?', maxTextures);

        let x = 64;
        let y = 64;
        let d = 1;
        const frames = [ 'floppy', 'tape', 'record', 'flower', 'book' ];
        let frame = 'disk';

        //  This demo will support up to 42 texture units, but even an RTX 2080 only has 32

        for (let i = 0; i < maxTextures; i++)
        {
            AddChild(world, new Sprite(x, y, `${frame}${d}`));

            x += 48;

            if (x === 736)
            {
                x = 64;
                y += 48;
            }

            d++;

            if (d === 8)
            {
                d = 1;
                frame = frames.shift();
            }
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
