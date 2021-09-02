import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';
import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { Loader } from '../../../../phaser-genesis/src/loader';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

// CURRENTLY FAILS. This places a water tile inside of the world at a specific offset -- not *even* in a container -- but bounds are broken so this doesn't place.
// :(
class Demo extends Scene
{
    constructor ()
    {
        super();
        const loader = new Loader();
        loader.add(ImageFile('water', 'assets/textures/water.png'));
        loader.start().then(() => this.create());
    }
    create()
    {
        let world = new StaticWorld(this);
        let wB = world.getBounds();
        let sprite = new Sprite(0, 0, 'water');
        sprite.setOrigin(.5, 1);
        sprite.x = wB.width / 2;
        sprite.y = wB.height * 3 / 4;
        AddChild(world, sprite);
        // Currently fails, because bounds are kill :(
        console.log(`Placed ${sprite.getPosition()} within ${wB}`);
    }
}

new Game(
    WebGL(),
    GlobalVar('Phaser4'),
    Size(800, 600),
    Parent('gameParent'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
