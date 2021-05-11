import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../../phaser-genesis/src/config';
import { SetFillStyle, Text } from '../../../../../phaser-genesis/src/gameobjects/text';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';
import { TextureManagerInstance } from '../../../../../phaser-genesis/src/textures/TextureManagerInstance';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(ImageFile('8x8', 'assets/8x8.png'));

        loader.start().then(() => this.create());
    }

    create ()
    {
        const world = new StaticWorld(this);

        const text1 = new Text(400, 100, 'Phaser 4 Text', '48px Arial Black');

        //  Hex notation
        SetFillStyle('#ff00ff', text1);

        const text2 = new Text(400, 200, 'Phaser 4 Text', '48px Arial Black');

        //  CSS color
        SetFillStyle('aquamarine', text2);

        const text3 = new Text(400, 300, 'Phaser 4 Text', '48px Arial Black');

        //  Functional notation
        SetFillStyle('rgb(200, 123, 50)', text3);

        const text4 = new Text(400, 400, 'Phaser 4 Text', '48px Arial Black');

        //  The gradient must be created on the context belonging to the Text object
        const gradient = text4.context.createLinearGradient(0, 0, 0, 32);

        gradient.addColorStop(0, 'lime');
        gradient.addColorStop(1, 'cyan');

        //  Canvas gradient
        SetFillStyle(gradient, text4);

        const text5 = new Text(400, 500, 'Phaser 4 Text', '48px Arial Black');

        const texture = TextureManagerInstance.get().get('8x8');

        //  The pattern must be created on the context belonging to the Text object
        const pattern = text5.context.createPattern(texture.image as HTMLImageElement, 'repeat');

        //  Canvas pattern
        SetFillStyle(pattern, text5);

        AddChildren(world, text1, text2, text3, text4, text5);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    Size(800, 600),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
