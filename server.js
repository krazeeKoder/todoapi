var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to market',
	completed: false
}, {
	id: 3,
	description: 'Make doctors appointment',
	completed: true
}];

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

//GET /todos

app.get('/todos', function (req, res) {
	res.json(todos);
});

app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	//var matchedTodo;

	// todos.forEach(function(todo){
	// 	if (todo.id === todoId) {
	// 		matchedTodo = todo;
	// 	}
	// });

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

//GET /todos/:id

app.listen (PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});