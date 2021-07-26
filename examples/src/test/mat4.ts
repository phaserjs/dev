import { Types, addComponent, addEntity, createWorld, defineComponent, removeComponent, removeEntity } from 'bitecs';

const MathWorld = createWorld();

const Matrix4Component = defineComponent({
    data: [ Types.f32, 16 ]
});

class Matrix4
{
    id: number = addEntity(MathWorld);
    data: Float32Array;

    constructor ()
    {
        addComponent(MathWorld, Matrix4Component, this.id);

        this.data = Matrix4Component.data[this.id];

        this.data[0] = 1;
        this.data[5] = 1;
        this.data[10] = 1;
        this.data[15] = 1;
    }

    set (m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): this
    {
        this.data.set([
            m00, m01, m02, m03,
            m10, m11, m12, m13,
            m20, m21, m22, m23,
            m30, m31, m32, m33
        ]);

        return this;
    }

    destroy (): void
    {
        removeComponent(MathWorld, Matrix4Component, this.id);
        removeEntity(MathWorld, this.id);
    }
}

export function Mat4Ortho (left: number, right: number, bottom: number, top: number, near: number, far: number, out: Matrix4 = new Matrix4()): Matrix4
{
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);

    return out.set(
        -2 * lr,
        0,
        0,
        0,
        0,
        -2 * bt,
        0,
        0,
        0,
        0,
        2 * nf,
        0,
        (left + right) * lr,
        (top + bottom) * bt,
        (far + near) * nf,
        1
    );
}

const m1 = Mat4Ortho(0, 800, 600, 0, -1000, 1000);
const m2 = new Matrix4();

console.log(m1);
console.log(m2);
