import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { LoadCSVFile, LoadSpriteSheetFile } from '../../../../phaser-genesis/src/loader/files';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Cache } from '../../../../phaser-genesis/src/cache/Cache';
import { Game } from '../../../../phaser-genesis/src/Game';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
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
        await LoadCSVFile('map', 'assets/minimap.csv');
        await LoadSpriteSheetFile('tiles', 'assets/fantasy-tiles.png', { frameWidth: 64, frameHeight: 64 });

        //  Parse the csv data
        const data = (Cache.getEntry('CSV', 'map') as string).split('\n').flatMap(row => row.split(','));

        const mapData = data.map(tile => Number(tile));

        const world = new StaticWorld(this);

        let x = 0;
        let y = 0;

        mapData.forEach(tile => {

            if (tile !== -1)
            {
                AddChild(world, new Sprite(x, y, 'tiles', tile));
            }

            x += 64;

            //  map width = 1024px (16 tiles)
            if (x === 1024)
            {
                x = 0;
                y += 64;
            }

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d88),
    Scenes(Demo)
);
