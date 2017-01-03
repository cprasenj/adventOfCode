const createCordinates = function(input) {
	return input.map(function(inputElem) {
		return {
			direction: inputElem.slice(0, 1),
			distance: parseInt(inputElem.slice(1))
		};
	});
}

exports.createCordinates = createCordinates;
