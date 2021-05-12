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
            width: 256,
            height: 256,
            horizontal: true,
            colorStops: [
                { offset: 0.0, color: '#ff0000' },
                { offset: 0.15, color: '#ff00ff' },
                { offset: 0.33, color: '#0000ff' },
                { offset: 0.49, color: '#00ffff' },
                { offset: 0.67, color: '#00ff00' },
                { offset: 0.84, color: '#ffff00' },
                { offset: 1.0, color: '#ff0000' },
            ]
        });

        const sunset = new Sprite(400, 300, gradient);

        sunset.setScale(2);
        
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
