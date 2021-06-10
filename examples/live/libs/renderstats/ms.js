export function MS (game)
{
    const { linear } = uPlot.paths;

    const renderStats = game.renderStats;

    const container = document.getElementById('msContainer');
    const msText = document.getElementById('msText');

    let data = [ [], [] ];

    const ctx = document.createElement('canvas').getContext('2d');

    const fill = ctx.createLinearGradient(0, 0, 0, 400);

    fill.addColorStop(0, 'rgba(193, 82, 177, 0.75)');
    fill.addColorStop(1, 'rgba(193, 82, 177, 0.15)');

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
                gap: 8,
                grid: {
                    width: 1 / devicePixelRatio,
                    stroke: '#484163',
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

                    const m = (dataMax < 16) ? 16 : dataMax + 2;

                    return [ 0, m ]

                }
            }
        },
        series: [
            {},
            {
                stroke: '#c152b1',
                fill,
                points: {
                    show: false
                },
                paths: linear()
            },
        ]
    };

    const uplot = new uPlot(opts, data, container);

    //  ms gauge

    const gaugeOpts = {
        angle: 0,
        lineWidth: 0.3,
        pointer: {
            length: 0.5,
            strokeWidth: 0.05,
            color: '#000'
        },
        limitMax: true,     // If false, max value increases automatically if value > maxValue
        limitMin: true,
        // colorStart: '#FF0000',
        // colorStop: '#00FF00',
        strokeColor: '#4A4A4A',
        generateGradient: true,
        highDpiSupport: true,
        percentColors: [ [ 0.0, "#00ff00" ], [ 0.50, "#ffff00" ], [ 1.0, "#ff0000" ] ]
    };

    const gaugeTarget = document.getElementById('msGauge');

    const gauge = new Gauge(gaugeTarget).setOptions(gaugeOpts);

    gauge.maxValue = 30;
    gauge.setMinValue(0);
    gauge.animationSpeed = 25;
    gauge.set(0);

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

        gauge.set(renderStats.delta);
    
    }, 100);
}
