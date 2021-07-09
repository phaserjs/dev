import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { CSVFile, SpriteSheetFile } from '../../../../../phaser-genesis/src/loader/files';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { Cache } from '../../../../../phaser-genesis/src/cache/Cache';
import { DirectDraw } from '../../../../../phaser-genesis/src/gameobjects';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../../phaser-genesis/src/textures';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await SpriteSheetFile('tiles', 'assets/fantasy-tiles.png', { frameWidth: 64,frameHeight: 64 }).load();
        await CSVFile('map', 'assets/minimap.csv').load();

        //  Parse the csv data into a number array
        const data = (Cache.getEntry('CSV', 'map') as string).split('\n').flatMap(row => row.split(','));

        const mapData = data.map(tile => Number(tile));

        const world = new StaticWorld(this);

        const tiles = GetTexture('tiles');

        const dd = new DirectDraw();

        dd.render = () =>
        {
            dd.tiles(tiles, 64, 64, mapData, 16);
        };

        AddChildren(world, dd);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
