ig.module( 
	'game.main'
)
.requires(
	'game.director.controller',
	'game.director.screen-fader',
	'game.entities.creature',
	'game.entities.swatch',
	'game.entities.trigger',
	'game.entities.pointer',
	'game.entities.gui',

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
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		this.loadLevel(LevelTitle);
		var slotPosY = ig.system.height / 1.7;
		this.controller.slots = [
								{x: ig.system.width / 2 - 400, y: slotPosY},
								{x: ig.system.width / 2 - 250 / 2, y: slotPosY},
								{x: ig.system.width / 2 + 150, y: slotPosY}];

	},

	deleteScreenFade: function() {
		this.screenFade = null;
		this.activateAllCreatures();
	},

	activateAllCreatures: function() {
		var allCreatures = this.getEntitiesByType(EntityCreature);
		for (var i = 0; i < allCreatures.length; i++) {
			var creature = allCreatures[i];
			creature.active = true;
		}
	},

	loadLevel: function( data ) {
		this.currentLevel = data;
		this.parent( data );
	//	this.spawnEntity( EntityPointer, 0, 0 );
		this.screenFade = new ig.ScreenFader( {  fade: 'out', speed: 1.4, callback: this.deleteScreenFade } );
		if (this.currentLevel !== LevelTitle) {
			this.controller.generateSwatch();
		}
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		if (this.screenFade) {
			this.screenFade.draw();
		}
	}
});

ig.main( '#canvas', MyGame, 60, 850, 700, 1 );

});
