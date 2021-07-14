import WinBox from './winbox/js/winbox.js';
import { decodeURI } from './decodeURI.js';
import { loadJSON } from './loadJSON.js'

let demoCount = 0;
let autoRunExample;

const getIframeWindow = (id) =>
{
    const element = document.getElementById(id);

    let doc;
  
    if (element.contentWindow)
    {
        return element.contentWindow;
    }

    if (element.window)
    {
        return element.window;
    } 
  
    if (!doc && element.contentDocument)
    {
        doc = element.contentDocument;
    } 
  
    if (!doc && element.document)
    {
        doc = element.document;
    }
  
    if (doc && doc.defaultView)
    {
        return doc.defaultView;
    }
  
    if (doc && doc.parentWindow)
    {
        return doc.parentWindow;
    }
  
    return undefined;
}

const createIcon = (parent, className, alt, onClick) =>
{
    const icon = document.createElement('span');
    
    icon.className = className;
    icon.title = alt;
    icon.onclick = onClick;

    parent.insertBefore(icon, parent.firstChild);

    return icon;
}

const onExampleLink = (win, item) =>
{
    window.location.href = `index.html?f=${item.data.path}`;
}

const onExampleEdit = (win, item) =>
{
    const iframe = `<iframe src="source.html?f=${decodeURI(item.data.view)}"></iframe>`;

    const sourceWindow = new WinBox({ 
        title: `Source: ${item.data.ts}`,
        class: [ 'no-full' ],
        root: document.body,
        html: iframe
    });

    setTimeout(() => {
        sourceWindow.focus();
    }, 10);
}

const onExampleGit = (win, item) =>
{
    const url = `https://github.com/phaserjs/dev/blob/main/examples/src/${item.data.git}`;

    window.open(url, '_blank');
}

const onExamplePlayPause = (win, iframe, item) =>
{
    const phaserExample = document.getElementById(iframe).contentWindow['Phaser4'];

    const icon = document.querySelector(`div#${win.dom.id} .wb-playPause`);

    if (phaserExample.isPaused)
    {
        phaserExample.resume();
        icon.style.backgroundImage = 'url(libs/css/pause.svg)';
    }
    else
    {
        phaserExample.pause();
        icon.style.backgroundImage = 'url(libs/css/play.svg)';
    }
}

const onExampleStats = (item, demoID, panel = 1) =>
{
    const onStatsIFrameLoaded = (id) => {

        const phaserExample = getIframeWindow(`demo${id}`);
        const statsIFrame = getIframeWindow(`stats${id}`);

        //  If the example doesn't have `GlobalVar('Phaser4')` this won't work:
        const game = phaserExample.Phaser4;

        if (game)
        {
            statsIFrame.linkGame(game, panel);
        }

    };

    const statsFrame = document.createElement('iframe');

    statsFrame.id = `stats${demoID}`;
    statsFrame.src = 'stats.html';
    statsFrame.onload = event => onStatsIFrameLoaded(demoID);

    const statsWindow = new WinBox({ 
        title: `Render Stats: ${item.data.ts}`,
        class: [ 'no-full' ],
        root: document.body,
        x: 300,
        y: 300,
        width: 936,
        height: 540,
        mount: statsFrame
    });

    setTimeout(() => {

        statsWindow.focus();

    }, 10);
}

const selectHandler = (item) =>
{
    demoCount++;

    const id = `demo${demoCount}`;
    const iframe = `<iframe id="${id}" src="view.html?f=${decodeURI(item.data.path)}"></iframe>`;

    const win = new WinBox({ 
        title: item.data.path,
        root: document.body,
        html: iframe,
        width: 804,
        height: 637,
        x: 100,
        y: 32
    });

    setTimeout(() => {
        win.focus();
    }, 10);

    //  Inject extra icons

    const icons = document.querySelector(`div#${win.dom.id} .wb-icon`);

    createIcon(icons, 'wb-link', 'Link to Example', event => onExampleLink(win, item));
    createIcon(icons, 'wb-edit', 'View Example Code', event => onExampleEdit(win, item));
    createIcon(icons, 'wb-git', 'View Source on GitHub', event => onExampleGit(win, item));
    createIcon(icons, 'wb-playPause', 'Play / Pause Example', event => onExamplePlayPause(win, id, item));
    createIcon(icons, 'wb-stats', 'View Render Stats', event => onExampleStats(item, demoCount));
}

const addFolder = (data, treeView, autoRun) => {

    if (data.type === 'directory' && data.hasOwnProperty('children') && data.children.length > 0)
    {
        const folder = (data.name === 'live') ? treeView : new TreeNode(data.name);

        for (let i = 0; i < data.children.length; i++)
        {
            const child = data.children[i];

            if (child.type === 'file' && !child.name.endsWith('.min.js'))
            {
                const name = child.name.replace('.js', '');
                const ts = child.name.replace('.js', '.ts');
                const item = new TreeNode(name);
                const path = child.path.replace('examples/live/', '');
                const src = child.path.replace('examples/live/', '../src/');
                const git = path.replace('.js', '.ts').replace(' ', '%20');
                const view = src.replace('.js', '.ts').replace(' ', '%20');

                item.data = { name, path, git, view, ts };
                item.on('select', item => selectHandler(item));

                if (path === autoRun)
                {
                    autoRunExample = item;
                }

                folder.addChild(item);
            }
            else if (child.type === 'directory')
            {
                addFolder(child, folder, autoRun);
            }
        }

        if (treeView !== folder)
        {
            treeView.addChild(folder);
        }
    }
}

window.onload = () => {

    loadJSON('examples.json', (data) => {

        const params = new URLSearchParams(document.location.search);
    
        const filename = params.get('f');
        const autoShowStats = params.get('s');

        const autoRun = (filename) ? decodeURI(filename).split('\\').join('/') : null;
        
        // https://css.gg/app
        TreeConfig.leaf_icon = '<i class="gg-file-document"></i>';
        TreeConfig.parent_icon = '<i class="gg-folder"></i>';
        TreeConfig.open_icon = '<i class="gg-chevron-down"></i>';
        TreeConfig.close_icon = '<i class="gg-chevron-up"></i>';

        const rootNode = new TreeNode('/');

        addFolder(data, rootNode, autoRun);

        const rootTree = new TreeView(rootNode, '#treeView', {
            show_root: false
        });

        const examplesWindow = new WinBox({ 
            title: 'Phaser 4 Examples',
            class: [ 'no-full' ],
            root: document.body,
            x: 16,
            y: 16,
            width: 260,
            height: '90%',
            mount: rootTree.getContainer()
        });

        if (autoRunExample)
        {
            selectHandler(autoRunExample);

            if (autoShowStats)
            {
                setTimeout(() => {
                    onExampleStats(autoRunExample, 1, autoShowStats);
                }, 1000);
            }
        }
    
    });

};
