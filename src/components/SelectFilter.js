import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select  from 'react-select';
import 'react-select/dist/react-select.css';

export default class SelectFilter extends Component{
	constructor(props){
		super(props);
		this.state={selected: []};
	}
	
	updateSelected(selected){
		this.setState({selected});
	}
	
	componentDidUpdate(prevProps, prevState){
		if(prevState.selected !== this.state.selected){
			this.props.onChange(this.state.selected.map(s => s.value));
		}
	}
	
	render(){
		return 	<div key={this.props.title}>
					<Select
						multi
						onChange={(selected) => this.setState({selected})}
						options={this.props.options}
						placeholder={this.props.title}
						value={this.state.selected}
					/>
				</div>;
	}
}

SelectFilter.defaultProps = {
    title: '',
	options: [],
	onChange: () => console.log("No Update Function!")
}

SelectFilter.propTypes = {
    title: PropTypes.string,
	options: PropTypes.array,
	onChange: PropTypes.func
}