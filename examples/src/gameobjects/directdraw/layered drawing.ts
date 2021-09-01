import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { DirectDraw, Sprite } from '../../../../../phaser-genesis/src/gameobjects';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../../phaser-genesis/src/textures';
import { LoadImageFile } from '../../../../../phaser-genesis/src/loader/files';
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
        await LoadImageFile('logo', 'assets/logo.png');
        await LoadImageFile('brain', 'assets/brain.png');

        const world = new StaticWorld(this);

        const logo = GetTexture('logo');
        const brain = GetTexture('brain');

        const dd = new DirectDraw();

        const distance = 300;
        const speed = 6;
        
        const max = 400;
        const xx = [];
        const yy = [];
        const zz = [];
        
        for (var i = 0; i < max; i++)
        {
            xx[i] = Math.floor(Math.random() * 800) - 400;
            yy[i] = Math.floor(Math.random() * 600) - 300;
            zz[i] = Math.floor(Math.random() * 1700) - 100;
        }
    
        dd.render = () =>
        {
            dd.rect(100, 100, 600, 400, 0x000000);
            dd.box(100, 100, 600, 400, 1, 0xffffff);

            for (let i = 0; i < max; i++)
            {
                const perspective = distance / (distance - zz[i]);

                const x = 400 + xx[i] * perspective;
                const y = 300 + yy[i] * perspective;
        
                zz[i] += speed;
        
                if (zz[i] > 300)
                {
                    zz[i] -= 600;
                }

                dd.plot(x, y);
            }

            dd.image(logo, 400 - (logo.width / 2), 300 - (logo.height / 2));
        };

        AddChildren(world, dd);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
