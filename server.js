var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js')

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

//GET /todos

app.get('/todos', function(req, res) {
	var queryParams = req.query;
	var filteredTodos = todos;

	if (queryParams.hasOwnProperty('completed') && queryParams.completed === "true") {
		var filteredTodos = _.where(todos, {
			completed: true
		});
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === "false") {
		var filteredTodos = _.where(todos, {
			completed: false
		});
	}

	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos, function(todo) {
			return todo.description.toLowerCase().includes(queryParams.q.toLowerCase());
		});
		//var filteredTodos = _.where(todos, description.includes(queryParams.description));
	}
	res.json(filteredTodos);
});

//GET /todos/:id
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {
		id: todoId
	});


	// if (matchedTodo) { 
	// 	res.json(matchedTodo);	
	// } else {
	// 	res.status(404).send();
	// }

	for (var i = todos.length - 1; i >= 0; i--) {
		var currentTodo = todos[i];
		if (currentTodo.id === todoId) {
			res.send(currentTodo.description)
			return;
		}
	}
	//res.send('Asking for todo with id of ' + req.params.id)
	res.status(404).send();
});

// POST /todos

app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0) {
		return res.status(400).json({
			"error": "Your todo is bad format son"
		});
	} else {
		db.Todo.create({
			description: body.description,
			completed: body.completed
		}).then(function(){
			return Todo.findById(1)
		}).then(function(todo) {
			if (todo) {
				res.status(200).json(todo) 
			} else {
				res.status(400).json({
					"error": "No todo created"
				})
			}
		})
	}

	//call db.todo.create
	//iff success respond with 200 and todo
	// if fail pass error send res.status(400).json(e)

	//req.body;

	// if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0) {
	// 	return res.status(400).send();
	// }

	// body.description = body.description.trim();
	// body.id = todoNextId;
	// todoNextId++;
	// todos.push(body);

	// //console.log('description ' + body.description);
	// res.json(body);
});

app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {
		id: todoId
	});

	if (!matchedTodo) {
		res.status(404).send();
	} else {
		todos = _.without(todos, matchedTodo);
	}
	res.json(matchedTodo);
});

// PUT /todos/:id
app.put('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {
		id: todoId
	});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	console.log("LOG 1")
	console.log(req.body)

	if (!matchedTodo) {
		return res.status(404).send();
	}

	console.log("LOG 2")
	console.log(body)
	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
		console.log("LOG 3")
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
		console.log("LOG 4")
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}
	console.log("LOG 5")
	matchedTodo = _.extend(matchedTodo, validAttributes);

	res.json(matchedTodo);

});

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
})