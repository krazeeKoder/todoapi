var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({
	//force: true
}).then(function() {
	console.log('Everything is synced');
	Todo.findOne({
		where: {
			id: 2
		}
	}).then(function(todo){
		console.log(todo)
	})

	// Todo.create({
	// 	description: 'Walking my dog',
	// 	completed: false
	// }).then(function(todo) {
	// 	return Todo.create({
	// 		description: 'Clean office'
	// 	});
	// }).then(function(){
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like: '%dog%'
	// 			}
	// 			//completed: false
	// 		}
	// 	})
	// }).then(function(todos) {
	// 	if (todos) {
	// 		todos.forEach(function(todo) {
	// 			console.log(todo.toJSON())
	// 		})
	// 	} else {
	// 		consol.log('No todos found')
	// 	}
	// }).catch(function(e) {
	// 	console.log(e);
	// });
});