import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display/AddChild';
import { CreateCanvas } from '../../../../phaser-genesis/src/textures/CreateCanvas';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../phaser-genesis/src/textures/GetTexture';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Rectangle } from '../../../../phaser-genesis/src/gameobjects/index';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        const world = new StaticWorld(this);

        //  7 x 7 squares
        //  8 chars per row (56 pixels)
        await ImageFile('font', 'assets/tinyfont.png', { getImage: true });

        const texture = GetTexture('font');

        const ctx = CreateCanvas(56, 70);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 56, 70);
        ctx.drawImage(texture.image, 0, 0);

        // document.body.appendChild(ctx.canvas);

        const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_\'#"\\/<>()@`;

        let x = 0;
        let y = 0;

        for (let c = 0; c < chars.length; c++)
        {
            console.log(chars[c], 'from', x, y);

            const imgData = ctx.getImageData(x, y, 7, 7);
            const data = imgData.data;
            const char = [];
            let line = '';
    
            for (let i = 0; i < data.length; i += 4)
            {
                const r = data[i];

                if (r === 0)
                {
                    line = line.concat(' ');
                }
                else if (r === 100)
                {
                    line = line.concat('.');
                }
                else
                {
                    line = line.concat('#');
                }

                if (i > 0 && i % 7 === 0)
                {
                    char.push(line);
                    line = '';
                }
            }

            // console.log(chars[c], JSON.stringify(char));
            console.log(chars[c], char);

            x += 7;

            if (c > 0 && c % 7 === 0)
            {
                x = 0;
                y += 7;
            }
        }
    }
}

const game = new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
