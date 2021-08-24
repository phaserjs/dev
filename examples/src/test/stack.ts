import { AddChild, AddChildren, ConsoleTreeChildren } from '../../../../phaser-genesis/src/display/';
import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';
import { Layer, Sprite } from '../../../../phaser-genesis/src/gameobjects/';

import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SetWillUpdateChildren } from '../../../../phaser-genesis/src/components/permissions/SetWillUpdateChildren';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    world: StaticWorld;

    constructor ()
    {
        super();

        this.world = new StaticWorld(this);

        this.create();
    }

    async create ()
    {
        await ImageFile('256', 'assets/f-texture.png');
        await ImageFile('64', 'assets/box-item-boxed.png');
        await ImageFile('32', 'assets/shinyball.png');
        await ImageFile('16', 'assets/skull.png');

        const parent = new Sprite(400, 300, '256');

        AddChild(this.world, parent);

        const layer = new Layer();

        SetWillUpdateChildren(layer.id, false);

        for (let y = 0; y < 12; y++)
        {
            for (let x = 0; x < 13; x++)
            {
                AddChild(layer, new Sprite(x * 64, y * 64, '32'));
            }
        }

        AddChild(this.world, layer);

        const layer2 = new Layer();

        SetWillUpdateChildren(layer2.id, false);

        for (let y = 0; y < 12; y++)
        {
            for (let x = 0; x < 13; x++)
            {
                AddChild(layer2, new Sprite(x * 64, y * 64, '16'));
            }
        }

        AddChild(layer, layer2);

        const front = new Sprite(300, 400, '256');

        AddChild(this.world, front);

        const front2 = new Sprite(500, 200, '256');

        AddChild(this.world, front2);

        front.setAlpha(0.25);
        front2.setAlpha(0.25);

        // ConsoleTreeChildren(this.world);
    }
}

const msg = document.createElement('p');

msg.innerText = `Please wait, generating Sprites`;
msg.style.paddingLeft = '150px';

const game = new Game(
    WebGL(),
    GlobalVar('Phaser4'),
    Size(800, 600),
    Parent('gameParent'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);

const button = document.createElement('button');
button.innerText = 'Pause';
button.onclick = () => {
    game.isPaused = true;
}

document.body.appendChild(msg);
document.body.appendChild(button);
