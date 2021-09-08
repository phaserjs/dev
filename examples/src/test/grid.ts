import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { DirectDraw, Layer, Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Between } from '../../../../phaser-genesis/src/math';
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

    async create ()
    {
        await LoadImageFile('mushroom', 'assets/mushroom-32x32.png');

        const world = new StaticWorld(this);
        
        this.camera = world.camera;

        const grid = new SpatialHashGrid(0, 0, 800, 600, 100, 100);

        const ddGrid = new DirectDraw();

        ddGrid.render = () =>
        {
            grid.debug.forEach(cell => {

                const { x, y, width, height } = cell;

                ddGrid.box(x, y, width, height, 0.5, 0x00ff00);

            });
        };

        AddChild(world, ddGrid);

        const dd = new DirectDraw();

        const mouse = new Mouse();

        const area = { left: 80, top: 160, right: 300, bottom: 240, width: 220, height: 140 };

        let results = grid.intersects(area.left, area.top, area.right, area.bottom);

        On(mouse, 'pointermove', (x: number, y: number, button: number) => {

            area.left = x;
            area.top = y;
            area.right = x + area.width;
            area.bottom = y + area.height;

            results = grid.intersects(area.left, area.top, area.right, area.bottom);

        });

        dd.render = () =>
        {
            const key1 = grid.getKey(area.left, area.top);
            const key2 = grid.getKeyC(area.right, area.bottom);

            let top;

            grid.debug.forEach(cell => {

                const { key, x, y } = cell;

                if (key === key1)
                {
                    top = { x, y };
                }
                else if (key === key2)
                {
                    dd.alpha = 0.2;
                    dd.rect(top.x, top.y, x - top.x, y - top.y, 0xffff00);
                }

            });

            dd.alpha = 1;
            dd.box(area.left, area.top, area.width, area.height, 1, 0xff0000);

        };

        AddChild(world, dd);

        for (let i = 0; i < 32; i++)
        {
            const x = Between(0, 800);
            const y = Between(0, 600);

            const child = AddChild(world, new Sprite(x, y, 'mushroom'));

            //  Because their transform is dirty right now
            UpdateTransforms(child.id, 0, 0, 800, 600, true);

            grid.insert(child.id);
        }

        console.log(grid);

        results = grid.intersects(area.left, area.top, area.right, area.bottom);

        StartStats(this.game);
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
