var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

// var todos = [{
// 	id: 1,
// 	description: 'Meet mom for lunch',
// 	completed: false
// }, {
// 	id: 2,
// 	description: 'Go to market',
// 	completed: false
// }, {
// 	id: 3,
// 	description: 'Make doctors appointment',
// 	completed: true
// }];

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

//GET /todos

app.get('/todos', function (req, res) {
	res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos,{id: todoId});


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

app.post('/todos', function (req, res) {
	var body = _.pick(req.body,'description','completed');
	//req.body;

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim();
	body.id = todoNextId;
	todoNextId++;
	todos.push(body);

	//console.log('description ' + body.description);
	res.json(body);
});


app.listen (PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});