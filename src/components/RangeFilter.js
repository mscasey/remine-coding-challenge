import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class RangeFilter extends Component{
	constructor(props){
		super(props);
		this.state={min: '', max: ''};
	}
	
	updateRange(value){
		this.setState({min: value[0], max: value[1]});
	}
	
	updateMax(max){
		this.setState({max: parseInt(max)});
	}
	
	updateMin(min){
		this.setState({min: parseInt(min)});
	}
	
	componentDidUpdate(prevProps, prevState){
		if(prevState.min !== this.state.min || prevState.max !== this.state.max){
			this.props.onChange({min: this.state.min, max: this.state.max});
		}
	}
	
	render(){
		let min = this.state.min;
		let max = this.state.max;
		return <div key={this.props.title}>
						<input
							value={min}
							onChange={onInput(this.updateMin.bind(this))} 
							/>
						<Range 
							value={[min || this.props.range[0], max || this.props.range[1]]} 
							//pushable 
							min={this.props.range[0]} max={this.props.range[1]}
							onChange={this.updateRange.bind(this)}
							allowCross
						/>
						<input 
							value={max}
							onChange={onInput(this.updateMax.bind(this))} 
							/>
					</div>;
	}
}


function onInput(fn) { return (event) => fn(event.target.value) }

RangeFilter.defaultProps = {
    title: '',
	range: [0, 100],
	onChange: () => console.log("No Update Function!")
}

RangeFilter.propTypes = {
    title: PropTypes.string,
	range: PropTypes.arrayOf(PropTypes.number),
	onChange: PropTypes.func
}