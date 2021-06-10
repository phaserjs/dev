export function MSGauge (game)
{
    const renderStats = game.renderStats;

    const gaugeOpts = {
        angle: 0,
        lineWidth: 0.2,
        radiusScale: 0.70,
        pointer: {
            length: 0.5,
            strokeWidth: 0.05,
            color: '#1c1c26'
        },
        limitMax: true,
        limitMin: true,
        strokeColor: '#424460',
        generateGradient: true,
        highDpiSupport: true,
        percentColors: [ [ 0.0, "#00ff00" ], [ 0.50, "#ffff00" ], [ 1.0, "#ff0000" ] ]
    };

    const gaugeTarget = document.getElementById('msGaugeCanvas');

    const gauge = new Gauge(gaugeTarget).setOptions(gaugeOpts);

    gauge.maxValue = 30;
    gauge.setMinValue(1);
    gauge.animationSpeed = 25;
    gauge.set(0);

    setInterval(() => {
    
        if (game.isPaused)
        {
            return;
        }

        gauge.set(renderStats.delta);
    
    }, 100);
}
