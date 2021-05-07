import { TreeView, TreeViewItem } from './pcui.js';

import { DockManager } from './dock/js/DockManager.js';
import { PanelContainer } from './dock/js/PanelContainer.js';
import { decodeURI } from './decodeURI.js';
import { loadJSON } from './loadJSON.js'

const selectHandler = (item) => {

    const iframe = document.createElement('iframe');

    iframe.width = 800;
    iframe.height = 600;
    iframe.scrolling = 'no';
    iframe.sandbox = 'allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation';
    iframe.src = 'view.html?f=' + decodeURI(item.data.path);

    let demoPanel = new PanelContainer(iframe, dockManager, item.data.path, 'document', false);
    
    dockManager.dockFill(documentNode, demoPanel);

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

let dockManager;
let documentNode;

window.onload = () => {

    loadJSON('examples.json', (data) => {

        let divDockContainer = document.getElementById('container');
        let divDockManager = document.getElementById('dockManager');
    
        dockManager = new DockManager(divDockManager);
    
        dockManager.initialize();
    
        documentNode = dockManager.context.model.documentManagerNode;
    
        window.onresize = () => dockManager.resize(divDockContainer.clientWidth, divDockContainer.clientHeight);
        window.onresize(null);
    
        // https://css.gg/app
        // title.classAdd('gg-push-chevron-down-r');

        const rootTreeView = new TreeView();
    
        addFolder(data, rootTreeView);
    
        document.body.appendChild(rootTreeView.dom);
    
        let examplesPanel = new PanelContainer(rootTreeView.dom, dockManager, 'Phaser 4 Examples', 'panel', true);
    
        dockManager.dockLeft(documentNode, examplesPanel, 0.25);
    
    });

};
