export function Stats (game)
{
    const renderStats = game.renderStats;

    // const version = document.getElementById('statsVersion');
    const frame = document.getElementById('statsFrame');
    const scenes = document.getElementById('statsScenes');
    const worlds = document.getElementById('statsWorlds');
    const gameObjects = document.getElementById('statsGameObjects');

    const pauseButton = document.getElementById('pauseButton');
    const metricsButton = document.getElementById('statsGameObjectsLabel');
    const metricsPanel = document.getElementById('metrics');
    const analyticsPanel = document.getElementById('analytics');
    const gameObjectsTable = document.getElementById('goTable');
    const transformPaneContainer = document.getElementById('transformPaneContainer');
    const spritePaneContainer = document.getElementById('spritePaneContainer');

    let metricsVisible = true;

    let pane1;
    let pane2;

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

        if (pane1)
        {
            pane1.dispose();
        }

        if (pane2)
        {
            pane2.dispose();
        }

        pane1 = new Tweakpane.Pane({
            title: target.toString(),
            container: transformPaneContainer
        });

        const transformFolder = pane1.addFolder({ title: 'Transform' });

        const step01 = { step: 0.1 };

        transformFolder.addInput(target, 'position');
        transformFolder.addInput(target, 'rotation', step01);
        transformFolder.addInput(target, 'scale', { x: step01, y: step01 });
        transformFolder.addInput(target, 'skew', { x: step01, y: step01 });
        transformFolder.addInput(target, 'origin', { min: 0, max: 1, step: 0.1 });

        const extentsFolder = pane1.addFolder({ title: 'Extents' });

        extentsFolder.addInput(target.size, 'width', { format: (v) => v.toFixed(0) });
        extentsFolder.addInput(target.size, 'height', { format: (v) => v.toFixed(0) });

        //  Pane 2 - Texture & Tint

        pane2 = new Tweakpane.Pane({
            title: target.toString(),
            container: spritePaneContainer
        });

        if (target.texture)
        {
            const textureFolder = pane2.addFolder({ title: 'Texture' });

            let frameOptions = {};

            for (let frame of target.texture.frames.keys())
            {
                frameOptions[frame] = frame;
            }

            const textureInput = textureFolder.addInput(target.texture, 'key', { label: 'texture' }).on('change', event => {

                target.setTexture(event.value);

                frameOptions = {};

                for (let frame of target.texture.frames.keys())
                {
                    frameOptions[frame] = frame;
                }

            });

            let frameInput = textureFolder.addInput(target.frame, 'key', { label: 'frame', options: frameOptions }).on('change', event => {

                target.setFrame(event.value);

                pane1.refresh();

            });

            textureInput.on('change', event => {

                target.setTexture(event.value);

                frameOptions = {};

                for (let frame of target.texture.frames.keys())
                {
                    frameOptions[frame] = frame;
                }

                frameInput.dispose();

                frameInput = textureFolder.addInput(target.frame, 'key', { label: 'frame', options: frameOptions }).on('change', event => {

                    target.setFrame(event.value);

                    pane1.refresh();
    
                });
    
            });
        }

        const displayFolder = pane2.addFolder({ title: 'Display' });

        displayFolder.addInput(target, 'visible');
        displayFolder.addInput(target, 'tint', { view: 'color', _picker: 'inline', _expanded: true });
        displayFolder.addInput(target, 'alpha', { min: 0, max: 1, step: 0.1 });

    };

    setInterval(() => {

        if (metricsVisible || game.isPaused)
        {
            return;
        }

        updateTable();

    }, 2000);

}
