import React from 'react';
import renderer from 'react-test-renderer';

import ForeCastItem from './index';
const forecast ={};

it('renders ForeCastItem correctly ', () => {
  const tree = renderer.create(<ForeCastItem forecast={forecast}/>).toJSON();
  expect(tree).toMatchSnapshot();
});