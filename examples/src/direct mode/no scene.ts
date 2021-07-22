import { BackgroundColor, GlobalVar, Parent, WebGL } from '../../../../phaser-genesis/src/config';

import { CreateGame } from '../../../../phaser-genesis/src/CreateGame';
import { DrawImage } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawImage';
import { GetTexture } from '../../../../phaser-genesis/src/textures/GetTexture';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { On } from '../../../../phaser-genesis/src/events/On';

CreateGame(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d)
).then(async game => {

    await ImageFile('gundam', 'assets/gundam-ex-maxi-on-half.jpg').load();

    const texture = GetTexture('gundam');

    On(game, 'render', (renderPass: IRenderPass) => {

        DrawImage(renderPass, texture, -80, 30);

    });

});
