import React, {useState, useEffect, useMemo, useContext} from 'react'
import axios from 'axios';
import debounce from 'lodash.debounce';
import AutoSuggest from '../auto-suggest';
import LoadingSpinner from '../loading-spinner';
import {CityForecastContext} from '../../App';
import {WEATHER_APi__SEARCH_CITY_URL, WEATHER_APi__SEARCH_CITY_BY_ID_URL} from '../../config';

function CitySearch() {
    const [city, setCity] = useState('');
    const [cityList, setCityList] = useState([]);
    const [loading, setLoading] = useState(false);
    const cityForecastContext = useContext(CityForecastContext);
    
      const changeHandler = event => {
        setCity(event.target.value);
      }

      const debouncedOnChange = useMemo(
        () => debounce(changeHandler, 100)
      , []);
    
      const selectCity = (woeid, city) =>{
        if(woeid){
          setLoading(true);
          axios({
            method: 'get',
            url: `${WEATHER_APi__SEARCH_CITY_BY_ID_URL}/${woeid}`,
            headers: {'X-Requested-With':'XMLHttpRequest'}
        })
            .then(response => {
                console.log(response);
                cityForecastContext.cityIdDispatch({type: 'SET_CITY_FORECAST', payload: {
                  city,
                  forecasts: response.data.consolidated_weather
                } });
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            })   
        }
        console.log('woeid:', woeid);
      }

useEffect(() => {
    if(city) {
        setLoading(true);
        axios({
            method: 'get',
            url: `${WEATHER_APi__SEARCH_CITY_URL}/?query=${city}`,
            headers: {'X-Requested-With':'XMLHttpRequest'}
        })
            .then(response => {
                console.log(response);
                setLoading(false);
                setCityList(response.data);
            })
            .catch(error => {
                console.log(error);
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

export default CitySearch
