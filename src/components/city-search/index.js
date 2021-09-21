import React, {useState, useEffect, useMemo, useContext} from 'react'
import PropTypes from 'prop-types'
import AutoSuggest from '../auto-suggest';
import LoadingSpinner from '../loading-spinner';
import {CityForecastContext} from '../../App';
import {WEATHER_APi__SEARCH_CITY_URL, WEATHER_APi__SEARCH_CITY_BY_ID_URL, DISPATCH_ACTION, DEBOUNCE_DELAY} from '../../config';
import {getAPI, debounceKeyInput} from '../../utils'

function CitySearch(props) {
    const {labels} = props;
    const [city, setCity] = useState('');
    const [cityList, setCityList] = useState([]);
    const [loading, setLoading] = useState(false);
    const cityForecastContext = useContext(CityForecastContext);
    
      const changeHandler = event => {
        setCity(event.target.value);
        cityForecastContext.cityIdDispatch({type: DISPATCH_ACTION.RESET_ERROR});
      }

      const debouncedOnChange = useMemo(
        () => debounceKeyInput(changeHandler, DEBOUNCE_DELAY)
      , []);

      const selectCity = (city) =>{
        try{
          setCityList([]);
          const woeid = ({...{woeid: null}, ...cityList.find( ({ title }) => title.trim().toLowerCase() === city.trim().toLowerCase() )}).woeid;
          if(woeid){
          setLoading(true);
          getAPI(`${WEATHER_APi__SEARCH_CITY_BY_ID_URL}/${woeid}`)
            .then(response => {
                console.log(response);
                cityForecastContext.cityIdDispatch({type: DISPATCH_ACTION.SET_CITY_FORECAST, payload: {
                  city,
                  forecasts: response.data.consolidated_weather
                } });
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                cityForecastContext.cityIdDispatch({type: DISPATCH_ACTION.DISPLAY_ERROR, payload: error });
            })
        } else {
          cityForecastContext.cityIdDispatch({type: DISPATCH_ACTION.DISPLAY_ERROR, payload: {message: labels.cityNotFound.replace('{city}', city)}});
        }} catch(error) {
          cityForecastContext.cityIdDispatch({type: DISPATCH_ACTION.DISPLAY_ERROR, payload: error });
        }
      }

useEffect(() => {
    if(city) {
        setLoading(true);
        getAPI(`${WEATHER_APi__SEARCH_CITY_URL}/?query=${city}`)
            .then(response => {
                console.log(response);
                setLoading(false);
                setCityList(response.data);
            })
            .catch(error => {
                console.log(error);
                cityForecastContext.cityIdDispatch({type: DISPATCH_ACTION.DISPLAY_ERROR, payload: error });
              })
    }

}, [city]);

    return (
      <div>
        <AutoSuggest cityList={cityList} onClick={selectCity} onChange={debouncedOnChange} />
       {loading && <LoadingSpinner /> }  
       </div>
    );
}
CitySearch.propTypes = {
    labels: PropTypes.shape({
      cityNotFound:  PropTypes.string,
    }),
 }

 CitySearch.defaultProps = {
  forecasts: [],
       labels: {
        cityNotFound:  'Unable to find City: {city}',
  },
}    

export default CitySearch
