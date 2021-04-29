import { AddChild, AddChildren } from '../src/display';
import { BackgroundColor, CanvasRenderer, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

import { Game } from '../src/Game';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Loader } from '../src/loader/Loader';
import { Scene } from '../src/scenes/Scene';
import { Sprite } from '../src/gameobjects';
import { StaticWorld } from '../src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const loader = new Loader();

        loader.setPath('/phaser4-examples/public/assets/');
        // loader.setPath('/examples/public/assets/');

        loader.add(ImageFile('tex1', 'beball1.png'));
        loader.add(ImageFile('tex2', 'car.png'));
        loader.add(ImageFile('tex3', 'carrot.png'));
        loader.add(ImageFile('tex4', 'clown.png'));
        loader.add(ImageFile('tex5', 'lemming.png'));
        loader.add(ImageFile('tex6', 'mushroom-32x32.png'));
        loader.add(ImageFile('tex7', 'muzzleflash2.png'));
        loader.add(ImageFile('tex8', 'orange-cat1.png'));
        loader.add(ImageFile('tex9', 'orb-blue.png'));
        loader.add(ImageFile('tex10', 'orb-red.png'));
        loader.add(ImageFile('tex11', 'brain.png'));
        loader.add(ImageFile('tex12', 'phaser_tiny.png'));
        loader.add(ImageFile('tex13', 'phaser-ship.png'));
        loader.add(ImageFile('tex14', 'red.png'));
        loader.add(ImageFile('tex15', '32x32.png'));
        loader.add(ImageFile('tex16', 'shinyball.png'));
        loader.add(ImageFile('tex17', 'skull.png'));
        loader.add(ImageFile('tex18', 'sonic.png'));
        loader.add(ImageFile('tex19', 'star.png'));
        loader.add(ImageFile('tex20', 'box-item-boxed.png'));

        loader.start(() => {

            let i = 1;

            //  5 x 4 (160 x 150)
            for (let y = 0; y < 4; y++)
            {
                for (let x = 0; x < 5; x++)
                {
                    AddChild(world, new Sprite((x * 160) + 80, (y * 150) + 75, 'tex' + i));
                    i++;
                }
            }

        });
    }
}

export default function (): void
{
    new Game(
        WebGLRenderer(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
