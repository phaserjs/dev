import { AddChild, AddChildren, ConsoleTreeChildren, GetBounds, RemoveChild, SetBounds } from '../../../../phaser-genesis/src/display/';

import { Game } from '../../../../phaser-genesis/src/Game';
import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';
import { On } from '../../../../phaser-genesis/src/events';
import { Container, Rectangle, Sprite, Text } from '../../../../phaser-genesis/src/gameobjects/';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { Between } from '../../../../phaser-genesis/src/math';
import { IGameObject } from '../../../../phaser-genesis/src/gameobjects/IGameObject';

class Demo extends Scene
{
    constructor ()
    {
        super();
        let world = new StaticWorld(this);

        let headsup = new StaticWorld(this);
        let headsuptext = new Text(0, 0, '...', undefined, ).setOrigin(0, 0);
        headsuptext.strokeStyle = '#000';
        AddChild(headsup, headsuptext);

        let nextGrow = 0;
        let depth = 0;
        let total = 0;
        let slowUpdateCounts = [];

        const wB = world.camera.bounds;
        let container = new Container(wB.x, wB.y, wB.width, wB.height).setOrigin(0, 0);
        AddChild(world, container);
        let horizon:Container[] = [container];
        let newHorizon:Container[] = [];
        let h = 0;
        let pixels = 0;

        On(this, 'update', (delta, time) => {
            if (slowUpdateCounts.length < 10 && delta > 75) {
                slowUpdateCounts.push(total);
            }
            headsuptext.setText(`Time: ${time}\nDepth: ${depth} / Total: ${total}\nPixels: ${pixels}\nMissed frames @ totals: ${slowUpdateCounts}`);
            for (let i = 0; i < 1024 && h < horizon.length; ++i, ++h) {
                let parent = horizon[h];
                let isVertical = parent.width > parent.height;
                let newW = parent.width / (isVertical ? 2 : 1);
                let newH = parent.height / (isVertical ? 1 : 2);
                let a = new Container(0, 0, newW, newH).setOrigin(0, 0);
                let newX = isVertical ? a.width : 0;
                let newY = isVertical ? 0 : a.height;
                let b = new Container(newX, newY, newW, newH).setOrigin(0, 0);
                const rand = Math.random()
                if (rand < Math.pow(2, -depth)) {
                    if (rand & 0x01) {
                        pixels++;
                        AddChild(a, new Rectangle(0, 0, 1, 1, Between(0, 0xFFFFFF)));
                    }
                    if (rand & 0x10) {
                        pixels++;
                        AddChild(b, new Rectangle(0, 0, 1, 1, Between(0, 0xFFFFFF)));
                    }
                }
                AddChildren(parent, a, b);
                newHorizon.push(a, b);
                total += 2;
            }
            if (time > nextGrow && h >= horizon.length) {
                nextGrow = time + 500;

                h = 0;
                horizon = newHorizon;
                newHorizon = [];
                depth += 1;
            }
        });
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
