import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API.js';
import SelectFilter  from './components/SelectFilter';
import RangeFilter from './components/RangeFilter';
import { filterNumeric, filterMatch } from './util.js';

class Test extends Component {
	constructor() {
		super();
		this.state = {
			locations: [],
			buildingTypes: [],
			bathFilter: {},
			bedFilter: {},
			buildingTypeFilter: []
		};
	}
	
	componentDidMount() {
		API
			.getLocations()
			.then((data) => this.setState({locations: data.data}));
		API
			.getBuildingTypes()
			.then((data) => this.setState({buildingTypes: data.data}));
	}
	
	//Returns filtered list of properties
	filterProperties(properties) {
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
            <section className="testContainer">
                <section className="filterContainer">
					<RangeFilter title="Number of Baths" range={[0,5]} 
						onChange={(filter) => this.setState({bathFilter: filter})}/>
					<RangeFilter title="Number of Beds" range={[0,6]} 
						onChange={(filter) => this.setState({bedFilter: filter})}/>
                    <SelectFilter title="Building Type" options={this.state.buildingTypes.map(t => ({value: t.id, label: t.name}))} 
						onChange={(filter) => this.setState({buildingTypeFilter: filter})} />
                </section>
                <RemineTable properties={filteredLocations} />
            </section>
        );
    }
	
}

export default Test;