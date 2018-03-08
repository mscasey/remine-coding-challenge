//Converts input onChange events to pass data to function, instead of event
export function onInput(fn) { return (event) => fn(event.target.value) }

//Returns true if item is between max and min (inclusive)
//@param	{number} 	min
//@param 	{number} 	max	
//@param 	{number}	value Value to check if between min and max
export function filterNumeric(min, max, value) {
	//If the value is null or undefined, we can't rule it out
	if(!exists(value)) return true;
	
	//If there is no max or min, default to included
	if(!exists(min) && !exists(max)) return true;
	
	if(exists(max) && value > max) return false;
	if(exists(min) && value < min) return false;
	return true;
}

//Returns true if item is in list
//@param {array} 	matches		list to check item against
//@param {any} 		value 		item to check if in matches	
export function filterMatch(matches, value) {
	//If the value is null or undefined, we can't rule it out
	if(!exists(value)) return true;
	
	if(!matches || !matches.length) return true;
	return matches.includes(value);
}

//Returns true if value is no undefined or null or such (but false if 0)
export function exists(value) {
	return value || value === 0;
}