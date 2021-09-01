import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { Cache } from '../../../../phaser-genesis/src/cache/Cache';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadJSONFile } from '../../../../phaser-genesis/src/loader/files';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadJSONFile('items', 'assets/cartoon-items.json');

        const cache = Cache.get('JSON');

        console.log(cache.get('items'));
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
