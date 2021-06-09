export function MS (game)
{
    const { linear } = uPlot.paths;

    const renderStats = game.renderStats;

    const container = document.getElementById('msContainer');
    const msText = document.getElementById('msText');

    let data = [ [], [] ];

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
                font: `12px Consolas, 'Courier New', monospace`,
                size: 20,
                gap: 0,
                grid: {
                    width: 1 / devicePixelRatio,
                    stroke: 'rgb(140, 140, 140)',
                }
            }
        ],
        scales: {
            x: {
                time: false
            },
            y: {
                range: (u, dataMin, dataMax) => {

                    const m = (dataMax < 16) ? 16 : dataMax + 2;

                    return [ 0, m ]

                }
            }
        },
        series: [
            {},
            {
                stroke: '#f0f',
                fill: 'rgba(255, 0, 255, 0.5)',
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
        const ms = (c.idx) ? data[1][c.idx] : game.delta;

        if (c.idx)
        {
            //  Mouse is over the graph
            msText.innerText = `Frame: ${frame} - MS: ${ms.toFixed(2)}`;
        }
        else
        {
            msText.innerText = `MS: ${ms.toFixed(2)}`;
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
        data[1].push(renderStats.delta);
    
        uplot.setData(data);

        f++;
    
    }, 100);
}
