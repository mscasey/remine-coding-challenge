import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RemineTable.css';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

class RemineTable extends Component {
	render() {    
		let list = this.props.properties
		list.forEach(p => p.buildingTypeName = p.buildingType.name);
		return (
            <div className="tableContainer">
                <p>Table length: <strong>{this.props.properties.length}</strong></p>
				<Table
					className="remineTable"
					width={800}
					height={500}
					headerHeight={20}
					headerClassName="remineTableHeader"
					rowHeight={30}
					rowCount={list.length}
					rowGetter={({ index }) => list[index]}
					rowClassName="remineTableRow"
				  >
					<Column
					  label='Address'
					  dataKey='address'
					  width={500}
					/>
					<Column
					  width={150}
					  label='Building Type'
					  dataKey='buildingTypeName'
					/>
					<Column
					  width={75}
					  label='Beds'
					  dataKey='beds'
					/>
					<Column
					  width={75}
					  label='Baths'
					  dataKey='baths'
					/>
				</Table>
            </div>
        );
    }
}

RemineTable.defaultProps = {
	properties: []
}

RemineTable.propTypes = {
	properties: PropTypes.array
}

export default RemineTable;
