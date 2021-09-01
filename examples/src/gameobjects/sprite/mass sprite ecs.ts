import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { Between, Wrap } from '../../../../../phaser-genesis/src/math';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { AddComponent } from '../../../../../phaser-genesis/src/components/AddComponent';
import { DataTypes } from '../../../../../phaser-genesis/src/components/DataTypes';
import { DefineComponent } from '../../../../../phaser-genesis/src/components/DefineComponent';
import { DefineQuery } from '../../../../../phaser-genesis/src/components/DefineQuery';
import { DefineSystem } from '../../../../../phaser-genesis/src/components/DefineSystem';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { GameObjectCache } from '../../../../../phaser-genesis/src/gameobjects/GameObjectCache';
import { IContainer } from '../../../../../phaser-genesis/src/gameobjects/container/IContainer';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { On } from '../../../../../phaser-genesis/src/events';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects/';
import { SpriteSheetFile } from '../../../../../phaser-genesis/src/loader/files';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(SpriteSheetFile('flakes', 'assets/snowflakes.png', { frameWidth: 17, frameHeight: 17 }));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const speedComponent = DefineComponent({
                speedX: DataTypes.f32,
                speedY: DataTypes.f32
            });

            for (let i = 0; i < 1000; i++)
            {
                const x = Between(0, 800);
                const y = Between(0, 600);

                const flake = new Sprite(x, y, 'flakes', Between(0, 5));

                AddComponent(speedComponent, flake.id);

                speedComponent.speedX[flake.id] = Math.random() * 2;
                speedComponent.speedY[flake.id] = Math.random() * 2;

                AddChild(world, flake);
            }

            const getParticlesQuery = DefineQuery([ speedComponent ]);

            const updateParticlesSystem = DefineSystem(world =>
            {
                const entities = getParticlesQuery(world);
            
                for (let i = 0; i < entities.length; i++)
                {
                    const id = entities[i];
                    const sprite = GameObjectCache.get(id) as IContainer;

                    sprite.x = Wrap(sprite.x + speedComponent.speedX[id], -50, 850);
                    sprite.y = Wrap(sprite.y + speedComponent.speedY[id], -50, 650);
                }
            });

            On(world, 'update', () => {

                updateParticlesSystem();

            });

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x080888),
    Scenes(Demo)
);
