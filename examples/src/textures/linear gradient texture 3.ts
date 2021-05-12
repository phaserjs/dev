import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display/';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LinearGradientTexture } from '../../../../phaser-genesis/src/textures/types';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects/';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const gradient = LinearGradientTexture({
            width: 512,
            height: 512,
            x1: 512,
            y1: 512,
            colorStops: [
                { offset: 0.0, color: '#2989cc' },
                { offset: 0.5, color: '#ffffff' },
                { offset: 0.51, color: '#906a00' },
                { offset: 0.64, color: '#d99f00' },
                { offset: 0.64, color: '#d99f00' },
                { offset: 1.0, color: '#ffffff' }
            ]
        });

        const sunset = new Sprite(400, 300, gradient);
        
        AddChild(world, sunset);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
