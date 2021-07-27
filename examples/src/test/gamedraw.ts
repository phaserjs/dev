import { GlobalVar, Parent, WebGL } from '../../../../phaser-genesis/src/config';

import { DirectDraw } from '../../../../phaser-genesis/src/gameobjects';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetColorSpectrum } from '../../../../phaser-genesis/src/color/GetColorSpectrum';
import { GetRGBArray } from '../../../../phaser-genesis/src/renderer/webgl1/colors/GetRGBArray';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';

class Test extends Game
{
    dd: DirectDraw;

    constructor ()
    {
        super(
            WebGL(),
            Parent('gameParent'),
            GlobalVar('Phaser4'),
        );

        this.dd = new DirectDraw();
    }

    render (renderPass: IRenderPass)
    {
        this.dd.renderGL(renderPass);

        this.dd.box(100, 100, 400, 300, 2, 0xffff00);
        this.dd.circle(400, 300, 128, 0xff00ff);
    }
}

new Test();
