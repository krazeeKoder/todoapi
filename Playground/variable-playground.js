var person = {
	name: 'Tony',
	age: 21
};

var testArray = [1,9];

function updatePerson (obj) {
	obj.age = 29;
}

updatePerson (person);


function updateArray (obj) {
obj.push(15);
debugger;
}

function createNewUpdatedArray (obj) {
	obj = [1,9,15];

}

//updateArray(testArray);
createNewUpdatedArray(testArray);
console.log(testArray);