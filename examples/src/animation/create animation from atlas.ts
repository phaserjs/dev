import { AddAnimationFromAtlas, AnimatedSprite, Play } from '../../../../phaser-genesis/src/gameobjects/animatedsprite';
import { AtlasFile, ImageFile } from '../../../../phaser-genesis/src/loader/files';
import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChildren } from '../../../../phaser-genesis/src/display/';
import { CreateAnimationFromAtlas } from '../../../../phaser-genesis/src/animation';
import { Game } from '../../../../phaser-genesis/src/Game';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects/';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(ImageFile('background', 'assets/farm-background.png'));
        loader.add(AtlasFile('chicken', 'assets/chicken.png', 'assets/chicken.json'));

        loader.start().then(() => {

            // const world = new StaticWorld(this);

            const anim = CreateAnimationFromAtlas({
                key: 'peck',
                texture: 'chicken',
                prefix: '__orange_chicken_peck_',
                end: 9,
                zeroPad: 3
            });

            console.log(anim);

            // const bg = new Sprite(400, 300, 'background');

            // const chicken1 = new AnimatedSprite(100, 450, 'chicken', '__orange_chicken_idle_000');
            // const chicken2 = new AnimatedSprite(320, 320, 'chicken', '__orange_chicken_idle_000');
            // const chicken3 = new AnimatedSprite(600, 400, 'chicken', '__orange_chicken_idle_000');

            // AddAnimationFromAtlas({ key: 'lay', prefix: '__orange_chicken_lay_egg_', end: 9, zeroPad: 3 }, chicken1);
            // AddAnimationFromAtlas({ key: 'idle', prefix: '__orange_chicken_idle_', end: 19, zeroPad: 3 }, chicken2);
            // AddAnimationFromAtlas({ key: 'peck', prefix: '__orange_chicken_peck_', end: 9, zeroPad: 3 }, chicken3);

            // Play('lay', { repeat: -1, speed: 16, delay: 1000, repeatDelay: 4000 }, chicken1);
            // Play('idle', { repeat: -1, speed: 24, repeatDelay: 1000 }, chicken2);
            // Play('peck', { repeat: -1, speed: 24, delay: 2000, repeatDelay: 3000 }, chicken3);

            // AddChildren(world, bg, chicken1, chicken2, chicken3);

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
