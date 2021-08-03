import { AddToDOM } from '../../../../phaser-genesis/src/dom/AddToDOM';
import { DOMContentLoaded } from '../../../../phaser-genesis/src/dom/DOMContentLoaded';
import { DirectDraw } from '../../../../phaser-genesis/src/gameobjects';
import { FillRect } from '../../../../phaser-genesis/src/renderer/webgl1/draw/FillRect';
import { GetColorSpectrum } from '../../../../phaser-genesis/src/color/GetColorSpectrum';
import { GetRGBArray } from '../../../../phaser-genesis/src/renderer/webgl1/colors/GetRGBArray';
import { SetConfigDefaults } from '../../../../phaser-genesis/src/config/SetConfigDefaults';
import { TextureManager } from '../../../../phaser-genesis/src/textures';
import { WebGLRenderer } from '../../../../phaser-genesis/src/renderer/webgl1/WebGLRenderer';

class MiniPhaser
{
    renderer: WebGLRenderer;
    textureManager: TextureManager;

    constructor ()
    {
        SetConfigDefaults();

        DOMContentLoaded(() => {

            this.renderer = new WebGLRenderer();
            this.textureManager = new TextureManager();
    
            AddToDOM(this.renderer.canvas, 'gameParent');

            requestAnimationFrame(now => this.update(now));
        });
    }

    update (time: number): void
    {
        const renderer = this.renderer;

        renderer.begin(true);

        FillRect(renderer.renderPass, 100, 100, 400, 300, 255, 255, 0, 1);
        // FillRect(renderer.renderPass, 200, 200, 400, 300, 255, 0, 255, 0.5);

        renderer.end();

        requestAnimationFrame(now => this.update(now));
    }
}

new MiniPhaser();
