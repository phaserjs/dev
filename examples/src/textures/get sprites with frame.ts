import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { AtlasFile } from '../../../../phaser-genesis/src/loader/files/AtlasFile';
import { Between } from '../../../../phaser-genesis/src/math/Between';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetChildrenFromParentID } from '../../../../phaser-genesis/src/components/hierarchy/GetChildrenFromParentID';
import { GetRandom } from '../../../../phaser-genesis/src/utils/array/GetRandom';
import { GetSpritesWithTexture } from '../../../../phaser-genesis/src/textures/GetSpritesWithTexture';
import { ISprite } from '../../../../phaser-genesis/src/gameobjects/sprite/ISprite';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { On } from '../../../../phaser-genesis/src/events/On';
import { RemoveTexture } from '../../../../phaser-genesis/src/textures/RemoveTexture';
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
            ImageFile('disk', 'assets/items/disk1.png'),
            ImageFile('floppy', 'assets/items/floppy2.png'),
            ImageFile('tape', 'assets/items/tape3.png'),
            AtlasFile('atlas', 'assets/atlas-trimmed.png', 'assets/atlas-trimmed.json')
        );

        await loader.start();

        const world = new StaticWorld(this);

        const frames = [ 'disk', 'floppy', 'tape' ];

        for (let i = 0; i < 32; i++)
        {
            const x = Between(0, 800);
            const y = Between(0, 600);

            AddChild(world, new Sprite(x, y, GetRandom(frames)));
        }

        const atlasFrames = [ 'brain', 'box-item-boxed', 'lemming', 'beball1' ];

        for (let i = 0; i < 32; i++)
        {
            const x = Between(0, 800);
            const y = Between(0, 600);

            AddChild(world, new Sprite(x, y, 'atlas', GetRandom(atlasFrames)));
        }

        const sprites: ISprite[] = GetChildrenFromParentID(world.id) as ISprite[];

        On(world, 'update', () => {

            sprites.forEach(sprite => {

                sprite.rotation += 0.01;

            });

        });

        setTimeout(() => {

            const sprites = GetSpritesWithTexture('atlas', 'lemming');
            
            sprites.forEach(sprite => {

                sprite.setScale(2);

            });

        }, 2000);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
