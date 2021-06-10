export function GameObjects (game)
{
    const { linear, spline, stepped, bars } = uPlot.paths;

    //  renderStats:
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

    const container = document.getElementById('goContainer');

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
        width: 600,
        height: 300,
        legend: {
            show: false
        },
        padding: [ 10, 10, 10, 10 ],
        axes: [
            {
                stroke: '#00ff00',
                font: `12px Consolas, 'Courier New', monospace`,
                labelFont: `10px 'MonoLisa'`,
                size: 20,
                gap: 0,
                grid: {
                    width: 1 / devicePixelRatio,
                    stroke: 'rgb(20, 20, 20)',
                }
            },
            {
                stroke: '#00ff00',
                font: `12px Consolas, 'Courier New', monospace`,
                labelFont: `10px 'MonoLisa'`,
                size: 20,
                gap: 0,
                grid: {
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
    
    let uplot = new uPlot(opts, data, container);
    
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
