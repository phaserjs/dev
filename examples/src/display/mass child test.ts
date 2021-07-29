import { BackgroundColor, BatchSize, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Between } from '../../../../phaser-genesis/src/math';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Carrot extends Sprite
{
    speed: number;

    constructor (x: number, y: number)
    {
        super(x, y, 'carrot');

        // this.speed = Between(0, 1);
        this.speed = Between(1, 8);
    }

    update (): void
    {
        this.x -= this.speed;

        if (this.x < -200)
        {
            this.x = 1000;
        }
    }
}

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await ImageFile('carrot', 'assets/2x2.png');

        const world = new StaticWorld(this);

        let total = 0;
        // const max = 95000;
        // const max = 25000;
        const max = 5000;

        setInterval(() => {

            if (total === max)
            {
                return;
            }

            for (let i = 0; i < 5000; i++)
            {
                const x = Between(-200, 1000);
                const y = Between(0, 600);
    
                AddChild(world, new Carrot(x, y));

                total++;
            }

            console.log(`${total} sprites`);

        }, 1000);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
