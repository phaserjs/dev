import Tweakpane from 'tweakpane';

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
        const pane = new Tweakpane({
            container: document.getElementById('spriteEd')
        });

        const transformFolder = pane.addFolder({ title: 'Transform' });

        const step01 = { step: 0.1 };

        transformFolder.addInput(this.transform, 'position');
        transformFolder.addInput(this.transform, 'rotation', step01);
        transformFolder.addInput(this.transform, 'scale', { x: step01, y: step01 });
        transformFolder.addInput(this.transform, 'skew', { x: step01, y: step01 });
        transformFolder.addInput(this.transform, 'origin', { min: 0, max: 1, step: 0.1 });

        const displayFolder = pane.addFolder({ title: 'Display' });

        displayFolder.addInput(this.target, 'visible');
        // displayFolder.addInput(this.target, 'tint', { input: 'color', picker: 'inline', expanded: true });
        displayFolder.addInput(this.target, 'alpha', { min: 0, max: 1, step: 0.1 });

    }
}
