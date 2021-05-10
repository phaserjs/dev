import { TreeView, TreeViewItem } from './pcui.js';

import WinBox from './winbox/js/winbox.js';
import { decodeURI } from './decodeURI.js';
import { loadJSON } from './loadJSON.js'

let demoCount = 1;

const selectHandler = (item) => {

    const iframe = `<iframe id="demo${demoCount}" src="view.html?f=${decodeURI(item.data.path)}"></iframe>`;

    const example = new WinBox({ 
        title: item.data.path,
        root: document.body,
        html: iframe,
        width: 800,
        height: 600,
        x: 100,
        y: 32
    });

    demoCount++;
  
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

window.onload = () => {

    loadJSON('examples.json', (data) => {

        const rootTreeView = new TreeView();
    
        addFolder(data, rootTreeView);

        new WinBox({ 
            title: 'Phaser 4 Examples',
            class: [ 'no-full' ],
            root: document.body,
            x: 16,
            y: 16,
            width: 260,
            height: '90%',
            mount: rootTreeView.dom
        });

        // https://css.gg/app
        // title.classAdd('gg-push-chevron-down-r');
    
    });

};
