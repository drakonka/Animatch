ig.module( 
	'game.entities.creature'
)
.requires(
	'impact.entity'
)
.defines(function(){"use strict";
ig.global.EntityCreature = ig.Entity.extend({
	size: {x: 250, y: 250},
	maxVel: {x: 0, y: 0},
	alpha: 1,
	fade: false,
	kind: null,
	image: null,
	image_blank: null,
	image_final: null,
	
	type: ig.Entity.TYPE.B,
/*	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER, */


	init: function( x, y, settings ) {
		this.parent(x, y, settings);
		this.image = this.image_blank;
	},

	clicked: function() {
		if (this.kind === ig.game.controller.targetCreature.kind) {
			this.image = this.image_final;
			console.log('success!');
		//	ig.game.loadLevel(LevelMain);
		} 
	},

	update: function() {
		this.parent();
	},
	
	draw: function(){
		this.image.draw(this.pos.x, this.pos.y);
	}
	
});
});