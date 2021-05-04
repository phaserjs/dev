import { GridView, GridViewItem, Panel, TreeView, TreeViewItem } from './pcui.js';

const loadJSON = (file, callback) =>
{
    const xhr = new XMLHttpRequest();

    xhr.overrideMimeType('application/json');
    xhr.open('GET', file, true);

    xhr.onload = function ()
    {
        if (xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599)
        {
            throw Error('Failed to load ' + file);
        }
        else
        {
            callback(JSON.parse(xhr.responseText));
        }
    };

    xhr.send();
}

const decodeURI = (value) =>
{
    return decodeURIComponent(value.replace(/\+/g, ' '));
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

                item.on('select', () =>
                {
                    console.log('selected', item.data.path);

                    c.headerText = item.data.path;
                    c.collapsed = false;

                    example.src = decodeURI(item.data.path);
                });

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

const example = document.createElement('script');

// example.type = 'module';

document.body.appendChild(example);

const params = new URLSearchParams(document.location.search);

const filename = params.get('f');

const c = new Panel();

loadJSON('examples.json', (data) => {

    c.headerText = 'Select an example';
    c.width = 800;
    c.height = 632;
    c.collapsed = true;
    c.collapsible = true;
    c.scrollable = true;
    c.resizable = 'right';
    c.style.position = 'absolute';
    c.style.top = '0px';
    c.style.left = '250px';
    c.dom.draggable = true;

    const div = document.createElement('div');

    div.id = 'gameParent';

    c.dom.appendChild(div);

    document.body.appendChild(c.dom);

    const p = new Panel();

    p.headerText = 'Examples';
    p.width = 250;
    p.collapsible = true;
    p.collapseHorizontally = true;
    p.scrollable = true;
    p.style.position = 'absolute';
    p.style.top = '0px';
    p.style.left = '0px';

    const t = new TreeView();

    addFolder(data, t);

    p.append(t);

    document.body.appendChild(p.dom);
    
    if (filename)
    {
        example.src = decodeURI(filename).split('\\').join('/');
    }

});
