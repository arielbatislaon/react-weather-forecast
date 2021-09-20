import React from 'react';
import renderer from 'react-test-renderer';

import AutoSuggest from './index';

it('renders AutoSuggest correctly ', () => {
  const tree = renderer.create(<AutoSuggest />).toJSON();
  expect(tree).toMatchSnapshot();
});