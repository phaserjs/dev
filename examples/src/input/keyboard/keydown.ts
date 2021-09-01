import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { Between } from '../../../../../phaser-genesis/src/math';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../../phaser-genesis/src/textures/GetTexture';
import { Keyboard } from '../../../../../phaser-genesis/src/input/keyboard';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { On } from '../../../../../phaser-genesis/src/events';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects/';
import { SpriteSheetFile } from '../../../../../phaser-genesis/src/loader/files/';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(SpriteSheetFile('fruits', 'assets/32x32-item-pack.png', { frameWidth: 32 }));

        loader.start().then(() => {

            const world = new StaticWorld(this);
            const keyboard = new Keyboard();
    
            console.log(GetTexture('fruits'));

            On(keyboard, 'keydown', (event: KeyboardEvent) => {
    
                let frame = Math.max(0, event.key.charCodeAt(0) - 96);

                if (frame > 36)
                {
                    frame = 36;
                }
    
                const x = Between(0, 800);
                const y = Between(0, 600);
    
                const sprite = new Sprite(x, y, 'fruits', frame);
    
                AddChild(world, sprite);
            });

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
