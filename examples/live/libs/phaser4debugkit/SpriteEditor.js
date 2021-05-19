import { Pane } from 'tweakpane';

export class SpriteEditor
{
    constructor (spriteRef)
    {
        this.target = spriteRef;
        this.transform = spriteRef.transform;

        this.createWindow();
    }

    createWindow ()
    {
        const pane = new Pane();

        const transformFolder = pane.addFolder({ title: 'Transform' });

        const step01 = { step: 0.1 };

        transformFolder.addInput(this.target, 'position');
        transformFolder.addInput(this.target, 'rotation', step01);
        transformFolder.addInput(this.target, 'scale', { x: step01, y: step01 });
        transformFolder.addInput(this.target, 'skew', { x: step01, y: step01 });
        transformFolder.addInput(this.target, 'origin', { min: 0, max: 1, step: 0.1 });

        const displayFolder = pane.addFolder({ title: 'Display' });

        displayFolder.addInput(this.target, 'visible');
        // displayFolder.addInput(this.target, 'tint', { input: 'color', picker: 'inline', expanded: true });
        displayFolder.addInput(this.target, 'alpha', { min: 0, max: 1, step: 0.1 });

    }
}
