const input = require("./input.js").input;
const inputParser = require("./input_parser.js").createCordinates;

const step = function(direction) {
	const steps = {
		N: {x: 0, y: 1},
		E: {x: 1, y: 0},
		S: {x: 0, y: -1},
		W: {x: -1, y: 0}
	}
	return steps[direction];
};

const turnRight = function(fromDirection) {
	const directionsToRight = {
		N: 'E',
		E: 'S',
		S: 'W',
		W: 'N'
	}
	return directionsToRight[fromDirection];
}

const turnLeft = function(fromDirection) {
	return [...Array(2).keys()].reduce(function(fromDirection) {
		return turnRight(fromDirection);
	}, turnRight(fromDirection));
}

const turns = {
	R: turnRight,
	L: turnLeft
}

const addCordinate = function(cord1, cord2) {
	return {
		x: cord1['x'] + cord2['x'], 
		y: cord1['y'] + cord2['y']
	};
}

const moveForword = function(currentPosition, currentDirection) {
	return addCordinate(currentPosition, step(currentDirection)); 
}

const newDirection = function(currentDirection, directionToTurn) {
	return turns[directionToTurn](currentDirection);
} 

const newPosition = function(position, move) {
	const directionToTurn = move['direction'];
	const stepsToGo = move['distance'];

	return [...Array(stepsToGo).keys()].reduce(function(position) {
		return {
			position: moveForword(position['position'], position['direction']),
			direction: position['direction']
		};
	}, {
		position: position['currentPosition'], 
		direction: newDirection(position['currentDirection'], directionToTurn)
	})['position'];

}

const navigate = function(startPosition, startDirection, moves) { 
	return moves.reduce(function(position, move) {
		return {
			currentPosition: newPosition(position, move),
			currentDirection: turns[move['direction']](position['currentDirection'])
		};
	}, {currentPosition: startPosition, currentDirection: startDirection}); 
}

const calculateTaxicabDistance = function(startPosition, startDirection, moves) {
	const finalPosition = navigate({x: 0, y: 0}, 'N', inputParser(input))['currentPosition'];
	return Math.abs(finalPosition['x']) + Math.abs(finalPosition['y']);
}

console.log(calculateTaxicabDistance({x: 0, y: 0}, 'N', inputParser(input)));

