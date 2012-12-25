ig.module( 
	'game.entities.swatch'
)
.requires(
	'impact.entity'
)
.defines(function(){"use strict";
ig.global.EntitySwatch = ig.Entity.extend({
	size: {x: 250, y: 200},
	maxVel: {x: 0, y: 0},
	alpha: 1,
	fade: false,
	image: null,
	
/*	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER, */
	
	init: function( x, y, settings ) {
		this.parent(x, y, settings);
		console.log('swatch kind: ' + this.kind);
		this.pos.x = ig.system.width / 2 - this.size.x / 2;
		this.pos.y = 50;
	//	this.animSheet = new ig.AnimationSheet( this.image, 250, 250 );

	//	this.anims.Idle = new ig.Animation( this.animSheet, 1, [0] );

		// this.setAnimations();
	},
	
	setAnimations: function(sheet) {

	},
	
	update: function() {
		this.parent();
	},
	
	draw: function(){
		this.image.draw(this.pos.x, this.pos.y);
	}, 
	

	
});
});