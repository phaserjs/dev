import { Add, Clone, Cross, Normalize, Subtract, TransformQuat, UP, Vec3 } from '../src/math/vec3';
import { Clone as CloneMat4, LookAt, Matrix4, Perspective, TranslateFromFloats } from '../src/math/mat4';

import { DegToRad } from '../src/math';
import { SetAxisAngle } from '../src/math/quaternion';

export class Camera3D
{
    left: Vec3;
    up: Vec3;
    dir: Vec3;
    pos: Vec3;

    projectionMatrix: Matrix4;
    viewMatrix: Matrix4;

    fov: number = 40;
    near: number = 1;
    far: number = 1000;

    aspectRatio: number = 800 / 600;

    constructor ()
    {
        this.left = new Vec3(1, 0, 0);
        this.up = new Vec3(0, 1, 0);
        this.dir = new Vec3(0, 0, 1);
        this.pos = new Vec3(0, 0, 0);

        this.projectionMatrix = new Matrix4();
        this.viewMatrix = new Matrix4();
    }

    getLeft (): Vec3
    {
        return Clone(this.left);
    }

    getUp (): Vec3
    {
        return Clone(this.up);
    }

    getPosition (): Vec3
    {
        return Clone(this.pos);
    }

    getProjectionMatrix (): Matrix4
    {
        return CloneMat4(this.projectionMatrix);
    }

    getViewMatrix (): Matrix4
    {
        return CloneMat4(this.viewMatrix);
    }

    getNearClippingPlane (): number
    {
        return this.near;
    }

    getFarClippingPlane (): number
    {
        return this.far;
    }

    getFieldOfView (): number
    {
        return this.fov;
    }

    setFarClippingPlane (far: number)
    {
        if (far > 0)
        {
            this.far = far;
        }
    }

    setNearClippingPlane (near: number)
    {
        if (near > 0)
        {
            this.near = near;
        }
    }

    setFieldOfView (fov: number)
    {
        if (fov > 0 && fov < 180)
        {
            this.fov = fov;
        }
    }

    setZ (value: number)
    {
        this.pos.z = value;
    }

    setPosition (position: Vec3)
    {
        this.pos.set(position.x, position.y, position.z);
    }

    setLookAtPoint (newVec: Vec3)
    {
        Subtract(newVec, this.pos, this.dir);

        Normalize(this.dir, this.dir);

        Cross(UP, this.dir, this.left);

        Normalize(this.left, this.left);

        Cross(this.dir, this.left, this.up);

        Normalize(this.up, this.up);
    }

    rotateOnAxis (axisVec: Vec3, angle: number)
    {
        let q = SetAxisAngle(axisVec, angle);

        TransformQuat(this.dir, q, this.dir);
        TransformQuat(this.left, q, this.left);
        TransformQuat(this.up, q, this.up);

        Normalize(this.up, this.up);
        Normalize(this.left, this.left);
        Normalize(this.dir, this.dir);
    }

    yaw (angle: number)
    {
        this.rotateOnAxis(this.up, angle);
    }

    pitch (angle: number)
    {
        this.rotateOnAxis(this.left, angle);
    }

    roll (angle: number)
    {
        this.rotateOnAxis(this.dir, angle);
    }

    moveForward (s: number)
    {
        const x = this.pos.x - s * this.dir.x;
        const y = this.pos.y - s * this.dir.y;
        const z = this.pos.z - s * this.dir.z;

        const tempPos = new Vec3(x, y, z);

        this.setPosition(tempPos);
    }

    refresh ()
    {
        let lookAtPosition = Add(this.pos, this.dir);

        let matView = LookAt(this.pos, lookAtPosition, this.up);

        TranslateFromFloats(matView, -this.pos.x, -this.pos.y, -this.pos.z, this.viewMatrix);

        Perspective(DegToRad(this.fov), this.aspectRatio, this.near, this.far, this.projectionMatrix);
    }
}
