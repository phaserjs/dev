import { AddChild, AddChildren, ConsoleTreeChildren, GetBounds, RemoveChild, SetBounds } from '../../../../phaser-genesis/src/display/';

import { Game } from '../../../../phaser-genesis/src/Game';
import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';
import { On } from '../../../../phaser-genesis/src/events';
import { Rectangle, Sprite, Text } from '../../../../phaser-genesis/src/gameobjects/';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { SetInteractive } from '../../../../phaser-genesis/src/input';
import { IGameObject } from '../../../../phaser-genesis/src/gameobjects/IGameObject';
import { Between } from '../../../../phaser-genesis/src/math';

class Demo extends Scene
{
    constructor ()
    {
        super();
        const loader = new Loader();

        loader.setPath('assets/');

        loader.add(ImageFile('cursor', 'drawcursor.png'));
        loader.add(ImageFile('star', 'star.png'));

        loader.start().then(() => this.create());
    }

    create ()
    {
        let world = new StaticWorld(this);
        let headsup = new StaticWorld(this);
        let headsuptext = new Text(0, 0, '...').setOrigin(0, 0);
        headsuptext.strokeStyle = '#000';
        AddChild(headsup, headsuptext);

        let mouse = new Mouse();

        let cursor = new Sprite(0, 0, 'cursor');
        cursor.name = 'cursor';
        AddChild(world, cursor);
        On(mouse, 'pointermove', (x, y) => cursor.setPosition(x, y));

        const wB = world.camera.bounds;
        console.log('world bounds', JSON.stringify(wB));
        let stars:IGameObject[] = [];
        const starTexture = this.game.textureManager.get('star');
        const starDiameter = Math.max(starTexture.width, starTexture.height);
        let maxDepth = 0;
        let totalDepth = 0;
        for (let i = wB.x; i < wB.right; i += starDiameter) {
            let container = new Rectangle(i, i, starDiameter, starDiameter, Between(0, 0xFFFFFF));
            AddChild(world, container);
            let star = new Sprite(0, 0, 'star').setOrigin(0, 0);
            star.name = `star-${i}`;
            stars.push(star);
            AddChild(container, star);
            SetInteractive(star);
            ++totalDepth;
        }
        maxDepth = 1;

        let target:IGameObject = undefined;
        On(mouse, 'pointerdown', (x, y) => {
            for (let star of stars) {
                if (mouse.hitTest(star)) {
                    target = star;
                    return;
                }
            }
            target = undefined;
            return;
        });
        On(mouse, 'pointerup', (_x, _y) => target = undefined);
    
        On(this, 'update', (delta, time) =>
        {
            if (!target) { return }
            // Don't let this overrun one render pass.
            for (let i = 0; i < 1024; ++i) {
                let bounds = target.getBounds();
                let dx = mouse.localPoint.x - (bounds.right + bounds.x) / 2;
                let dy = mouse.localPoint.y - (bounds.bottom + bounds.y) / 2;
                if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
                    break;
                }
                let parent = target.parent;
                RemoveChild(parent, target);
                let adopter = new Rectangle(Math.sign(dx), Math.sign(dy), bounds.width, bounds.height, Between(0, 0xFFFFFF));
                AddChild(parent, adopter);
                AddChild(adopter, target);
                ++totalDepth;
            }
            // Then: shrinkwrap the sizes to bound the previous position + children (including star).
            let pointer = target;
            let i = 0;
            while (pointer && pointer != world) {
                let bounds = GetBounds(pointer, ...pointer.children);
                SetBounds(bounds.x, bounds.y, bounds.width, bounds.height, pointer);
                pointer = pointer.parent;
                ++i;
            }
            console.log(`Total(${totalDepth}; new depth for ${target.name}: ${i}`);
            maxDepth = Math.max(i, maxDepth);
            headsuptext.text = `Max depth: ${maxDepth}\nTotal depth: ${totalDepth}`;
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
