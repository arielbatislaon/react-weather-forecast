import React, {useState, useEffect, useRef} from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

function AutoSuggest(props) {

   const {cityList, onClick, onChange} = props;
   const [suggestedCities, setSuggestedCities] = useState([]);
   const [cityId, setCityId] = useState(0);
   
   const cityRef = useRef(null);
   
useEffect(() => {
    setSuggestedCities(cityList)
}, [cityList]);

    const listClick = (city, woeid) => {
        console.log(city);
        console.log(woeid);
        cityRef.current.value = city;
        setSuggestedCities([]);
        onClick(woeid, city) ; 
        setCityId(woeid);
        }

       
        let suggestedCitiesComponent =null;
        if (suggestedCities.length ) {
          suggestedCitiesComponent = (
            <ul className="suggestions">
              {cityList.map((suggestion, index) => {
                return (
                  <li  key={suggestion.woeid} onClick={(e) => listClick(e.currentTarget.innerText, suggestion.woeid)}>
                    {suggestion.title}
                  </li>
                );
              })}
            </ul>
          );
        } else {
            suggestedCitiesComponent = (
            <div className="no-suggestions">
            </div>
          );
        }
   
        return (
            <div>
              <input
                type="text"
                onChange={onChange}
                ref={cityRef}
                placeholder="City"
              />
              <div className="search-icon" onClick={() => onClick(cityId, cityRef.current ? cityRef.current.value : '')}>
              <FontAwesomeIcon  icon={faSearch}/>
              </div>
              {suggestedCitiesComponent}
            </div>
          );
}

 AutoSuggest.propTypes = {
    cityList: PropTypes.arrayOf(
        PropTypes.shape({
          woeid: PropTypes.number,
          title: PropTypes.string
        })
      ),
    onClick: PropTypes.func  
}

AutoSuggest.defaultProps = {
    cityList: [
        {
            woeid: 0,
            title: '',
        }
    ],
    onClick: null
}    
 
export default AutoSuggest

