import { GlobalVar, Parent, WebGL } from '../../../../phaser-genesis/src/config';

import { FillRect } from '../../../../phaser-genesis/src/renderer/webgl1/draw/FillRect';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetColorSpectrum } from '../../../../phaser-genesis/src/color/GetColorSpectrum';
import { GetRGBArray } from '../../../../phaser-genesis/src/renderer/webgl1/colors/GetRGBArray';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { Wrap } from '../../../../phaser-genesis/src/math/Wrap';

class Test extends Game
{
    colors: number[];
    rgba: number[];
    offset: number;

    constructor ()
    {
        super(
            WebGL(),
            Parent('gameParent'),
            GlobalVar('Phaser4'),
        );

        this.colors = GetColorSpectrum();
        this.offset = 0;
        this.rgba = [];
    }

    render (renderPass: IRenderPass)
    {
        let f = 0;
        const rgba = this.rgba;
        const colors = this.colors;

        for (let y = 0; y < 600; y += 8)
        {
            f = Wrap(this.offset + y, 0, colors.length - 1);

            GetRGBArray(colors[Math.floor(f)], rgba);

            FillRect(renderPass, 0, y, 400, 8, rgba[0], rgba[1], rgba[2], rgba[3]);

            f = Wrap(this.offset - y, 0, colors.length - 1);

            GetRGBArray(colors[Math.floor(f)], rgba);

            FillRect(renderPass, 400, y, 400, 8, rgba[0], rgba[1], rgba[2], rgba[3]);
        }

        this.offset += 4;
    }
}

new Test();
