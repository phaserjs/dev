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

    let metricsVisible = true;

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

        console.log('sprite ed');

        const pane = new Tweakpane.Pane();

        const transformFolder = pane.addFolder({ title: 'Transform' });

        const step01 = { step: 0.1 };

        transformFolder.addInput(target, 'x');
        transformFolder.addInput(target, 'y');
        transformFolder.addInput(target, 'rotation', step01);
        transformFolder.addInput(target, 'scaleX', step01);
        transformFolder.addInput(target, 'scaleY', step01);
        transformFolder.addInput(target, 'skewX', step01);
        transformFolder.addInput(target, 'skewY', step01);
        // transformFolder.addInput(target, 'origin', { min: 0, max: 1, step: 0.1 });

        const displayFolder = pane.addFolder({ title: 'Display' });

        displayFolder.addInput(target, 'visible');
        displayFolder.addInput(target, 'tint', { view: 'color', picker: 'inline', expanded: true });
        displayFolder.addInput(target, 'alpha', { min: 0, max: 1, step: 0.1 });

    };

    setInterval(() => {

        if (metricsVisible)
        {
            return;
        }

        updateTable();

    }, 2000);

}
