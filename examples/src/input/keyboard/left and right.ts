import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { LeftKey, RightKey } from '../../../../../phaser-genesis/src/input/keyboard/keys';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/';
import { Keyboard } from '../../../../../phaser-genesis/src/input/keyboard';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { On } from '../../../../../phaser-genesis/src/events';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects/';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    player: Sprite;

    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(ImageFile('brain', 'assets/brain.png'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            this.player = new Sprite(400, 300, 'brain');

            const keyboard = new Keyboard();

            this.leftKey = new LeftKey();
            this.rightKey = new RightKey();
    
            keyboard.addKeys(this.leftKey, this.rightKey);
    
            AddChild(world, this.player);
    
            On(this, 'update', () => this.update());
    
            AddChild(world, this.player);

        });
    }

    update ()
    {
        if (this.leftKey.isDown)
        {
            this.player.x -= 4;
        }
        else if (this.rightKey.isDown)
        {
            this.player.x += 4;
        }
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
