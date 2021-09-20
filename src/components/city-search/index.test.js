import React from 'react';
import renderer from 'react-test-renderer';

import CitySearch from './index';

it('renders CitySearch correctly ', () => {
  const tree = renderer.create(<CitySearch />).toJSON();
  expect(tree).toMatchSnapshot();
});