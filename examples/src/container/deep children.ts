import { AddChild, AddChildren, ConsoleTreeChildren, GetBounds, RemoveChild, SetBounds } from '../../../../phaser-genesis/src/display/';

import { Game } from '../../../../phaser-genesis/src/Game';
import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';
import { On } from '../../../../phaser-genesis/src/events';
import { Layer, Rectangle, Sprite } from '../../../../phaser-genesis/src/gameobjects/';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { SetInteractive } from '../../../../phaser-genesis/src/input';
import { IGameObject } from '../../../../phaser-genesis/src/gameobjects/IGameObject';

class Demo extends Scene
{
    constructor ()
    {
        super();
        const loader = new Loader();

        loader.setPath('assets/');

        loader.add(ImageFile('cursor', 'drawcursor.png'));
        loader.add(ImageFile('box', 'box-item-boxed.png'));
        loader.add(ImageFile('star', 'star.png'));
        loader.add(ImageFile('32', '32x32.png'));
        loader.add(ImageFile('128', '128x128.png'));
        loader.add(ImageFile('skull', 'skull.png'));

        loader.start().then(() => this.create());
    }

    create ()
    {
        let world = new StaticWorld(this);
        let count = 0;
        let nextLog = 0;

        let mouse = new Mouse();

        let cursor = new Sprite(0, 0, 'cursor');
        cursor.name = 'cursor';
        AddChild(world, cursor);
        On(mouse, 'pointermove', (x, y) => cursor.setPosition(x, y));

        const wB = world.camera.bounds;
        console.log('world bounds', JSON.stringify(wB));
        let stars:IGameObject[] = [];
        for (let i = wB.x; i < wB.right; i += 64) {
            let container = new Rectangle(i, i, 64, 64);
            AddChild(world, container);
            console.log('Added new container', container.getBounds());
            count++;
            let star = new Sprite(container.width / 2, container.height / 2, 'star');
            star.name = `star-${i}`;
            stars.push(star);
            AddChild(container, star);
            shrinkwrap(container);
            SetInteractive(star);
            console.log('Added new star at', star.getBounds(), 'inside of', star.parent.getBounds());
        }
        let target:IGameObject = undefined;
        let startT = 0;
        On(mouse, 'pointerdown', (x, y) => {
            console.log('Starting click:');
            for (let star of stars) {
                if (mouse.hitTest(star)) {
                    target = star;
                    console.log('Found star:', star);
                    return;
                }
            }
            target = undefined;
            return;
        });
        On(mouse, 'pointerup', (_x, _y) => target = undefined);

    
        On(this, 'update', (delta, time) =>
        {
            if (time > nextLog) {
                nextLog = time + 5 * 1000;
                console.log(`There are ${count} containers`);
                // ConsoleTreeChildren(world);
            }
            if (!target) {
                startT = undefined;
                return
            }
            if (target && !startT) {
                startT = time;
            }
            // Figure out the width & height of displacement:
            let tip = target.parent;
            let tB = target.getBounds();
            let dx = mouse.localPoint.x - tB.x;
            let dy = mouse.localPoint.y - tB.y;
            let newCount = Math.floor(Math.abs(dx) + Math.abs(dy));
            let parent = target.parent;
            let pointer = parent;

            // Move the child down to a tree of nested rects:
            RemoveChild(parent, target);
            for (let i = 0; i < newCount; ++i) {
                let child = new Rectangle(Math.sign(dx), Math.sign(dy), 16, 16);
                count++;
                AddChild(pointer, child);
                pointer = child;
            }
            AddChild(pointer, target);

            // Then: shrinkwrap the sizes to bound the previous position + children (including star).
            while(true) {
                pointer = shrinkwrap(pointer);
                if (pointer == world || !pointer) {break}
            }
        });
    }
}
function shrinkwrap(pointer:IGameObject) {
    let pbounds = GetBounds(pointer, ...pointer.children);
    SetBounds(pbounds.x, pbounds.y, pbounds.width, pbounds.height, pointer);
    // We probably need to counter-adjust the children's positions?
    return pointer.parent;
}

new Game(
    WebGL(),
    GlobalVar('Phaser4'),
    Size(800, 600),
    Parent('gameParent'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
