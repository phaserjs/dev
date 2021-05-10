import Tweakpane from 'tweakpane';

export class GameObject3DEditor
{
    constructor (obj3D)
    {
        this.target = obj3D;
        this.transform = obj3D.transform;

        this.createWindow();
    }

    createWindow ()
    {
        const pane = new Tweakpane();

        const transformFolder = pane.addFolder({ title: 'Transform' });

        const step01 = { step: 0.1 };

        transformFolder.addInput(this.transform, 'position');
        transformFolder.addInput(this.transform, 'rotation', { x: step01, y: step01, z: step01, w: step01 });
        transformFolder.addInput(this.transform, 'scale', { x: step01, y: step01, z: step01 });

        const displayFolder = pane.addFolder({ title: 'Display' });

        displayFolder.addInput(this.target, 'visible');
        // displayFolder.addInput(this.target, 'tint', { input: 'color', picker: 'inline', expanded: true });
        // displayFolder.addInput(this.target, 'alpha', { min: 0, max: 1, step: 0.1 });

    }
}
