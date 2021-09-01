import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { Between } from '../../../../../phaser-genesis/src/math';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { LoadSpriteSheetFile } from '../../../../../phaser-genesis/src/loader/files/LoadSpriteSheetFile';
import { On } from '../../../../../phaser-genesis/src/events';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects/';
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
        await LoadImageFile('sky', 'assets/sky5.png');
        await LoadSpriteSheetFile('witches', 'assets/witches-95x80x1.png', { frameWidth: 95, frameHeight: 80, spacingX: 1, spacingY: 1 });

        const world = new StaticWorld(this);

        AddChild(world, new Sprite(400, 300, 'sky'));

        const witches = [];

        for (let i = 0; i < 256; i++)
        {
            const x = Between(-200, 1000);
            const y = Between(0, 600);
            const f = Between(0, 2);

            const witch = new Sprite(x, y, 'witches', f * 3);

            witches.push(witch);

            AddChild(world, witch);
        }

        On(world, 'update', () => {

            witches.forEach(witch => {

                witch.x += Number(witch.frame.key) + 2;

                if (witch.x > 1000)
                {
                    witch.x = -200;
                }

            });

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x59010c),
    Scenes(Demo)
);
