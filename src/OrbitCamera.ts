import { Add, Clone, CopyFrom, Cross, Distance, Equals, Length, Normalize, Scale, Subtract, TransformQuat, UP, Vec3, ZERO } from '../src/math/vec3/';

import { Camera3D } from './Camera3D';
import { SetAxisAngle } from '../src/math/quaternion';

export class OrbitCamera extends Camera3D
{
    closestDistance: number;
    farthestDistance: number;
    orbitPoint: Vec3 = new Vec3(0, 0, 0);

    constructor (closest: number = 0, farthest: number = 0)
    {
        super();

        this.closestDistance = closest;
        this.farthestDistance = farthest;
    }

    getDistance (): number
    {
        return Distance(this.pos, this.orbitPoint);
    }

    getOrbitPoint (): Vec3
    {
        return Clone(this.orbitPoint);
    }

    moveIn (distance: number): boolean
    {
        if (distance > 0)
        {
            let shift = Scale(this.dir, distance);
            let subPos = Subtract(this.pos, this.orbitPoint);
            let maxMove = Length(subPos) - this.closestDistance;

            if (Length(shift) <= maxMove)
            {
                Add(this.pos, shift, this.pos);

                return true;
            }
        }

        return false;
    }

    moveOut (distance: number): boolean
    {
        if (distance > 0)
        {
            let negativeDistance = Scale(this.dir, -1);
            let shift = Scale(negativeDistance, distance);

            let newPos = Add(this.pos, shift);

            let distanceCamToOrbit = Distance(newPos, this.orbitPoint);

            if (distanceCamToOrbit <= this.farthestDistance)
            {
                this.pos = newPos;

                return true;
            }
        }

        return false;
    }

    pitch (angle: number)
    {
        if (Equals(this.pos, this.orbitPoint))
        {
            let q = SetAxisAngle(this.left, angle);

            TransformQuat(this.dir, q, this.dir);

            Normalize(this.dir, this.dir);

            Cross(this.dir, this.left, this.up);

            Normalize(this.up, this.up);
        }
        else
        {
            Subtract(this.pos, this.orbitPoint, this.pos);

            let q = SetAxisAngle(this.left, angle);

            let newPos = TransformQuat(this.pos, q);

            Add(newPos, this.orbitPoint, this.pos);

            Subtract(this.orbitPoint, this.pos, this.dir);

            Normalize(this.dir, this.dir);

            // update up vector

            Cross(this.dir, this.left, this.up);

            Normalize(this.up, this.up);

            // update left

            Cross(this.up, this.dir, this.left);

            Normalize(this.left, this.left);
        }
    }

    setClosestDistance (distance: number)
    {
        if (distance >= 0 && distance <= this.farthestDistance)
        {
            this.closestDistance = distance;

            let distanceBetweenCamAndOP = this.getDistance();

            if (distanceBetweenCamAndOP < this.closestDistance)
            {
                let amt = this.closestDistance - distanceBetweenCamAndOP;

                this.moveOut(amt);
            }
        }
    }

    setDistance (distance: number)
    {
        if (distance >= this.closestDistance && distance <= this.farthestDistance)
        {
            CopyFrom(this.orbitPoint, this.pos);

            this.moveOut(distance);
        }
    }

    setFarthestDistance (distance: number)
    {
        if (distance >= this.closestDistance)
        {
            this.farthestDistance = distance;

            let distanceBetweenCamAndOP = this.getDistance();

            if (distanceBetweenCamAndOP > this.farthestDistance)
            {
                let amt = distanceBetweenCamAndOP - this.farthestDistance;

                this.moveIn(amt);
            }
        }
    }

    setOrbitPoint (x: number, y: number, z: number)
    {
        let orbitPointToCam = new Vec3(x, y, z);

        Add(this.orbitPoint, orbitPointToCam, this.pos);
    }

    yaw (angle: number)
    {
        if (Equals(this.pos, this.orbitPoint))
        {
            let q = SetAxisAngle(UP, angle);

            TransformQuat(this.dir, q, this.dir);
            TransformQuat(this.left, q, this.left);
            TransformQuat(this.up, q, this.up);

            Normalize(this.up, this.up);
            Normalize(this.left, this.left);
            Normalize(this.dir, this.dir);
        }
        else
        {
            let camPosOrbit = Subtract(this.pos, this.orbitPoint);

            let q = SetAxisAngle(UP, angle);

            let newpos = TransformQuat(camPosOrbit, q);

            Add(newpos, this.orbitPoint, this.pos);

            Subtract(this.orbitPoint, this.pos, this.dir);

            Normalize(this.dir, this.dir);

            TransformQuat(this.up, q, this.up);

            Normalize(this.up, this.up);

            Cross(this.up, this.dir, this.left);

            Normalize(this.left, this.left);
        }
    }

    setPosition (position: Vec3)
    {
        let distFromNewPosToOP = Distance(this.orbitPoint, position);

        if (distFromNewPosToOP >= this.closestDistance && distFromNewPosToOP <= this.farthestDistance)
        {
            CopyFrom(position, this.pos);

            let camPosToOrbitPoint = Subtract(this.orbitPoint, this.pos);

            let tempVec = Cross(camPosToOrbitPoint, UP);

            if (Equals(ZERO, tempVec))
            {
                Normalize(camPosToOrbitPoint, this.dir);

                Cross(this.dir, this.left, this.up);
            }
            else
            {
                Subtract(this.orbitPoint, this.pos, this.dir);

                Normalize(this.dir, this.dir);

                Cross(UP, this.dir, this.left);

                Cross(this.dir, this.left, this.up);
            }
        }
    }
}
