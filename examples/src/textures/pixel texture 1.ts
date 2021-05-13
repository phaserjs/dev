import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { PICO8 } from '../../../../phaser-genesis/src/textures/palettes';
import { PixelTexture } from '../../../../phaser-genesis/src/textures/types';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const texture = PixelTexture({
            data: [
                '..9..9..',
                '..9999..',
                '.AAAAAA.',
                '.A1F1FA.',
                '.AFFFFA.',
                '.FEEEEAA',
                '.EEEEEEA',
                '..E..E..'
            ],
            pixelWidth: 32,
            pixelHeight: 32,
            palette: PICO8
        });

        const princess = new Sprite(400, 300, texture);
        
        AddChild(world, princess);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
