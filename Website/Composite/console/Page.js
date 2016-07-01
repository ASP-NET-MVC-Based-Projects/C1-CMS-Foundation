// Start out really basic, just a toolbar and a content block
import React from 'react';
import Toolbar from './Toolbar.js';
import Fieldset from './Fieldset.js';
import update from 'react-addons-update';

export default class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fieldsets: {}
		};
		this.props.fieldsets.forEach(fieldset => {
			this.state.fieldsets[fieldset.name] = {};
			fieldset.fields.forEach(field => {
				this.state.fieldsets[fieldset.name][field.name] = 'initialValue' in field ? field.initialValue : '';
				field.changeValue = newValue => {
					let change = { fieldsets: {} };
					change.fieldsets[fieldset.name] = {};
					change.fieldsets[fieldset.name][field.name] = { $set: newValue };
					let newState = update(this.state, change);
					this.setState(newState);
				}
			});
		});
  }

	getState() {return this.state }

	render() {
		let fieldSets = this.props.fieldsets.map(
			(fieldset, index) => <Fieldset key={index} {...fieldset} values={this.state.fieldsets[fieldset.name]}/>
		);
		return (
			<div className="page">
				<Toolbar buttons={this.props.buttons} getState={this.getState.bind(this)}/>
				{fieldSets}
			</div>
		);
	}
}
