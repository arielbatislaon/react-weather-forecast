import React from 'react';
import renderer from 'react-test-renderer';

import ForeCastContainer from './index';



it('renders ForeCastContainer correctly ', () => {
  const forecasts = [{
    applicable_date: '2021-09-19',
          min_temp: '12.5',
          max_temp: '32.5',
  }];
  const city ='London';
  const tree = renderer.create(<ForeCastContainer forecasts={forecasts} city={city} />).toJSON();
  expect(tree).toMatchSnapshot();
});