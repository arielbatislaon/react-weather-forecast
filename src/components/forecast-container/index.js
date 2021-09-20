import React from 'react';
import './index.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types'
import dayjs from 'dayjs-ext'
import {NO_OF_DAYS_FORECAST} from '../../config'


function ForeCastContainer(props) {
  const {forecasts, labels, city} = props;
  return (
    <div >
      {forecasts.length>0 && <h4>{labels.forcastTitle.replace('{city}', city)}</h4>}
      <Row>
      {forecasts.length && forecasts.map( (forecast, index) => 
       ( index < NO_OF_DAYS_FORECAST && <Col className="forecast-item">
           <div><h5>{dayjs(forecast.applicable_date).format('dddd')}</h5></div>
           <div>{labels.minTempText}:{forecast.min_temp}</div>
           <div> {labels.maxTempText}:{forecast.max_temp}</div>
       </Col>)
      )}
      </Row>
    </div>
  );
}

ForeCastContainer.propTypes = {
  forecasts: PropTypes.arrayOf(
      PropTypes.shape({
        applicable_date: PropTypes.string,
        min_temp: PropTypes.string,
        max_temp: PropTypes.string,
      })
    ),
    labels: PropTypes.shape({
      forcastTitle: PropTypes.string,
      minTempText:  PropTypes.string,
      maxTempText:  PropTypes.string,
    })  ,
    city: PropTypes.string,
 
}

ForeCastContainer.defaultProps = {
  forecasts: [],
       labels: {
    forcastTitle: 'City of {city} Min/Max Temperature Forecast',
    minTempText: 'Min Temp.',
    maxTempText: 'Max Temp.',
  },
  city: '',
}    

export default ForeCastContainer;