import { AddChild, AddChildren, ConsoleTreeChildren, GetBounds, RemoveChild, SetBounds } from '../../../../phaser-genesis/src/display/';

import { Game } from '../../../../phaser-genesis/src/Game';
import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';
import { On } from '../../../../phaser-genesis/src/events';
import { Container, GameObject, Rectangle, Text } from '../../../../phaser-genesis/src/gameobjects/';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { SetInteractive } from '../../../../phaser-genesis/src/input';
import { IGameObject } from '../../../../phaser-genesis/src/gameobjects/IGameObject';
import { Between, RadToDeg, Wrap } from '../../../../phaser-genesis/src/math';
import { Key, Keyboard, Keys } from '../../../../phaser-genesis/src/input/keyboard';
import { GetRectangleCenterX, GetRectangleCenterY } from '../../../../phaser-genesis/src/geom/rectangle';

class Arm extends Container
{
    static keys = {
        shoulder: new Keys.QKey(),
        elbow: new Keys.WKey(),
        wrist: new Keys.EKey(),

        // Palm is a little funny...
        down: new Keys.DownKey(),
        up: new Keys.UpKey(),
        left: new Keys.LeftKey(),
        right: new Keys.RightKey(),

        thumb: new Keys.RKey(),
        finger: new Keys.TKey(),

    };
    static palmKeys = {
        scaleX: {
            min: Arm.keys.left,
            max: Arm.keys.right,
        },
        scaleY: {
            min: Arm.keys.down,
            max: Arm.keys.up,
        },
    };
    static restitution = {
        shoulder: {rotation:{value:0, restitution:Math.PI/8, impulse:Math.PI/4}},
        elbow: {rotation:{value:0, restitution:Math.PI/8, impulse:Math.PI/4}},
        wrist: {rotation:{value:0, restitution:Math.PI/8, impulse:-Math.PI/4}},
        palm: {
            scaleX:{value:1, restitution:.25, impulse:.5},
            scaleY:{value:1, restitution:.25, impulse:.5},
        },
        thumb: {x:{value:16, restitution:4, impulse:-8}},
        finger: {x:{value:-16, restitution:4, impulse:8}},
    };
    parts: {[key:string]: Rectangle};
    restitution: number;
    
    constructor(x, y)
    {
        super(x, y);
        this.parts = {
            shoulder: new Rectangle(0, 0, 64, 128, 0xF00000).setOrigin(.5, .05),
            elbow: new Rectangle(0, 0, 32, 64, 0xE00000).setOrigin(.5, .05),
            wrist: new Rectangle(0, 0, 24, 64, 0xD00000).setOrigin(.5, .05),
            palm: new Rectangle(0, 0, 32, 16, 0xC00000).setOrigin(.5, .5 /* Pattern break!*/),
            thumb: new Rectangle(0, 0, 8, 16, 0x00F000).setOrigin(.5, .05),
            finger: new Rectangle(0, 0, 8, 16, 0x0000F0).setOrigin(.5, .05),
        };

        AddChild(this, this.parts.shoulder);
        AddChild(this.parts.shoulder, this.parts.elbow);
        this.parts.elbow.y = this.parts.shoulder.height * .95;
        AddChild(this.parts.elbow, this.parts.wrist);
        this.parts.wrist.y = this.parts.elbow.height * .95;
        AddChild(this.parts.wrist, this.parts.palm);
        this.parts.palm.y = this.parts.wrist.height * .95;
        AddChildren(this.parts.palm, this.parts.thumb, this.parts.finger);
        this.parts.thumb.x = this.parts.thumb.width;
        this.parts.finger.x = -this.parts.thumb.width;
        this.rotation = Math.PI;

        this.restitution = 1.0;
    }
    handlePart(delta:number, partkey:string) {
        const part = this.parts[partkey];
        for (let [key, target] of Object.entries(Arm.restitution[partkey])) {
            let value = part[key];
            let dValue = target.value - value;
            switch (key) {
                case 'rotation':
                    dValue = Wrap(dValue, -Math.PI, Math.PI);
                    break;
            }
            let dKey = 0;
            switch (partkey) {
                case 'palm': {
                    let minmax = Arm.palmKeys[key];
                    dKey = +!!minmax.max.isDown - +!!minmax.min.isDown;
                    break;
                }
                default:
                    dKey = +!!Arm.keys[partkey].isDown;
                    break;
            }
            let speed = 0;
            if (dKey == 0) {
                if (Math.abs(dValue) <= (target.epsilon || 0)) {
                    part[key] = target.value;
                    continue;
                }
                speed = this.restitution * target.restitution * Math.sign(dValue);
            } else {
                speed = dKey * target.impulse;
            }
            part[key] += delta * speed;
        }
    }
}
type Target = {
    value: number,
    restitution: number,
    impulse: number,
    epsilon?: number,
}
type Targets = {
    x?: Target,
    y?: Target,
    rotation?: Target,
    scaleX?: Target,
    scaleY?: Target,
    skewX?: Target,
    skewY?: Target,
};

class Demo extends Scene
{
    constructor ()
    {
        super();

        let headsup = new StaticWorld(this);
        let headsuptext = new Text(0, 0, '...').setOrigin(0, 0);
        headsuptext.strokeStyle = '#000';
        AddChild(headsup, headsuptext);

        let world = new StaticWorld(this);

        let keyboard = new Keyboard();
        let keys = {
            space: (() => {let key = new Keys.SpaceKey(); key.canRepeat = false; return key})(),
            ...Arm.keys,
        };
        keyboard.addKeys(...Object.values(keys));

        const wB = world.camera.bounds;
        let arm = new Arm(GetRectangleCenterX(wB), GetRectangleCenterY(wB) + 64);
        AddChild(world, arm);

        let isPaused = false;
        let nextUpdate = 0;
        On(this, 'update', (delta, time) =>
        {
            delta /= 1000;  // seconds not millis plz.
            if (keys.space.isDown) {
                isPaused = !isPaused;
            }
            if (!isPaused) {
                for (let key of ['shoulder', 'elbow', 'wrist', 'palm', 'thumb', 'finger']) {
                    arm.handlePart(delta, key);
                }
            }
            if (time < nextUpdate) {
                return;
            }
            nextUpdate = time + 250;
            headsuptext.text=`
            [space]: ${isPaused ? 'Unpause' : 'Pause'}

            Armature: ${this.dump(arm)}

            [Q] Shoulder rot+: ${this.dump(arm.parts.shoulder)}

            [W] Elbow rot+: ${this.dump(arm.parts.elbow)}

            [E] Wrist rot-: ${this.dump(arm.parts.wrist)}

            [↑/↓/←/→] Palm scale: ${this.dump(arm.parts.palm)}

            [T] Thumb x-: ${this.dump(arm.parts.thumb)}

            [Y] Finger x+: ${this.dump(arm.parts.finger)}
            `;
        });
    }
    dump(obj:GameObject) {
        const cfg = { maximumFractionDigits: 2 };
        return `pos:(${obj.x.toLocaleString(undefined, cfg)
            }, ${obj.y.toLocaleString(undefined, cfg)
            }) rot: ${(obj.rotation/Math.PI).toLocaleString(undefined, cfg)
            }π (${RadToDeg(obj.rotation).toLocaleString(undefined, cfg)
            }°) scale:(${obj.scaleX.toLocaleString(undefined, cfg)
            }, ${obj.scaleY.toLocaleString(undefined, cfg)
            }) skew:(${obj.skewX.toLocaleString(undefined, cfg)
            }, ${obj.skewY.toLocaleString(undefined, cfg)
            })`;
    }
}

new Game(
    WebGL(),
    GlobalVar('Phaser4'),
    Size(800, 600),
    Parent('gameParent'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
