import * as GL_CONST from '../src/renderer/webgl1/GL_CONST';

import { BackgroundColor, Parent, Scenes, WebGL } from '../src/config';
import { Draw, PopShader, PopVertexBuffer, SetShader, SetVertexBuffer } from '../src/renderer/webgl1/renderpass';

import { AddChildren } from '../src/display/AddChildren';
import { EffectLayer } from '../src/gameobjects/effectlayer/EffectLayer';
import { Flush } from '../src/renderer/webgl1/renderpass/Flush';
import { Game } from '../src/Game';
import { IRenderPass } from '../src/renderer/webgl1/renderpass/IRenderPass';
import { RenderLayer } from '../src/gameobjects/renderlayer/RenderLayer';
import { Scene } from '../src/scenes/Scene';
import { SetFramebuffer } from '../src/renderer/webgl1/renderpass/SetFramebuffer';
import { Shader } from '../src/renderer/webgl1/shaders/Shader';
import { StaticWorld } from '../src/world/StaticWorld';
import { VertexBuffer } from '../src/renderer/webgl1/buffers/VertexBuffer';

const vertexShader = `
attribute vec3 position;

void main() {
  gl_Position = vec4(position, 1);
}
`;

const fragmentShader = `
void main() {
  gl_FragColor = vec4(1, 0, 0, 1);
}
`;

class Tri extends RenderLayer
{
    buffer: VertexBuffer;
    shader: Shader;

    constructor ()
    {
        super();

        this.shader = new Shader({ vertexShader, fragmentShader, attributes: {
            position: { size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 0 }
        }});

        this.buffer = new VertexBuffer({ batchSize: 256, elementsPerEntry: 3, vertexElementSize: 3 });

        const F32 = this.buffer.vertexViewF32;

        F32[0] = -1;
        F32[1] = -1;
        F32[2] = 1;

        F32[3] = 0;
        F32[4] = 1;
        F32[5] = 1;

        F32[6] = 1;
        F32[7] = -1;
        F32[8] = 1;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        Flush(renderPass);

        SetFramebuffer(renderPass, this.framebuffer, true);

        SetShader(renderPass, this.shader);
        SetVertexBuffer(renderPass, this.buffer);

        renderPass.count = 3;

        Draw(renderPass);

        PopShader(renderPass);
        PopVertexBuffer(renderPass);
    }
}

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const layer = new Tri();

        AddChildren(world, layer);
    }
}

export default function (): void
{
    new Game(
        WebGL(),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
