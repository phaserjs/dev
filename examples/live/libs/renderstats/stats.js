export function Stats (game, showPanel)
{
    const renderStats = game.renderStats;

    // const version = document.getElementById('statsVersion');
    const frame = document.getElementById('statsFrame');
    const scenes = document.getElementById('statsScenes');
    const worlds = document.getElementById('statsWorlds');
    const gameObjects = document.getElementById('statsGameObjects');
    const gameObjectsRendered = document.getElementById('statsGameObjectsRendered');

    const pauseButton = document.getElementById('pauseButton');
    const metricsButton = document.getElementById('statsGameObjectsLabel');
    const metricsPanel = document.getElementById('metrics');
    const analyticsPanel = document.getElementById('analytics');
    const gameObjectsTable = document.getElementById('goTable');
    const spriteEditorContainer = document.getElementById('spriteEditorContainer');

    let metricsVisible = true;

    let pane;

    pauseButton.onclick = () => {

        if (game.isPaused)
        {
            pauseButton.src = 'libs/css/pause.svg';
            game.resume();
        }
        else
        {
            pauseButton.src = 'libs/css/play.svg';
            game.pause();
        }

    };

    metricsButton.onclick = () => {

        if (metricsVisible)
        {
            updateTable();

            metricsPanel.style.display = 'none';
            analyticsPanel.style.display = 'flex';
            metricsVisible = false;
        }
        else
        {
            metricsPanel.style.display = 'flex';
            analyticsPanel.style.display = 'none';
            metricsVisible = true;
        }

    };

    setInterval(() => {

        // version.innerText = game.VERSION;
        frame.innerText = renderStats.gameFrame;
        scenes.innerText = renderStats.numScenes;
        worlds.innerText = renderStats.numWorlds;
        gameObjects.innerText = renderStats.numGameObjects;
        gameObjectsRendered.innerText = renderStats.numGameObjectsRendered;

    }, 13);

    const createEntry = (sprite) => {

        // {/* <a href="#" class="list-group-item list-group-item-action">A second link item</a> */}

        const a = document.createElement('a');

        a.className = 'list-group-item list-group-item-action';
        a.innerText = sprite.toString();
        a.onclick = () => createSpriteEditor(sprite);

        return a;

    };

    const updateTable = () => {

        gameObjectsTable.innerHTML = '';

        const gameObjects = game.sceneManager.getRenderList();

        for (const gameObject of gameObjects.values())
        {
            gameObjectsTable.appendChild(createEntry(gameObject));
        }

    };

    const createSpriteEditor = (target) => {

        if (pane)
        {
            pane.dispose();
        }

        pane = new Tweakpane.Pane({
            title: target.toString(),
            container: spriteEditorContainer
        });
        
        pane.registerPlugin(TweakpaneEssentialsPlugin);

        const tab = pane.addTab({
            pages: [
                { title: 'Transform' },
                { title: 'Texture' },
                { title: 'Color' },
                { title: 'ColorMatrix' }
            ]
        });

        const transformTab = tab.pages[0];
        const textureTab = tab.pages[1];
        const colorTab = tab.pages[2];
        const colorMatrixTab = tab.pages[3];

        const step01 = { step: 0.1 };

        transformTab.addInput(target, 'position');
        transformTab.addInput(target, 'rotation', step01);
        transformTab.addInput(target, 'scale', { x: step01, y: step01 });
        transformTab.addInput(target, 'skew', { x: step01, y: step01 });
        transformTab.addInput(target, 'origin', { min: 0, max: 1, step: 0.1 });

        const extentsFolder = transformTab.addFolder({ title: 'Extents' });

        extentsFolder.addInput(target.size, 'width', { format: (v) => v.toFixed(0) });
        extentsFolder.addInput(target.size, 'height', { format: (v) => v.toFixed(0) });

        if (target.texture)
        {
            let frameOptions = {};

            for (let frame of target.texture.frames.keys())
            {
                frameOptions[frame] = frame;
            }

            const textureInput = textureTab.addInput(target.texture, 'key', { label: 'texture' }).on('change', event => {

                target.setTexture(event.value);

                frameOptions = {};

                for (let frame of target.texture.frames.keys())
                {
                    frameOptions[frame] = frame;
                }

            });

            let frameInput = textureTab.addInput(target.frame, 'key', { label: 'frame', options: frameOptions }).on('change', event => {

                target.setFrame(event.value);

                pane.refresh();

            });

            textureInput.on('change', event => {

                target.setTexture(event.value);

                frameOptions = {};

                for (let frame of target.texture.frames.keys())
                {
                    frameOptions[frame] = frame;
                }

                frameInput.dispose();

                frameInput = textureTab.addInput(target.frame, 'key', { label: 'frame', options: frameOptions }).on('change', event => {

                    target.setFrame(event.value);

                    pane.refresh();
    
                });
    
            });
        }

        //  Colors

        const spriteRGB = {
            tint: {
                get r () { return target.color.red; },
                get g () { return target.color.green; },
                get b () { return target.color.blue; },
                set r (value) { target.color.red = value; },
                set g (value) { target.color.green = value; },
                set b (value) { target.color.blue = value; }
            }
        };

        colorTab.addInput(target, 'visible');
        colorTab.addInput(spriteRGB, 'tint', { view: 'color', picker: 'inline', expanded: true });
        colorTab.addInput(target, 'alpha', { min: 0, max: 1, step: 0.1 });

        //  Color Matrix

        const cm = target.color.colorMatrix;
        const coffset = target.color.colorOffset;

        colorMatrixTab.addInput(target.color, 'colorMatrixEnabled');
        colorMatrixTab.addInput(target.color, 'willColorChildren');

        const grid = colorMatrixTab.addBlade({
            view: 'buttongrid',
            size: [ 5, 4 ],
            cells: (x, y) => ({
                title: [
                    ['R', 'G', 'B', 'A', 'Offset'],
                    ['R', 'G', 'B', 'A', 'Offset'],
                    ['R', 'G', 'B', 'A', 'Offset'],
                    ['R', 'G', 'B', 'A', 'Offset']
                ][y][x],
            }),
            label: 'colorMatrix',
        });
        
        const sliderRGBA = colorMatrixTab.addBlade({
            view: 'slider',
            label: 'RGBA Value',
            min: -1,
            max: 1,
            value: 0,
            hidden: true
        });

        const sliderOffset = colorMatrixTab.addBlade({
            view: 'slider',
            label: 'Offset Value',
            min: -100,
            max: 100,
            value: 0,
            hidden: true
        });

        const resetButton = colorMatrixTab.addButton({
            title: 'Reset',
            label: ''
        });

        resetButton.on('click', () => {
            target.color.colorMatrix = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
            target.color.colorOffset = [ 0, 0, 0, 0 ];
        });

        let colorMatrixIndex = 0;

        grid.on('click', ev =>
        {
            const [ col, row ] = ev.index.values();

            if (col === 4)
            {
                colorMatrixIndex = row;
                sliderOffset.value = coffset[row];
                sliderOffset.hidden = false;
                sliderRGBA.hidden = true;
            }
            else
            {
                colorMatrixIndex = (row * 4) + col;
                sliderRGBA.value = cm[colorMatrixIndex];
                sliderOffset.hidden = true;
                sliderRGBA.hidden = false;
            }
        });

        sliderRGBA.on('change', ev =>
        {
            cm[colorMatrixIndex] = ev.value;
        });

        sliderOffset.on('change', ev =>
        {
            coffset[colorMatrixIndex] = ev.value;
        });

    };

    setInterval(() => {

        if (metricsVisible || game.isPaused)
        {
            return;
        }

        updateTable();

    }, 2000);

    if (Number(showPanel) === 2)
    {
        updateTable();

        metricsPanel.style.display = 'none';
        analyticsPanel.style.display = 'flex';
        metricsVisible = false;
    }
}
