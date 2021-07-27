import { GlobalVar, Parent, WebGL } from '../../../../phaser-genesis/src/config';

import { FillRect } from '../../../../phaser-genesis/src/renderer/webgl1/draw';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetColorSpectrum } from '../../../../phaser-genesis/src/color/GetColorSpectrum';
import { GetRGBArray } from '../../../../phaser-genesis/src/renderer/webgl1/colors/GetRGBArray';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';

class Test extends Game
{
    constructor ()
    {
        super(
            WebGL(),
            Parent('gameParent'),
            GlobalVar('Phaser4'),
        );
    }

    render (renderPass: IRenderPass)
    {
        FillRect(renderPass, 100, 100, 400, 300, 255, 255, 0, 1);
    }
}

new Test();
