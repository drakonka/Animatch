ig.module(
	'game.director.controller'
)
.requires(
	'impact.impact'
)
.defines(function(){

ig.Controller = ig.Class.extend({

	// Array of all possible creatures and their images, as well as any animals that can't be matched to each other due to similarities.
	
	creaturesArr: [{
			kind: 'cat',
			image_blank: new ig.Image('media/creatures_blank/cat.png'),
			image_final: new ig.Image('media/creatures_final/cat.png'),
			swatch: new ig.Image('media/swatches/cat.png')
		},

		{	kind: 'dog',
			image_blank: new ig.Image('media/creatures_blank/dog.png'),
			image_final: new ig.Image('media/creatures_final/dog.png'),
			swatch: new ig.Image('media/swatches/dog.png')
		},

		{	kind: 'pig',
			image_blank: new ig.Image('media/creatures_blank/pig.png'),
			image_final: new ig.Image('media/creatures_final/pig.png'),
			swatch: new ig.Image('media/swatches/pig.png')
		},

		{	kind: 'crow',
			image_blank: new ig.Image('media/creatures_blank/crow.png'),
			image_final: new ig.Image('media/creatures_final/crow.png'),
			swatch: new ig.Image('media/swatches/crow.png')
		},

		{	kind: 'wolf',
			image_blank: new ig.Image('media/creatures_blank/wolf.png'),
			image_final: new ig.Image('media/creatures_final/wolf.png'),
			swatch: new ig.Image('media/swatches/wolf.png')
		},

		{	kind: 'lion',
			image_blank: new ig.Image('media/creatures_blank/lion.png'),
			image_final: new ig.Image('media/creatures_final/lion.png'),
			swatch: new ig.Image('media/swatches/lion.png')
		},

		{	kind: 'dragon',
			image_blank: new ig.Image('media/creatures_blank/dragon.png'),
			image_final: new ig.Image('media/creatures_final/dragon.png'),
			swatch: new ig.Image('media/swatches/dragon.png')
		},

		{	kind: 'badger',
			image_blank: new ig.Image('media/creatures_blank/badger.png'),
			image_final: new ig.Image('media/creatures_final/badger.png'),
			swatch: new ig.Image('media/swatches/badger.png')
		},

		{	kind: 'kangaroo',
			image_blank: new ig.Image('media/creatures_blank/kangaroo.png'),
			image_final: new ig.Image('media/creatures_final/kangaroo.png'),
			swatch: new ig.Image('media/swatches/kangaroo.png')
		},

		{	kind: 'fox',
			image_blank: new ig.Image('media/creatures_blank/fox.png'),
			image_final: new ig.Image('media/creatures_final/fox.png'),
			swatch: new ig.Image('media/swatches/fox.png')
		},

		{	kind: 'tiger',
			image_blank: new ig.Image('media/creatures_blank/tiger.png'),
			image_final: new ig.Image('media/creatures_final/tiger.png'),
			swatch: new ig.Image('media/swatches/tiger.png')
		},

		{	kind: 'zebra',
			image_blank: new ig.Image('media/creatures_blank/zebra.png'),
			image_final: new ig.Image('media/creatures_final/zebra.png'),
			swatch: new ig.Image('media/swatches/zebra.png')
		},

		{	kind: 'polar_bear',
			image_blank: new ig.Image('media/creatures_blank/polar_bear.png'),
			image_final: new ig.Image('media/creatures_final/polar_bear.png'),
			swatch: new ig.Image('media/swatches/polar_bear.png')
		},

		{	kind: 'lorikeet',
			image_blank: new ig.Image('media/creatures_blank/lorikeet.png'),
			image_final: new ig.Image('media/creatures_final/lorikeet.png'),
			swatch: new ig.Image('media/swatches/lorikeet.png')
		},

		{	kind: 'leopard',
			image_blank: new ig.Image('media/creatures_blank/leopard.png'),
			image_final: new ig.Image('media/creatures_final/leopard.png'),
			swatch: new ig.Image('media/swatches/leopard.png')
		},

		{	kind: 'turtle',
			image_blank: new ig.Image('media/creatures_blank/turtle.png'),
			image_final: new ig.Image('media/creatures_final/turtle.png'),
			swatch: new ig.Image('media/swatches/turtle.png')
		},

		{	kind: 'cow',
			image_blank: new ig.Image('media/creatures_blank/cow.png'),
			image_final: new ig.Image('media/creatures_final/cow.png'),
			swatch: new ig.Image('media/swatches/cow.png')
		}

	],

	targetCreature: null,
//	slots: [],

	init: function() {
	},

	generateSwatch: function() {
		var rand = this.randomFromTo(0, this.creaturesArr.length - 1);
		console.log('swatch rand: ' + rand);
		this.targetCreature = this.creaturesArr[rand];
	//	console.log('target rand: ' + rand + ' target kind: ' + this.targetCreature.kind);
		ig.game.spawnEntity(EntitySwatch, 0, 0, {kind: this.targetCreature.kind, image: this.targetCreature.swatch});
		this.generateCreatures();
	},

	generateCreatures: function() {
		var targetCreatureSpawned = false;
	//	var randCreature = null;
		var creature = null;

		for (var i = 0; i < this.slots.length; i++) {
			slot = this.slots[i];
			var rand = this.randomFromTo(1,3);
			if (rand === 1 && !targetCreatureSpawned) {
				console.log('target creature rolling');

				targetCreatureSpawned = true;
				creature = this.targetCreature;
			}

			else {
				var randCreature = this.rollRandomCreature();
				creature = randCreature;

			}

			ig.game.spawnEntity(EntityCreature, slot.x, slot.y, {kind: creature.kind, image_blank: creature.image_blank, image_final: creature.image_final});

			console.log('slot ' + i);
		}
	},

	rollRandomCreature: function() {
		console.log('random creature rolling');

	//	var allCreatures = ig.game.getEntitiesByType( 'EntityCreature' );
		rand = this.randomFromTo(0, this.creaturesArr.length - 1);
				console.log('rand creature rand: ' + rand);

	//	var randCreature = this.creaturesArr[rand];
	//	var inArray = this.inArray(allCreatures, randCreature.kind);
		return this.creaturesArr[rand];
	},

	/******* UTILITY FUNCTIONS *******/

	randomFromTo: function(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
    },

	inArray: function(array, kind) {
		for(var i=0;i<array.length;i++) {
		//	console.log('array kind: ' + array[i].kind);
			if(array[i].kind === kind) {
				return true;
			}
		}
		return false;
	}

});

});