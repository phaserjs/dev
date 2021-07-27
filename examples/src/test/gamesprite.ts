import { GlobalVar, Parent, WebGL } from '../../../../phaser-genesis/src/config';

import { Game } from '../../../../phaser-genesis/src/Game';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects/sprite/Sprite';
import { UpdateTransform } from '../../../../phaser-genesis/src/components/transform';

class MyGame extends Game
{
    logo: Sprite;

    constructor ()
    {
        super(
            WebGL(),
            Parent('gameParent'),
            GlobalVar('Phaser4'),
        );

        this.logo = new Sprite(400, 300);

        ImageFile('logo', 'assets/logo.png').then(file => {

            this.logo.setTexture(file.key);

        });
    }

    update ()
    {
        this.logo.rotation += 0.01;

        //  When not using a World instance, you need to update the transform directly before rendering
        UpdateTransform(this.logo);
    }

    render (renderPass: IRenderPass)
    {
        this.logo.renderGL(renderPass);
    }
}

new MyGame();
