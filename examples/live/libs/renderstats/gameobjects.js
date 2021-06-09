window.OLDlinkGame = (game) =>
{
    const { linear, spline, stepped, bars } = uPlot.paths;

    // const stepBefore = stepped({ align: -1 });
    // const stepAfter  = stepped({ align:  1 });
    // const spline     = spline();
    
    //  renderStats:
    // gameFrame: number;
    // numScenes: number;
    // numWorlds: number;
    // numGameObjects: number;
    // numGameObjectsRendered: number;
    // numDirtyLocalTransforms: number;
    // numDirtyWorldTransforms: number;
    // numDirtyVertices: number;
    // numDirtyWorldLists: number;
    // numDirtyCameras: number;

    const a = [];
    const b = [];
    const c = [];
    const d = [];
    const e = [];

    const renderStats = game.renderStats;

    const startFrame = renderStats.gameFrame;
    
    for (let i = 0; i < 300; i++)
    {
        a[i] = startFrame + i;
        b[i] = renderStats.numGameObjects;
        c[i] = renderStats.numGameObjectsRendered;
        d[i] = renderStats.numDirtyLocalTransforms;
        e[i] = renderStats.numDirtyWorldTransforms;
    }
    
    let data = [ a, b, c, d, e ];

    //  padding: [ top, right, bottom, left ]
    
    let opts = {
        id: 'chart',
        width: 800,
        height: 300,
        padding: [ 16, 0, 0, 0 ],
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
            }
        },
        series: [
            {
                label: 'Frame'
            },
            {
                label: 'Game Objects',
                stroke: 'red',
                fill: 'rgba(255, 0, 0, 0.5)',
                paths: linear()
            },
            {
                label: 'Rendered',
                stroke: 'green',
                fill: 'rgba(0, 255, 0, 0.5)',
                paths: linear()
            },
            {
                label: 'Local',
                stroke: 'orange',
                // fill: 'rgba(0, 255, 0, 0.3)',
                paths: linear()
            },
            {
                label: 'World',
                stroke: 'yellow',
                // fill: 'rgba(0, 255, 0, 0.3)',
                paths: linear()
            }
        ]
    };
    
    let uplot = new uPlot(opts, data, document.body);
    
    let f = 0;

    setInterval(() => {
    
        if (game.isPaused)
        {
            return;
        }
    
        if (f > 300)
        {
            data[0].shift();
            data[1].shift();
            data[2].shift();
            data[3].shift();
            data[4].shift();
    
            data[0].push(renderStats.gameFrame);
            data[1].push(renderStats.numGameObjects);
            data[2].push(renderStats.numGameObjectsRendered);
            data[3].push(renderStats.numDirtyLocalTransforms);
            data[4].push(renderStats.numDirtyWorldTransforms);
        }
        else
        {
            data[0][f] = renderStats.gameFrame;
            data[1][f] = renderStats.numGameObjects;
            data[2][f] = renderStats.numGameObjectsRendered;
            data[3][f] = renderStats.numDirtyLocalTransforms;
            data[4][f] = renderStats.numDirtyWorldTransforms;
        }
    
        uplot.setData(data);
    
        f++;
    
    }, 14);
}

window.linkGame = (game) => {

    const { linear, bars } = uPlot.paths;

    const renderStats = game.renderStats;

    const frameText = document.getElementById('fps0');
    const fpsText = document.getElementById('fps1');

    let data = [ [], [] ];

    const opts = {
        width: 300,
        height: 200,
        // cursor: {
           
        // },
        select: {
            show: false
        },
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
                gap: 0,
                space: 0,
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
                    return [ 0, dataMax + 10 ]
                }
            }
        },
        series: [
            {},
            {
                stroke: '#0ff',
                fill: 'rgba(0, 255, 255, 0.5)',
                points: {
                    show: false
                },
                paths: linear()
            },
        ]
    };

    const uplot = new uPlot(opts, data, document.getElementById('fpsContainer'));

    console.log(uplot);

    let f = 0;

    window.data = data;

    setInterval(() => {

        const c = uplot.cursor;

        const frame = (c.idx) ? data[0][c.idx] : game.frame;
        const fps = (c.idx) ? data[1][c.idx] : game.fps;

        frameText.innerText = `Frame: ${frame}`;
        fpsText.innerText = `FPS: ${fps.toFixed(2)}`;

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