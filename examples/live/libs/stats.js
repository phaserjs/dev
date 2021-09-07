/**
 * @author mrdoob / http://mrdoob.com/
 */

export function Stats (game, t = 0)
{
    var game = game;
    var mode = 0;

	var container = document.createElement( 'div' );
	container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
	container.addEventListener( 'click', function ( event ) {

		event.preventDefault();
		showPanel( ++ mode % container.children.length );

	}, false );

	//

	function addPanel( panel ) {

		container.appendChild( panel.dom );
		return panel;

	}

	function showPanel( id ) {

		for ( var i = 0; i < container.children.length; i ++ ) {

			container.children[ i ].style.display = i === id ? 'block' : 'none';

		}

		mode = id;

	}

	var beginTime = ( performance || Date ).now(), prevTime = beginTime, frames = 0;

	var fpsPanel = addPanel( new Stats.Panel( 'FPS', '#0ff', '#002' ) );
	var renderMsPanel = addPanel( new Stats.Panel( 'MS RENDER', '#0f0', '#020' ) );
	var updateMsPanel = addPanel( new Stats.Panel( 'MS UPDATE', '#f08', '#201' ) );

    // var fpsPanel = addPanel( new Stats.Panel( 'FPS', '#0ff', '#002' ) );
	// var msPanel = addPanel( new Stats.Panel( 'MS', '#0f0', '#020' ) );
	// var memPanel = addPanel( new Stats.Panel( 'MB', '#f08', '#201' ) );
    // var phaserPanel = addPanel(new Stats.Panel( 'Render', '#AAA', '#111' ));

    showPanel( t );

	return {

		dom: container,
		addPanel: addPanel,
		showPanel: showPanel,

		begin: function ()
        {
			beginTime = performance.now();
		},

		end: function () {

            // delta: 16.67333333492279
            // dirtyColor: 0
            // dirtyLocal: 25000
            // dirtyQuad: 25000
            // dirtyView: 0
            // dirtyWorld: 0
            // fps: 59.976009590444065
            // gameFrame: 29929
            // numChildren: 291242
            // renderList: []
            // renderMs: 5.8999998569488525
            // rendered: 76
            // updateMs: 0.8999998569488525
            // updated: 25002

			var time = performance.now();

			if (time >= prevTime + 250)
            {
                fpsPanel.update( game.renderStats.fps, 100 );
                renderMsPanel.update( game.renderStats.renderMs, 200 );
                updateMsPanel.update( game.renderStats.updateMs, 200 );

				prevTime = time;
            }

			return time;
		},

		update: function ()
        {
			beginTime = this.end();
		}

	};

};

Stats.Panel = function ( name, fg, bg ) {

	var min = Infinity, max = 0, round = Math.round;
	var PR = round( window.devicePixelRatio || 1 );

    var WIDTH = 120;
    var HEIGHT = 48;
    var TEXT_X = 3 * PR;
    var TEXT_Y = 3 * PR;
    var GRAPH_X = 3 * PR;
    var GRAPH_Y = 15 * PR;
    var GRAPH_WIDTH = (WIDTH - 6) * PR;
    var GRAPH_HEIGHT = (HEIGHT - 18) * PR;

	var canvas = document.createElement( 'canvas' );

    canvas.style.cssText = `width:${WIDTH}px;height:${HEIGHT}px`;

    WIDTH *= PR;
    HEIGHT *= PR;

    canvas.width = WIDTH;
	canvas.height = HEIGHT;

	var context = canvas.getContext( '2d' );
	context.font = 'bold ' + ( 9 * PR ) + 'px Helvetica,Arial,sans-serif';
	context.textBaseline = 'top';

	context.fillStyle = bg;
	context.fillRect( 0, 0, WIDTH, HEIGHT );

	context.fillStyle = fg;
	context.fillText( name, TEXT_X, TEXT_Y );
	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

	context.fillStyle = bg;
	context.globalAlpha = 0.9;
	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

	return {

		dom: canvas,

		update: function ( value, maxValue ) {

			min = Math.min( min, value );
			max = Math.max( max, value );

			context.fillStyle = bg;
			context.globalAlpha = 1;
			context.fillRect( 0, 0, WIDTH, GRAPH_Y );
			context.fillStyle = fg;
			context.fillText( round( value ) + ' ' + name + ' (' + round( min ) + '-' + round( max ) + ')', TEXT_X, TEXT_Y );

			context.drawImage( canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT );

			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT );

			context.fillStyle = bg;
			context.globalAlpha = 0.9;
			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round( ( 1 - ( value / maxValue ) ) * GRAPH_HEIGHT ) );

		}

	};

};

export function StartStats (game, t = 0)
{
    const stats = new Stats(game, t);

    document.body.appendChild(stats.dom);
    
    function animate ()
    {
        stats.update();

        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}
