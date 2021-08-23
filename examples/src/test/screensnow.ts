import { BackgroundColor, BatchSize, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Between, FloatBetween } from '../../../../phaser-genesis/src/math';
import { Layer, Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { TRANSFORM, Transform2DComponent } from '../../../../phaser-genesis/src/components/transform/Transform2DComponent';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { DebugHierarchyComponent } from '../../../../phaser-genesis/src/components/hierarchy/DebugHierarchyComponent';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SetWillUpdateChildren } from '../../../../phaser-genesis/src/components/permissions/SetWillUpdateChildren';
import { SpriteSheetFile } from '../../../../phaser-genesis/src/loader/files/SpriteSheetFile';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WillUpdateChildren } from '../../../../phaser-genesis/src/components/permissions/WillUpdateChildren';

class Snowflake extends Sprite
{
    speedX: number;
    speedY: number;

    constructor ()
    {
        super(Between(-100, 900), Between(-100, 700), 'snow');

        this.speedX = FloatBetween(1, 4);
        this.speedY = FloatBetween(1, 4);
    }

    update (): void
    {
        this.x -= this.speedX;
        this.y += this.speedY;

        if (this.x < -100)
        {
            this.x = 900;
        }

        if (this.y > 700)
        {
            this.y = -100;
        }
    }
}

class Demo extends Scene
{
    world: StaticWorld;

    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await ImageFile('snow', 'assets/4x4.png');
        await SpriteSheetFile('balls', 'assets/balls.png', { frameWidth: 17 });

        const world = new StaticWorld(this);

        const layer = new Layer();

        let f = 0;

        for (let y = 0; y < 600; y += 20)
        {
            for (let x = 0; x < 800; x += 20)
            {
                AddChild(layer, new Sprite(x, y, 'balls', f));

                f++;

                if (f === 6)
                {
                    f = 0;
                }
            }
        }

        SetWillUpdateChildren(layer.id, false);

        AddChild(world, layer);

        for (let i = 0; i < total; i++)
        {
            const flake = new Snowflake();

            AddChild(world, flake);
        }
    }

    update (): void
    {
        const rs = window.renderStats;

        if (rs)
        {
            msg.innerText = `Frame: ${rs.gameFrame} - Game Objects: ${rs.numChildren} - Rendered: ${rs.rendered} - Updated: ${rs.updated} - Time: ${rs.updateMs}ms`;
        }
    }
}

const params = new URLSearchParams(document.location.search);
    
let total = parseInt(params.get('t'));

if (!total || total === 0)
{
    // total = 5000;
    total = 500;
}

const msg = document.createElement('p');

msg.innerText = `Please wait, generating Sprites`;
msg.style.paddingLeft = '150px';

const game = new Game(
    WebGL(),
    BatchSize(4096),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);

const button = document.createElement('button');
button.innerText = 'Pause';
button.onclick = () => {
    game.isPaused = true;
}

document.body.appendChild(msg);
document.body.appendChild(button);
