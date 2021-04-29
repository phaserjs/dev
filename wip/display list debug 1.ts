import { AddChild, ConsoleTreeChildren, GetRandomChild } from '../src/display';
import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '../src/config';
import { Container, GameObject, RenderLayer, Sprite } from '../src/gameobjects/';

import { AddChildren } from '../src/display/AddChildren';
import { Game } from '../src/Game';
import { Scene } from '../src/scenes/Scene';
import { StaticWorld } from '../src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        world.name = 'World';

        let c = 0;

        const nodes = [];

        for (let i = 0; i < 32; i++)
        {
            //  Give it a 50% chance of being a root world Container

            let node;

            if (i === 0 || Math.random() > 0.5)
            {
                node = new Container();

                AddChild(world, node);
            }
            else
            {
                const randomParent = nodes[Math.floor(Math.random() * (nodes.length - 1))];

                node = new GameObject();

                AddChild(randomParent, node);
            }

            node.name = 'Entry ' + c.toString();

            nodes.push(node);

            c++;
        }

        /*
        //  Create parents
        const parents = [];

        for (let i = 0; i < 3; i++)
        {
            const parent = new Container();

            parent.name = 'Entry ' + c.toString();

            AddChild(world, parent);

            parents.push(parent);

            c++;
        }

        const level1 = [];

        //  Create random children at level 1
        for (let i = 0; i < 12; i++)
        {
            const child = new GameObject();

            child.name = 'Entry ' + c.toString();

            const randomParent = GetRandomChild(world);

            console.log(child.name, 'added to', randomParent.name);

            AddChild(randomParent, child);

            level1.push(child);

            c++;
        }

        //  Create random children at level 2
        for (let i = 0; i < 12; i++)
        {
            const child = new GameObject();

            child.name = 'Entry ' + c.toString();

            const randomParent = level1[Math.floor(Math.random() * (level1.length - 1))];

            console.log(child.name, 'added to', randomParent.name);

            AddChild(randomParent, child);

            c++;
        }
        */

        ConsoleTreeChildren(world);
    }
}

export default function (): void
{
    new Game(
        WebGLRenderer(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
