ig.module( 
	'game.main' 
)
.requires(
	'game.director.controller',
	'game.entities.creature',
	'game.entities.swatch',
	'game.entities.trigger',
	'game.entities.pointer',

	'game.levels.title',
	'game.levels.main',

	'impact.game',
	'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	controller: new ig.Controller(),
	currentLevel: null,
	gravityFactor: 0,

	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		this.loadLevel(LevelTitle);
		this.controller.slots = [
								{x: ig.system.width / 2 - 400, y: ig.system.height / 2},
								{x: ig.system.width / 2 - 250 / 2, y: ig.system.height / 2},
								{x: ig.system.width / 2 + 150, y: ig.system.height / 2}];

	},

	loadLevel: function( data ) {
		this.currentLevel = data;
		this.parent( data );
	//	this.spawnEntity( EntityPointer, 0, 0 );
	//	this.screenFade = new ig.ScreenFader( {  fade: 'out', speed: 0.8, callback: this.deleteScreenFade } );
		if (this.currentLevel !== LevelTitle) {
			this.controller.generateSwatch();
		}
	},

	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 850, 700, 1 );

});