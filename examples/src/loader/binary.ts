import { BackgroundColor, DefaultOrigin, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Sprite, Text } from '../../../../phaser-genesis/src/gameobjects';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadBinaryFile } from '../../../../phaser-genesis/src/loader/files';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        const file = await LoadBinaryFile('enigma', 'assets/mods/enigma.mod');

        const buffer = new Uint8Array(file.data as ArrayBuffer);

        const signature = this.getString(buffer, 1080, 1084);
        const text = new Text(32, 32, `Signature: ${signature}`);

        const title = this.getString(buffer, 0, 20)
        const text2 = new Text(32, 64, `Title: ${title}`);

        //  Get the sample data
        const sampleText = [];

        for (let i = 0; i < 31; i++)
        {
            const st = 20 + i * 30;

            sampleText.push(this.getString(buffer, st, st + 22));
        }

        var text3 = new Text(400, 32, sampleText);

        const world = new StaticWorld(this);

        AddChild(world, text);
        AddChild(world, text2);
        AddChild(world, text3);
    }

    //   getString scans the binary file between the two values given, 
    //   returning the characters it finds there as a string

    getString (buffer: Uint8Array, start: number, end: number): string
    {
        let output = '';
    
        for (let i = start; i < end; i++)
        {
            output += String.fromCharCode(buffer[i]);
        }
    
        return output;
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0072bc),
    DefaultOrigin(0, 0),
    Scenes(Demo)
);
