import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { DirectDraw, Layer, Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Between } from '../../../../phaser-genesis/src/math';
import { DebugSpriteIDTexture } from '../../../../phaser-genesis/src/textures/types/DebugSpriteIDTexture';
import { Game } from '../../../../phaser-genesis/src/Game';
import { Keyboard } from '../../../../phaser-genesis/src/input/keyboard';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse/Mouse';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SetWillUpdateChildren } from '../../../../phaser-genesis/src/components/permissions/SetWillUpdateChildren';
import { SpatialHashGrid } from '../../../../phaser-genesis/src/math/spatialgrid/SpatialHashGrid';
import { StartStats } from '../../live/libs/stats.js';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { UpdateTransforms } from '../../../../phaser-genesis/src/components/transform/UpdateTransforms';
import { WillUpdateChildren } from '../../../../phaser-genesis/src/components/permissions/WillUpdateChildren';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: RightKey;
    downKey: RightKey;

    camera: WorldCamera;

    cameraSpeed: number = 8;

    constructor ()
    {
        super();

        const keyboard = new Keyboard();

        this.leftKey = new LeftKey();
        this.rightKey = new RightKey();
        this.upKey = new UpKey();
        this.downKey = new DownKey();

        keyboard.addKeys(this.leftKey, this.rightKey, this.upKey, this.downKey);

        this.create();
    }

    create ()
    {
        const world = new StaticWorld(this);
        
        this.camera = world.camera;

        const debugTexture = DebugSpriteIDTexture();

        const grid = new SpatialHashGrid(100, 100);

        const dd = new DirectDraw();

        const mouse = new Mouse();

        const area = { x: 0, y: 0, width: 64, height: 22 };

        let results;

        On(mouse, 'pointermove', (x: number, y: number, button: number) => {

            area.x = x;
            area.y = y;

            results = grid.inView(area.x, area.y, area.width, area.height);

        });

        On(mouse, 'pointerdown', (x: number, y: number, button: number) => {

            area.x = x;
            area.y = y;

            results = grid.inView(area.x, area.y, area.width, area.height);

            console.log(results);

        });

        dd.render = () =>
        {
            // grid.cells.forEach((key, cell))


            /*
            const key1 = grid.getKey(area.left, area.top);
            const key2 = grid.getKey(area.right, area.bottom);

            let top;

            grid.debug.forEach(cell => {

                const { key, x, y, width, height } = cell;

                if (key === key1)
                {
                    top = { x, y };

                    if (key === key2)
                    {
                        dd.alpha = 0.2;
                        dd.rect(top.x, top.y, (x + width) - top.x, (y + height) - top.y, 0xffff00);
                    }
                }
                else if (key === key2)
                {
                    dd.alpha = 0.2;
                    dd.rect(top.x, top.y, (x + width) - top.x, (y + height) - top.y, 0xffff00);
                }

            });
            */

            dd.alpha = 1;
            dd.box(area.x, area.y, area.width, area.height, 1, 0xff0000);
        };

        AddChild(world, dd);

        for (let i = 0; i < 32; i++)
        {
            const x = Between(0, 800);
            const y = Between(0, 600);

            const sprite = new Sprite(x, y, debugTexture);

            sprite.setFrame(sprite.id);

            const child = AddChild(world, sprite);

            //  Because their transform is dirty right now
            UpdateTransforms(child.id, 0, 0, 800, 600, true);

            grid.add(child.id);
        }

        console.log(grid);

        // StartStats(this.game);
    }

    update (): void
    {
        if (!this.camera)
        {
            return;
        }

        if (this.leftKey.isDown)
        {
            this.camera.x += this.cameraSpeed;
        }
        else if (this.rightKey.isDown)
        {
            this.camera.x -= this.cameraSpeed;
        }

        if (this.upKey.isDown)
        {
            this.camera.y += this.cameraSpeed;
        }
        else if (this.downKey.isDown)
        {
            this.camera.y -= this.cameraSpeed;
        }
    }
}

window['game'] = new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
