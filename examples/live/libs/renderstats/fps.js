export function FPS (game)
{
    const { linear } = uPlot.paths;

    const renderStats = game.renderStats;

    const container = document.getElementById('fpsContainer');
    const fpsText = document.getElementById('fpsText');

    let data = [ [], [] ];

    const ctx = document.createElement('canvas').getContext('2d');

    const fill = ctx.createLinearGradient(0, 0, 0, 400);

    fill.addColorStop(0, 'rgba(69, 140, 234, 0.70)');
    fill.addColorStop(1, 'rgba(69, 140, 234, 0.25)');

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
                incrs: [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ],
                stroke: '#00ff00',
                font: `12px Consolas, 'Courier New', monospace`,
                size: 20,
                gap: 8,
                space: 0,
                grid: {
                    width: 1 / devicePixelRatio,
                    stroke: '#3062a4',
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
                    return [ 0, dataMax + 10 ]
                }
            }
        },
        series: [
            {},
            {
                stroke: '#458cea',
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
        const fps = (c.idx) ? data[1][c.idx] : game.fps;

        if (c.idx)
        {
            //  Mouse is over the graph
            fpsText.innerText = `Frame: ${frame} - FPS: ${fps.toFixed(2)}`;
        }
        else
        {
            fpsText.innerText = `FPS: ${fps.toFixed(2)}`;
        }

    }, 13);

    setInterval(() => {
    
        if (game.isPaused)
        {
            return;
        }

        if (f > 30)
        {
            data[0].shift();
            data[1].shift();
        }

        data[0].push(renderStats.gameFrame);
        data[1].push(renderStats.fps);
    
        uplot.setData(data);

        f++;
    
    }, 100);
}