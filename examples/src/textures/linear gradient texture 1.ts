import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LinearGradientTexture } from '../../../../phaser-genesis/src/textures/types';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const gradient = LinearGradientTexture({
            width: 128,
            height: 128,
            colorStops: [
                { offset: 0.0, color: 'red' },
                { offset: 0.5, color: 'orange' },
                { offset: 1.0, color: 'yellow' },
            ]
        });

        const sunset = new Sprite(400, 300, gradient);

        sunset.setScale(4);
        
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
