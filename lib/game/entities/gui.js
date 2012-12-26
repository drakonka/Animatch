ig.module( 
	'game.entities.gui'
)
.requires(
	'impact.entity'
)
.defines(function(){
EntityGui = ig.Entity.extend({
	size: {x: 1, y:1},
    
	type: ig.Entity.TYPE.B,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},

	update: function() {
		this.parent();
	}
});


EntityNextButton = ig.Entity.extend({
	size: {x: 300, y: 150},
	active: true,

	type: ig.Entity.TYPE.B,
	
	animSheet: new ig.AnimationSheet( 'media/gui/next.png', 300, 150 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.pos = {x: ig.system.width / 2 - this.size.x / 2,
					y: ig.system.height / 2 - this.size.y / 2};
		this.addAnim( 'idle', 1, [0] );
	},

	clicked: function() {
		ig.game.loadLevel(LevelMain);
	},

	update: function() {
		this.parent();
	}
});
});