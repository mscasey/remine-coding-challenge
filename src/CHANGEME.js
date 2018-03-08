import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API.js';
import SelectFilter  from './components/SelectFilter';
import RangeFilter from './components/RangeFilter';

class Test extends Component {
	constructor(){
		super();
		this.state = {
			locations: [],
			buildingTypes: [],
			bathFilter: {},
			bedFilter: {},
			buildingTypeFilter: []
		};
	}
	
	componentDidMount(){
		API
			.getLocations()
			.then((data) => this.setState({locations: data.data}));
		API
			.getBuildingTypes()
			.then((data) => this.setState({buildingTypes: data.data}));
	}
	
	//Returns filtered list of properties
	filterProperties(properties){
		const filterBath = (property) => filterNumeric(this.state.bathFilter.min, this.state.bathFilter.max, property.baths);
		const filterBeds = (property) => filterNumeric(this.state.bedFilter.min, this.state.bedFilter.max, property.beds);
		const filterBuilding = (property) => filterMatch(this.state.buildingTypeFilter, property.buildingType.id);
		
		const fullFilter = (p) => filterBath(p) && filterBeds(p) && filterBuilding(p);
		
		const filteredLocations = properties.filter(fullFilter);
		
		return filteredLocations;
	}
	
    render() {
		const filteredLocations = this.filterProperties(this.state.locations);
		
        return (
            <div className="testContainer">
                <div className="filterContainer">
					<RangeFilter title="Number of Baths" range={[0,5]} 
						onChange={(filter) => this.setState({bathFilter: filter})}/>
					<RangeFilter title="Number of Beds" range={[0,6]} 
						onChange={(filter) => this.setState({bedFilter: filter})}/>
                    <SelectFilter title="Building Type" options={this.state.buildingTypes.map(t => ({value: t.id, label: t.name}))} 
						onChange={(filter) => this.setState({buildingTypeFilter: filter})} />
                </div>
                <RemineTable properties={filteredLocations} />
            </div>
        );
    }
	
}

export default Test;

//Returns true if item is between max and min (inclusive)
//@param	{number} 	min
//@param 	{number} 	max	
//@param 	{number}	value Value to check if between min and max
function filterNumeric(min, max, value){
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
function filterMatch(matches, value){
	//If the value is null or undefined, we can't rule it out
	if(!exists(value)) return true;
	
	if(!matches || !matches.length) return true;
	return matches.includes(value);
}

//Returns true if value is no undefined or null or such (but false if 0)
function exists(value){
	return value || value === 0;
}
