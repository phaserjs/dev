import * as Phaser from '../../phaser-genesis/dist/Phaser';

class Demo extends Phaser.Scene
{
    constructor ()
    {
        super();

        const world = new Phaser.World.StaticWorld(this);

        const loader = new Phaser.Loader.Loader();

        if (window.location.href.includes('192.168.0.100/phaser-genesis/'))
        {
            loader.setPath('/phaser4-examples/public/assets/');
        }
        else
        {
            loader.setPath('/examples/public/assets/');
        }

        loader.add(Phaser.Loader.ImageFile('logo', 'logo.png'));

        loader.start().then(() => {

            const logo = new Phaser.GameObjects.Sprite(400, 300, 'logo').setRotation(0.3);

            // AddTween(logo).to(3000, { y: 500, rotation: 0 }).easing(Easing.Bounce.Out);

            Phaser.Display.AddChildren(world, logo);

        });
    }
}

new Phaser.Game(
    Phaser.Config.WebGL(),
    Phaser.Config.Parent('gameParent'),
    Phaser.Config.BackgroundColor(0x2d2d2d),
    Phaser.Config.Scenes(Demo)
);
