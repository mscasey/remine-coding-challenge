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
			bathFilter: {},
			bedFilter: {},
			buildingTypeFilter: []
		};
	}
	
	componentDidMount(){
		API.getLocations()
			.then((data) => this.setState({locations: data.data}));
	}
	
    render() {
		console.log(this.state.buildingTypeFilter);
		let filterBath = (property) => filterNumeric(this.state.bathFilter.min, this.state.bathFilter.max, property.baths);
		let filterBeds = (property) => filterNumeric(this.state.bedFilter.min, this.state.bedFilter.max, property.beds);
		let filterBuilding = (property) => filterMatch(this.state.buildingTypeFilter, property.buildingType.id);
		
		let fullFilter = (p) => filterBath(p) && filterBeds(p) && filterBuilding(p);
		
		let filteredLocations = this.state.locations.filter(fullFilter);
		
        return (
            <div className="testContainer">
                <div className="filterContainer">
					<RangeFilter title="Number of Baths" range={[0,5]} 
						onChange={(filter) => this.setState({bathFilter: filter})}/>
					<RangeFilter title="Number of Beds" range={[0,6]} 
						onChange={(filter) => this.setState({bedFilter: filter})}/>
                    <SelectFilter title="Building Type" options={buildingTypes.map(t => ({value: t.id, label: t.name}))} 
						onChange={(filter) => this.setState({buildingTypeFilter: filter})} />
                </div>
                <RemineTable properties={filteredLocations} />
            </div>
        );
    }
	
}

export default Test;

const buildingTypes = [
			{"id": 1,	"name": "multiFamily"},
			{"id": 2,	"name": "condo"},
			{"id": 3,	"name": "business"},
			{"id": 4,	"name": "office"},
			{"id": 5,	"name": "singleFamily"}
			];
	
function filterNumeric(min, max, value){
	if(!exists(min) && !exists(max)) return true;
	if(exists(max) && value > max) return false;
	if(exists(min) && value < min) return false;
	return true;
}

function filterMatch(matches, value){
	if(!matches || !matches.length) return true;
	return matches.includes(value);
}

function exists(value){
	return value || value === 0;
}
