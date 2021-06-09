export function Stats (game)
{
    const renderStats = game.renderStats;

    // const version = document.getElementById('statsVersion');
    const frame = document.getElementById('statsFrame');
    const scenes = document.getElementById('statsScenes');
    const worlds = document.getElementById('statsWorlds');
    const gameObjects = document.getElementById('statsGameObjects');
    const rendered = document.getElementById('statsRendered');
    const pauseButton = document.getElementById('pauseButton');

    pauseButton.onclick = () => {

        if (game.isPaused)
        {
            pauseButton.innerText = 'Pause';
            game.resume();
        }
        else
        {
            pauseButton.innerText = 'Resume';
            game.pause();
        }

    };

    setInterval(() => {

        // version.innerText = game.VERSION;
        frame.innerText = renderStats.gameFrame;
        scenes.innerText = renderStats.numScenes;
        worlds.innerText = renderStats.numWorlds;
        gameObjects.innerText = renderStats.numGameObjects;
        rendered.innerText = renderStats.numGameObjectsRendered;

    }, 13);
}
