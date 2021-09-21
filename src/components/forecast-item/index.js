import React  from 'react'
import './index.css';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types'
import {getDayLabelOfDate} from '../../utils';

function ForeCastItem(props) {
    const {forecast, labels, className} = props;
    return (
        <React.Fragment>
            <Col className={className}>
                <div><h5>{getDayLabelOfDate(forecast.applicable_date)}</h5></div>
                 <div>{labels.minTempText}:{forecast.min_temp}</div>
                <div> {labels.maxTempText}:{forecast.max_temp}</div>
            </Col>
        </React.Fragment>
    )
}
ForeCastItem.propTypes = {
    forecasts:
        PropTypes.shape({
          applicable_date: PropTypes.string,
          min_temp: PropTypes.string,
          max_temp: PropTypes.string,
        }),
      labels: PropTypes.shape({
        minTempText:  PropTypes.string,
        maxTempText:  PropTypes.string,
      }),
      className: PropTypes.string,
   }
  
  ForeCastItem.defaultProps = {
    forecasts: {},
         labels: {
      minTempText: 'Min Temp.',
      maxTempText: 'Max Temp.',
    },
    className: null,
  }    
  
export default ForeCastItem
