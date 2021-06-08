window.linkGame = (game) =>
{
    const { linear, spline, stepped, bars } = uPlot.paths;

    // const stepBefore = stepped({ align: -1 });
    // const stepAfter  = stepped({ align:  1 });
    // const spline     = spline();
    
    const a = []; // gameFrame
    const b = []; // numGameObjects
    const c = []; // numDirtyLocalTransforms

    const renderStats = game.renderStats;

    const startFrame = renderStats.gameFrame;
    
    for (let i = 0; i < 300; i++)
    {
        a[i] = Number(startFrame + i);
        b[i] = Number(renderStats.numGameObjects);
        c[i] = Number(renderStats.numDirtyLocalTransforms);
    }
    
    let data = [ a, b, c ];
    
    let opts = {
        id: 'chart',
        width: 800,
        height: 300,
        axes: [
            {
                stroke: '#00ff00',
                font: `10px 'MonoLisa'`,
                labelFont: `10px 'MonoLisa'`,
                grid: {
                    width: 1 / devicePixelRatio,
                    stroke: 'rgb(20, 20, 20)',
                },
                ticks: {
                    width: 1 / devicePixelRatio,
                    stroke: 'rgb(20, 20, 20)',
                },
                space: 60
            },
            {
                stroke: '#00ff00',
                font: `10px 'MonoLisa'`,
                labelFont: `10px 'MonoLisa'`,
                grid: {
                    width: 1 / devicePixelRatio,
                    stroke: 'rgb(20, 20, 20)',
                },
                ticks: {
                    width: 1 / devicePixelRatio,
                    stroke: 'rgb(20, 20, 20)',
                }
            },
        ],
        scales: {
            x: {
                time: false,
            },
            y: {
            }
        },
        series: [
            {
                label: 'Game Frame'
            },
            {
                label: 'Game Objects',
                stroke: 'red',
                fill: 'rgba(255, 0, 0, 0.3)',
                paths: spline()
            },
            {
                label: 'Local Updates',
                stroke: 'green',
                fill: 'rgba(0, 255, 0, 0.3)',
                paths: spline()
            }
        ]
    };
    
    let uplot = new uPlot(opts, data, document.body);
    
    let f = 0;

    setInterval(() => {
    
        if (game.isPaused)
        {
            //  TODO - Keep recording data into another array
            //  while paused and then re-sync the data when resumed
            return;
        }
    
        // const v = 50 + Math.abs(Math.random() * 30);
        // const v2 = v - (10 + Math.abs(Math.random() * 30));
    
        if (f > 300)
        {
            data[0].shift();
            data[1].shift();
            data[2].shift();
    
            data[0].push(renderStats.gameFrame);
            data[1].push(renderStats.numGameObjects);
            data[2].push(renderStats.numDirtyLocalTransforms);
        }
        else
        {
            data[0][f] = renderStats.gameFrame;
            data[1][f] = renderStats.numGameObjects;
            data[2][f] = renderStats.numDirtyLocalTransforms;
        }
    
        uplot.setData(data);
    
        f++;
    
    }, 20);
}
