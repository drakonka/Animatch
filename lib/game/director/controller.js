ig.module(
	'game.director.controller'
)
.requires(
	'impact.impact'
)
.defines(function(){

ig.Controller = ig.Class.extend({

	// Array of all possible creatures and their images, as well as any animals that can't be matched to each other due to similarities.
	creatureLibraryArr: [{
			kind: 'cat',
			image_blank: new ig.Image('media/creatures_blank/cat.png'),
			image_final: new ig.Image('media/creatures_final/cat.png'),
			swatch: new ig.Image('media/swatches/cat.png'),
			group: 1
		},

		{	kind: 'dog',
			image_blank: new ig.Image('media/creatures_blank/dog.png'),
			image_final: new ig.Image('media/creatures_final/dog.png'),
			swatch: new ig.Image('media/swatches/dog.png'),
			group: 1
		},

		{	kind: 'pig',
			image_blank: new ig.Image('media/creatures_blank/pig.png'),
			image_final: new ig.Image('media/creatures_final/pig.png'),
			swatch: new ig.Image('media/swatches/pig.png'),
			group: 0
		},

		{	kind: 'crow',
			image_blank: new ig.Image('media/creatures_blank/crow.png'),
			image_final: new ig.Image('media/creatures_final/crow.png'),
			swatch: new ig.Image('media/swatches/crow.png'),
			group: 0
		},

		{	kind: 'wolf',
			image_blank: new ig.Image('media/creatures_blank/wolf.png'),
			image_final: new ig.Image('media/creatures_final/wolf.png'),
			swatch: new ig.Image('media/swatches/wolf.png'),
			group: 1
		},

		{	kind: 'lion',
			image_blank: new ig.Image('media/creatures_blank/lion.png'),
			image_final: new ig.Image('media/creatures_final/lion.png'),
			swatch: new ig.Image('media/swatches/lion.png'),
			group: 0
		},

		{	kind: 'dragon',
			image_blank: new ig.Image('media/creatures_blank/dragon.png'),
			image_final: new ig.Image('media/creatures_final/dragon.png'),
			swatch: new ig.Image('media/swatches/dragon.png'),
			group: 0
		},

		{	kind: 'badger',
			image_blank: new ig.Image('media/creatures_blank/badger.png'),
			image_final: new ig.Image('media/creatures_final/badger.png'),
			swatch: new ig.Image('media/swatches/badger.png'),
			group: 0
		},

		{	kind: 'kangaroo',
			image_blank: new ig.Image('media/creatures_blank/kangaroo.png'),
			image_final: new ig.Image('media/creatures_final/kangaroo.png'),
			swatch: new ig.Image('media/swatches/kangaroo.png'),
			group: 1
		},

		{	kind: 'fox',
			image_blank: new ig.Image('media/creatures_blank/fox.png'),
			image_final: new ig.Image('media/creatures_final/fox.png'),
			swatch: new ig.Image('media/swatches/fox.png'),
			group: 1
		},

		{	kind: 'tiger',
			image_blank: new ig.Image('media/creatures_blank/tiger.png'),
			image_final: new ig.Image('media/creatures_final/tiger.png'),
			swatch: new ig.Image('media/swatches/tiger.png'),
			group: 0
		},

		{	kind: 'zebra',
			image_blank: new ig.Image('media/creatures_blank/zebra.png'),
			image_final: new ig.Image('media/creatures_final/zebra.png'),
			swatch: new ig.Image('media/swatches/zebra.png'),
			group: 0
		},

		{	kind: 'polar_bear',
			image_blank: new ig.Image('media/creatures_blank/polar_bear.png'),
			image_final: new ig.Image('media/creatures_final/polar_bear.png'),
			swatch: new ig.Image('media/swatches/polar_bear.png'),
			group: 1
		},

		{	kind: 'lorikeet',
			image_blank: new ig.Image('media/creatures_blank/lorikeet.png'),
			image_final: new ig.Image('media/creatures_final/lorikeet.png'),
			swatch: new ig.Image('media/swatches/lorikeet.png'),
			group: 0
		},

		{	kind: 'leopard',
			image_blank: new ig.Image('media/creatures_blank/leopard.png'),
			image_final: new ig.Image('media/creatures_final/leopard.png'),
			swatch: new ig.Image('media/swatches/leopard.png'),
			group: 0
		},

		{	kind: 'turtle',
			image_blank: new ig.Image('media/creatures_blank/turtle.png'),
			image_final: new ig.Image('media/creatures_final/turtle.png'),
			swatch: new ig.Image('media/swatches/turtle.png'),
			group: 1
		},

		{	kind: 'cow',
			image_blank: new ig.Image('media/creatures_blank/cow.png'),
			image_final: new ig.Image('media/creatures_final/cow.png'),
			swatch: new ig.Image('media/swatches/cow.png'),
			group: 0
		}

	],

	targetCreature: null,
	prevTargetCreatures: null,
	existingGroups: [],
	existingKinds: [],
	slots: [],

	init: function() {
	},

	generateSwatch: function() {
		this.targetCreature = null;
		var randInt = this.randomFromTo(0, this.creatureLibraryArr.length - 1);
		this.targetCreature = this.creatureLibraryArr[randInt];
		var duplicateSwatch = this.checkDuplicateSwatch();
		if (!duplicateSwatch) {
			ig.game.spawnEntity(EntitySwatch, 0, 0, {kind: this.targetCreature.kind, image: this.targetCreature.swatch});
			this.generateCreatures();
		}
		else {
			this.generateSwatch();
		}
	},

	generateCreatures: function() {
		this.existingGroups.length = 0;
		this.existingKinds.length = 0;
		var targetCreatureSpawned = false;
		var creature = null;
		for (var i = 0; i < this.slots.length; i++) {
			slot = this.slots[i];
			var randInt = this.randomFromTo(1,3);
			if (randInt === 1 && !targetCreatureSpawned || slot === this.slots[2] && !targetCreatureSpawned) {
				creature = this.rollTargetCreature();
				targetCreatureSpawned = true;
			}
			else {
				creature = this.rollRandomCreature();
			}
			console.log('creature kind: ' + creature.kind);
			if (creature.group === 1) {
				this.existingGroups.push(creature.group);
			}
			this.existingKinds.push(creature.kind);

			ig.game.spawnEntity(EntityCreature, slot.x, slot.y, {kind: creature.kind, image_blank: creature.image_blank, image_final: creature.image_final});		}
	},

	rollTargetCreature: function() {
		return this.targetCreature;
	},

	rollRandomCreature: function() {
		var randInt = this.randomFromTo(0, this.creatureLibraryArr.length - 1);
		var potentialCreature = this.creatureLibraryArr[randInt];
		var creatureDuplicate = this.inArray(this.existingKinds, potentialCreature.kind);
		var groupDuplicate = this.inArray(this.existingGroups, potentialCreature.group);
		var isTargetKind = potentialCreature.kind === this.targetCreature.kind;
		var isTargetGroup = potentialCreature.group === this.targetCreature.group && potentialCreature.group !== 0;
		if (creatureDuplicate || isTargetKind || groupDuplicate || isTargetGroup) {
			console.log('rerolling');
			return this.rollRandomCreature();
		}
		else {
			return potentialCreature;
		}
	},

	checkDuplicateSwatch: function() {
		if (this.prevTargetCreature !== null && this.targetCreature === this.prevTargetCreature) {
			console.log('dupe swatch!');
			return true;
		}
		else {
			return false;
		}
	},

	creatureExists: function(randCreature) {
		var allCreatures = ig.game.getEntitiesByType( EntityCreature );
		var allCreatureKinds = [];
		for (var i = 0; i < allCreatures.length; i++) {
			var creature = allCreatures[i];
			allCreatureKinds.push(creature.kind);
		}
		console.log('creature exists: ' + this.inArray(allCreatureKinds,randCreature.kind));
		return this.inArray(allCreatureKinds,randCreature.kind);
	},

	/******* UTILITY FUNCTIONS *******/

	randomFromTo: function(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
    },

    inArray: function(arr, obj) {
		return (arr.indexOf(obj) != -1);
	}

});

});