import expect from 'unittest/helpers/expect.js';
import initState from 'console/state/initState.js';
import sinon from 'sinon';
import { SELECT_PAGE, REPLACE_PAGES } from 'console/state/reducers/pages.js';

describe('initState', () => {
	let store;
	beforeEach(() => {
		store = {
			dispatch: sinon.spy().named('dispatch')
		};
	});

	it('loads definitions, sets page list, the shown page', () =>
		expect(initState, 'when called with', [store], 'to be undefined')
		.then(() =>
			expect(store.dispatch, 'to have calls satisfying', [
				{ spy: store.dispatch, args: [expect.it('to be a function')]}
			])
		)
	);
});
