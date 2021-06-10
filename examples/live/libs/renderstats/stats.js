export function Stats (game)
{
    const renderStats = game.renderStats;

    // const version = document.getElementById('statsVersion');
    const frame = document.getElementById('statsFrame');
    const scenes = document.getElementById('statsScenes');
    const worlds = document.getElementById('statsWorlds');
    const gameObjects = document.getElementById('statsGameObjects');

    const pauseButton = document.getElementById('pauseButton');

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

    setInterval(() => {

        // version.innerText = game.VERSION;
        frame.innerText = renderStats.gameFrame;
        scenes.innerText = renderStats.numScenes;
        worlds.innerText = renderStats.numWorlds;
        gameObjects.innerText = renderStats.numGameObjects;

    }, 13);
}
