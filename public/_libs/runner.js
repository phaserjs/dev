import { Panel, TreeView, TreeViewItem } from './pcui.js';

import { decodeURI } from './decodeURI.js';
import { loadJSON } from './loadJSON.js'

let openWindows = 0;
let windowX = 250;
let windowY = 0;

const selectHandler = (item) => {

    const c = new Panel();

    c.headerText = item.data.path;
    c.width = 800;
    c.height = 632;
    c.collapsible = false;
    c.scrollable = true;
    c.classAdd('pcui-collapsible');


    c.style.position = 'absolute';
    c.style.top = `${windowY}px`;
    c.style.left = `${windowX}px`;
    c.style.zIndex = '1000';

    openWindows++;
    windowX += 32;
    windowY += 32;

    const iframe = document.createElement('iframe');

    iframe.width = 800;
    iframe.height = 600;
    iframe.sandbox = 'allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation';

    c.dom.appendChild(iframe);

    // console.log(c.header); // a Container

    // for (let i = 0; i < c.header.dom.childNodes.length; i++)
    // {
    //     console.log(c.header.dom.childNodes[i]);
    // }

    document.body.appendChild(c.dom);

    $(c.dom).draggable().resizable();;

    iframe.src = 'view.html?f=' + decodeURI(item.data.path);
}

const addFolder = (data, treeView) => {

    if (data.type === 'directory' && data.hasOwnProperty('children') && data.children.length > 0)
    {
        const folder = new TreeViewItem({ text: data.name, allowDrag: false, allowDrop: false });

        for (let i = 0; i < data.children.length; i++)
        {
            const child = data.children[i];

            if (child.type === 'file' && !child.name.endsWith('.min.js'))
            {
                const name = child.name.replace('.js', '');
                const item = new TreeViewItem({ text: name, allowDrag: false, allowDrop: false });

                item.data = { path: child.path.replace('public/', '') };

                item.on('select', item => selectHandler(item));

                folder.append(item);
            }
            else if (child.type === 'directory')
            {
                addFolder(child, folder);
            }
        }

        folder.open = true;

        if (treeView !== folder)
        {
            treeView.append(folder);
        }
    }
}

loadJSON('examples.json', (data) => {

    const examplesPanel = new Panel();

    examplesPanel.headerText = 'Examples';
    examplesPanel.width = 250;
    examplesPanel.collapsible = true;
    examplesPanel.collapseHorizontally = true;
    examplesPanel.scrollable = true;

    examplesPanel.style.position = 'absolute';
    examplesPanel.style.top = '0px';
    examplesPanel.style.left = '0px';
    examplesPanel.style.zIndex = '100';

    const rootTreeView = new TreeView();

    addFolder(data, rootTreeView);

    examplesPanel.append(rootTreeView);

    document.body.appendChild(examplesPanel.dom);

});
