export function WorldTransforms (game)
{
    const { linear } = uPlot.paths;

    const renderStats = game.renderStats;

    const container = document.getElementById('worldContainer');
    const worldText = document.getElementById('worldText');

    let data = [ [], [] ];

    const ctx = document.createElement('canvas').getContext('2d');

    const fill = ctx.createLinearGradient(0, 0, 0, 400);

    fill.addColorStop(0, 'rgba(97, 211, 181, 0.75)');
    fill.addColorStop(1, 'rgba(97, 211, 181, 0.15)');

    const opts = {
        width: 300,
        height: 200,
        legend: {
            show: false
        },
        //  padding: [ top, right, bottom, left ]
        padding: [ 10, 10, 10, 10 ],
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
                    stroke: '#2c6455',
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

                    return [ 0, renderStats.numGameObjectsRendered ]

                }
            }
        },
        series: [
            {},
            {
                stroke: '#61d3b5',
                fill,
                points: {
                    show: false
                },
                paths: linear()
            },
        ]
    };

    const uplot = new uPlot(opts, data, container);

    let f = 0;

    setInterval(() => {

        const c = uplot.cursor;

        const frame = (c.idx) ? data[0][c.idx] : game.frame;
        const world = (c.idx) ? data[1][c.idx] : renderStats.numDirtyWorldTransforms;

        if (c.idx)
        {
            //  Mouse is over the graph
            worldText.innerText = `Frame: ${frame} - World Transforms: ${world}`;
        }
        else
        {
            worldText.innerText = `World Transforms: ${world}`;
        }

    }, 13);

    setInterval(() => {
    
        if (game.isPaused)
        {
            return;
        }

        if (f > 100)
        {
            data[0].shift();
            data[1].shift();
        }

        data[0].push(renderStats.gameFrame);
        data[1].push(renderStats.numDirtyWorldTransforms);
    
        uplot.setData(data);

        f++;
    
    }, 100);
}
