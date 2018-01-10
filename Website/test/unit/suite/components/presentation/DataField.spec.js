import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HelpIcon from 'console/components/presentation/HelpIcon.js';
import DataField from 'console/components/presentation/DataField.js';
import DataFieldWrapper from 'console/components/presentation/DataFieldWrapper.js';
import DataFieldLabel from 'console/components/presentation/DataFieldLabel.js';
import Checkbox from 'console/components/presentation/Checkbox.js';
import StatelessWrapper from 'unittest/helpers/StatelessWrapper.js';
import Input from 'console/components/presentation/Input.js';
import Select from 'console/components/presentation/Select.js';
import Immutable from 'immutable';

describe('DataField', () => {
	let renderer, props, state;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
	});

	describe('with text type', () => {
		beforeEach(() => {
			props = {
				type: 'text',
				name: 'test',
				headline: 'Text headline',
				help: 'Help text',
				updateValue: sinon.spy().named('updateValue')
			};
			state = {
				value: 'Init'
			};
		});

		it('renders a text field with headline and helper', () => {
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
			<DataFieldWrapper>
				{/* <DataFieldLabel>{props.headline}</DataFieldLabel> */}
				<Input
					type={props.type}
					// id={props.name}
					value={state.value}/>
				<HelpIcon text={props.help}/>
			</DataFieldWrapper>
			);
		});

		it('renders a text field with headline but no helper', () => {
			delete props.help;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
				<DataFieldWrapper>
					{/* <DataFieldLabel>{props.headline}</DataFieldLabel> */}
					<Input
						type={props.type}
						// id={props.name}
						value={state.value}/>
				</DataFieldWrapper>
			)
			.and('not to contain', <HelpIcon text=""/>);
		});

		it('renders a text field with helper but no headline', () => {
			delete props.headline;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
				<DataFieldWrapper>
					<Input
						type={props.type}
						// id={props.name}
						value={state.value}/>
					<HelpIcon text={props.help}/>
				</DataFieldWrapper>
			)
			.and('not to contain', <DataFieldLabel/>);
		});

		it('calls its update callback', () => {
			var component = TestUtils.renderIntoDocument(
				<StatelessWrapper>
					<DataField {...props} {...state}/>
				</StatelessWrapper>
			);
			return expect(
				component, 'queried for', <Input value='Init'/>,
			'to have rendered', <Input value="Init"/>
			)
			.then(() => expect(component,'with event change', 'on', <Input value='Init'/>))
			.then(() => expect(props.updateValue, 'was called'));
		});
	});

	describe('with password type', () => {
		beforeEach(() => {
			props = {
				type: 'password',
				name: 'test',
				headline: 'Text headline',
				help: 'Help text',
				updateValue: sinon.spy().named('updateValue')
			};
			state = {
				value: 'Init'
			};
		});

		it('renders a password field with headline and helper', () => {
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
			<DataFieldWrapper>
				{/* <DataFieldLabel>{props.headline}</DataFieldLabel> */}
				<Input
					type={props.type}
					// id={props.name}
					value={state.value}/>
				<HelpIcon text={props.help}/>
			</DataFieldWrapper>
			);
		});

		it('renders a password field with headline but no helper', () => {
			delete props.help;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
				<DataFieldWrapper>
					{/* <DataFieldLabel>{props.headline}</DataFieldLabel> */}
					<Input
						type={props.type}
						// id={props.name}
						value={state.value}/>
				</DataFieldWrapper>
			)
			.and('not to contain', <HelpIcon text=""/>);
		});

		it('renders a password field with helper but no headline', () => {
			delete props.headline;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
				<DataFieldWrapper>
					<Input
						type={props.type}
						// id={props.name}
						value={state.value}/>
					<HelpIcon text={props.help}/>
				</DataFieldWrapper>
			)
			.and('not to contain', <DataFieldLabel/>);
		});

		it('calls its update callback', () => {
			var component = TestUtils.renderIntoDocument(
				<StatelessWrapper>
					<DataField {...props} {...state}/>
				</StatelessWrapper>
			);
			return expect(
				component, 'queried for', <Input value="Init"/>,
			'to have rendered', <Input value="Init"/>
			)
			.then(() => expect(component,'with event change', 'on', <Input value='Init'/>))
			.then(() => expect(props.updateValue, 'was called'));
		});
	});

	describe('with select type', () => {
		beforeEach(() => {
			props = {
				type: 'select',
				name: 'test',
				headline: 'Text headline',
				help: 'Help text',
				updateValue: sinon.spy().named('updateValue')
			};
			state = {
				value: 2
			};
		});

		describe('with option list', () => {
			beforeEach(() => {
				props.options = Immutable.fromJS([
					{ value: 1, label: 'One' },
					{ value: 2, label: 'Two' },
					{ value: 3, label: 'Three' },
					{ value: 4, label: 'Four' }
				]);
			});

			it('renders a dropdown with headline and helper', () => {
				renderer.render(<DataField {...props} {...state}/> );
				return expect(renderer, 'to have rendered',
					<DataFieldWrapper>
						{/* <DataFieldLabel>{props.headline}</DataFieldLabel> */}
							<Select id="test" value={{ value: 2, label: 'Two' }} options={[
									{ value: 1, label: 'One' },
									{ value: 2, label: 'Two' },
									{ value: 3, label: 'Three' },
									{ value: 4, label: 'Four' }
							]}
							placeholder="(No selection)" clearable={false}/>
						<HelpIcon text={props.help}/>
					</DataFieldWrapper>
				);
			});

			it('renders a dropdown with headline but no helper', () => {
				delete props.help;
				renderer.render(<DataField {...props} {...state}/> );
				return expect(renderer, 'to have rendered',
					<DataFieldWrapper>
						{/* <DataFieldLabel>{props.headline}</DataFieldLabel> */}
							<Select id="test" value={{ value: 2, label: 'Two' }} options={[
									{ value: 1, label: 'One' },
									{ value: 2, label: 'Two' },
									{ value: 3, label: 'Three' },
									{ value: 4, label: 'Four' }
							]}
							placeholder="(No selection)" clearable={false}/>
					</DataFieldWrapper>
				)
				.and('not to contain', <HelpIcon text=""/>);
			});

			it('renders a dropdown with helper but no headline', () => {
				delete props.headline;
				renderer.render(<DataField {...props} {...state}/> );
				return expect(renderer, 'to have rendered',
					<DataFieldWrapper>
						<Select id="test" value={{ value: 2, label: 'Two' }} options={[
								{ value: 1, label: 'One' },
								{ value: 2, label: 'Two' },
								{ value: 3, label: 'Three' },
								{ value: 4, label: 'Four' }
						]}
						placeholder="(No selection)" clearable={false}/>
						<HelpIcon text={props.help}/>
					</DataFieldWrapper>
				)
				.and('not to contain', <DataFieldLabel/>);
			});

			it.skip('calls its update callback', () => {
				var component = TestUtils.renderIntoDocument(
					<StatelessWrapper>
						<DataField {...props} {...state}/>
					</StatelessWrapper>
				);
				return expect(
					component,
					'to contain', <Select value={{ value: 2, label: 'Two' }} placeholder="(No selection)" clearable={false}/>
				)
				.then(() => expect(component,
					'with event click',
					'on', <DataFieldWrapper className='Select-control'/>)
				)
				// Make component update its rendering here, somehow
				.then(() => expect(component,
					'with event click',
					'on', <DataFieldWrapper className='Select-option' key={3}/>)
				)
				.then(() => expect(props.updateValue, 'to have a call satisfying', {args: [3]}));
			});
		});
	});

	describe('with checkbox type', () => {
		beforeEach(() => {
			props = {
				type: 'checkbox',
				name: 'test',
				// headline: 'Text headline',
				help: 'Help text',
				label: 'Label text',
				updateValue: sinon.spy().named('updateValue')
			};
			state = {
				value: true
			};
		});

		it('renders a checkbox field with headline, label and helper', () => {
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
			<DataFieldWrapper>
				{/* <DataFieldLabel>{props.headline}</DataFieldLabel> */}
				<DataFieldLabel htmlFor={props.name}>{props.label}</DataFieldLabel>
				<Checkbox
					id={props.name}
					checked={state.value}/>
				<HelpIcon text={props.help}/>
			</DataFieldWrapper>
			);
		});

		it('defaults to unchecked', () => {
			state.value = undefined;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
			<DataFieldWrapper>
				{/* <DataFieldLabel>{props.headline}</DataFieldLabel> */}
				<DataFieldLabel htmlFor={props.name}>{props.label}</DataFieldLabel>
				<Checkbox
					id={props.name}
					checked={false}/>
				<HelpIcon text={props.help}/>
			</DataFieldWrapper>
			);
		});

		it('renders a checkbox field with headline and helper, but no label', () => {
			delete props.label;
			renderer.render(<DataField {...props} {...state}/> );
			return expect(renderer, 'to have rendered',
			<DataFieldWrapper>
				{/* <DataFieldLabel>{props.headline}</DataFieldLabel> */}
				<Checkbox
					id={props.name}
					checked={state.value}/>
				<HelpIcon text={props.help}/>
			</DataFieldWrapper>
			)
			.and('not to contain', <DataFieldLabel/>);
		});

		it('calls its update callback', () => {
			var component = TestUtils.renderIntoDocument(
				<StatelessWrapper>
					<DataField {...props} {...state}/>
				</StatelessWrapper>
			);
			return expect(
				component, 'queried for', <Checkbox id={props.name}/>,
				'to have rendered', <Checkbox id={props.name} checked={true}/>
			)
			.then(() => expect(component,'with event change', 'on', <input/>))
			.then(() => expect(props.updateValue, 'was called'));
		});
	});
});
