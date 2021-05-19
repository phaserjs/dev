import { Pane } from 'tweakpane';

export class SpriteVertsEditor
{
    constructor (spriteRef)
    {
        this.target = spriteRef;
        this.verts = spriteRef.vertices;

        this.createWindow();
    }

    createWindow ()
    {
        const pane = new Pane();

        const verts = this.verts;
        const step01 = { step: 10 };
        const stepUV = { step: 0.1, min: -1, max: 1 };

        const vert1Folder = pane.addFolder({ title: 'Vert 1 - Top Left' });

        vert1Folder.addInput(verts[0], 'x', step01);
        vert1Folder.addInput(verts[0], 'y', step01);
        vert1Folder.addInput(verts[0], 'u', stepUV);
        vert1Folder.addInput(verts[0], 'v', stepUV);

        const vert2Folder = pane.addFolder({ title: 'Vert 2 - Bottom Left' });

        vert2Folder.addInput(verts[1], 'x', step01);
        vert2Folder.addInput(verts[1], 'y', step01);
        vert2Folder.addInput(verts[1], 'u', stepUV);
        vert2Folder.addInput(verts[1], 'v', stepUV);

        const vert3Folder = pane.addFolder({ title: 'Vert 3 - Bottom Right' });

        vert3Folder.addInput(verts[2], 'x', step01);
        vert3Folder.addInput(verts[2], 'y', step01);
        vert3Folder.addInput(verts[2], 'u', stepUV);
        vert3Folder.addInput(verts[2], 'v', stepUV);

        const vert4Folder = pane.addFolder({ title: 'Vert 4 - Top Right' });

        vert4Folder.addInput(verts[3], 'x', step01);
        vert4Folder.addInput(verts[3], 'y', step01);
        vert4Folder.addInput(verts[3], 'u', stepUV);
        vert4Folder.addInput(verts[3], 'v', stepUV);
    }
}
