export function GameObjects (game)
{
    const { bars } = uPlot.paths;

    const renderStats = game.renderStats;

    const container = document.getElementById('gameObjectsContainer');
    const gameObjectsText = document.getElementById('gameObjectsText');

    let data = [
        [ 0 ], // Total Game Objects
        [ 0 ], // Rendered
    ];

    const ctx = document.createElement('canvas').getContext('2d');

    const fill = ctx.createLinearGradient(0, 0, 0, 400);

    fill.addColorStop(0, 'rgba(204, 222, 57, 0.50)');
    fill.addColorStop(1, 'rgba(204, 222, 57, 0.10)');

    const opts = {
        width: 150,
        height: 200,
        legend: {
            show: false
        },
        cursor: {
            show: false
        },
        //  padding: [ top, right, bottom, left ]
        padding: [ 10, 10, 4, 0 ],
        axes: [
            {
                show: false
            },
            {
                stroke: '#00ff00',
                font: `10px Consolas, 'Courier New', monospace`,
                size: 40,
                gap: 8,
                grid: {
                    width: 1 / devicePixelRatio,
                    stroke: '#818c25',
                },
                ticks: {
                    show: false
                }
            }
        ],
        scales: {
            x: {
                time: false
            },
            y: {
                range: (u, dataMin, dataMax) => {

                    return [ 0, renderStats.numChildren + 20 ]

                }
            }
        },
        series: [
            {},
            {
                stroke: '#ccde39',
                fill,
                points: {
                    show: false
                },
                drawStyle: 1,
                lineInterpolation: null,
                paths: bars({ _size: [ 0.8, 80 ]})
            }
        ]
    };

    const uplot = new uPlot(opts, data, container);

    setInterval(() => {
    
        if (game.isPaused)
        {
            return;
        }

        data[0][0] = renderStats.numChildren;
        data[1][0] = renderStats.rendered;

        gameObjectsText.innerText = `Rendered: ${renderStats.rendered}`;
    
        uplot.setData(data);
    
    }, 100);
}
