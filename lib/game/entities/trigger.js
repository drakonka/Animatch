ig.module( 
	'game.entities.trigger'
)
.requires(
	'impact.entity'
)
.defines(function(){"use strict";

ig.global.EntityTrigger = ig.Entity.extend({
	size: {x: 100, y: 100},
	offset: {x: 0, y: 0},
	maxVel: {x: 0, y: 0},
	kind: null,
	parentEntity: null,
	zIndex: 200,
	alpha: 0.4,
	active: true,
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: '#ffffff',

	
	type: ig.Entity.TYPE.B,
//	checkAgainst: ig.Entity.TYPE.NONE,
//	collides: ig.Entity.COLLIDES.NEVER,


	init: function( x, y, settings ) {
		this.parent(x, y, settings);
		console.log(this.kind);
		if( !ig.global.wm )    {
			ig.game.sortEntitiesDeferred();
		}	
	},

	clicked: function() {
		if (this.kind === 'start') {
			ig.game.loadLevel(LevelMain);
		}
	},
    
    update: function() {
		if (!this.touches(ig.game.pointer)) {
			if (this.alpha < 0.4) {
				this.alpha += 0.03;
			}
		}
	},


	draw: function() {
		if (this.active) {
			ig.system.context.fillStyle = 'rgba(0,0,0,' + this.alpha + ')';
			ig.system.context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		}
	}

});
});
	